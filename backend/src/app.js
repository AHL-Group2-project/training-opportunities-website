import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";
import supervisorRequestsRoutes from "./routes/supervisorRequestsRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import companyRoutes from "./routes/companyRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/supervisors", supervisorRoutes);
app.use("/api/supervisors", supervisorRequestsRoutes);
app.use("/api/companies", companyRoutes);
app.use(errorHandler);

export default app;