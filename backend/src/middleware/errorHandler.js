import fs from "fs";

const errorHandler = (err, req, res, next) => {
  console.error("ErrorHandler caught:", err);
  
  try {
    fs.appendFileSync("error_log.txt", err.stack + "\n");
  } catch (e) {
    console.error("Failed to write to error log:", e);
  }
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;