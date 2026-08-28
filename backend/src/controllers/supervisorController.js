import SupervisorProfile from "../models/SupervisorProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";
import StudentProfile from "../models/StudentProfile.js";

const SUPERVISOR_EDITABLE_FIELDS = [
  "name",
  "phone",
  "officeHours",
  "avatarUrl",
];

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!profile)
      return res.status(404).json({ message: "Supervisor profile not found" });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const uploadSupervisorAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const profile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.avatarUrl = req.file.path;
    await profile.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatarUrl: profile.avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/supervisor/requests
export const getSupervisorRequests = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({
      userId: req.user._id,
    });

    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    // Fetch all requests assigned to this supervisor
    const requests = await InternshipRequest.find({
      supervisorId: supervisorProfile.userId,
    })
      .populate({
        path: "studentId",
        select: "name university major",
        populate: { path: "userId", select: "email" },
      })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// PUT /api/supervisor/requests/:id/status
export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    const supervisorProfile = await SupervisorProfile.findOne({
      userId: req.user._id,
    });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const request = await InternshipRequest.findOne({
      _id: id,
      supervisorId: supervisorProfile.userId,
    });
    if (!request) {
      return res
        .status(404)
        .json({ message: "Request not found or unauthorized." });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status} successfully.`, request });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const allowedUpdates = {};
    for (const field of SUPERVISOR_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    }

    const profile = await SupervisorProfile.findOneAndUpdate(
      { userId: req.user._id },
      allowedUpdates,
      { new: true, runValidators: true }
    );

    if (!profile)
      return res.status(404).json({ message: "Supervisor profile not found" });

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// GET /api/supervisor/dashboard
import Hour from "../models/Hour.js";

export const getSupervisorDashboard = async (req, res, next) => {
  try {
    const supervisorId = req.user._id;

    // Get assigned students
    const assignedStudents = await StudentProfile.find({ supervisorId })
      .populate("userId", "email")
      .lean();

    const studentIds = assignedStudents.map(s => s._id);

    // Get active and completed internships for stats
    const internships = await InternshipRequest.find({
      supervisorId,
      status: { $in: ["approved"] } 
    }).lean();

    // Since our database might not have distinct completed status in InternshipRequest, we can consider pending evaluation ones 
    // or just assume active are all approved.
    const activeInternshipsCount = internships.length;
    // For pending evaluations, count those where supervisorFinalStatus is pending or not set
    const pendingEvaluationsCount = internships.filter(i => !i.supervisorFinalStatus || i.supervisorFinalStatus === "pending").length;
    const completedInternshipsCount = internships.filter(i => i.supervisorFinalStatus === "approved").length;

    // Get all hours for these students
    const hours = await Hour.find({
      studentId: { $in: studentIds }
    }).lean();

    // Calculate progress for each student
    const studentData = assignedStudents.map(student => {
      const studentHours = hours.filter(h => String(h.studentId) === String(student._id));
      const completedHours = studentHours
        .filter(h => h.companyStatus === "approved" || h.finalStatus === "approved") // Count approved hours
        .reduce((sum, h) => sum + (h.hours || 0), 0);
      
      const progressPercent = Math.min((completedHours / 150) * 100, 100);

      // Find their current internship company
      const internship = internships.find(i => String(i.studentId) === String(student._id));
      const company = internship ? internship.newCompanyName : "Unassigned";

      return {
        id: student._id,
        name: student.name,
        email: student.userId ? student.userId.email : "",
        company,
        progress: progressPercent,
        completedHours
      };
    });

    res.json({
      stats: {
        totalStudents: assignedStudents.length,
        activeInternships: activeInternshipsCount,
        pendingEvaluations: pendingEvaluationsCount,
        completedInternships: completedInternshipsCount
      },
      students: studentData
    });
  } catch (error) {
    next(error);
  }
};
