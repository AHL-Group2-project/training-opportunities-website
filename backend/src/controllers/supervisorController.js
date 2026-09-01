import CompanyProfile from "../models/CompanyProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";
import StudentProfile from "../models/StudentProfile.js";
import Hour from "../models/Hour.js";
import { getStudentTrainingStateData } from "../utils/trainingState.js";

// GET /api/companies/me/interns/:studentId/training-state
export const getInternTrainingState = async (req, res, next) => {
  try {
    const company = await CompanyProfile.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: "Company profile not found." });
    }
    const { studentId } = req.params;
    
    const request = await InternshipRequest.findOne({
      studentId,
      companyId: company._id,
      status: "approved",
    });

    if (!request) {
      return res.status(403).json({ message: "Intern is not assigned to your company." });
    }

    const state = await getStudentTrainingStateData(studentId);
    res.json(state);
  } catch (error) {
    next(error);
  }
};

const COMPANY_EDITABLE_FIELDS = [
  "name",
  "industry",
  "location",
  "website",
  "linkedIn",
  "logoUrl",
  "description",
  "contactEmail",
  "phone",
];

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await CompanyProfile.findOne({ userId: req.user._id });
    if (!profile)
      return res.status(404).json({ message: "Company profile not found" });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    // verified and isActive are admin-controlled — never editable
    // by the company itself, even if sent in the request body.
    const allowedUpdates = {};
    for (const field of COMPANY_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    }

    const profile = await CompanyProfile.findOneAndUpdate(
      { userId: req.user._id },
      allowedUpdates,
      { new: true, runValidators: true }
    );
    if (!profile)
      return res.status(404).json({ message: "Company profile not found" });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// GET /api/companies/public
export const getPublicCompanies = async (req, res, next) => {
  try {
    // Return verified and active companies
    const companies = await CompanyProfile.find({ isActive: true, verified: true })
      .select("-__v") // Exclude internal fields if needed
      .sort({ name: 1 });
    res.json(companies);
  } catch (error) {
    next(error);
  }
};

// GET /api/companies/public/:id
export const getPublicCompanyById = async (req, res, next) => {
  try {
    const company = await CompanyProfile.findOne({ userId: req.params.id, isActive: true, verified: true }).select("-__v").lean();
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const pastInternsRequests = await InternshipRequest.find({ companyId: req.params.id, status: "approved" }).populate("studentId");
    
    const uniqueStudents = [];
    const studentIds = new Set();
    
    for (const request of pastInternsRequests) {
      if (request.studentId && !studentIds.has(request.studentId._id.toString())) {
        studentIds.add(request.studentId._id.toString());
        uniqueStudents.push({
          name: request.studentId.name,
          major: request.studentId.major,
          university: request.studentId.university,
          avatarUrl: request.studentId.avatarUrl,
          userId: request.studentId.userId,
        });
      }
    }
    
    company.pastInterns = uniqueStudents;

    res.json(company);
  } catch (error) {
    next(error);
  }
};

import cloudinary from "../config/cloudinary.js";

// POST /api/companies/me/logo
export const uploadCompanyLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const profile = await CompanyProfile.findOne({ userId: req.user._id });
    if (!profile) {
      await cloudinary.uploader.destroy(req.file.filename);
      return res.status(404).json({ message: "Company profile not found" });
    }

    if (profile.logoCloudinaryId) {
      await cloudinary.uploader.destroy(profile.logoCloudinaryId);
    }

    profile.logoUrl = req.file.path;
    profile.logoCloudinaryId = req.file.filename;
    await profile.save();

    res.json({
      message: "Logo uploaded successfully",
      logoUrl: profile.logoUrl,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/companies/me/interns
// Returns students with an approved internship request at this company
export const getMyActiveInterns = async (req, res, next) => {
  try {
    const companyProfile = await CompanyProfile.findOne({ userId: req.user._id });
    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found." });
    }

    const approvedRequests = await InternshipRequest.find({
      companyId: companyProfile._id,
      status: "approved",
    })
      .populate({
        path: "studentId",
        select: "name major university avatarUrl",
        populate: { path: "userId", select: "email" },
      })
      .lean();

    // For each intern, get their approved hour totals
    const result = await Promise.all(
      approvedRequests.map(async (req) => {
        const student = req.studentId;
        if (!student) return null;

        const hoursAgg = await Hour.aggregate([
          {
            $match: {
              studentId: student._id,
              internshipRequestId: req._id,
              companyStatus: "approved",
            },
          },
          { $group: { _id: null, total: { $sum: "$totalHours" } } },
        ]);

        const approvedHours = hoursAgg[0]?.total || 0;

        return {
          studentId: student._id,
          name: student.name,
          major: student.major,
          university: student.university,
          avatarUrl: student.avatarUrl || null,
          email: student.userId?.email || "",
          trainingType: req.type?.toUpperCase() || "",
          approvedHours,
          requiredHours: req.expectedHours || 150,
          internshipRequestId: req._id,
          startDate: req.startDate,
          endDate: req.endDate,
        };
      })
    );

    res.json(result.filter(Boolean));
  } catch (error) {
    next(error);
  }
};

// GET /api/companies/me/interns/:studentId/hours
// Returns all weekly Hour records for a student at this company
export const getInternHours = async (req, res, next) => {
  try {
    const companyProfile = await CompanyProfile.findOne({ userId: req.user._id });
    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found." });
    }

    const { studentId } = req.params;

    const hours = await Hour.find({
      studentId,
      companyId: companyProfile._id,
    }).sort({ weekStartDate: -1 });

    res.json(hours);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/companies/me/hours/:hourId
// Approve or reject a weekly timesheet
export const reviewHours = async (req, res, next) => {
  try {
    const companyProfile = await CompanyProfile.findOne({ userId: req.user._id });
    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found." });
    }

    const { hourId } = req.params;
    const { status, comment } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'approved' or 'rejected'." });
    }

    const hourRecord = await Hour.findOne({
      _id: hourId,
      companyId: companyProfile._id,
    });

    if (!hourRecord) {
      return res.status(404).json({ message: "Hours record not found or unauthorized." });
    }

    if (hourRecord.companyStatus !== "pending") {
      return res.status(400).json({ message: "Only pending hour records can be reviewed." });
    }

    hourRecord.companyStatus = status;
    hourRecord.companyComment = comment || "";
    await hourRecord.save();

    res.json({ message: `Hours ${status} successfully.`, hourRecord });
  } catch (error) {
    next(error);
  }
};