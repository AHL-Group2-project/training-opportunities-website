import jwt from "jsonwebtoken";
import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import SupervisorProfile from "../models/SupervisorProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import { JWT_SECRET } from "../middleware/authMiddleware.js";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      if (!user.isActive) {
        return res.status(401).json({ message: "Account is disabled." });
      }

      let profileId = user._id;
      let companyId = undefined;
      let name = user.email; // Fallback

      if (user.role === "student") {
        const profile = await StudentProfile.findOne({ userId: user._id });
        if (profile) {
          profileId = profile._id;
          name = profile.name;
        }
      } else if (user.role === "supervisor") {
        const profile = await SupervisorProfile.findOne({ userId: user._id });
        if (profile) {
          profileId = profile._id;
          name = profile.name;
        }
      } else if (user.role === "company") {
        const profile = await CompanyProfile.findOne({ userId: user._id });
        if (profile) {
          profileId = profile._id;
          companyId = profile._id;
          name = profile.name;
        }
      }

      res.json({
        id: user._id,
        profileId,
        companyId,
        name: name,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!newPassword || newPassword.trim() === "") {
      return res.status(400).json({ message: "New password is required." });
    }

    if (!user.mustChangePassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Current password is required" });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid current password" });
      }
    }

    const isSameAsCurrent = await user.comparePassword(newPassword);
    if (isSameAsCurrent) {
      return res
        .status(400)
        .json({
          message:
            "Your new password must be different from your temporary password.",
        });
    }

    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
