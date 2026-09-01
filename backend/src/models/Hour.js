import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
  location: { type: String, required: false },
  hours: { type: Number, required: true },
  description: { type: String, default: "" },
});

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
      required: false,
      default: null,
    },
    trainingType: {
      type: String, // FT1 or FT2
      required: true,
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    totalHours: {
      type: Number,
      required: true,
      default: 0
    },
    dailyLogs: [dailyLogSchema],
    companyStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    companyComment: {
      type: String,
      default: "",
    }
  },
  { timestamps: true, collection: "hours" }
);

const Hour = mongoose.model("Hour", hourSchema);
export default Hour;
