import express from "express";
import {
  createApplication,
  getMyApplications,
  getCompanyApplications,
} from "../controllers/applicationController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { uploadDocument } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  authorize("student"),
  uploadDocument.single("cv"),
  createApplication,
);

router.get("/me", authorize("student"), getMyApplications);

router.get("/company", authorize("company"), getCompanyApplications);

export default router;