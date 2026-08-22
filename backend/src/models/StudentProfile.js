import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    universityId: {
      type: String,
      required: true,
      unique: true,
    },
    major: {
      type: String,
      required: true,
    },
    gpa: {
      type: Number,
      default: 0,
    },
    year: {
      type: Number,
      default: 3,
    },
    avatar: {
      type: String,
    },
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    university: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "studentProfiles" }
);

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);
export default StudentProfile;
