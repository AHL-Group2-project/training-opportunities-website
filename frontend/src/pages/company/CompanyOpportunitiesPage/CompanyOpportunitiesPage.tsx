import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import api from "../../../lib/axios";
import { useAuth } from "../../../context/authContext";
import type { Opportunity } from "../../../types/opportunity.types";

function CompanyOpportunitiesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [archivingId, setArchivingId] = useState<string | number | null>(null);
  const [restoringId, setRestoringId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchCompanyOpportunities = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<Opportunity[]>(
          "/opportunities/company/me",
        );
        setOpportunities(response.data);
      } catch {
        setError("Unable to load your opportunities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchCompanyOpportunities();
  }, []);
  const handleArchive = async (opportunity: Opportunity) => {
    const confirmed = window.confirm(
      `Archive "${opportunity.title}"? It will no longer appear publicly.`,
    );

    if (!confirmed) return;

    try {
      setArchivingId(opportunity.id);
      setError("");

      await api.delete(`/opportunities/${opportunity.id}`);

      setOpportunities((current) =>
        current.map((item) =>
          item.id === opportunity.id
            ? { ...item, status: "archived" }
            : item,
        ),
      );
    } catch {
      setError("Unable to archive the opportunity. Please try again.");
    } finally {
      setArchivingId(null);
    }
  };
  const handleRestore = async (opportunity: Opportunity) => {
    const confirmed = window.confirm(
      `Restore "${opportunity.title}" as a draft?`,
    );

    if (!confirmed) return;

    try {
      setRestoringId(opportunity.id);
      setError("");

      await api.patch(`/opportunities/${opportunity.id}/restore`);

      setOpportunities((current) =>
        current.map((item) =>
          item.id === opportunity.id ? { ...item, status: "draft" } : item,
        ),
      );
    } catch {
      setError("Unable to restore the opportunity. Please try again.");
    } finally {
      setRestoringId(null);
    }
  };
  const getStatusChip = (status?: string) => {
    const colors: Record<string, { color: string; bg: string }> = {
      active: { color: "#059669", bg: "#ECFDF5" },
      closed: { color: "#DC2626", bg: "#FEF2F2" },
      draft: { color: "#6B7280", bg: "#F3F4F6" },
      archived: { color: "#92400E", bg: "#FEF3C7" },
    };

    const currentStatus = status || "draft";
    const colorConfig = colors[currentStatus] || colors.draft;

    return (
      <Chip
        label={currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
        size="small"
        sx={{
          bgcolor: colorConfig.bg,
          color: colorConfig.color,
          fontWeight: 600,
        }}
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            My Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage opportunities for {user?.name || "your company"}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/company/opportunities/new")}
          sx={{ bgcolor: "text.primary", textTransform: "none" }}
        >
          New Opportunity
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.paper" }}>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Applicants</TableCell>
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
              ) : opportunities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No opportunities yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                opportunities.map((opportunity) => (
                  <TableRow key={opportunity.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {opportunity.title}
                    </TableCell>
                    <TableCell>{opportunity.type}</TableCell>
                    <TableCell>{getStatusChip(opportunity.status)}</TableCell>
                    <TableCell>{opportunity.applicants || 0}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {opportunity.status === "archived" ? (
                          <Tooltip title="Restore as draft">
                            <span>
                              <IconButton
                                size="small"
                                color="warning"
                                disabled={restoringId === opportunity.id}
                                onClick={() => void handleRestore(opportunity)}
                              >
                                {restoringId === opportunity.id ? (
                                  <CircularProgress size={18} color="inherit" />
                                ) : (
                                  <RestoreIcon fontSize="small" />
                                )}
                              </IconButton>
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <Tooltip title="View">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  navigate(`/opportunities/${opportunity.id}`)
                                }
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  navigate(
                                    `/company/opportunities/${opportunity.id}/edit`,
                                  )
                                }
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Archive">
                              <span>
                                <IconButton
                                  size="small"
                                  color="error"
                                  disabled={archivingId === opportunity.id}
                                  onClick={() => void handleArchive(opportunity)}
                                >
                                  {archivingId === opportunity.id ? (
                                    <CircularProgress size={18} color="inherit" />
                                  ) : (
                                    <DeleteIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </span>
                            </Tooltip>
                          </>
                        )}

                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}

export default CompanyOpportunitiesPage;