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
      required: true,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    logoUrl: {
      type: String,
      default: null,
    },
    logoCloudinaryId: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    contactEmail: {
      type: String,
    },
    phone: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "companies",
  }
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
