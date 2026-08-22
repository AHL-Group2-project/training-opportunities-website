import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Stack,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AvatarUpload from "../../../components/AvatarUpload";

export default function AdminProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "System Admin",
    email: "admin@system.com",
    role: "Administrator",
    avatar: "",
  });

  const handleChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
        <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, boxShadow: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" } as const}
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: "center", md: "flex-start" }}
            mb={4}
          >
            <Stack
              direction={{ xs: "column", md: "row" } as const}
              spacing={3}
              alignItems="center"
            >
              {isEditMode ? (
                <AvatarUpload
                  src={profileData.avatar}
                  size={120}
                  onFileSelect={(file) =>
                    handleChange("avatar", URL.createObjectURL(file))
                  }
                />
              ) : (
                <Box
                  component="img"
                  src={
                    profileData.avatar || "https://ui-avatars.com/api/?name=A"
                  }
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "4px solid white",
                    backgroundColor: "primary.main",
                    boxShadow: 2,
                  }}
                />
              )}
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {profileData.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  {profileData.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  Manage system settings, users, and roles.
                </Typography>
              </Box>
            </Stack>

            <Button
              size="small"
              variant={isEditMode ? "contained" : "outlined"}
              color={isEditMode ? "primary" : "inherit"}
              startIcon={isEditMode ? <SaveIcon /> : <EditIcon />}
              onClick={() => setIsEditMode(!isEditMode)}
              sx={{ borderRadius: 2 }}
            >
              {isEditMode ? "Save Changes" : "Edit Profile"}
            </Button>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
            Account Information
          </Typography>

          <Stack spacing={3}>
            <Stack direction={{ xs: "column", md: "row" } as const} spacing={3}>
              <TextField
                label="Full Name"
                value={profileData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={!isEditMode}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Email Address"
                value={profileData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled
                fullWidth
                variant="outlined"
              />
            </Stack>
            <TextField
              label="System Role"
              value={profileData.role}
              disabled
              fullWidth
              variant="outlined"
            />
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
