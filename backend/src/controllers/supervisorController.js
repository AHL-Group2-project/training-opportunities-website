import SupervisorProfile from "../models/SupervisorProfile.js";

const SUPERVISOR_EDITABLE_FIELDS = [
  "name",
  "phone",
  "officeHours",
  "avatarUrl",
];

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await SupervisorProfile.findOne({ userId: req.user._id });
    if (!profile)
      return res.status(404).json({ message: "Supervisor profile not found" });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const allowedUpdates = {};
    for (const field of SUPERVISOR_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    }

    const profile = await SupervisorProfile.findOneAndUpdate(
      { userId: req.user._id },
      allowedUpdates,
      { new: true, runValidators: true }
    );

    if (!profile)
      return res.status(404).json({ message: "Supervisor profile not found" });

    res.json(profile);
  } catch (error) {
    next(error);
  }
};