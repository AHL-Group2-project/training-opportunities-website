import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  GroupsOutlined,
  BusinessCenterOutlined,
  PendingActionsOutlined,
  SchoolOutlined,
  TrendingUp,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api/admin";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  loading,
}: {
  title: string;
  value: number | string;
  icon: SvgIconComponent;
  color: string;
  loading: boolean;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -10px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          opacity: 0.05,
          transform: "rotate(-15deg)",
        }}
      >
        <Icon sx={{ fontSize: 120, color: color }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ color: color, fontSize: 32 }} />
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          position: "relative",
          display: "flex",
          alignItems: "baseline",
          gap: 1,
        }}
      >
        {loading ? (
          <CircularProgress size={32} thickness={5} sx={{ color }} />
        ) : (
          <>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: "text.primary" }}
            >
              {value}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "success.main",
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
              Active
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    supervisors: 0,
    companies: 0,
    requests: 0, // Mock for requests until API is ready
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [studentsRes, supervisorsRes, companiesRes] = await Promise.all([
          adminApi.getStudents(),
          adminApi.getSupervisors(),
          adminApi.getCompanies(),
        ]);

        const allStudents = Array.isArray(studentsRes.data)
          ? studentsRes.data
          : [];
        const allCompanies = Array.isArray(companiesRes.data)
          ? companiesRes.data
          : [];
        const allSupervisors = Array.isArray(supervisorsRes.data)
          ? supervisorsRes.data
          : [];

        setStats({
          students: allStudents.length,
          supervisors: allSupervisors.length,
          companies: allCompanies.length,
          requests: 0, // Pending Requests feature is separate
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            mb: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 400 }}
        >
          Manage and monitor your university's training platform.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Students"
            value={stats.students}
            icon={SchoolOutlined}
            color="#3b82f6"
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Supervisors"
            value={stats.supervisors}
            icon={GroupsOutlined}
            color="#8b5cf6"
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Companies"
            value={stats.companies}
            icon={BusinessCenterOutlined}
            color="#10b981"
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Requests"
            value={stats.requests}
            icon={PendingActionsOutlined}
            color="#f59e0b"
            loading={loading}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
