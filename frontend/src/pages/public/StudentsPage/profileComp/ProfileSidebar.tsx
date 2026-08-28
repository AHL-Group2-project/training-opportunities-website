import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { StudentProfile } from "../StudentsPage";
type Props = {
  student: StudentProfile;
};

export default function ProfileSidebar({ student }: Props) {
  const initials = student.name?.slice(0, 2).toUpperCase() || "ST";

  return (
    <Box
      sx={{
        p: { xs: 3, md: 0 },
        position: { md: "sticky" },
        top: { md: 24 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        <Avatar
          src={student.avatarUrl || undefined}
          sx={{
            width: 120,
            height: 120,
            bgcolor: "background.paper",
            color: "primary.main",
            fontSize: 40,
            fontWeight: 700,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            border: "4px solid",
            borderColor: "background.paper",
          }}
        >
          {!student.avatarUrl && initials}
        </Avatar>

        <Box
          sx={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{student.name}</Typography>

          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 500, mb: 0.5 }}>
            {student.major}
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {student.university}
          </Typography>
        </Box>

        <Button 
          fullWidth 
          variant="contained" 
          disabled 
          sx={{ 
            borderRadius: 2, 
            py: 1.2, 
            textTransform: "none", 
            fontWeight: 600,
            boxShadow: "none" 
          }}
        >
          Download Resume
        </Button>

        <Divider flexItem sx={{ my: 1 }} />

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
          {student.contactEmail && (
            <Box>
              <Typography variant="caption" color="text.disabled" sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Email</Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
                {student.contactEmail}
              </Typography>
            </Box>
          )}

          {student.phone && (
            <Box>
              <Typography variant="caption" color="text.disabled" sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>Phone</Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
                {student.phone}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
