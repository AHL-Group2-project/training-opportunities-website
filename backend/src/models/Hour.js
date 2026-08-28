import mongoose from "mongoose";

const hourSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    internshipRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InternshipRequest",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
      required: true,
    },
    trainingType: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    companyComment: {
      type: String,
      default: "",
    },
    finalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    finalReviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Can be supervisor or admin
    },
  },
  { timestamps: true, collection: "hours" }
);

const Hour = mongoose.model("Hour", hourSchema);
export default Hour;
