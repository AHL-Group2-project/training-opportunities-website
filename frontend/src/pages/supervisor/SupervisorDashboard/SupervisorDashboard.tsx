import {
  AssignmentTurnedInOutlined,
  BusinessCenterOutlined,
  GroupsOutlined,
  PendingActionsOutlined,
} from "@mui/icons-material";

import { Box, Typography } from "@mui/material";
import StatCard from "./components/StatCard";
import StudentTrackingTable from "./components/StudentTrackingTable";

const supervisorStats = [
  {
    id: 1,
    title: "Total Students",
    value: 48,
    icon: GroupsOutlined,
    iconColor: "#6D4CCB",
    iconBackground: "#F0EBFF",
  },
  {
    id: 2,
    title: "Active Internships",
    value: 32,
    icon: BusinessCenterOutlined,
    iconColor: "#1976D2",
    iconBackground: "#E9F3FF",
  },
  {
    id: 3,
    title: "Pending Evaluations",
    value: 9,
    icon: PendingActionsOutlined,
    iconColor: "#E58A00",
    iconBackground: "#FFF4DF",
  },
  {
    id: 4,
    title: "Completed Internships",
    value: 16,
    icon: AssignmentTurnedInOutlined,
    iconColor: "#2E9D65",
    iconBackground: "#E6F7EE",
  },
];

function SupervisorDashboard() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#FAFAFC",
        px: { xs: 2, sm: 3, md: 5 },
        py: 4,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          Supervisor Dashboard
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Track students and monitor their internship progress.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2.5,
        }}
      >
        {supervisorStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBackground={stat.iconBackground}
          />
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <StudentTrackingTable />
      </Box>
    </Box>
  );
}

export default SupervisorDashboard;
