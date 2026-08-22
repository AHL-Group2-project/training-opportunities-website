import StudentProfile from "../models/StudentProfile.js";
import TrainingRequest from "../models/TrainingRequest.js";

// GET /api/student/profile
export const getStudentProfile = async (req, res, next) => {
  try {
    const studentProfile = await StudentProfile.findOne({
      userId: req.user._id,
    }).populate("supervisorId", "name email"); // Populate to check if assigned

    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found." });
    }

    res.json(studentProfile);
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

    const request = await TrainingRequest.create({
      studentId: studentProfile._id,
      supervisorId: studentProfile.supervisorId, // Route directly to assigned supervisor
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
    });

    res.status(201).json({
      message: "Training request submitted successfully to your supervisor.",
      request,
    });
  } catch (error) {
    next(error);
  }
};
