import StudentProfile from "../models/StudentProfile.js";

const STUDENT_EDITABLE_FIELDS = [
  "name",
  "university",
  "major",
  "graduationYear",
  "about",
  "cvUrl",
  "avatarUrl",
  "contactEmail",
  "phone",
  "social",
  "isPublic",
  "skills",
  "experience",
  "projects",
  "certificates",
];

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
    const allowedUpdates = {};
    for (const field of STUDENT_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    }

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