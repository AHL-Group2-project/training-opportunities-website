import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { MOCK_USERS } from "../../mock/users";
import { useAuth } from "../../context/authContext";
import logo from "../../assets/images/logo.png";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!form.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    setServerError("");
    if (!validate()) return;

    setLoading(true);

    //TODO: Implement actual login logic here (API call)

    // Mock login
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.email === form.email && u.password === form.password,
      );

      if (!user) {
        setServerError("Invalid email or password.");
        setLoading(false);
        return;
      }

      login({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: "mock-token",
        companyId: user.companyId,
      });

      switch (user.role) {
        case "student":
          navigate("/dashboard");
          break;
        case "supervisor":
          navigate("/supervisor/dashboard");
          break;
        case "admin":
          navigate("/supervisor/dashboard");
          break;
        case "company":
          navigate("/company/dashboard");
          break;
        default:
          navigate("/");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 270px)",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "grey.200",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            p: { xs: 3, sm: 5 },
          }}
        >
          <Stack spacing={4}>
            {/* Logo */}
            <Stack sx={{ spacing: 1.5, alignItems: "center" }}>
              <Box
                component="img"
                src={logo}
                alt="Internship Hub"
                sx={{ height: 70, objectFit: "contain" }}
              />
              <Stack sx={{ spacing: 0.5, alignItems: "center" }}>
                <Typography
                  sx={{ variant: "h6", fontWeight: 700, color: "#1C2B4A" }}
                >
                  Welcome back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to your account
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: "grey.100" }} />

            {/* Form */}
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={form.email}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, email: e.target.value }));
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={!!errors.email}
                helperText={errors.email}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#4A90D9" },
                    "&.Mui-focused fieldset": { borderColor: "#1C2B4A" },
                  },
                  "& label.Mui-focused": { color: "#1C2B4A" },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={form.password}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, password: e.target.value }));
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                error={!!errors.password}
                helperText={errors.password}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#4A90D9" },
                    "&.Mui-focused fieldset": { borderColor: "#1C2B4A" },
                  },
                  "& label.Mui-focused": { color: "#1C2B4A" },
                }}
              />

              {serverError && (
                <Typography variant="caption" sx={{ color: "error.main" }}>
                  {serverError}
                </Typography>
              )}

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  bgcolor: "#1C2B4A",
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#2a3f6b" },
                  "&.Mui-disabled": {
                    bgcolor: "grey.300",
                    color: "grey.500",
                  },
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Button
                variant="text"
                fullWidth
                onClick={() => navigate("/")}
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  fontSize: 13,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#1C2B4A",
                  },
                }}
              >
                ← Back to home
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
