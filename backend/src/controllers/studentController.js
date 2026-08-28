import StudentProfile from "../models/StudentProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";

const STUDENT_EDITABLE_FIELDS = [
  "name",
  "university",
  "major",
  "graduationYear",
  "about",
  "cvUrl",
  "avatarUrl",
  "contactEmail",
  "phone",
  "social",
  "isPublic",
  "skills",
  "experience",
  "projects",
  "certificates",
];

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id }).populate("supervisorId", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// POST /api/student/requests
export const submitTrainingRequest = async (req, res, next) => {
  try {
    const studentProfile = await StudentProfile.findOne({
      userId: req.user._id,
    });

    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found." });
    }

    if (!studentProfile.supervisorId) {
      return res.status(403).json({
        message:
          "You cannot submit a training request because you have not been assigned a Supervisor by your university's Admin.",
      });
    }

    const {
      type,
      companyName,
      position,
      department,
      field,
      workMode,
      startDate,
      endDate,
      expectedHours,
      description,
      attachments,
    } = req.body;

    const request = await InternshipRequest.create({
      studentId: studentProfile._id,
      supervisorId: studentProfile.supervisorId, // Route directly to assigned supervisor
      type,
      newCompanyName: companyName,
      position,
      department,
      field,
      workMode,
      startDate,
      endDate,
      expectedHours,
      description,
      attachments,
    });

    res.status(201).json({
      message: "Training request submitted successfully to your supervisor.",
      request,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const allowedUpdates = {};
    for (const field of STUDENT_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        if (field === "social" && typeof req.body[field] === "object") {
          // Flatten the social object so Mongoose updates specific fields instead of replacing the entire object
          for (const key in req.body.social) {
            allowedUpdates[`social.${key}`] = req.body.social[key];
          }
        } else {
          allowedUpdates[field] = req.body[field];
        }
      }
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// GET /api/student/public
export const getPublicStudents = async (req, res, next) => {
  try {
    // Only return students who have opted into public visibility
    const students = await StudentProfile.find({ isPublic: true })
      .select("-__v") // Exclude internal fields if needed
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    next(error);
  }
};

// GET /api/student/public/:id
export const getPublicStudentById = async (req, res, next) => {
  try {
    const student = await StudentProfile.findOne({ userId: req.params.id, isPublic: true }).select("-__v");
    if (!student) {
      return res.status(404).json({ message: "Student not found or not public" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};
