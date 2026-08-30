import AdminProfile from "../models/AdminProfile.js";

const ADMIN_EDITABLE_FIELDS = ["name", "avatarUrl"];

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await AdminProfile.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const allowedUpdates = {};
    for (const field of ADMIN_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    }

    const profile = await AdminProfile.findOneAndUpdate(
      { userId: req.user._id },
      allowedUpdates,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};