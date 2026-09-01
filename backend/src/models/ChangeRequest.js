import mongoose from "mongoose";

const changeRequestSchema = new mongoose.Schema(
  {
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupervisorProfile",
      required: true,
    },
    field: {
      type: String,
      enum: ["university", "department"],
      required: true,
    },
    currentValue: {
      type: String,
      required: true,
    },
    requestedValue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminProfile",
    },
    reviewNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const ChangeRequest = mongoose.model("ChangeRequest", changeRequestSchema);
export default ChangeRequest;