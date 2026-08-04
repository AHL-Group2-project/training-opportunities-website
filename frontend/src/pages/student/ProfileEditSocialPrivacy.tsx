import {
  Card,
  Typography,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import type { SocialLinks } from "./StudentProfilePage";

interface Props {
  social: SocialLinks;
  isPublic: boolean;
  onSocialChange: (value: SocialLinks) => void;
  onPrivacyChange: (value: boolean) => void;
}

export default function ProfileEditSocialPrivacy({
  social,
  isPublic,
  onSocialChange,
  onPrivacyChange,
}: Props) {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Social Links
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="LinkedIn"
          size="small"
          fullWidth
          value={social.linkedin}
          onChange={(e) =>
            onSocialChange({ ...social, linkedin: e.target.value })
          }
        />
        <TextField
          label="GitHub"
          size="small"
          fullWidth
          value={social.github}
          onChange={(e) =>
            onSocialChange({ ...social, github: e.target.value })
          }
        />
        <TextField
          label="Portfolio Website"
          size="small"
          fullWidth
          value={social.portfolio}
          onChange={(e) =>
            onSocialChange({ ...social, portfolio: e.target.value })
          }
        />
      </Stack>

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Privacy
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isPublic}
              onChange={(e) => onPrivacyChange(e.target.checked)}
            />
          }
          label={isPublic ? "Profile is Public" : "Profile is Private"}
        />
      </Box>
    </Card>
  );
}
