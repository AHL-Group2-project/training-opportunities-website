import ChangeRequest from "../models/ChangeRequest.js";
import SupervisorProfile from "../models/SupervisorProfile.js";
import AdminProfile from "../models/AdminProfile.js";

// Supervisor creates a request
export const createChangeRequest = async (req, res, next) => {
  try {
    const { field, requestedValue } = req.body;
    const supervisorProfile = await SupervisorProfile.findOne({
      userId: req.user._id,
    });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }
    const currentValue = supervisorProfile[field];
    const request = await ChangeRequest.create({
      supervisorId: supervisorProfile._id,
      field,
      currentValue,
      requestedValue,
    });
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// Supervisor views their own requests (any status), most recent first
export const getMyChangeRequests = async (req, res, next) => {
  try {
    const supervisorProfile = await SupervisorProfile.findOne({
      userId: req.user._id,
    });
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }
    const requests = await ChangeRequest.find({
      supervisorId: supervisorProfile._id,
    }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// Admin views requests — scoped to supervisors within the admin's own university
export const getChangeRequests = async (req, res, next) => {
  try {
    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found." });
    }

    const supervisorsInUniversity = await SupervisorProfile.find({
      university: adminProfile.university,
    }).select("_id");
    const supervisorIds = supervisorsInUniversity.map((s) => s._id);

    const requests = await ChangeRequest.find({
      supervisorId: { $in: supervisorIds },
    })
      .populate("supervisorId", "name university department")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// Admin approves or rejects — only for supervisors within the admin's own university
export const reviewChangeRequest = async (req, res, next) => {
  try {
    const { decision, reviewNote } = req.body; // decision: "approved" | "rejected"
    const request = await ChangeRequest.findById(req.params.id).populate(
      "supervisorId",
    );
    if (!request) {
      return res.status(404).json({ message: "Change request not found." });
    }
    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already reviewed." });
    }

    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });
    if (!adminProfile) {
      return res.status(403).json({ message: "Admin profile not found." });
    }

    if (request.supervisorId.university !== adminProfile.university) {
      return res.status(403).json({
        message: "You can only review requests from supervisors in your university.",
      });
    }

    if (decision === "approved") {
      await SupervisorProfile.findByIdAndUpdate(request.supervisorId._id, {
        [request.field]: request.requestedValue,
      });
    }
    request.status = decision;
    request.reviewedBy = adminProfile._id;
    request.reviewNote = reviewNote;
    await request.save();
    res.json(request);
  } catch (error) {
    next(error);
  }
};