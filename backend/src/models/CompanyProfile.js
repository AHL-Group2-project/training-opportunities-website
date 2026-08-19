import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
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
    industry: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    phone: {
      type: String,
    },
    logo: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    activationStatus: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true, collection: "companies" }
);

const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);
export default CompanyProfile;
