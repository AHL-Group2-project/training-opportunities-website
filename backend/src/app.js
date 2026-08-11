import express from "express";
import cors from "cors";
import path from "path";
import healthRoutes from "./routes/healthRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/health", healthRoutes);
app.use(errorHandler);
export default app;
