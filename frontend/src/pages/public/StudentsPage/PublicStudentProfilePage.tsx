import { Container, Grid, Typography, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";

import ProfileHero from "./profileComp/ProfileHero";
import ProfileSidebar from "./profileComp/ProfileSidebar";
import SkillsCard from "./profileComp/SkillsCard";
import ProjectsCard from "./profileComp/ProjectsCard";
import ExperienceCard from "./profileComp/ExperienceCard";
import type { StudentProfile } from "./StudentsPage";

export default function PublicStudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/student/public/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Failed to fetch student profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!student) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4">Student not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <ProfileHero student={student} />

      <Container maxWidth="lg" sx={{ mt: -10, mb: 8 }}>
        <Grid container spacing={4}>
          {/* Left Sidebar */}
          <Grid sx={{ xs: 12, md: 4 }}>
            <ProfileSidebar student={student} />
          </Grid>

          {/* Main Content Area */}
          <Grid sx={{ xs: 12, md: 8 }}>
            <Box sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: "background.paper", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid", borderColor: "divider" }}>
              <SkillsCard student={student} />
              <ProjectsCard student={student} />
              <ExperienceCard student={student} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
