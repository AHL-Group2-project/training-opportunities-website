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
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { MOCK_APPLICATIONS } from "../../../mock/applications";
import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";
import { students } from "../../../mock/students";

export default function CompanyApplicationsPage() {
  const { user } = useAuth();

  const applications = useMemo(() => {
    return MOCK_APPLICATIONS.map((app) => {
      const student = students.find((s) => s.id === app.studentId);
      const opportunity = MOCK_OPPORTUNITIES.find(
        (o) => o.id === app.opportunityId,
      );
      return { ...app, student, opportunity };
    });
  }, []);

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
              <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
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
                        <Typography variant="body2" fontWeight={600}>
                          {app.student?.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
