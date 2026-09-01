import Hour from "../models/Hour.js";
import StudentProfile from "../models/StudentProfile.js";
import SupervisorProfile from "../models/SupervisorProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";
import { getStudentTrainingStateData } from "../utils/trainingState.js";

// GET /api/supervisors/students/:studentId/training-state
export const getStudentTrainingState = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }
    const { studentId } = req.params;
    
    // Verify assignment
    const student = await StudentProfile.findOne({ _id: studentId, supervisorId: supervisorProfile._id });
    if (!student) {
      return res.status(403).json({ message: "Student is not assigned to you." });
    }

    const state = await getStudentTrainingStateData(studentId);
    res.json(state);
  } catch (error) {
    next(error);
  }
};

// GET /api/supervisors/students/:studentId/hours
export const getStudentHours = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const { studentId } = req.params;

    // Verify student is assigned to this supervisor
    const student = await StudentProfile.findOne({
      _id: studentId,
      supervisorId: supervisorProfile._id,
    });

    if (!student) {
      return res.status(403).json({ message: "Unauthorized: Student is not assigned to you." });
    }

    const hours = await Hour.find({ studentId }).sort({ weekStartDate: -1 });
    res.json(hours);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/supervisors/hours/:hourId/review
// This is for supervisors reviewing hours (e.g. if company has no account, supervisor acts as company reviewer)
export const reviewStudentHours = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const { hourId } = req.params;
    const { status, comment } = req.body; // status: approved, rejected

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'approved' or 'rejected'." });
    }

    const hourDoc = await Hour.findById(hourId).populate("studentId");
    if (!hourDoc) {
      return res.status(404).json({ message: "Hours record not found." });
    }

    // Verify student belongs to this supervisor
    if (String(hourDoc.studentId.supervisorId) !== String(supervisorProfile._id)) {
      return res.status(403).json({ message: "Unauthorized: Student is not assigned to you." });
    }

    hourDoc.companyStatus = status;
    if (comment) hourDoc.companyComment = comment;

    await hourDoc.save();

    res.json({ message: `Hours ${status} successfully.`, hourDoc });
  } catch (error) {
    next(error);
  }
};
