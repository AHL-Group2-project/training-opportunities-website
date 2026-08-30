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

// Admin views all pending requests
export const getChangeRequests = async (req, res, next) => {
  try {
    const requests = await ChangeRequest.find()
      .populate("supervisorId", "name university department")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// Admin approves or rejects
export const reviewChangeRequest = async (req, res, next) => {
  try {
    const { decision, reviewNote } = req.body; // decision: "approved" | "rejected"

    const request = await ChangeRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Change request not found." });
    }
    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already reviewed." });
    }

    const adminProfile = await AdminProfile.findOne({ userId: req.user._id });

    if (decision === "approved") {
      await SupervisorProfile.findByIdAndUpdate(request.supervisorId, {
        [request.field]: request.requestedValue,
      });
    }

    request.status = decision;
    request.reviewedBy = adminProfile?._id;
    request.reviewNote = reviewNote;
    await request.save();

    res.json(request);
  } catch (error) {
    next(error);
  }
};