import { useState, useEffect } from "react";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BusinessIcon from "@mui/icons-material/Business";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 3;

function getLoginAttempts(): { count: number; lockedUntil: number | null } {
  const data = localStorage.getItem("login_attempts");
  return data ? JSON.parse(data) : { count: 0, lockedUntil: null };
}

function setLoginAttempts(count: number, lockedUntil: number | null) {
  localStorage.setItem(
    "login_attempts",
    JSON.stringify({ count, lockedUntil }),
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const attempts = getLoginAttempts();
      if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
        setLockoutRemaining(
          Math.ceil((attempts.lockedUntil - Date.now()) / 1000),
        );
      } else {
        setLockoutRemaining(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLocked = lockoutRemaining > 0;

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
    if (isLocked) {
      const mins = Math.ceil(lockoutRemaining / 60);
      setServerError(`Too many attempts. Try again in ${mins} minute(s).`);
      return;
    }

    if (!validate()) return;

    setLoading(true);

    //TODO: Implement actual login logic here (API call)

    // Mock login
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.email === form.email && u.password === form.password,
      );

      if (!user) {
        const freshAttempts = getLoginAttempts();

        // If somehow already locked (edge case), don't increment
        if (
          freshAttempts.lockedUntil &&
          Date.now() < freshAttempts.lockedUntil
        ) {
          const mins = Math.ceil(
            (freshAttempts.lockedUntil - Date.now()) / 60000,
          );
          setServerError(`Too many attempts. Try again in ${mins} minute(s).`);
          setLoading(false);
          return;
        }

        const newCount = freshAttempts.count + 1;

        if (newCount >= MAX_ATTEMPTS) {
          const lockedUntil = Date.now() + LOCKOUT_MINUTES * 60000;
          setLoginAttempts(0, lockedUntil);
          setLockoutRemaining(LOCKOUT_MINUTES * 60);
          setServerError(
            `Too many failed attempts. Account locked for ${LOCKOUT_MINUTES} minutes.`,
          );
        } else {
          setLoginAttempts(newCount, null);
          setServerError(
            `Invalid email or password. ${MAX_ATTEMPTS - newCount} attempts remaining.`,
          );
        }

        setLoading(false);
        return;
      }

      setLoginAttempts(0, null);
      setLockoutRemaining(0);

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
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "supervisor":
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
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
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
                  sx={{ variant: "h6", fontWeight: 700, color: "text.primary" }}
                >
                  Welcome back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to your account
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: "divider" }} />

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
                  },
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
                  },
                }}
              />

              {serverError && (
                <Typography variant="caption" sx={{ color: "error.main" }}>
                  {serverError}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
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
                    color: "text.primary",
                  },
                }}
              >
                ← Back to home
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Card
          sx={{
            mt: 3,
            borderRadius: 2,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <CardContent
            sx={{ display: "flex", alignItems: "center", gap: 2, py: 2.5 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BusinessIcon
                sx={{ color: "primary.contrastText", fontSize: 22 }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                Are you a company?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact us on this email:{" "}
                <Box
                  component="span"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  admin@university.edu.ps
                </Box>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default LoginPage;
