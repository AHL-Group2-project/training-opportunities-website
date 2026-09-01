import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getPublicCompanies,
  getPublicCompanyById,
  uploadCompanyLogo,
  getMyActiveInterns,
  getInternHours,
  reviewHours,
  getInternTrainingState,
} from "../controllers/companyController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { uploadProfileImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public route must be placed before protect middleware
router.get("/public", getPublicCompanies);
router.get("/public/:id", getPublicCompanyById);

router.get("/me/profile", protect, authorize("company"), getMyProfile);
router.patch("/me/profile", protect, authorize("company"), updateMyProfile);
router.post("/me/logo", protect, authorize("company"), uploadProfileImage.single("logo"), uploadCompanyLogo);

// Intern management routes (company-authenticated)
router.get("/me/interns", protect, authorize("company"), getMyActiveInterns);
router.get("/me/interns/:studentId/hours", protect, authorize("company"), getInternHours);
router.get("/me/interns/:studentId/training-state", protect, authorize("company"), getInternTrainingState);
router.patch("/me/hours/:hourId", protect, authorize("company"), reviewHours);

export default router;