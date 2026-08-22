import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdByRole: {
      type: String,
      enum: ["company", "supervisor"],
      required: true,
    },
    type: {
      type: String,
      enum: ["FT1", "FT2"],
      required: true,
    },
    workMode: {
      type: String,
      enum: ["on-site", "remote", "hybrid"],
      required: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    field: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (skills) => skills.length > 0,
        message: "At least one skill is required.",
      },
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "closed", "archived"],
      default: "draft",
    },
  },
  { timestamps: true, collection: "opportunities" }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);
export default Opportunity;
