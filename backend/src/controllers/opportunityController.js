import Opportunity from "../models/Opportunity.js";
import CompanyProfile from "../models/CompanyProfile.js";
import Application from "../models/Application.js";
import mongoose from "mongoose";

const getApplicantCount = (opportunityId) =>
  Application.countDocuments({ opportunityId });

const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const getOpportunities = async (req, res, next) => {
  try {
    const { search, type, location } = req.query;

    const filter = {
      status: "active",
    };

    if (type) {
      filter.type = type;
    }

    if (location) {
      filter.location = {
        $regex: `^${escapeRegex(location)}$`,
        $options: "i",
      };
    }

    if (search) {
      const safeSearch = escapeRegex(search);

      filter.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
        { department: { $regex: safeSearch, $options: "i" } },
        { field: { $regex: safeSearch, $options: "i" } },
        { skills: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const opportunities = await Opportunity.find(filter)
      .populate("companyId", "name logoUrl industry location")
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      opportunities.map(async (opportunity) => {
        const opportunityObject = opportunity.toObject();

        const daysLeft = Math.max(
          0,
          Math.ceil(
            (new Date(opportunity.deadline).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )
        );

        return {
          ...opportunityObject,
          id: opportunity._id,
          company: opportunity.companyId?.name,
          logo: opportunity.companyId?.logoUrl,
          daysLeft,
          applicants: await getApplicantCount(opportunity._id),
        };
      })
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createOpportunity = async (req, res, next) => {
  try {
    const {
      title,
      companyId,
      externalApplicationUrl,
      type,
      workMode,
      department,
      field,
      duration,
      location,
      skills,
      seats,
      deadline,
      description,
      responsibilities,
      requirements,
      status,
    } = req.body;

    let selectedCompany;
    let applicationType;
    let normalizedExternalApplicationUrl;

    if (req.user.role === "company") {
      selectedCompany = await CompanyProfile.findOne({
        userId: req.user._id,
        isExternal: false,
      });

      applicationType = "internal";
    } else if (req.user.role === "supervisor") {
      if (!companyId) {
        return res.status(400).json({
          message: "An external company is required.",
        });
      }

      selectedCompany = await CompanyProfile.findOne({
        _id: companyId,
        isExternal: true,
      });

      applicationType = "external";

      if (
        typeof externalApplicationUrl !== "string" ||
        !externalApplicationUrl.trim()
      ) {
        return res.status(400).json({
          message:
            "External application URL is required for supervisor opportunities.",
        });
      }

      normalizedExternalApplicationUrl = externalApplicationUrl.trim();

      try {
        const parsedUrl = new URL(normalizedExternalApplicationUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid URL protocol.");
        }
      } catch {
        return res.status(400).json({
          message:
            "External application URL must be a valid HTTP or HTTPS URL.",
        });
      }
    }

    if (!selectedCompany) {
      return res.status(404).json({
        message:
          req.user.role === "supervisor"
            ? "External company profile not found."
            : "Company profile not found.",
      });
    }

    if (!selectedCompany.isActive) {
      return res.status(403).json({
        message: "Opportunities cannot be created for an inactive company.",
      });
    }

    const parsedDeadline = new Date(deadline);

    if (!deadline || Number.isNaN(parsedDeadline.getTime())) {
      return res.status(400).json({
        message: "A valid application deadline is required.",
      });
    }

    if (parsedDeadline <= new Date()) {
      return res.status(400).json({
        message: "Application deadline must be in the future.",
      });
    }

    const opportunity = await Opportunity.create({
      title,
      companyId: selectedCompany._id,
      createdBy: req.user._id,
      createdByRole: req.user.role,
      applicationType,
      externalApplicationUrl: normalizedExternalApplicationUrl,
      type: type?.toUpperCase(),
      workMode: workMode?.toLowerCase(),
      department,
      field,
      duration,
      location,
      skills,
      seats,
      deadline: parsedDeadline,
      description,
      responsibilities,
      requirements,
      status: status === "active" ? "active" : "draft",
    });

    await opportunity.populate(
      "companyId",
      "name logoUrl industry location isExternal"
    );

    const opportunityObject = opportunity.toObject();

    const daysLeft = Math.max(
      0,
      Math.ceil((parsedDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );

    return res.status(201).json({
      ...opportunityObject,
      id: opportunity._id,
      company: opportunity.companyId?.name,
      logo: opportunity.companyId?.logoUrl,
      daysLeft,
      applicants: await getApplicantCount(opportunity._id),
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      res.status(400);
    }

    next(error);
  }
};
export const getCompanyOpportunities = async (req, res, next) => {
  try {
    const company = await CompanyProfile.findOne({
      userId: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found.",
      });
    }

    const opportunities = await Opportunity.find({
      companyId: company._id,
    })
      .populate("companyId", "name logoUrl industry location")
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      opportunities.map(async (opportunity) => {
        const opportunityObject = opportunity.toObject();

        const deadlineTime = opportunity.deadline
          ? new Date(opportunity.deadline).getTime()
          : Number.NaN;

        const daysLeft = Number.isNaN(deadlineTime)
          ? null
          : Math.max(
              0,
              Math.ceil((deadlineTime - Date.now()) / (1000 * 60 * 60 * 24))
            );

        return {
          ...opportunityObject,
          id: opportunity._id,
          company: opportunity.companyId?.name,
          logo: opportunity.companyId?.logoUrl,
          daysLeft,
          applicants: await getApplicantCount(opportunity._id),
        };
      })
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findOne({
      _id: req.params.id,
      status: "active",
    }).populate(
      "companyId",
      "name logoUrl industry location description website"
    );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found.",
      });
    }

    const opportunityObject = opportunity.toObject();

    const deadlineTime = opportunity.deadline
      ? new Date(opportunity.deadline).getTime()
      : Number.NaN;

    const daysLeft = Number.isNaN(deadlineTime)
      ? null
      : Math.max(
          0,
          Math.ceil((deadlineTime - Date.now()) / (1000 * 60 * 60 * 24))
        );

    res.json({
      ...opportunityObject,
      id: opportunity._id,
      company: opportunity.companyId?.name,
      logo: opportunity.companyId?.logoUrl,
      daysLeft,
      applicants: await getApplicantCount(opportunity._id),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid opportunity ID.",
      });
    }

    next(error);
  }
};
export const getCompanyOpportunityById = async (req, res, next) => {
  try {
    const company = await CompanyProfile.findOne({
      userId: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found.",
      });
    }

    const opportunity = await Opportunity.findOne({
      _id: req.params.id,
      companyId: company._id,
    }).populate(
      "companyId",
      "name logoUrl industry location description website"
    );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found.",
      });
    }

    const opportunityObject = opportunity.toObject();

    const deadlineTime = opportunity.deadline
      ? new Date(opportunity.deadline).getTime()
      : Number.NaN;

    const daysLeft = Number.isNaN(deadlineTime)
      ? null
      : Math.max(
          0,
          Math.ceil((deadlineTime - Date.now()) / (1000 * 60 * 60 * 24))
        );

    res.json({
      ...opportunityObject,
      id: opportunity._id,
      company: opportunity.companyId?.name,
      logo: opportunity.companyId?.logoUrl,
      daysLeft,
      applicants: await getApplicantCount(opportunity._id),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid opportunity ID.",
      });
    }

    next(error);
  }
};

export const updateOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found.",
      });
    }

    let isAllowed = req.user.role === "admin";

    if (req.user.role === "company") {
      const company = await CompanyProfile.findOne({
        userId: req.user._id,
      });

      isAllowed =
        company && opportunity.companyId.toString() === company._id.toString();
    }

    if (req.user.role === "supervisor") {
      isAllowed = opportunity.createdBy?.toString() === req.user._id.toString();
    }

    if (!isAllowed) {
      return res.status(403).json({
        message: "You are not authorized to update this opportunity.",
      });
    }
    if (req.body.companyId !== undefined) {
      if (req.user.role !== "supervisor") {
        return res.status(403).json({
          message: "Only a supervisor can change the external company.",
        });
      }

      if (opportunity.applicationType !== "external") {
        return res.status(400).json({
          message:
            "The company can only be changed for external opportunities.",
        });
      }

      if (
        typeof req.body.companyId !== "string" ||
        !mongoose.isObjectIdOrHexString(req.body.companyId)
      ) {
        return res.status(400).json({
          message: "Invalid company ID.",
        });
      }

      const selectedCompany = await CompanyProfile.findOne({
        _id: req.body.companyId,
        isExternal: true,
        isActive: true,
      });

      if (!selectedCompany) {
        return res.status(404).json({
          message: "External company profile not found.",
        });
      }

      opportunity.companyId = selectedCompany._id;
    }

    const allowedFields = [
      "title",
      "type",
      "workMode",
      "department",
      "field",
      "duration",
      "location",
      "skills",
      "seats",
      "deadline",
      "description",
      "responsibilities",
      "requirements",
      "status",
    ];

    for (const fieldName of allowedFields) {
      if (req.body[fieldName] !== undefined) {
        opportunity[fieldName] = req.body[fieldName];
      }
    }

    if (req.body.type) {
      opportunity.type = req.body.type.toUpperCase();
    }

    if (req.body.workMode) {
      opportunity.workMode = req.body.workMode.toLowerCase();
    }

    if (req.body.deadline) {
      const parsedDeadline = new Date(req.body.deadline);

      if (
        Number.isNaN(parsedDeadline.getTime()) ||
        parsedDeadline <= new Date()
      ) {
        return res.status(400).json({
          message: "Application deadline must be a valid future date.",
        });
      }

      opportunity.deadline = parsedDeadline;
    }
    if (
      req.body.status &&
      !["draft", "active", "closed"].includes(req.body.status)
    ) {
      return res.status(400).json({
        message: "Invalid opportunity status.",
      });
    }

    if (opportunity.applicationType === "external") {
      if (req.body.externalApplicationUrl !== undefined) {
        if (
          typeof req.body.externalApplicationUrl !== "string" ||
          !req.body.externalApplicationUrl.trim()
        ) {
          return res.status(400).json({
            message: "External application URL is required.",
          });
        }

        const normalizedExternalApplicationUrl =
          req.body.externalApplicationUrl.trim();

        try {
          const parsedUrl = new URL(normalizedExternalApplicationUrl);

          if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            throw new Error("Invalid URL protocol.");
          }
        } catch {
          return res.status(400).json({
            message:
              "External application URL must be a valid HTTP or HTTPS URL.",
          });
        }

        opportunity.externalApplicationUrl = normalizedExternalApplicationUrl;
      }

      if (!opportunity.externalApplicationUrl) {
        return res.status(400).json({
          message: "External application URL is required.",
        });
      }
    } else if (req.body.externalApplicationUrl !== undefined) {
      return res.status(400).json({
        message:
          "Internal opportunities cannot have an external application URL.",
      });
    }

    await opportunity.save();
    await opportunity.populate("companyId", "name logoUrl industry location");

    const opportunityObject = opportunity.toObject();

    const deadlineTime = opportunity.deadline
      ? new Date(opportunity.deadline).getTime()
      : Number.NaN;

    const daysLeft = Number.isNaN(deadlineTime)
      ? null
      : Math.max(
          0,
          Math.ceil((deadlineTime - Date.now()) / (1000 * 60 * 60 * 24))
        );

    res.json({
      ...opportunityObject,
      id: opportunity._id,
      company: opportunity.companyId?.name,
      logo: opportunity.companyId?.logoUrl,
      daysLeft,
      applicants: await getApplicantCount(opportunity._id),
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      res.status(400);
    }

    next(error);
  }
};

export const deleteOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity || opportunity.status === "archived") {
      return res.status(404).json({
        message: "Opportunity not found.",
      });
    }

    let isAllowed = req.user.role === "admin";

    if (req.user.role === "company") {
      const company = await CompanyProfile.findOne({
        userId: req.user._id,
      });

      isAllowed =
        company && opportunity.companyId.toString() === company._id.toString();
    }

    if (req.user.role === "supervisor") {
      isAllowed = opportunity.createdBy?.toString() === req.user._id.toString();
    }

    if (!isAllowed) {
      return res.status(403).json({
        message: "You are not authorized to delete this opportunity.",
      });
    }

    opportunity.status = "archived";
    await opportunity.save();

    res.json({
      message: "Opportunity archived successfully.",
      id: opportunity._id,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid opportunity ID.",
      });
    }

    next(error);
  }
};
export const restoreOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity || opportunity.status !== "archived") {
      return res.status(404).json({
        message: "Archived opportunity not found.",
      });
    }

    let isAllowed = req.user.role === "admin";

    if (req.user.role === "company") {
      const company = await CompanyProfile.findOne({
        userId: req.user._id,
      });

      isAllowed =
        company && opportunity.companyId.toString() === company._id.toString();
    }

    if (req.user.role === "supervisor") {
      isAllowed = opportunity.createdBy?.toString() === req.user._id.toString();
    }

    if (!isAllowed) {
      return res.status(403).json({
        message: "You are not authorized to restore this opportunity.",
      });
    }

    opportunity.status = "draft";
    await opportunity.save();

    res.json({
      message: "Opportunity restored as draft successfully.",
      id: opportunity._id,
      status: opportunity.status,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid opportunity ID.",
      });
    }

    next(error);
  }
};
export const getSupervisorOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find({
      createdBy: req.user._id,
      createdByRole: "supervisor",
    })
      .populate("companyId", "name logoUrl industry location isExternal")
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      opportunities.map(async (opportunity) => {
        const opportunityObject = opportunity.toObject();

        const deadlineTime = opportunity.deadline
          ? new Date(opportunity.deadline).getTime()
          : Number.NaN;

        const daysLeft = Number.isNaN(deadlineTime)
          ? null
          : Math.max(
              0,
              Math.ceil((deadlineTime - Date.now()) / (1000 * 60 * 60 * 24))
            );

        return {
          ...opportunityObject,
          id: opportunity._id,
          company: opportunity.companyId?.name,
          logo: opportunity.companyId?.logoUrl,
          daysLeft,
          applicants:
            opportunity.applicationType === "internal"
              ? await getApplicantCount(opportunity._id)
              : 0,
        };
      })
    );

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getSupervisorOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
      createdByRole: "supervisor",
    }).populate(
      "companyId",
      "name logoUrl industry location description website isExternal"
    );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found.",
      });
    }

    const opportunityObject = opportunity.toObject();

    const deadlineTime = opportunity.deadline
      ? new Date(opportunity.deadline).getTime()
      : Number.NaN;

    const daysLeft = Number.isNaN(deadlineTime)
      ? null
      : Math.max(
          0,
          Math.ceil((deadlineTime - Date.now()) / (1000 * 60 * 60 * 24))
        );

    return res.json({
      ...opportunityObject,
      id: opportunity._id,
      company: opportunity.companyId?.name,
      logo: opportunity.companyId?.logoUrl,
      daysLeft,
      applicants:
        opportunity.applicationType === "internal"
          ? await getApplicantCount(opportunity._id)
          : 0,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid opportunity ID.",
      });
    }

    next(error);
  }
};
