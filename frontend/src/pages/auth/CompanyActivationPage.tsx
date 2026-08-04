import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function CompanyActivationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleActivate = () => {
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: POST /api/auth/activate
    // { token, password }
    console.log("Activate account with token:", token, "Password:", password);
    setSuccess(true);
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error">Invalid or expired activation link.</Alert>
      </Container>
    );
  }

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#059669", mb: 2 }}
        >
          Account Activated!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your company account is now active. You can sign in.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card
        variant="outlined"
        sx={{ borderRadius: 3, borderColor: "grey.200" }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                bgcolor: "#1C2B4A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <LockOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1C2B4A" }}>
              Activate Your Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Set a password to complete your company registration
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              helperText="At least 6 characters"
            />
            <TextField
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleActivate}
              sx={{
                bgcolor: "#1C2B4A",
                textTransform: "none",
                py: 1.2,
                "&:hover": { bgcolor: "#2a3f6b" },
              }}
            >
              Activate Account
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CompanyActivationPage;
