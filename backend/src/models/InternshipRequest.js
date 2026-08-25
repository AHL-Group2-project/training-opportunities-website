import mongoose from "mongoose";

const internshipRequestSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, default: null },
    companyId: { type: mongoose.Schema.Types.ObjectId, default: null },
    newCompanyName: { type: String, required: true },
    type: { type: String, enum: ["ft1", "ft2"], required: true },
    position: { type: String },
    department: { type: String },
    field: { type: String },
    workMode: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    expectedHours: { type: Number },
    description: { type: String },
    confirmed: { type: Boolean, default: false },
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: { type: String },
    supervisorFinalStatus: { type: String },
    supervisorFinalComment: { type: String },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
  },
  { timestamps: true, collection: "internshipRequests" }
);

const InternshipRequest = mongoose.model("InternshipRequest", internshipRequestSchema);
export default InternshipRequest;
