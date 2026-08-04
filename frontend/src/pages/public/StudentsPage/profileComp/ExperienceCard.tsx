import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import type { Student } from "../../types/student.types";
type Props = {
  student: Student;
};

export default function ExperienceCard({ student }: Props) {
  return (
    <Card sx={{ borderRadius: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Experience
        </Typography>

        <Stack spacing={3}>
          {student.experience.map((exp) => (
            <Box key={`${exp.year}-${exp.title}`}>
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                {exp.year}
              </Typography>

              <Typography variant="h6">{exp.title}</Typography>

              <Typography sx={{ color: "text.secondary" }}>
                {exp.description}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
