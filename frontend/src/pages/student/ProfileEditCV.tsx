import { Card, Typography, Stack, Button, Chip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  cvFileName: string | null;
  onChange: (value: string | null) => void;
}

export default function ProfileEditCV({ cvFileName, onChange }: Props) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files[0].name);
    }
  };

  const handleDelete = () => {
    onChange(null);
  };

  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        CV Upload
      </Typography>

      {cvFileName ? (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Chip label={cvFileName} />
          <Button
            component="label"
            size="small"

            startIcon={<UploadFileIcon />}
          >
            Replace
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
          >
            Delete
          </Button>
        </Stack>
      ) : (
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
        >
          Upload PDF
          <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
        </Button>
      )}
    </Card>
  );
}
