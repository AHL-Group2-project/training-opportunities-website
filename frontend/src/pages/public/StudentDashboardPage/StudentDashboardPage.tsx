import { Container, Stack } from "@mui/material";

import WelcomeBanner from "./WelcomeBanner";
import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";


export default function StudentDashboardPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >
      <Stack spacing={3}>
        <WelcomeBanner />

        <StatsCards />

        <QuickActions />

      </Stack>
    </Container>
  );
}