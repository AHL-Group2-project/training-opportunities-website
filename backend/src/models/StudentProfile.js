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
    university: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: String, 
    },
    graduationYear: {
      type: String,
    },
    about: {
      type: String,
      default: "",
    },
    cvUrl: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    avatarCloudinaryId: {
      type: String,
      default: null,
    },
    contactEmail: {
      type: String,
    },
    phone: {
      type: String,
    },
    social: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: [
        {
          title: String,
          year: String,
          description: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          technologies: String,
          githubLink: { type: String, default: null },
          liveDemoLink: { type: String, default: null },
        },
      ],
      default: [],
    },
    certificates: {
      type: [
        {
          title: String,
          issuer: String,
          date: String,
          url: String,
        },
      ],
      default: [],
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
