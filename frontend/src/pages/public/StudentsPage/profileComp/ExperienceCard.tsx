import { Box, Typography } from "@mui/material";

import type { StudentProfile } from "../StudentsPage";
type Props = {
  student: StudentProfile;
};

export default function ExperienceCard({ student }: Props) {
  const experience = student.experience || [];

  if (experience.length === 0) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
        Experience
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {experience.map((exp, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" }, 
              gap: { xs: 1, sm: 4 },
              position: "relative"
            }}
          >
            {/* Year Column */}
            <Box sx={{ minWidth: { sm: 120 }, flexShrink: 0 }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  mt: 0.5
                }}
              >
                {exp.year}
              </Typography>
            </Box>

            {/* Content Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3, mb: 1 }}>
                {exp.title}
              </Typography>

              <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                {exp.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
