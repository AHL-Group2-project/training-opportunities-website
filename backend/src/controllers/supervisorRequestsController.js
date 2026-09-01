import SupervisorProfile from "../models/SupervisorProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";
import StudentProfile from "../models/StudentProfile.js"; // must be imported so Mongoose registers the model for populate()
import CompanyProfile from "../models/CompanyProfile.js";

const getOwnSupervisorProfile = async (userId) => {
  return SupervisorProfile.findOne({ userId });
};

export const getMyRequests = async (req, res, next) => {
  try {
    const supervisorProfile = await getOwnSupervisorProfile(req.user._id);
    if (!supervisorProfile) {
      return res.status(404).json({ message: "Supervisor profile not found." });
    }

    const requests = await InternshipRequest.find({
      supervisorId: supervisorProfile._id,
    })
      .populate({
        path: "studentId",
        select: "name universityId major",
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
    const { status, rejectionComment, companyId } = req.body;

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

    const request = await InternshipRequest.findOne({
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
    request.reviewedAt = new Date();

    if (status === "rejected") {
      request.rejectionReason = rejectionComment.trim();
    }

    if (status === "approved") {
      if (companyId) {
        // Link to existing company
        const companyProfile = await CompanyProfile.findById(companyId);
        if (!companyProfile) {
          return res.status(404).json({ message: "Selected company not found." });
        }
        
        request.companyId = companyProfile._id;
        
        await StudentProfile.updateOne(
          { _id: request.studentId },
          { $set: { companyId: companyProfile._id } }
        );
      } else {
        // Supervisor tracks it manually (no account)
        request.companyId = null;
        
        await StudentProfile.updateOne(
          { _id: request.studentId },
          { $unset: { companyId: "" } }
        );
      }
    }

    await request.save();

    res.json({ message: `Request ${status} successfully.`, request });
  } catch (error) {
    next(error);
  }
};