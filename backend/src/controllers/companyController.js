import CompanyProfile from "../models/CompanyProfile.js";

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
    // userId, verified, and isActive are admin-controlled — never editable
    // by the company itself, even if sent in the request body.
    const { userId, verified, isActive, ...allowedUpdates } = req.body;
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