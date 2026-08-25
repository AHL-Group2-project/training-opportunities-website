import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    industry: { type: String, required: true },
    location: { type: String },
    website: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    logoUrl: { type: String, default: null },
    description: { type: String, default: "" },
    contactEmail: { type: String },
    phone: { type: String },
    // Admin-controlled — not editable by the company itself
    verified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "companies" }
);

const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);
export default CompanyProfile;