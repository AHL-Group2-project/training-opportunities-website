import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createStudent,
  createSupervisor,
  createCompany,
  getStudents,
  getSupervisors,
  getCompanies,
  assignSupervisorToStudent,
} from "../controllers/adminController.js";

const router = express.Router();

// All routes in this file require the user to be logged in and be an Admin
router.use(protect);
router.use(authorize("admin"));

// User creation routes
router.post("/users/student", createStudent);
router.post("/users/supervisor", createSupervisor);
router.post("/users/company", createCompany);

// User listing routes
router.get("/students", getStudents);
router.get("/supervisors", getSupervisors);
router.get("/companies", getCompanies);

// Assignment routes
router.put("/students/:id/assign-supervisor", assignSupervisorToStudent);

export default router;
