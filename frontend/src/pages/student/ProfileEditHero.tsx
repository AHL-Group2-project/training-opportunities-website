import { Card, Stack, TextField, Avatar, Button, Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import type { EditableProfileData } from "./StudentProfilePage";

interface Props {
  data: EditableProfileData;
  onChange: <K extends keyof EditableProfileData>(
    key: K,
    value: EditableProfileData[K],
  ) => void;
}

export default function ProfileEditHero({ data, onChange }: Props) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Avatar
          sx={{ width: 90, height: 90, bgcolor: "primary.main", fontSize: 34 }}
        >
          {data.name.slice(0, 2).toUpperCase()}
        </Avatar>

        <Button component="label" size="small" startIcon={<PhotoCameraIcon />}>
          Upload Avatar
          <input type="file" accept="image/*" hidden />
        </Button>

        {/* Cover photo upload removed per team decision - see task notes */}

        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              size="small"
              fullWidth
              value={data.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <TextField
              label="University"
              size="small"
              fullWidth
              value={data.university}
              onChange={(e) => onChange("university", e.target.value)}
            />
            <TextField
              label="Major"
              size="small"
              fullWidth
              value={data.major}
              onChange={(e) => onChange("major", e.target.value)}
            />
            <TextField
              label="Graduation Year"
              size="small"
              fullWidth
              value={data.graduationYear}
              onChange={(e) => onChange("graduationYear", e.target.value)}
            />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
