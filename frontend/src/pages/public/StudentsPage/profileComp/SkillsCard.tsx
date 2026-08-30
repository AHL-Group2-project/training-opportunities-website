import { Box, Chip, Stack, Typography } from "@mui/material";

import type { StudentProfile } from "../StudentsPage";
type Props = {
  student: StudentProfile;
};

export default function SkillsCard({ student }: Props) {
  const skills = student.skills || [];
  
  if (skills.length === 0) return null;

  return (
    <Box component="section" sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Skills
      </Typography>

      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: 1.5
        }}
      >
        {skills.map((skill) => (
          <Chip 
            key={skill} 
            label={skill} 
            variant="outlined"
            sx={{ 
              borderRadius: 1.5, 
              border: "1px solid", 
              borderColor: "divider",
              bgcolor: "transparent",
              color: "text.primary",
              fontWeight: 500,
              px: 0.5,
              "&:hover": {
                bgcolor: "action.hover",
              }
            }} 
          />
        ))}
      </Stack>
    </Box>
  );
}
