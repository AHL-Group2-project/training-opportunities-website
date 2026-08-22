import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getStudentProfile,
  submitTrainingRequest,
} from "../controllers/studentController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("student"));

router.get("/profile", getStudentProfile);
router.post("/requests", submitTrainingRequest);

export default router;
