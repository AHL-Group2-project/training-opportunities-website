import { Card, TextField, Typography } from "@mui/material";

interface Props {
  bio: string;
  onChange: (value: string) => void;
}

export default function ProfileEditBio({ bio, onChange }: Props) {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        About / Bio
      </Typography>
      <TextField
        multiline
        minRows={4}
        fullWidth
        value={bio}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell companies about yourself..."
      />
    </Card>
  );
}
