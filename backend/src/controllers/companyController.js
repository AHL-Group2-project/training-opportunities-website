import CompanyProfile from "../models/CompanyProfile.js";
import InternshipRequest from "../models/InternshipRequest.js";

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