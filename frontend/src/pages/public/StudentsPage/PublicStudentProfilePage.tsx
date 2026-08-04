import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import ProfileHero from "./profileComp/ProfileHero";
import ProfileSidebar from "./profileComp/ProfileSidebar";
import SkillsCard from "./profileComp/SkillsCard";
import ProjectsCard from "./profileComp/ProjectsCard";
import ExperienceCard from "./profileComp/ExperienceCard";


import { students } from "../../../mock/students";

export default function PublicStudentProfilePage() {
  const { id } = useParams();

  const student = students.find((student) => student.id === Number(id));

  if (!student) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4">Student not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <ProfileHero />

      <Container sx={{ mt: -10, mb: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProfileSidebar student={student} />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <SkillsCard student={student} />
            <ProjectsCard student={student} />
            <ExperienceCard student={student} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
