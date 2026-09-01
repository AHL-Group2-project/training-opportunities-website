import { Card, Stack, TextField, Box } from "@mui/material";
import AvatarUpload from "../../components/AvatarUpload";
import type { EditableProfileData } from "./StudentProfilePage";
import api from "../../lib/axios";
import { useAuth } from "../../context/authContext";

interface Props {
  data: EditableProfileData;
  onChange: <K extends keyof EditableProfileData>(
    key: K,
    value: EditableProfileData[K],
  ) => void;
}

export default function ProfileEditHero({ data, onChange }: Props) {
  const { user, updateUser } = useAuth();

  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <AvatarUpload
          src={data.avatar}
          size={90}
          onFileSelect={async (file) => {
            try {
              const formData = new FormData();
              formData.append("avatar", file);
              
              const res = await api.post("/students/me/avatar", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
              onChange("avatar", res.data.avatarUrl);
              if (user) {
                updateUser({ ...user, avatarUrl: res.data.avatarUrl });
              }
            } catch (err) {
              console.error("Failed to upload avatar", err);
              alert("Failed to upload avatar.");
            }
          }}
        />

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
            <TextField
              label="Contact Email"
              size="small"
              fullWidth
              value={data.contactEmail}
              onChange={(e) => onChange("contactEmail", e.target.value)}
            />
            <TextField
              label="Phone Number"
              size="small"
              fullWidth
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}