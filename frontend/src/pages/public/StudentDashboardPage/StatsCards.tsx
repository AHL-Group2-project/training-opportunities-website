import { Card, CardContent, Chip, Grid, Typography, Box } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

import { useAuth } from "../../../context/authContext";
import { students } from "../../../mock/students";

export default function StatsCards() {
  const { user } = useAuth();

  const student = students.find((s) => s.id === user?.id);

  if (!student) return null;

  const applicationsCount = student.training.applications.length;

  const hoursLogged = student.training.ft2.loggedHours;
  const requiredHours = student.training.ft2.requiredHours;

  const getStatus = (registered: boolean, completed: boolean) => {
    if (completed) {
      return {
        label: "Completed",
        color: "success" as const,
      };
    }

    if (registered) {
      return {
        label: "In Progress",
        color: "warning" as const,
      };
    }

    return {
      label: "Not Started",
      color: "default" as const,
    };
  };

  const ft1Status = getStatus(
    student.training.ft1.registered,
    student.training.ft1.completed,
  );

  const ft2Status = getStatus(
    student.training.ft2.registered,
    student.training.ft2.completed,
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card sx={{ borderRadius: 4, height: "100%" }}>
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
                Applications
              </Typography>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  color: "#F59E0B",
                }}
              >
                <DescriptionOutlinedIcon fontSize="small" />
              </Box>
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {applicationsCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card sx={{ borderRadius: 4, height: "100%" }}>
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
                Hours Logged
              </Typography>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#3B82F6",
                }}
              >
                <AccessTimeOutlinedIcon fontSize="small" />
              </Box>
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {hoursLogged}{" "}
              <Typography component="span" variant="h5" color="text.secondary">
                / {requiredHours}
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card sx={{ borderRadius: 4, height: "100%" }}>
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
                Field Training 1
              </Typography>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "#10B981",
                }}
              >
                <AssignmentTurnedInOutlinedIcon fontSize="small" />
              </Box>
            </Box>
            <Chip
              label={ft1Status.label}
              color={ft1Status.color}
              sx={{ fontWeight: 600, borderRadius: 2 }}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card sx={{ borderRadius: 4, height: "100%" }}>
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
                Field Training 2
              </Typography>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: "rgba(168, 85, 247, 0.1)",
                  color: "#A855F7",
                }}
              >
                <AssignmentTurnedInOutlinedIcon fontSize="small" />
              </Box>
            </Box>
            <Chip
              label={ft2Status.label}
              color={ft2Status.color}
              sx={{ fontWeight: 600, borderRadius: 2 }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
