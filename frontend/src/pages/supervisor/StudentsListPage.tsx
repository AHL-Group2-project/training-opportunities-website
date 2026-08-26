import { useState, useEffect, useCallback } from "react";
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
  Pagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import StudentRow from "./StudentRow";
import {
  getMyStudents,
  exportMyStudents,
} from "../../services/supervisorService";
import type {
  SupervisorStudentListItem,
  StudentStatus,
} from "../../types/supervisorStudents.types";

type StatusFilter = "all" | StudentStatus;

const PAGE_SIZE = 10;

export default function StudentsListPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  const [students, setStudents] = useState<SupervisorStudentListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exporting, setExporting] = useState(false);

  // debounce على مربع البحث عشان ما نضرب الـ API كل ضغطة كيبورد
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // أي تغيير على البحث أو الفلتر -> رجّع لصفحة 1
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getMyStudents({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      setStudents(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as StatusFilter);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportMyStudents({
        search: debouncedSearch || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
    } finally {
      setExporting(false);
    }
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
          disabled={exporting}
        >
          {exporting ? "Exporting..." : "Export list"}
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

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={fetchStudents}>
              Try again
            </Button>
          }
        >
          Failed to load students. Please try again.
        </Alert>
      )}

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
            {loading && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              !error &&
              students.map((student) => (
                <StudentRow key={student.id} student={student} />
              ))}

            {!loading && !error && students.length === 0 && (
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

      {!error && totalPages > 1 && (
<Stack
  direction="row"
  sx={{
    mt: 3,
    justifyContent: "center",
  }}
>          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Container>
  );
}