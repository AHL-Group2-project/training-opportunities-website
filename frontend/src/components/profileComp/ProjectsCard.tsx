import { Card, CardContent, Grid, Typography } from "@mui/material";

import type { Student } from "../../types/student.types";
type Props = {
  student: Student;
};

export default function ProjectsCard({ student }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        mb: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Projects
        </Typography>

        <Grid container spacing={2}>
          {student.projects.map((project) => (
            <Grid key={project.title} size={{ xs: 12, md: 6 }}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                  }}
                >
                  {project.description}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                  }}
                >
                  {project.technologies}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
