import { Container, Grid, Paper, Typography } from "@mui/material";
import {
  GroupsOutlined,
  BusinessCenterOutlined,
  PendingActionsOutlined,
  SchoolOutlined,
  type SvgIconComponent,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { MOCK_USERS } from "../../../mock/users";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import { MOCK_TRAINING_STATES } from "../../../mock/studentTrainingState";

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: SvgIconComponent;
}) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }}
      >
        <Icon sx={{ color: "primary.main", fontSize: 28 }} />
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function AdminDashboardPage() {
  const totalStudents = MOCK_USERS.filter((u) => u.role === "student").length;
  const totalSupervisors = MOCK_USERS.filter(
    (u) => u.role === "supervisor",
  ).length;
  const totalCompanies = MOCK_COMPANIES.length;
  const pendingRequests = MOCK_TRAINING_STATES.filter(
    (s) =>
      s.ft1.status === "request_pending" || s.ft2.status === "request_pending",
  ).length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Students"
            value={totalStudents}
            icon={SchoolOutlined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Supervisors"
            value={totalSupervisors}
            icon={GroupsOutlined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Companies"
            value={totalCompanies}
            icon={BusinessCenterOutlined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Requests"
            value={pendingRequests}
            icon={PendingActionsOutlined}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
