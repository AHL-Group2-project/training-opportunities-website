import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      default: "",
      maxlength: 5000,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
      maxlength: 30,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "applications",
  }
);

// Prevent duplicate applications to the same opportunity.
applicationSchema.index({ studentId: 1, opportunityId: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
