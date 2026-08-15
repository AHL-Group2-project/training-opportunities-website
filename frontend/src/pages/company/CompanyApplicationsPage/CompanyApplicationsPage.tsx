import { useMemo } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_APPLICATIONS } from "../../../mock/applications";
import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";
import { students } from "../../../mock/students";

export default function CompanyApplicationsPage() {
  const applications = useMemo(() => {
    return MOCK_APPLICATIONS.map((app) => {
      const student = students.find((s) => s.id === app.studentId);
      const opportunity = MOCK_OPPORTUNITIES.find(
        (o) => o.id === app.opportunityId,
      );
      return { ...app, student, opportunity };
    });
  }, []);

  const [selectedApp, setSelectedApp] = useState<any>(null);

  const handleOpenApp = (app: any) => {
    setSelectedApp(app);
  };

  const handleCloseApp = () => {
    setSelectedApp(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Applications
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Students who applied to your opportunities. Contact them externally via
        email.
      </Typography>

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
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No applications yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                      >
                        {app.student?.name?.[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {app.student?.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {app.student?.major}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {app.opportunity?.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleDateString()
                        : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label="Submitted"
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        color: "primary.main",
                        fontWeight: 600,
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenApp(app)}
                        sx={{ textTransform: "none" }}
                      >
                        View Application
                      </Button>
                      <Button
                        component={Link}
                        to={`/students/${app.studentId}`}
                        size="small"
                        variant="outlined"
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Application Dialog */}
      <Dialog open={!!selectedApp} onClose={handleCloseApp} maxWidth="sm" fullWidth>
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Applicant
                </Typography>
                <Typography variant="body1">{selectedApp.student?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedApp.student?.email || "No email provided"}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Position
                </Typography>
                <Typography variant="body1">{selectedApp.opportunity?.title}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Availability Date
                </Typography>
                <Typography variant="body1">
                  {selectedApp.availabilityDate
                    ? new Date(selectedApp.availabilityDate).toLocaleDateString()
                    : "Not specified"}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Links
                </Typography>
                {selectedApp.cvUrl && (
                  <Typography variant="body2">
                    <a href={selectedApp.cvUrl} target="_blank" rel="noopener noreferrer">
                      Download Resume / CV
                    </a>
                  </Typography>
                )}
                {selectedApp.portfolioUrl && (
                  <Typography variant="body2">
                    <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer">
                      Portfolio URL
                    </a>
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApp}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
