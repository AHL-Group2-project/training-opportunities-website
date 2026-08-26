import SupervisorProfile from "../models/SupervisorProfile.js";
import TrainingRequest from "../models/TrainingRequest.js";

const getOwnSupervisorProfile = async (userId) => {
  return SupervisorProfile.findOne({ userId });
};
export const getMyRequests = async (req, res, next) => {
  try {
    const supervisorProfile = await getOwnSupervisorProfile(req.user._id);
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const requests = await TrainingRequest.find({
      supervisorId: supervisorProfile._id,
    })
      .populate({
        path: "studentId",
        select: "name",
        populate: { path: "userId", select: "email" },
      })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};


export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejectionComment } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be 'approved' or 'rejected'." });
    }

    if (status === "rejected" && !rejectionComment?.trim()) {
      return res
        .status(400)
        .json({ message: "A rejection comment is required." });
    }

    const supervisorProfile = await getOwnSupervisorProfile(req.user._id);
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

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be updated." });
    }

    request.status = status;
    request.rejectionComment =
      status === "rejected" ? rejectionComment.trim() : undefined;
    await request.save();

    res.json({ message: `Request ${status} successfully.`, request });
  } catch (error) {
    next(error);
  }
};