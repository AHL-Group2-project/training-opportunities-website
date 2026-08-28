import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getPublicCompanies,
  getPublicCompanyById
} from "../controllers/companyController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route must be placed before protect middleware
router.get("/public", getPublicCompanies);
router.get("/public/:id", getPublicCompanyById);

router.get("/me/profile", protect, authorize("company"), getMyProfile);
router.patch("/me/profile", protect, authorize("company"), updateMyProfile);

export default router;