import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

function CompanyOpportunitiesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const companyId = user?.companyId;

  const company = MOCK_COMPANIES.find((c) => c.id === companyId);
  const [opportunities] = useState(company?.opportunities || []);

  const getStatusChip = (status?: string) => {
    const colors: Record<string, { color: string; bg: string }> = {
      active: { color: "#059669", bg: "#ECFDF5" },
      closed: { color: "#DC2626", bg: "#FEF2F2" },
      draft: { color: "#6B7280", bg: "#F3F4F6" },
    };
    const c = colors[status || "draft"];
    return (
      <Chip
        label={status || "draft"}
        size="small"
        sx={{ bgcolor: c.bg, color: c.color, fontWeight: 600 }}
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
            Manage opportunities for {company?.name}
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
              {opportunities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No opportunities yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                opportunities.map((opp) => (
                  <TableRow key={opp.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{opp.title}</TableCell>
                    <TableCell>{opp.type}</TableCell>
                    <TableCell>{getStatusChip(opp.status)}</TableCell>
                    <TableCell>{opp.applicants || 0}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/opportunities/${opp.id}`)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
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

export default CompanyOpportunitiesPage;
