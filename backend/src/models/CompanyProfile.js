import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    isExternal: {
      type: Boolean,
      default: false,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required() {
        return !this.isExternal;
      },
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

companyProfileSchema.index(
  { userId: 1 },
  {
    name: "userId_unique_when_present",
    unique: true,
    partialFilterExpression: {
      userId: { $type: "objectId" },
    },
  }
);

companyProfileSchema.pre("validate", function () {
  if (this.isExternal && this.userId) {
    this.invalidate(
      "userId",
      "An external company cannot be linked to a user account."
    );
  }
});
const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);

export default CompanyProfile;
