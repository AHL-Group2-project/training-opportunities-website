import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { useAuth } from "../../../context/authContext";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import { MOCK_COMPLETION_REQUESTS } from "../../../mock/completionRequests";
import { MOCK_ACTIVE_INTERNSHIPS } from "../../../mock/activeInternships";

function CompanyDashboardPage() {
  const { user } = useAuth();
  const companyId = user?.companyId;

  const company = MOCK_COMPANIES.find((c) => c.id === companyId);
  const pendingRequests = MOCK_COMPLETION_REQUESTS.filter(
    (r) => r.companyId === companyId && r.status === "pending",
  );
  const activeInterns = MOCK_ACTIVE_INTERNSHIPS.filter(
    (i) => i.companyId === companyId && i.status === "active",
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#1C2B4A", mb: 1 }}
      >
        Company Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {company?.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#4A90D9" }}
              >
                {company?.opportunities.filter((o) => o.status === "active")
                  .length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Opportunities
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#059669" }}
              >
                {activeInterns.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Interns
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#DC2626" }}
              >
                {pendingRequests.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Completion Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#7C3AED" }}
              >
                {company?.opportunities.reduce(
                  (sum, o) => sum + (o.applicants || 0),
                  0,
                ) || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TODO: Recent activity, pending requests preview */}
    </Container>
  );
}

export default CompanyDashboardPage;
