import { useState } from "react";
import { Container, Typography, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StudentCard from "./StudentCard";
import { students } from "../../../mock/students";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.major} ${student.skills.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container
      sx={{
        py: 6,
        bgcolor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <Typography variant="overline" color="primary">
        DIRECTORY
      </Typography>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
        Meet PPU field training students
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Explore portfolios of PPU students actively training with partner
        companies.
      </Typography>

      <TextField
        fullWidth
        placeholder="Search students, skills..."
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

      <Grid container spacing={2}>
        {filteredStudents.map((student) => (
          <Grid
            key={student.id}
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{ display: "flex" }}
          >
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}