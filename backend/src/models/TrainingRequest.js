import mongoose from "mongoose";

const trainingRequestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupervisorProfile",
      required: true,
    },
    type: {
      type: String,
      enum: ["ft1", "ft2"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    companyName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    field: {
      type: String,
    },
    workMode: {
      type: String,
      enum: ["on-site", "remote", "hybrid"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    expectedHours: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    attachments: [
      {
        type: String, // Array of file names or URLs
      },
    ],
  },
  { timestamps: true, collection: "trainingRequests" }
);

const TrainingRequest = mongoose.model(
  "TrainingRequest",
  trainingRequestSchema
);
export default TrainingRequest;
