import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useAuth } from "../../../context/authContext";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";

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
        borderLeft: "4px solid #F59E0B",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "text.primary",
            }}
          >
            {greeting}, {user?.name}
            <WavingHandOutlinedIcon sx={{ color: "#F59E0B" }} />
          </Typography>

          <Typography sx={{ color: "#F59E0B", fontWeight: 600 }}>
            {today}
          </Typography>

          <Typography
            sx={{ color: "text.secondary", maxWidth: "600px", mt: 1 }}
          >
            Welcome back to your Field Training dashboard. Track your
            applications, log your internship hours, and manage your academic
            requirements all in one place.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
