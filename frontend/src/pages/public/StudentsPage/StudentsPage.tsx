import { useState, useEffect } from "react";
import { Container, Typography, Grid, TextField, Box, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StudentCard from "./StudentCard";
import api from "../../../lib/axios";

export interface StudentProfile {
  _id?: string;
  userId?: string;
  name: string;
  major: string;
  university: string;
  about?: string;
  year?: string;
  graduationYear?: string;
  contactEmail?: string;
  phone?: string;
  skills?: string[];
  avatarUrl?: string;
  cvUrl?: string;
  social?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  experience?: {
    title: string;
    year: string;
    description: string;
  }[];
  projects?: {
    title: string;
    description: string;
    technologies: string;
    githubLink?: string;
    liveDemoLink?: string;
  }[];
  certificates?: {
    title: string;
    issuer: string;
    date: string;
    url: string;
  }[];
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get<StudentProfile[]>("/students/public");
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch public students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.major} ${student.skills?.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <Container
      sx={{
        py: 6,
        minHeight: "100vh",
      }}
    >
      <Typography variant="overline" color="primary">
        DIRECTORY
      </Typography>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
        Meet Palestinian field training students
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Explore portfolios of university students actively training with partner
        companies across Palestine.
      </Typography>

      <TextField
        fullWidth
        placeholder="Search students, skills, or major..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  color: "text.secondary",
                }}
              />
            ),
          },
        }}
        sx={{
          mb: 5,
          maxWidth: 600,
          "& .MuiInputBase-root": {
            height: 36,
          },
        }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredStudents.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No students found.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredStudents.map((student) => (
            <Grid
              key={student._id || student.userId}
              size={{ xs: 12, sm: 6, md: 3 }}
              sx={{ display: "flex" }}
            >
              <StudentCard student={student} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
