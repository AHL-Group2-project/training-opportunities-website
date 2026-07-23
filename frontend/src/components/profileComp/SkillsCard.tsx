import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import type { Student } from "../../types/student.types";
type Props = {
  student: Student;
};

export default function SkillsCard({ student }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        mb: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Skills
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: "wrap",
          }}
        >
          {student.skills.map((skill) => (
            <Chip key={skill} label={skill} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
