import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../lib/axios";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type ApplicationStatus = "pending" | "accepted" | "rejected";

interface StudentApplication {
  id: string;
  opportunityId: string | null;
  position: string;
  company: string;
  status: ApplicationStatus;
  appliedAt: string;
  coverLetter: string;
}

const STATUS_CONFIG = {
  pending: {
    label: "Submitted",
    color: "info.main",
    background: "rgba(59, 130, 246, 0.1)",
  },
  accepted: {
    label: "Accepted",
    color: "success.main",
    background: "rgba(16, 185, 129, 0.1)",
  },
  rejected: {
    label: "Rejected",
    color: "error.main",
    background: "rgba(239, 68, 68, 0.1)",
  },
};

function ApplicationsPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await api.get<StudentApplication[]>("/applications/me");

        if (isMounted) {
          setApplications(response.data);
        }
      } catch (err) {
        if (!isMounted) return;

        const message = axios.isAxiosError<{ message?: string }>(err)
          ? err.response?.data?.message
          : undefined;

        setError(
          typeof message === "string"
            ? message
            : "Unable to load your applications. Please try again.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "transparent" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
        >
          My Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Track all the internship opportunities you've applied to
        </Typography>

        {/* How it works */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 2,
            borderColor: "info.main",
            bgcolor: "rgba(59, 130, 246, 0.1)",
            boxShadow: "none",
          }}
        >
          <CardContent
            sx={{ display: "flex", gap: 2, alignItems: "flex-start", py: 2 }}
          >
            <InfoOutlinedIcon
              sx={{ color: "info.main", fontSize: 24, mt: 0.3, flexShrink: 0 }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
              >
                How it works
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                Track your applications here. To start your internship, submit a{" "}
                <Button
                  size="small"
                  onClick={() => navigate("/training/request")}
                  sx={{
                    textTransform: "none",
                    p: 0,
                    minWidth: 0,
                    color: "info.main",
                    fontWeight: 600,
                    textDecoration: "underline",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "text.primary",
                    },
                  }}
                >
                  training request
                </Button>{" "}
                after you receive an acceptance from the company.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Applications List */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress aria-label="Loading applications" />
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setReloadKey((current) => current + 1)}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : applications.length === 0 ? (
          <Card sx={{ borderRadius: 2, textAlign: "center", py: 8 }}>
            <CardContent>
              <WorkOutlineRoundedIcon
                sx={{ fontSize: 48, color: "grey.300", mb: 2 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
              >
                No applications yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Browse opportunities and apply to start your journey
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/opportunities")}
                sx={{ textTransform: "none" }}
              >
                Browse Opportunities
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {applications.map((app) => {
              const statusConfig =
                STATUS_CONFIG[app.status] ?? STATUS_CONFIG.pending;

              return (
                <Card
                  key={app.id}
                  sx={{
                    borderRadius: 2,
                    borderColor: "divider",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            mb: 0.5,
                          }}
                        >
                          {app.position}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {app.company}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <CalendarTodayIcon
                              sx={{ fontSize: 16, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              Applied{" "}
                              {new Date(app.appliedAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Chip
                          label={statusConfig.label}
                          size="small"
                          sx={{
                            bgcolor: statusConfig.background,
                            color: statusConfig.color,
                            fontWeight: 600,
                            fontSize: "0.8rem",
                          }}
                        />
                        <Button
                          size="small"
                          endIcon={<ArrowForwardIcon />}
                          disabled={!app.opportunityId}
                          onClick={() => {
                            if (app.opportunityId) {
                              navigate(`/opportunities/${app.opportunityId}`);
                            }
                          }}
                          sx={{ textTransform: "none", color: "info.main" }}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ApplicationsPage;
