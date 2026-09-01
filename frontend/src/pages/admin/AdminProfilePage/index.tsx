import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Stack,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AvatarUpload from "../../../components/AvatarUpload";
import api from "../../../lib/axios";
import { useAuth } from "../../../context/authContext";

interface AdminProfileData {
  name: string;
  university: string;
  avatarUrl: string | null;
}

export default function AdminProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [profileData, setProfileData] = useState<AdminProfileData>({
    name: "",
    university: "",
    avatarUrl: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/admin/me/profile");
        setProfileData({
          name: res.data.name || "",
          university: res.data.university || "",
          avatarUrl: res.data.avatarUrl || null,
        });
      } catch (err) {
        console.error("Failed to fetch admin profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      await api.patch("/admin/me/profile", {
        name: profileData.name,
      });
      setIsEditMode(false);
      
      if (user) {
        updateUser({ ...user, name: profileData.name });
      }
    } catch (err) {
      console.error("Failed to update admin profile:", err);
      setError("Failed to save profile changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, boxShadow: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ justifyContent: "space-between", alignItems: { xs: "center", md: "flex-start" }, mb: 4 }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ alignItems: "center" }}
            >
              {isEditMode ? (
                <AvatarUpload
                  src={profileData.avatarUrl ?? ""}
                  size={120}
                  onFileSelect={async (file) => {
                    try {
                      setIsSaving(true);
                      const formData = new FormData();
                      formData.append("avatar", file);
                      const res = await api.post("/admin/me/avatar", formData, {
                        headers: { "Content-Type": undefined }
                      });
                      handleChange("avatarUrl", res.data.avatarUrl);
                      if (user) {
                        updateUser({ ...user, avatarUrl: res.data.avatarUrl });
                      }
                    } catch (err) {
                      console.error("Failed to upload avatar:", err);
                      setError("Failed to upload avatar. Please try again.");
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={
                    profileData.avatarUrl || "https://ui-avatars.com/api/?name=Admin"
                  }
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "4px solid white",
                    backgroundColor: "primary.main",
                    boxShadow: 2,
                    objectFit: "cover",
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
                  Administrator
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
              startIcon={
                isSaving ? <CircularProgress size={16} color="inherit" /> :
                isEditMode ? <SaveIcon /> : <EditIcon />
              }
              disabled={isSaving}
              onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
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
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                value={user?.email || ""}
                disabled
                fullWidth
                variant="outlined"
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <TextField
                label="University"
                value={profileData.university}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="System Role"
                value="Administrator"
                disabled
                fullWidth
                variant="outlined"
              />
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
