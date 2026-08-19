import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Alert,
  LinearProgress,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import api from "../../lib/axios";

function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f97316" },
    { label: "Good", color: "#eab308" },
    { label: "Strong", color: "#22c55e" },
    { label: "Very Strong", color: "#16a34a" },
  ];
  return { score, ...levels[score] };
}

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isForced = user?.mustChangePassword === true;
  const strength = getPasswordStrength(newPassword);

  const getRoleHome = () => {
    switch (user?.role) {
      case "supervisor":
        return "/supervisor/dashboard";
      case "admin":
        return "/admin/dashboard";
      case "company":
        return "/company/dashboard";
      default:
        return "/dashboard";
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (!isForced && !currentPassword) {
      setError("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError("Password must contain at least one number.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/change-password", {
        currentPassword: isForced ? undefined : currentPassword,
        newPassword,
      });

      if (user) {
        login({ ...user, mustChangePassword: false });
      }

      setSuccess(true);
      setTimeout(() => navigate(getRoleHome()), 2000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to change password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        {success ? (
          <Card sx={{ borderRadius: 3, textAlign: "center", p: 4 }}>
            <CheckCircleOutlinedIcon
              sx={{ fontSize: 64, color: "#22c55e", mb: 2 }}
            />
            <Typography sx={{ variant: "h5", fontWeight: 700, mb: 1 }}>
              Password Changed!
            </Typography>
            <Typography color="text.secondary">
              Redirecting you to your dashboard...
            </Typography>
          </Card>
        ) : (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack sx={{ spacing: 0.5, alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                  }}
                >
                  <LockResetIcon sx={{ color: "white", fontSize: 28 }} />
                </Box>
                <Typography sx={{ variant: "h5", fontWeight: 700 }}>
                  {isForced ? "Set Your New Password" : "Change Password"}
                </Typography>
                <Typography
                  sx={{ variant: "body2", color: "text.secondary", textAlign: "center" }}
                >
                  {isForced
                    ? "This is your first login. Please set a secure password before continuing."
                    : "Choose a strong password to keep your account secure."}
                </Typography>
              </Stack>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
                  {error}
                </Alert>
              )}

              <Stack spacing={2.5}>
                {/* Only show current password if not a forced first-login change */}
                {!isForced && (
                  <TextField
                    label="Current Password"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowCurrent(!showCurrent)}
                              edge="end"
                              size="small"
                            >
                              {showCurrent ? (
                                <VisibilityOffIcon fontSize="small" />
                              ) : (
                                <VisibilityIcon fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}

                <Box>
                  <TextField
                    label="New Password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    helperText="At least 8 characters, one uppercase, one number."
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowNew(!showNew)}
                              edge="end"
                              size="small"
                            >
                              {showNew ? (
                                <VisibilityOffIcon fontSize="small" />
                              ) : (
                                <VisibilityIcon fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {newPassword && (
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(strength.score / 4) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: strength.color,
                            borderRadius: 3,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: strength.color, fontWeight: 600 }}
                      >
                        {strength.label}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <TextField
                  label="Confirm New Password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  error={!!confirmPassword && confirmPassword !== newPassword}
                  helperText={
                    confirmPassword && confirmPassword !== newPassword
                      ? "Passwords do not match"
                      : ""
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirm(!showConfirm)}
                            edge="end"
                            size="small"
                          >
                            {showConfirm ? (
                              <VisibilityOffIcon fontSize="small" />
                            ) : (
                              <VisibilityIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    fontWeight: 700,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </Button>

                {/* Allow skipping only if NOT a forced change */}
                {!isForced && (
                  <Button
                    variant="text"
                    fullWidth
                    onClick={() => navigate(getRoleHome())}
                    sx={{ color: "text.secondary", textTransform: "none" }}
                  >
                    Cancel
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}
