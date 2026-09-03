import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  IconButton,
  Badge,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export interface ProfileField {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface DynamicProfileFormProps {
  avatar: string;
  name: string;
  subtitle: string;
  fields: ProfileField[];
  onAvatarChange: (file: File) => void;
  onFieldChange: (id: string, value: string) => void;
  onSave: () => void;
  children?: React.ReactNode;
}

export default function DynamicProfileForm({
  avatar,
  name,
  subtitle,
  fields,
  onAvatarChange,
  onFieldChange,
  onSave,
  children,
}: DynamicProfileFormProps) {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 800, mx: "auto" }}>
      {/* Header Info */}
      <Stack direction="row" spacing={3} sx={{ alignItems: "center", mb: 6 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton
              component="label"
              sx={{
                bgcolor: "#ff7043",
                color: "white",
                "&:hover": { bgcolor: "#f4511e" },
                width: 32,
                height: 32,
              }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onAvatarChange(e.target.files[0]);
                  }
                }}
              />
            </IconButton>
          }
        >
          <Box
            component="img"
            src={
              avatar ||
              `https://ui-avatars.com/api/?name=${name}&background=random`
            }
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: 2,
            }}
          />
        </Badge>

        <Box>
          <Typography variant="h5" color="text.primary" sx={{ fontWeight: "600" }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </Stack>

      {/* Grid of Fields */}
      <Grid container spacing={4}>
        {fields.map((field) => (
          <Grid size={{ xs: 12, sm: 6 }} key={field.id}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1, fontWeight: 500 }}
            >
              {field.label}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={field.value}
              onChange={(e) => onFieldChange(field.id, e.target.value)}
              disabled={field.disabled}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fcfcfc",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "#f0f0f0",
                  },
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {children && <Box sx={{ mt: 4 }}>{children}</Box>}

      {/* Save Button */}
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={onSave}
          sx={{
            bgcolor: "#ff7043",
            "&:hover": { bgcolor: "#f4511e" },
            borderRadius: 8,
            px: 6,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: "0 4px 14px 0 rgba(255, 112, 67, 0.39)",
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
