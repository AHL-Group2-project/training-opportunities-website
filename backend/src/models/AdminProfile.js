import mongoose from "mongoose";
const adminProfileSchema = new mongoose.Schema(
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
    avatarUrl: {
      type: String,
      trim: true,
      default: null,
    },
    systemRole: {
      type: String,
      trim: true,
      default: "System Administrator",
    },
    university: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, collection: "adminProfiles" }
);
const AdminProfile = mongoose.model("AdminProfile", adminProfileSchema);
export default AdminProfile;