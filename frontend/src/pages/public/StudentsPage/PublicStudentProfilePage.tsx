import { Container, Typography } from "@mui/material";

export default function PublicStudentProfilePage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Student Profile
      </Typography>

      <Typography color="text.secondary">
        This page is under construction.
      </Typography>
    </Container>
  );
}