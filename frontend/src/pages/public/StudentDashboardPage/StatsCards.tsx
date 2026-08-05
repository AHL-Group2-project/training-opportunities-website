import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";

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
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Applications
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
              }}
            >
              {applicationsCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Hours Logged
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
              }}
            >
              {hoursLogged} / {requiredHours}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              FT1
            </Typography>

            <Chip label={ft1Status.label} color={ft1Status.color} />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              FT2
            </Typography>

            <Chip label={ft2Status.label} color={ft2Status.color} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
