import SupervisorProfile from "../models/SupervisorProfile.js";
import TrainingRequest from "../models/TrainingRequest.js";
import StudentProfile from "../models/StudentProfile.js";

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
    const requests = await TrainingRequest.find({
      supervisorId: supervisorProfile._id,
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

    const request = await TrainingRequest.findOne({
      _id: id,
      supervisorId: supervisorProfile._id,
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
