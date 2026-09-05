import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../../lib/axios";

type ApplicationStatus = "pending" | "accepted" | "rejected";

interface CompanyApplication {
  id: string;
  studentId: string | null;
  opportunityId: string | null;
  student: {
    id: string;
    name: string;
    major: string;
    studentId: string;
    university: string; 
    email: string;
    userId: string;
  } | null;
  opportunity: {
    id: string;
    title: string;
  } | null;
  status: ApplicationStatus;
  appliedAt: string;
  coverLetter: string;
  phoneNumber: string;
  cvUrl: string;
  cvOriginalName: string;
}

const statusConfig: Record<
  ApplicationStatus,
  { label: string; color: string; backgroundColor: string }
> = {
  pending: {
    label: "Submitted",
    color: "#1D4ED8",
    backgroundColor: "#DBEAFE",
  },
  accepted: {
    label: "Accepted",
    color: "#047857",
    backgroundColor: "#D1FAE5",
  },
  rejected: {
    label: "Rejected",
    color: "#B91C1C",
    backgroundColor: "#FEE2E2",
  },
};

export default function CompanyApplicationsPage() {
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<CompanyApplication | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<CompanyApplication[]>(
          "/applications/company",
        );

        if (isMounted) {
          setApplications(response.data);
        }
      } catch (requestError) {
        if (isMounted) {
          const message = axios.isAxiosError<{ message?: string }>(requestError)
            ? requestError.response?.data?.message
            : undefined;

          setError(
            typeof message === "string"
              ? message
              : "Unable to load applications. Please try again.",
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void loadApplications();

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Applications
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Students who applied to your opportunities. Contact them externally via
        email.
      </Typography>

      {error && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Retry
            </Button>
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Opportunity</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Applied Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={32} />
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No applications yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => {
                const status =
                  statusConfig[application.status] ?? statusConfig.pending;

                return (
                  <TableRow key={application.id}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "primary.main",
                          }}
                        >
                          {application.student?.name?.[0] ?? "?"}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {application.student?.name ?? "Unavailable student"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {application.student?.major ?? "Major unavailable"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {application.opportunity?.title ??
                        "Unavailable opportunity"}
                    </TableCell>
                    <TableCell>
                      {application.appliedAt
                        ? new Date(application.appliedAt).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={status.label}
                        size="small"
                        sx={{
                          color: status.color,
                          bgcolor: status.backgroundColor,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => setSelectedApp(application)}
                          sx={{ textTransform: "none" }}
                        >
                          View Application
                        </Button>
                        {application.student && (
                          <Button
                            component={Link}
                            to={`/students/${application.student.userId}`}
                            size="small"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                          >
                            View Profile
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={selectedApp !== null}
        onClose={() => setSelectedApp(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Applicant
                </Typography>
                <Typography>
                  {selectedApp.student?.name ?? "Unavailable"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedApp.student?.email || "No email provided"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  University ID
                </Typography>
                <Typography>
                  {selectedApp.student?.studentId ?? "Unavailable"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone number
                </Typography>
                <Typography>
                  {selectedApp.phoneNumber || "Not provided"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Position
                </Typography>
                <Typography>
                  {selectedApp.opportunity?.title ?? "Unavailable"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Applied date
                </Typography>
                <Typography>
                  {selectedApp.appliedAt
                    ? new Date(selectedApp.appliedAt).toLocaleDateString()
                    : "Unavailable"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Cover letter
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {selectedApp.coverLetter || "No cover letter provided"}
                </Typography>
              </Box>

              {selectedApp.cvUrl ? (
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    CV / Resume
                  </Typography>

                  <Button
                    component="a"
                    href={selectedApp.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                  >
                    Download Resume / CV
                  </Button>
                </Box>
              ) : (
                <Alert severity="info">
                  No CV was attached to this application.
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedApp(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
