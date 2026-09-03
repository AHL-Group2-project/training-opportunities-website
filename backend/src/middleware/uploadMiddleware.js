import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import path from "path";

const createUploader = (folderName, allowedFormats, resourceType = "auto") => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const baseParams = {
        folder: `training-opportunities/${folderName}`,
        resource_type: resourceType,
      };

      if (allowedFormats) {
        baseParams.allowed_formats = allowedFormats;
      }

      // Cloudinary strips extensions for raw files (like PDFs) unless explicitly set in public_id
      if (resourceType === "raw") {
        const ext = path.extname(file.originalname);
        const randomName = crypto.randomBytes(10).toString("hex");
        baseParams.public_id = `${randomName}${ext}`;
      }

      return baseParams;
    },
  });
  return multer({ storage: storage });
};

export const uploadProfileImage = createUploader(
  "profiles",
  ["jpg", "jpeg", "png", "webp"],
  "image"
);
export const uploadDocument = createUploader("documents", null, "raw");
export const uploadOpportunityImage = createUploader(
  "opportunities",
  ["jpg", "jpeg", "png", "webp"],
  "image"
);
