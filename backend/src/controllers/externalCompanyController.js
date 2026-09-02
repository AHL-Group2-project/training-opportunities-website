import CompanyProfile from "../models/CompanyProfile.js";
import cloudinary from "../config/cloudinary.js";

const normalizeOptionalText = (value) =>
  typeof value === "string" ? value.trim() : "";

const isValidOptionalUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const removeUploadedLogo = async (file) => {
  if (!file?.filename) return;

  try {
    await cloudinary.uploader.destroy(file.filename, {
      resource_type: "image",
      invalidate: true,
    });
  } catch (cleanupError) {
    console.error(
      "Unable to remove uploaded company logo:",
      cleanupError.message
    );
  }
};

const rejectExternalCompany = async (req, res, status, message, extra = {}) => {
  await removeUploadedLogo(req.file);

  return res.status(status).json({
    message,
    ...extra,
  });
};

export const getExternalCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyProfile.find({
      isExternal: true,
      isActive: true,
    })
      .select(
        "_id name industry location website description logoUrl isExternal"
      )
      .sort({ name: 1 });

    return res.json(
      companies.map((company) => ({
        id: company._id,
        name: company.name,
        industry: company.industry || "",
        location: company.location || "",
        website: company.website || "",
        description: company.description || "",
        logo: company.logoUrl || "",
        isExternal: true,
      }))
    );
  } catch (error) {
    next(error);
  }
};

export const createExternalCompany = async (req, res, next) => {
  let companyCreated = false;

  try {
    const name = normalizeOptionalText(req.body.name);
    const industry = normalizeOptionalText(req.body.industry);
    const location = normalizeOptionalText(req.body.location);
    const website = normalizeOptionalText(req.body.website);
    const description = normalizeOptionalText(req.body.description);

    if (name.length < 2 || name.length > 120) {
      return rejectExternalCompany(
        req,
        res,
        400,
        "Company name must be between 2 and 120 characters."
      );
    }

    if (!industry || industry.length > 120) {
      return rejectExternalCompany(
        req,
        res,
        400,
        "A valid company industry is required."
      );
    }

    if (!location || location.length > 160) {
      return rejectExternalCompany(
        req,
        res,
        400,
        "A valid company location is required."
      );
    }

    if (description.length > 2000) {
      return rejectExternalCompany(
        req,
        res,
        400,
        "Company description must not exceed 2000 characters."
      );
    }

    if (!isValidOptionalUrl(website)) {
      return rejectExternalCompany(
        req,
        res,
        400,
        "Company website must be a valid HTTP or HTTPS URL."
      );
    }

    const existingCompany = await CompanyProfile.findOne({
      isExternal: true,
      name,
    }).collation({
      locale: "en",
      strength: 2,
    });

    if (existingCompany) {
      return rejectExternalCompany(
        req,
        res,
        409,
        "An external company with this name already exists.",
        {
          id: existingCompany._id,
        }
      );
    }

    const company = await CompanyProfile.create({
      isExternal: true,
      name,
      industry,
      location,
      website: website || "",
      description,
      logoUrl: req.file?.path || null,
      logoCloudinaryId: req.file?.filename || null,
      verified: false,
      isActive: true,
    });

    companyCreated = true;

    return res.status(201).json({
      message: "External company created successfully.",
      company: {
        id: company._id,
        name: company.name,
        industry: company.industry || "",
        location: company.location || "",
        website: company.website || "",
        description: company.description || "",
        logo: company.logoUrl || "",
        isExternal: true,
      },
    });
  } catch (error) {
    if (!companyCreated) {
      await removeUploadedLogo(req.file);
    }

    next(error);
  }
};
