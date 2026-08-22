import mongoose from "mongoose";

const supervisorProfileSchema = new mongoose.Schema(
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
    department: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    university: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "supervisorProfiles" }
);

const SupervisorProfile = mongoose.model(
  "SupervisorProfile",
  supervisorProfileSchema
);
export default SupervisorProfile;
