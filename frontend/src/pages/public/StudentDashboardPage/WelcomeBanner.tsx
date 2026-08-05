import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useAuth } from "../../../context/authContext";

export default function WelcomeBanner() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <Card
      sx={{
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            {greeting}, {user?.name}
          </Typography>

          <Typography color="text.secondary">{today}</Typography>

          <Typography color="text.secondary">
            Welcome back to your Field Training dashboard.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
