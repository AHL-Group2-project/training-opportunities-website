import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
  CardActionArea,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import type { StudentProfile } from "./StudentsPage";
import { Link } from "react-router-dom";

type Props = {
  student: StudentProfile;
};

function stringToColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 45%)`;
}

function stringToBackgroundColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 92%)`;
}

export default function StudentCard({ student }: Props) {
  // Calculate initials from name
  const initials = student.name
    ? student.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "ST";

  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        border: "1px solid",
        borderColor: "divider",
        height: 320,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
          borderColor: "primary.main",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/students/${student.userId || student._id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: 3,
          }}
        >
          <Avatar
            src={student.avatarUrl || undefined}
            sx={{
              width: 80,
              height: 80,
              fontSize: 28,
              mb: 2,
              bgcolor: stringToBackgroundColor(student.name),
              color: stringToColor(student.name),
              fontWeight: 700,
              mx: "auto",
              border: "2px solid",
              borderColor: "background.paper",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {!student.avatarUrl && initials}
          </Avatar>

          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
            {student.name}
          </Typography>

          <Typography
            variant="body2"
            color="primary.main"
            sx={{ fontWeight: 500, mb: 0.5 }}
          >
            {student.major}
          </Typography>
          
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block" }}
          >
            {student.university}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
              flexWrap: "wrap",
              mb: "auto",
              gap: 1,
            }}
          >
            {student.skills?.slice(0, 3).map((skill) => (
              <Chip key={skill} label={skill} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
            ))}
            {student.skills && student.skills.length > 3 && (
              <Chip label={`+${student.skills.length - 3}`} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
            )}
          </Stack>

          {/* Social Links */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }} onClick={(e) => e.preventDefault()}>
            {student.social?.linkedin && (
              <IconButton size="small" component="a" href={student.social.linkedin} target="_blank" color="primary">
                <LinkedInIcon />
              </IconButton>
            )}
            {student.social?.github && (
              <IconButton size="small" component="a" href={student.social.github} target="_blank" sx={{ color: "text.primary" }}>
                <GitHubIcon />
              </IconButton>
            )}
            {student.social?.portfolio && (
              <IconButton size="small" component="a" href={student.social.portfolio} target="_blank" color="secondary">
                <LanguageIcon />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
