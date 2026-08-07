import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import { useAuth } from "../../../context/authContext";
import { MOCK_COMPLETION_REQUESTS } from "../../../mock/completionRequests";
import { MOCK_COMPANIES } from "../../../mock/Companies";

function CompanyRequestsPage() {
  const { user } = useAuth();
  const companyId = user?.companyId;

  const company = MOCK_COMPANIES.find((c) => c.id === companyId);
  const [requests, setRequests] = useState(
    MOCK_COMPLETION_REQUESTS.filter((r) => r.companyId === companyId),
  );

  const handleApprove = (id: number) => {
    // TODO: PATCH /api/completion-requests/:id/approve
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "approved" as const } : r,
      ),
    );
  };

  const handleReject = (id: number) => {
    // TODO: PATCH /api/completion-requests/:id/reject
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "rejected" as const } : r,
      ),
    );
  };

  const getStatusChip = (status: string) => {
    const colors: Record<string, { color: string; bg: string }> = {
      pending: { color: "#D97706", bg: "#FEF3C7" },
      approved: { color: "#059669", bg: "#ECFDF5" },
      rejected: { color: "#DC2626", bg: "#FEF2F2" },
    };
    const c = colors[status];
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: c.bg,
          color: c.color,
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
      >
        Completion Requests
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Review and approve student internship completions for {company?.name}
      </Typography>

      <Card sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.paper" }}>
                <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Hours</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Reports</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No completion requests
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((req) => (
                  <TableRow key={req.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {req.studentName}
                    </TableCell>
                    <TableCell>
                      {req.totalHours} / {req.requiredHours}
                    </TableCell>
                    <TableCell>{req.reportsSubmitted}</TableCell>
                    <TableCell>{getStatusChip(req.status)}</TableCell>
                    <TableCell>
                      {req.status === "pending" ? (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleApprove(req.id)}
                            sx={{ bgcolor: "#059669", textTransform: "none" }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleReject(req.id)}
                            sx={{ textTransform: "none" }}
                          >
                            Reject
                          </Button>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          {req.status === "approved" ? "Approved" : "Rejected"}
                        </Typography>
                      )}
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

export default CompanyRequestsPage;
