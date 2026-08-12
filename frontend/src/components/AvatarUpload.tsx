import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface AvatarUploadProps {
  /** Current avatar image URL */
  src?: string;
  /** Callback with the selected file (validated) */
  onFileSelect: (file: File) => void;
  /** Optional size in pixels (both width and height) */
  size?: number;
}

/**
 * AvatarUpload component displays a circular avatar and allows the user to upload a new image.
 * It validates file type (jpeg, png, webp) and size (max 5 MB) and shows a preview before
 * invoking the parent callback.
 */
const AvatarUpload: React.FC<AvatarUploadProps> = ({
  src,
  onFileSelect,
  size = 90,
}) => {
  const [preview, setPreview] = useState<string | undefined>(src);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validation: type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Only JPEG, PNG, WebP are allowed.");
      return;
    }
    // Validation: size (5 MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (file.size > maxSize) {
      alert("File is too large. Maximum size is 5 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelect(file);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Avatar
        src={preview}
        sx={{ width: size, height: size, bgcolor: "primary.main" }}
      >
        {preview ? "" : "U"}
      </Avatar>
      <Tooltip title="Upload avatar">
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": { backgroundColor: "background.paper" },
          }}
        >
          <PhotoCameraIcon fontSize="small" />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={handleChange}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AvatarUpload;
