import mongoose from "mongoose";

const hoursLogSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingRequest",
      required: true,
    },
    phase: {
      type: String,
      enum: ["ft1", "ft2"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true, collection: "hoursLogs" }
);

hoursLogSchema.index({ studentId: 1, phase: 1 });

const HoursLog = mongoose.model("HoursLog", hoursLogSchema);
export default HoursLog;