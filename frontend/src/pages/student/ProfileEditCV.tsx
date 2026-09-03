import { Card, Typography, Stack, Button, Chip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../lib/axios";
import { useState } from "react";

interface Props {
  cvFileName: string | null;
  onChange: (value: string | null) => void;
}

export default function ProfileEditCV({ cvFileName, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      try {
        setUploading(true);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("document", file);
        
        const res = await api.post("/students/me/document", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        
        onChange(res.data.cvUrl);
      } catch (err: any) {
        console.error("Failed to upload document", err);
        const serverError = err.response?.data?.message || err.message;
        alert(`Failed to upload document. Error: ${serverError}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDelete = () => {
    onChange(null);
  };

  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        CV Upload
      </Typography>

      {cvFileName ? (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Chip label={cvFileName.split('/').pop() || "CV"} />
          <Button
            component="label"
            size="small"
            disabled={uploading}
            startIcon={<UploadFileIcon />}
          >
            {uploading ? "Uploading..." : "Replace"}
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={uploading}
          >
            Delete
          </Button>
        </Stack>
      ) : (
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload PDF"}
          <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
        </Button>
      )}
    </Card>
  );
}
