import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";

import api from "../../../lib/axios";
import { useAuth } from "../../../context/authContext";
import type { Opportunity } from "../../../types/opportunity.types";

type OpportunityStatus = "active" | "closed" | "draft" | "archived";

function ManageOpportunitiesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OpportunityStatus>(
    "all",
  );
  const [archivingId, setArchivingId] = useState<string | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadOpportunities = async () => {
      if (user?.role !== "supervisor") {
        if (isMounted) {
          setError("This page is available to supervisors only.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get<Opportunity[]>(
          "/opportunities/supervisor/me",
        );

        if (isMounted) {
          setOpportunities(response.data);
        }
      } catch (requestError) {
        if (isMounted) {
          const message = axios.isAxiosError<{ message?: string }>(requestError)
            ? requestError.response?.data?.message
            : undefined;

          setError(
            typeof message === "string"
              ? message
              : "Unable to load your opportunities. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadOpportunities();

    return () => {
      isMounted = false;
    };
  }, [reloadKey, user?.role]);

  const filtered = opportunities.filter((opportunity) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      opportunity.title.toLowerCase().includes(normalizedSearch) ||
      (opportunity.company || "").toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "all" || opportunity.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusChip = (status?: string) => {
    const config: Record<string, { color: string; background: string }> = {
      active: {
        color: "#059669",
        background: "#ECFDF5",
      },
      closed: {
        color: "#DC2626",
        background: "#FEF2F2",
      },
      draft: {
        color: "#6B7280",
        background: "#F3F4F6",
      },
      archived: {
        color: "#92400E",
        background: "#FEF3C7",
      },
    };

    const currentStatus = status || "draft";
    const currentConfig = config[currentStatus] || config.draft;

    return (
      <Chip
        label={currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
        size="small"
        sx={{
          bgcolor: currentConfig.background,
          color: currentConfig.color,
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      />
    );
  };

  const handleArchive = async (opportunity: Opportunity) => {
    const id = String(opportunity.id);

    const confirmed = window.confirm(
      `Archive "${opportunity.title}"? You can restore it later.`,
    );

    if (!confirmed) return;

    try {
      setArchivingId(id);
      setError("");

      await api.delete(`/opportunities/${id}`);

      setOpportunities((current) =>
        current.map((item) =>
          String(item.id) === id ? { ...item, status: "archived" } : item,
        ),
      );
    } catch (requestError) {
      const message = axios.isAxiosError<{ message?: string }>(requestError)
        ? requestError.response?.data?.message
        : undefined;

      setError(
        typeof message === "string"
          ? message
          : "Unable to archive the opportunity. Please try again.",
      );
    } finally {
      setArchivingId(null);
    }
  };

  const handleRestore = async (opportunity: Opportunity) => {
    const id = String(opportunity.id);

    try {
      setRestoringId(id);
      setError("");

      await api.patch(`/opportunities/${id}/restore`);

      setOpportunities((current) =>
        current.map((item) =>
          String(item.id) === id ? { ...item, status: "draft" } : item,
        ),
      );
    } catch (requestError) {
      const message = axios.isAxiosError<{ message?: string }>(requestError)
        ? requestError.response?.data?.message
        : undefined;

      setError(
        typeof message === "string"
          ? message
          : "Unable to restore the opportunity. Please try again.",
      );
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            External Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage opportunities for companies without accounts
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/supervisor/opportunities/new")}
          sx={{ textTransform: "none" }}
        >
          New External Opportunity
        </Button>
      </Box>

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

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          placeholder="Search by title or company..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | OpportunityStatus)
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Card sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.paper" }}>
                <TableCell sx={{ fontWeight: 700 }}>Position</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Application Method
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                    <Typography color="text.secondary">
                      No external opportunities found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((opportunity) => {
                  const id = String(opportunity.id);
                  const isArchived = opportunity.status === "archived";
                  const isActive = opportunity.status === "active";

                  return (
                    <TableRow key={id} hover>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600 }}>
                          {opportunity.title}
                        </Typography>
                      </TableCell>

                      <TableCell>{opportunity.company}</TableCell>

                      <TableCell>
                        <Chip
                          label={opportunity.type}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>{getStatusChip(opportunity.status)}</TableCell>

                      <TableCell>
                        <Chip
                          label="External link"
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          {isArchived ? (
                            <Tooltip title="Restore as draft">
                              <span>
                                <IconButton
                                  size="small"
                                  color="warning"
                                  disabled={restoringId === id}
                                  onClick={() =>
                                    void handleRestore(opportunity)
                                  }
                                >
                                  {restoringId === id ? (
                                    <CircularProgress
                                      size={18}
                                      color="inherit"
                                    />
                                  ) : (
                                    <RestoreIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              {isActive && (
                                <Tooltip title="View opportunity">
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      navigate(`/opportunities/${id}`)
                                    }
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}

                              <Tooltip title="Edit opportunity">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    navigate(
                                      `/supervisor/opportunities/${id}/edit`,
                                    )
                                  }
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Archive opportunity">
                                <span>
                                  <IconButton
                                    size="small"
                                    color="error"
                                    disabled={archivingId === id}
                                    onClick={() =>
                                      void handleArchive(opportunity)
                                    }
                                  >
                                    {archivingId === id ? (
                                      <CircularProgress
                                        size={18}
                                        color="inherit"
                                      />
                                    ) : (
                                      <DeleteIcon fontSize="small" />)}
                                  </IconButton>
                                </span>
                              </Tooltip>
                            </>
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
      </Card>
    </Container>
  );
}

export default ManageOpportunitiesPage;
