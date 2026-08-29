import mongoose from "mongoose";
import Application from "../models/Application.js";
import StudentProfile from "../models/StudentProfile.js";
import Opportunity from "../models/Opportunity.js";
import CompanyProfile from "../models/CompanyProfile.js";

export const createApplication = async (req, res, next) => {
  try {
    const { opportunityId, coverLetter = "", phoneNumber = "" } = req.body;

    if (
      typeof opportunityId !== "string" ||
      !mongoose.isObjectIdOrHexString(opportunityId)
    ) {
      return res.status(400).json({
        message: "Invalid opportunity ID.",
      });
    }

    if (
      typeof coverLetter !== "string" ||
      coverLetter.length > 5000 ||
      typeof phoneNumber !== "string" ||
      phoneNumber.length > 30
    ) {
      return res.status(400).json({
        message: "Invalid cover letter or phone number.",
      });
    }

    // Identify the student from the authenticated account.
    const student = await StudentProfile.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found.",
      });
    }

    const opportunity = await Opportunity.findById(opportunityId);

    if (!opportunity || opportunity.status !== "active") {
      return res.status(404).json({
        message: "Opportunity is not available for applications.",
      });
    }

    if (
      opportunity.deadline &&
      new Date(opportunity.deadline).getTime() <= Date.now()
    ) {
      return res.status(400).json({
        message: "The application deadline has passed.",
      });
    }

    const company = await CompanyProfile.findById(opportunity.companyId);

    if (!company || company.activationStatus !== "active") {
      return res.status(400).json({
        message: "This company is not accepting applications.",
      });
    }

    // Company and student IDs come from the server, not the form.
    const application = await Application.create({
      studentId: student._id,
      opportunityId: opportunity._id,
      companyId: company._id,
      coverLetter: coverLetter.trim(),
      phoneNumber: phoneNumber.trim(),
    });

    return res.status(201).json({
      message: "Application submitted successfully.",
      id: application._id,
      opportunityId: application.opportunityId,
      status: application.status,
      appliedAt: application.createdAt,
    });
  } catch (error) {
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
        select: "name major universityId userId",
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
              universityId: application.studentId.universityId,
              email: application.studentId.userId?.email ?? "",
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
      }))
    );
  } catch (error) {
    next(error);
  }
};
