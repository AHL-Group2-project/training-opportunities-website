import SupervisorProfile from "../models/SupervisorProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";
import StudentProfile from "../models/StudentProfile.js";
import Hour from "../models/Hour.js";
import CompanyProfile from "../models/CompanyProfile.js";
import cloudinary from "../config/cloudinary.js";

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

export const getSupervisorDashboard = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) return res.status(404).json({ message: "Profile not found" });

    const supervisorId = supervisorProfile._id; // IMPORTANT: using profile _id

    const assignedStudents = await StudentProfile.find({ supervisorId })
      .populate("userId", "email")
      .lean();

    const studentIds = assignedStudents.map(s => s._id);

    const internships = await InternshipRequest.find({
      supervisorId,
      status: "approved" 
    }).lean();

    const activeInternshipsCount = internships.length;
    const pendingEvaluationsCount = internships.filter(i => !i.supervisorFinalStatus || i.supervisorFinalStatus === "pending").length;
    const completedInternshipsCount = internships.filter(i => i.supervisorFinalStatus === "approved").length;

    const hours = await Hour.find({
      studentId: { $in: studentIds }
    }).lean();

    const studentData = assignedStudents.map(student => {
      const studentHours = hours.filter(h => String(h.studentId) === String(student._id));
      const completedHours = studentHours
        .filter(h => h.companyStatus === "approved") // Count approved weekly hours
        .reduce((sum, h) => sum + (h.totalHours || h.hours || 0), 0); // fallback for unmigrated data
      
      const progressPercent = Math.min((completedHours / 150) * 100, 100);

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

const attachTrainingInfo = async (students) => {
  const studentIds = students.map((s) => s._id);

  const [requests, hoursAgg] = await Promise.all([
    InternshipRequest.find({ studentId: { $in: studentIds } }).sort({
      createdAt: -1,
    }),
    Hour.aggregate([
      {
        $match: {
          studentId: { $in: studentIds },
          companyStatus: "approved",
        },
      },
      {
        $group: {
          _id: { studentId: "$studentId", phase: "$trainingType" },
          totalHours: { $sum: { $ifNull: ["$totalHours", "$hours"] } }, // fallback for unmigrated data
        },
      },
    ]),
  ]);

  const requestsByStudent = new Map();
  for (const req of requests) {
    const key = req.studentId.toString();
    const type = req.type ? req.type.toLowerCase() : ""; // ft1 or ft2
    if (!requestsByStudent.has(key)) {
      requestsByStudent.set(key, { ft1: null, ft2: null });
    }
    const entry = requestsByStudent.get(key);
    if (type && !entry[type]) entry[type] = req; 
  }

  const hoursByStudent = new Map();
  for (const row of hoursAgg) {
    const key = row._id.studentId.toString();
    const phase = row._id.phase ? row._id.phase.toLowerCase() : "";
    if (!hoursByStudent.has(key)) {
      hoursByStudent.set(key, { ft1: 0, ft2: 0 });
    }
    if(phase === 'ft1' || phase === 'ft2') {
        hoursByStudent.get(key)[phase] = row.totalHours;
    }
  }

  return students.map((student) => {
    const key = student._id.toString();
    const reqs = requestsByStudent.get(key) || { ft1: null, ft2: null };
    const hours = hoursByStudent.get(key) || { ft1: 0, ft2: 0 };

    const isCompleted = (phase) => {
      const request = reqs[phase];
      return Boolean(
        request &&
          request.status === "approved" &&
          hours[phase] >= (request.expectedHours || 150)
      );
    };

    const ft1Completed = isCompleted("ft1");
    const ft2Completed = isCompleted("ft2");

    const isActive = (phase) => {
      const request = reqs[phase];
      return Boolean(
        request && request.status === "approved" && !isCompleted(phase)
      );
    };

    let activePhase = null;
    if (isActive("ft1")) activePhase = "ft1";
    else if (isActive("ft2")) activePhase = "ft2";

    let displayPhase = activePhase;
    if (!displayPhase) {
      if (ft2Completed || reqs.ft2) displayPhase = "ft2";
      else if (ft1Completed || reqs.ft1) displayPhase = "ft1";
    }

    const totalHours = displayPhase ? hours[displayPhase] || 0 : 0;
    const currentRequest = activePhase ? reqs[activePhase] : (reqs.ft2 || reqs.ft1);
    const currentInternship = currentRequest && currentRequest.status === "approved"
      ? `${currentRequest.position || 'Intern'} - ${currentRequest.newCompanyName}`
      : null;

    let status = "Not Started";
    if (ft1Completed && ft2Completed) status = "Completed";
    else if (activePhase) status = "Active";

    return {
      id: student._id,
      name: student.name,
      university: student.university,
      major: student.major,
      year: student.graduationYear, // updated to use graduationYear
      currentInternship,
      ft1: ft1Completed,
      ft2: ft2Completed,
      totalHours,
      status,
    };
  });
};

export const getMyStudents = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const search = (req.query.search || "").trim();
    const status = req.query.status || "all";

    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const filter = { supervisorId: supervisorProfile._id };
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const students = await StudentProfile.find(filter).sort({ name: 1 });
    let enriched = await attachTrainingInfo(students);

    if (status !== "all") {
      enriched = enriched.filter((s) => s.status === status);
    }

    const total = enriched.length;
    const start = (page - 1) * limit;
    const data = enriched.slice(start, start + limit);

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const exportMyStudents = async (req, res, next) => {
  try {
    const search = (req.query.search || "").trim();
    const status = req.query.status || "all";

    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const filter = { supervisorId: supervisorProfile._id };
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const students = await StudentProfile.find(filter).sort({ name: 1 });
    let enriched = await attachTrainingInfo(students);

    if (status !== "all") {
      enriched = enriched.filter((s) => s.status === status);
    }

    const header = [
      "Name",
      "University",
      "Major",
      "Year",
      "Current Internship",
      "FT1",
      "FT2",
      "Total Hours",
      "Status",
    ];

    const escapeCsv = (val) => {
      const str = String(val ?? "");
      return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const rows = enriched.map((s) =>
      [
        s.name,
        s.university,
        s.major,
        s.year,
        s.currentInternship || "-",
        s.ft1 ? "Done" : "Pending",
        s.ft2 ? "Done" : "Pending",
        s.totalHours,
        s.status,
      ]
        .map(escapeCsv)
        .join(",")
    );

    const csv = [header.join(","), ...rows].join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="my-students.csv"'
    );
    res.status(200).send("\uFEFF" + csv);
  } catch (error) {
    next(error);
  }
};

export const getStudentDetails = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const { studentId } = req.params;

    const student = await StudentProfile.findOne({ _id: studentId, supervisorId: supervisorProfile._id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or not assigned to you." });
    }

    const requests = await InternshipRequest.find({ studentId }).populate("companyId");
    
    // Find active request
    const activeReq = requests.find(r => r.status === "approved" && r.type?.toLowerCase() === "ft2") || 
                      requests.find(r => r.status === "approved" && r.type?.toLowerCase() === "ft1");
    
    let hoursCompleted = 0;
    if (activeReq) {
      const hours = await Hour.find({ studentId, trainingType: { $regex: new RegExp(`^${activeReq.type}$`, "i") }, companyStatus: "approved" });
      hoursCompleted = hours.reduce((sum, h) => sum + (h.totalHours || 0), 0);
    }
    
    const progress = {
      studentId: student._id,
      currentInternship: activeReq ? {
        position: activeReq.position || `${activeReq.type.toUpperCase()} Intern`,
        company: activeReq.companyId?.name || activeReq.newCompanyName || "Unknown Company",
        hoursCompleted,
        hoursRequired: activeReq.expectedHours || 150
      } : {
        position: "-",
        company: "-",
        hoursCompleted: 0,
        hoursRequired: 150
      },
      reports: [],
      statusTimeline: [
        { label: "Started", date: activeReq ? new Date(activeReq.createdAt).toISOString().split("T")[0] : "-", completed: true },
        { label: "Mid Review", date: "-", completed: false },
        { label: "Final Review", date: "-", completed: false }
      ],
      evaluation: {
        submitted: false,
        overallComment: ""
      },
      previousInternships: requests
        .filter(r => r.status === "approved" && r._id.toString() !== activeReq?._id?.toString())
        .map(r => ({
          position: r.position || `${r.type.toUpperCase()} Intern`,
          company: r.companyId?.name || r.newCompanyName || "Unknown Company",
          period: r.startDate && r.endDate ? `${new Date(r.startDate).toLocaleDateString()} - ${new Date(r.endDate).toLocaleDateString()}` : "Unknown"
        }))
    };
    
    const getInitials = (name) => name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");

    res.json({
      student: {
        id: student._id,
        name: student.name,
        initials: getInitials(student.name),
        university: student.university,
        major: student.major,
        year: student.graduationYear || student.year,
        bio: student.about || "",
        location: student.location || "N/A"
      },
      progress
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/supervisors/students/:studentId/assign-company
export const assignCompany = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const { studentId } = req.params;
    const { companyId, newCompanyName } = req.body;

    const student = await StudentProfile.findOne({ _id: studentId, supervisorId: supervisorProfile._id });
    if (!student) {
      return res.status(404).json({ message: "Student not found or not assigned to you." });
    }

    // Find the latest pending or approved request
    const request = await InternshipRequest.findOne({
      studentId: student._id,
      status: { $in: ["pending", "approved"] },
    }).sort({ createdAt: -1 });

    if (!request) {
      return res.status(400).json({ message: "No active or pending request found for this student to assign a company to." });
    }

    // Assign to platform company or custom text company
    if (companyId) {
      const companyProfile = await CompanyProfile.findById(companyId);
      if (!companyProfile) {
        return res.status(404).json({ message: "Selected company not found." });
      }
      request.companyId = companyProfile._id;
      request.newCompanyName = companyProfile.name;
      
      await StudentProfile.updateOne(
        { _id: request.studentId },
        { $set: { companyId: companyProfile._id } }
      );
    } else if (newCompanyName) {
      request.companyId = null;
      request.newCompanyName = newCompanyName;
      
      await StudentProfile.updateOne(
        { _id: request.studentId },
        { $unset: { companyId: "" } }
      );
    } else {
      return res.status(400).json({ message: "Must provide either companyId or newCompanyName." });
    }

    // Assigning a company automatically approves the request if it was pending
    if (request.status === "pending") {
      request.status = "approved";
      request.reviewedAt = new Date();
    }

    await request.save();

    // Preserve previously submitted hours but associate them with the new company
    await Hour.updateMany(
      { internshipRequestId: request._id },
      { $set: { companyId: request.companyId } }
    );

    res.json({ message: "Company assigned successfully and request approved.", request });
  } catch (error) {
    next(error);
  }
};

