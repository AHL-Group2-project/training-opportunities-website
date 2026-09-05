import mongoose from "mongoose";
import Application from "../models/Application.js";
import StudentProfile from "../models/StudentProfile.js";
import Opportunity from "../models/Opportunity.js";
import CompanyProfile from "../models/CompanyProfile.js";
import cloudinary from "../config/cloudinary.js";

const removeUploadedCv = async (file) => {
  if (!file?.filename) return;

  try {
    await cloudinary.uploader.destroy(file.filename, {
      resource_type: "raw",
      invalidate: true,
    });
  } catch (cleanupError) {
    console.error("Unable to remove uploaded CV:", cleanupError.message);
  }
};

const rejectApplication = async (req, res, status, message) => {
  await removeUploadedCv(req.file);

  return res.status(status).json({
    message,
  });
};

export const createApplication = async (req, res, next) => {
  let applicationCreated = false;

  try {
    if (!req.file?.path || !req.file?.filename) {
      return res.status(400).json({
        message: "CV file is required.",
      });
    }

    const { opportunityId, coverLetter = "", phoneNumber = "" } = req.body;

    if (
      typeof opportunityId !== "string" ||
      !mongoose.isObjectIdOrHexString(opportunityId)
    ) {
      return rejectApplication(req, res, 400, "Invalid opportunity ID.");
    }

    if (
      typeof coverLetter !== "string" ||
      coverLetter.length > 5000 ||
      typeof phoneNumber !== "string" ||
      phoneNumber.length > 30
    ) {
      return rejectApplication(
        req,
        res,
        400,
        "Invalid cover letter or phone number."
      );
    }

    const student = await StudentProfile.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return rejectApplication(req, res, 404, "Student profile not found.");
    }

    const opportunity = await Opportunity.findById(opportunityId);

    if (!opportunity || opportunity.status !== "active") {
      return rejectApplication(
        req,
        res,
        404,
        "Opportunity is not available for applications."
      );
    }

    if (opportunity.applicationType === "external") {
      return rejectApplication(
        req,
        res,
        400,
        "This opportunity accepts applications through an external website."
      );
    }

    if (
      opportunity.deadline &&
      new Date(opportunity.deadline).getTime() <= Date.now()
    ) {
      return rejectApplication(
        req,
        res,
        400,
        "The application deadline has passed."
      );
    }

    const company = await CompanyProfile.findById(opportunity.companyId);

    if (!company || !company.isActive) {
      return rejectApplication(
        req,
        res,
        400,
        "This company is not accepting applications."
      );
    }

    const application = await Application.create({
      studentId: student._id,
      opportunityId: opportunity._id,
      companyId: company._id,
      coverLetter: coverLetter.trim(),
      phoneNumber: phoneNumber.trim(),
      cvUrl: req.file.path,
      cvCloudinaryId: req.file.filename,
      cvOriginalName: req.file.originalname,
    });

    applicationCreated = true;

    return res.status(201).json({
      message: "Application submitted successfully.",
      id: application._id,
      opportunityId: application.opportunityId,
      status: application.status,
      appliedAt: application.createdAt,
      cvUrl: application.cvUrl,
      cvOriginalName: application.cvOriginalName,
    });
  } catch (error) {
    if (!applicationCreated) {
      await removeUploadedCv(req.file);
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already applied to this opportunity.",
      });
    }

    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const student = await StudentProfile.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found.",
      });
    }

    const applications = await Application.find({
      studentId: student._id,
    })
      .populate("opportunityId", "title")
      .populate("companyId", "name")
      .sort({ createdAt: -1 });

    return res.json(
      applications.map((application) => ({
        id: application._id,
        opportunityId: application.opportunityId?._id ?? null,
        position: application.opportunityId?.title ?? "Unavailable opportunity",
        company: application.companyId?.name ?? "Unavailable company",
        status: application.status,
        appliedAt: application.createdAt,
        coverLetter: application.coverLetter,
        cvUrl: application.cvUrl || "",
        cvOriginalName: application.cvOriginalName || "",
      }))
    );
  } catch (error) {
    next(error);
  }
};

export const getCompanyApplications = async (req, res, next) => {
  try {
    const company = await CompanyProfile.findOne({
      userId: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found.",
      });
    }

    const filter = {
      companyId: company._id,
    };

    const { opportunityId } = req.query;

    if (opportunityId !== undefined) {
      if (
        typeof opportunityId !== "string" ||
        !mongoose.isObjectIdOrHexString(opportunityId)
      ) {
        return res.status(400).json({
          message: "Invalid opportunity ID.",
        });
      }

      filter.opportunityId = opportunityId;
    }

    const applications = await Application.find(filter)
      .populate({
        path: "studentId",
        select: "name major studentId university userId",
        populate: {
          path: "userId",
          select: "email",
        },
      })
      .populate("opportunityId", "title")
      .sort({ createdAt: -1 });

    return res.json(
      applications.map((application) => ({
        id: application._id,
        studentId: application.studentId?._id ?? null,
        opportunityId: application.opportunityId?._id ?? null,
        student: application.studentId
          ? {
              id: application.studentId._id,
              name: application.studentId.name,
              major: application.studentId.major,
              studentId: application.studentId.studentId,
              university: application.studentId.university,
              email: application.studentId.userId?.email || "",
              userId: application.studentId.userId?._id || application.studentId.userId,
            }
          : null,
        opportunity: application.opportunityId
          ? {
              id: application.opportunityId._id,
              title: application.opportunityId.title,
            }
          : null,
        status: application.status,
        appliedAt: application.createdAt,
        coverLetter: application.coverLetter,
        phoneNumber: application.phoneNumber,
        cvUrl: application.cvUrl || "",
        cvOriginalName: application.cvOriginalName || "",
      }))
    );
  } catch (error) {
    next(error);
  }
};
