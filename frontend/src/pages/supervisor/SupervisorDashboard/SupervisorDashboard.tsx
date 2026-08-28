import { useEffect, useState } from "react";
import {
  AssignmentTurnedInOutlined,
  BusinessCenterOutlined,
  GroupsOutlined,
  PendingActionsOutlined,
} from "@mui/icons-material";

import { Box, Typography, CircularProgress } from "@mui/material";
import StatCard from "./components/StatCard";
import StudentTrackingTable from "./components/StudentTrackingTable";
import api from "../../../lib/axios";

function SupervisorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/supervisor/dashboard");
        setStats(response.data.stats);
        setStudents(response.data.students);
      } catch (error) {
        console.error("Failed to fetch supervisor dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const supervisorStats = [
    {
      id: 1,
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: GroupsOutlined,
      iconColor: "#A855F7",
      iconBackground: "rgba(168, 85, 247, 0.15)",
    },
    {
      id: 2,
      title: "Active Internships",
      value: stats?.activeInternships || 0,
      icon: BusinessCenterOutlined,
      iconColor: "#3B82F6",
      iconBackground: "rgba(59, 130, 246, 0.15)",
    },
    {
      id: 3,
      title: "Pending Evaluations",
      value: stats?.pendingEvaluations || 0,
      icon: PendingActionsOutlined,
      iconColor: "#F59E0B",
      iconBackground: "rgba(245, 158, 11, 0.15)",
    },
    {
      id: 4,
      title: "Completed Internships",
      value: stats?.completedInternships || 0,
      icon: AssignmentTurnedInOutlined,
      iconColor: "#10B981",
      iconBackground: "rgba(16, 185, 129, 0.15)",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "transparent",
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
        <StudentTrackingTable students={students} />
      </Box>
    </Box>
  );
}

export default SupervisorDashboard;

