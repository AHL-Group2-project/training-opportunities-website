import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import { useAuth } from "../../../context/authContext";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import { MOCK_COMPLETION_REQUESTS } from "../../../mock/completionRequests";
import { MOCK_ACTIVE_INTERNSHIPS } from "../../../mock/activeInternships";

function CompanyDashboardPage() {
  const { user } = useAuth();
  const companyId = user?.companyId;

  const company = MOCK_COMPANIES.find((c) => c.id === Number(companyId));
  const pendingRequests = MOCK_COMPLETION_REQUESTS.filter(
    (r) => r.companyId === Number(companyId) && r.status === "pending",
  );
  const activeInterns = MOCK_ACTIVE_INTERNSHIPS.filter(
    (i) => i.companyId === Number(companyId) && i.status === "active",
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
      >
        Company Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {company?.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%", borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  Active Opportunities
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    color: "#3B82F6",
                  }}
                >
                  <BusinessCenterOutlinedIcon fontSize="small" />
                </Box>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                {company?.opportunities.filter((o) => o.status === "active")
                  .length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%", borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  Active Interns
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#10B981",
                  }}
                >
                  <PeopleOutlinedIcon fontSize="small" />
                </Box>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                {activeInterns.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%", borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  Pending Requests
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    color: "#F59E0B",
                  }}
                >
                  <FactCheckOutlinedIcon fontSize="small" />
                </Box>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                {pendingRequests.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: "100%", borderRadius: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  Total Applications
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                    color: "#A855F7",
                  }}
                >
                  <AssignmentOutlinedIcon fontSize="small" />
                </Box>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                {company?.opportunities.reduce(
                  (sum, o) => sum + (o.applicants || 0),
                  0,
                ) || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Placeholder for future content without adding new features */}
      <Box sx={{ mt: 4 }}>
        <Card
          sx={{
            borderRadius: 4,
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderStyle: "dashed",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Select an opportunity to view recent activity.
          </Typography>
        </Card>
      </Box>
    </Container>
  );
}

export default CompanyDashboardPage;
