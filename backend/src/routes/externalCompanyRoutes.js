import express from "express";
import {
  createExternalCompany,
  getExternalCompanies,
} from "../controllers/externalCompanyController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { uploadProfileImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("supervisor"));

router.get("/", getExternalCompanies);

router.post("/", uploadProfileImage.single("logo"), createExternalCompany);

export default router;
