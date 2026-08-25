import StudentProfile from "../models/StudentProfile.js";

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {

    const { userId, studentId, ...allowedUpdates } = req.body;

    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      allowedUpdates,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};