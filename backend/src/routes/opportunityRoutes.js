import express from "express";
import {
  getOpportunities,
  createOpportunity,
  getCompanyOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} from "../controllers/opportunityController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getOpportunities);

router.post(
  "/",
  protect,
  authorize("company", "supervisor"),
  createOpportunity
);

router.get(
  "/company/me",
  protect,
  authorize("company"),
  getCompanyOpportunities
);

router.get("/:id", getOpportunityById);

router.put(
  "/:id",
  protect,
  authorize("company", "supervisor", "admin"),
  updateOpportunity
);
router.delete(
  "/:id",
  protect,
  authorize("company", "supervisor", "admin"),
  deleteOpportunity
);
export default router;
