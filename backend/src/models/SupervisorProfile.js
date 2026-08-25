import mongoose from "mongoose";

const supervisorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    university: { type: String, required: true },
    department: { type: String, required: true },
    phone: { type: String },
    officeHours: { type: String, default: "" },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true, collection: "supervisorProfiles" }
);

const SupervisorProfile = mongoose.model(
  "SupervisorProfile",
  supervisorProfileSchema
);
export default SupervisorProfile;