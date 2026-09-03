import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import externalCompanyRoutes from "./routes/externalCompanyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";
import supervisorRequestsRoutes from "./routes/supervisorRequestsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import rateLimit from "express-rate-limit";
import changeRequestRoutes from "./routes/changeRequestRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors());
app.use(express.json());
app.use("/api", apiLimiter); // Apply rate limiter to all API routes

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/opportunities", opportunityRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/external-companies", externalCompanyRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/supervisors", supervisorRoutes);
app.use("/api/supervisors", supervisorRequestsRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/change-requests", changeRequestRoutes);

app.use(errorHandler);

export default app;
