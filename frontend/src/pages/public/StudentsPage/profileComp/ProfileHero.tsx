import { Box, Button, Container } from "@mui/material";
import type { StudentProfile } from "../StudentsPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

type Props = {
  student?: StudentProfile;
};

function stringToColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 45%)`;
}

export default function ProfileHero({ student }: Props) {
  const accentColor = student?.name ? stringToColor(student.name) : "#1976d2";
  
  return (
    <Box
      sx={{
        py: 4,
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        mt: "-24px",
        height: 280,
        background: `linear-gradient(135deg, ${accentColor}11 0%, ${accentColor}33 100%)`,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Button
          component={Link}
          to="/students"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4, color: "text.secondary", "&:hover": { color: "primary.main" } }}
        >
          All students
        </Button>
      </Container>
    </Box>
  );
}
