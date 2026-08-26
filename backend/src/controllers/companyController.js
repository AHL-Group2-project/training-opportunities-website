import CompanyProfile from "../models/CompanyProfile.js";

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