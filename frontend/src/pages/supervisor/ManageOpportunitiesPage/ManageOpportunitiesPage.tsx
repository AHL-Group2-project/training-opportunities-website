import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../../../context/authContext";

type OpportunityStatus = "active" | "closed" | "draft";

function ManageOpportunitiesPage() {
  const navigate = useNavigate();
  const [opportunities] = useState(MOCK_OPPORTUNITIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OpportunityStatus>(
    "all",
  );
  const { user } = useAuth();
  if (user?.role === "company") {
    navigate("/company/opportunities");
    return null;
  }

  const filtered = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || opp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusChip = (status: string) => {
    const config: Record<string, { color: string; bg: string }> = {
      active: { color: "#059669", bg: "#ECFDF5" },
      closed: { color: "#DC2626", bg: "#FEF2F2" },
      draft: { color: "#6B7280", bg: "#F3F4F6" },
    };
    const c = config[status] || config.draft;
    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        size="small"
        sx={{
          bgcolor: c.bg,
          color: c.color,
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
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
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1C2B4A" }}>
            Manage Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage internship opportunities
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/supervisor/opportunities/new")}
          sx={{
            bgcolor: "#1C2B4A",
            textTransform: "none",
            "&:hover": { bgcolor: "#2a3f6b" },
          }}
        >
          New Opportunity
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search by title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | OpportunityStatus)
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <Card
        variant="outlined"
        sx={{ borderRadius: 2, borderColor: "grey.200" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f6f3ee" }}>
                <TableCell sx={{ fontWeight: 700, color: "#1C2B4A" }}>
                  Position
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1C2B4A" }}>
                  Company
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1C2B4A" }}>
                  Type
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1C2B4A" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1C2B4A" }}>
                  Applications
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#1C2B4A" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No opportunities found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((opp) => (
                  <TableRow key={opp.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: "#1C2B4A" }}>
                        {opp.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{opp.company}</TableCell>
                    <TableCell>
                      <Chip
                        label={opp.type}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    </TableCell>
                    <TableCell>
                      {getStatusChip(opp.status || "draft")}
                    </TableCell>
                    <TableCell>{opp.applicants || 0}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="View opportunity">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/opportunities/${opp.id}`)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit opportunity">
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(
                                `/supervisor/opportunities/${opp.id}/edit`,
                              )
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
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

export default ManageOpportunitiesPage;
