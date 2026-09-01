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

interface SupervisorProfileData {
  name: string;
  university: string;
  department: string;
  phone: string;
  officeHours: string;
  avatarUrl: string | null;
}

import { useAuth } from "../../../context/authContext";

const EMPTY_PROFILE: SupervisorProfileData = {
  name: "",
  university: "",
  department: "",
  phone: "",
  officeHours: "",
  avatarUrl: null,
};

export default function SupervisorProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] =
    useState<SupervisorProfileData>(EMPTY_PROFILE);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get<SupervisorProfileData>(
          "/supervisors/me/profile",
        );
        if (isMounted) {
          setProfileData(response.data);
        }
      } catch (err) {
        console.error("Failed to load supervisor profile:", err);
        if (isMounted) {
          setError("Failed to load profile data. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field: keyof SupervisorProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      // university is admin-managed and always sent read-only from this form
      const { name, department, phone, officeHours } = profileData;
      const response = await api.patch<SupervisorProfileData>(
        "/supervisors/me/profile",
        { name, department, phone, officeHours },
      );
      setProfileData(response.data);
      setIsEditMode(false);
    } catch (err) {
      console.error("Failed to save supervisor profile:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 6, display: "flex", justifyContent: "center" }}
      >
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
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "flex-start" },
              mb: 4,
            }}
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
                      const res = await api.post("/supervisors/me/avatar", formData, {
                        headers: {
                          "Content-Type": undefined
                        }
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
                    profileData.avatarUrl ||
                    "https://ui-avatars.com/api/?name=S"
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
                <Typography variant="h4" sx={{ fontWeight: "800" }}>
                  {profileData.name}
                </Typography>
                <Typography
                  variant="subtitle1" sx={{ color: "primary.main", fontWeight: "600" }}>
                  {profileData.department}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                  Guiding students towards their full potential.
                </Typography>
              </Box>
            </Stack>

            <Button
              size="small"
              variant={isEditMode ? "contained" : "outlined"}
              color={isEditMode ? "primary" : "inherit"}
              startIcon={
                isSaving ? (
                  <CircularProgress size={16} color="inherit" />
                ) : isEditMode ? (
                  <SaveIcon />
                ) : (
                  <EditIcon />
                )
              }
              disabled={isSaving}
              onClick={() => (isEditMode ? handleSave() : setIsEditMode(true))}
              sx={{ borderRadius: 2 }}
            >
              {isEditMode ? "Save Changes" : "Edit Profile"}
            </Button>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
            Personal Information
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
                label="Department"
                value={profileData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                disabled={!isEditMode}
                fullWidth
                variant="outlined"
              />
            </Stack>

            {/* University is always read-only — assigned by the admin */}
            <TextField
              label="University"
              value={profileData.university}
              disabled
              fullWidth
              variant="outlined"
              helperText="Your university affiliation is managed by your admin."
            />

            <Stack direction={{ xs: "column", md: "row" } as const} spacing={3}>
              <TextField
                label="Phone Number"
                value={profileData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={!isEditMode}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Office Hours"
                value={profileData.officeHours}
                onChange={(e) => handleChange("officeHours", e.target.value)}
                disabled={!isEditMode}
                fullWidth
                variant="outlined"
                placeholder="e.g. Sun/Mon 14:00-16:00"
              />
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}