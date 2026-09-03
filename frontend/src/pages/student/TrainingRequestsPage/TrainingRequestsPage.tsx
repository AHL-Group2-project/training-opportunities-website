import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import api from "../../../lib/axios";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending Review", color: "#d97706", bg: "#fffbeb" },
  approved: { label: "Approved", color: "#059669", bg: "#ecfdf5" },
  rejected: { label: "Rejected", color: "#dc2626", bg: "#fef2f2" },
};

function TrainingRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/students/requests");
        setRequests(Array.isArray(res.data) ? res.data : []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load your requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>
        My Training Requests
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track the status of your internship training requests
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && requests.length === 0 && (
        <Card sx={{ borderRadius: 3, py: 8, textAlign: "center" }}>
          <CardContent>
            <AssignmentOutlinedIcon sx={{ fontSize: 56, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}>
              No requests yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Submit a training request to get started with your internship.
            </Typography>
          </CardContent>
        </Card>
      )}

      {!loading && !error && requests.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {requests.map((req) => {
            const status = statusConfig[req.status] || statusConfig.pending;
            const submittedAt = req.submittedAt
              ? new Date(req.submittedAt).toLocaleDateString()
              : req.createdAt
              ? new Date(req.createdAt).toLocaleDateString()
              : "—";

            return (
              <Card
                key={req._id}
                sx={{
                  borderRadius: 2,
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
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
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
                        {req.position || "Training Request"}
                      </Typography>
                      <Stack sx={{ direction: "row", alignItems: "center", gap: 0.75 }}>
                        <BusinessOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {req.newCompanyName || "—"}
                        </Typography>
                      </Stack>
                    </Box>

                    <Stack sx={{ direction: "row", gap: 1, alignItems: "center" }}>
                      <Chip
                        label={req.type?.toUpperCase() || "—"}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor: req.type === "ft2" ? "#f5f3ff" : "#eff6ff",
                          color: req.type === "ft2" ? "#7c3aed" : "#2563eb",
                          borderRadius: 1,
                        }}
                      />
                      <Chip
                        label={status.label}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          bgcolor: status.bg,
                          color: status.color,
                          borderRadius: 1,
                        }}
                      />
                    </Stack>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Stack sx={{ direction: { xs: "column", sm: "row" }, gap: 3 }}>
                    {req.department && (
                      <Stack sx={{ direction: "row", alignItems: "center", gap: 0.75 }}>
                        <WorkOutlineRoundedIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {req.department}
                        </Typography>
                      </Stack>
                    )}
                    {req.workMode && (
                      <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                        {req.workMode}
                      </Typography>
                    )}
                    <Stack sx={{ direction: "row", alignItems: "center", gap: 0.75 }}>
                      <CalendarTodayIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        Submitted: {submittedAt}
                      </Typography>
                    </Stack>
                    {req.expectedHours && (
                      <Typography variant="body2" color="text.secondary">
                        Expected: {req.expectedHours} hours
                      </Typography>
                    )}
                  </Stack>

                  {req.status === "rejected" && req.rejectionReason && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#fef2f2",
                        border: "1px solid #fecaca",
                      }}
                    >
                      <Typography variant="caption" color="error" sx={{ display: "block", mb: 0.5, fontWeight: 600 }}>
                        Rejection Reason
                      </Typography>
                      <Typography variant="body2">{req.rejectionReason}</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
}

export default TrainingRequestsPage;
