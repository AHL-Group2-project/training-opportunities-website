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
    iconColor: "#A855F7",
    iconBackground: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: 2,
    title: "Active Internships",
    value: 32,
    icon: BusinessCenterOutlined,
    iconColor: "#3B82F6",
    iconBackground: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 3,
    title: "Pending Evaluations",
    value: 9,
    icon: PendingActionsOutlined,
    iconColor: "#F59E0B",
    iconBackground: "rgba(245, 158, 11, 0.15)",
  },
  {
    id: 4,
    title: "Completed Internships",
    value: 16,
    icon: AssignmentTurnedInOutlined,
    iconColor: "#10B981",
    iconBackground: "rgba(16, 185, 129, 0.15)",
  },
];

function SupervisorDashboard() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "transparent", // Let the theme handle the background
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
