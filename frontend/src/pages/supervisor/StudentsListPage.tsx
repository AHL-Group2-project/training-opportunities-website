import { useState, useMemo } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { students } from "../../mock/students";
import StudentRow from "./StudentRow";
import type { Student } from "../../types/student.types";

type StatusFilter = "all" | "Completed" | "Active" | "Not Started";

function getStudentStatus(
  student: Student,
): "Completed" | "Active" | "Not Started" {
  if (student.ft1 && student.ft2) return "Completed";
  if (student.ft1 || student.ft2) return "Active";
  return "Not Started";
}

export default function StudentsListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as StatusFilter);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || getStudentStatus(student) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const handleExport = () => {
    console.log("Export list clicked", filteredStudents);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          mb: 4,
        }}
        spacing={2}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          My Students
        </Typography>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export list
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search by name"
          value={search}
          onChange={handleSearchChange}
          size="small"
          fullWidth
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Filter by status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Filter by status"
            onChange={handleStatusChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Not Started">Not Started</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>University / Major</TableCell>
              <TableCell>Current Internship</TableCell>
              <TableCell align="center">FT1</TableCell>
              <TableCell align="center">FT2</TableCell>
              <TableCell align="center">Total Hours</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))}

            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No students match your search.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
