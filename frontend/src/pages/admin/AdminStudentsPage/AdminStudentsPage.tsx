import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  TablePagination,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { adminApi } from "../../../lib/api/admin";
import { useAuth } from "../../../context/authContext";

function getStatusChip(status: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    not_started: { label: "Not Started", color: "#64748b", bg: "#f1f5f9" },
    request_pending: {
      label: "Request Pending",
      color: "#d97706",
      bg: "#fffbeb",
    },
    in_progress: { label: "In Progress", color: "#2563eb", bg: "#eff6ff" },
    completed: { label: "Completed", color: "#059669", bg: "#ecfdf5" },
    request_rejected: { label: "Rejected", color: "#dc2626", bg: "#fef2f2" },
  };
  const style = map[status] || map.not_started;
  return (
    <Chip
      label={style.label}
      size="small"
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 600,
        borderRadius: 1,
      }}
    />
  );
}

const UNIVERSITY_DOMAINS: Record<string, string> = {
  "Palestine Polytechnic University": "@ppu.edu.ps",
  "Birzeit University": "@birzeit.edu.ps",
  "An-Najah National University": "@najah.edu.ps",
  "Al-Quds University": "@alquds.edu.ps",
  "Arab American University": "@aaup.edu.ps",
  "Hebron University": "@hebron.edu.ps",
  "Al-Quds Open University": "@qou.edu.ps",
  "Al-Zaytoonah University of Science and Technology": "@zaytoonah.edu.ps",
  "Palestine Technical University - Kadoorie": "@ptuk.edu.ps",
};

export default function AdminStudentsPage() {
  const { user } = useAuth();
  const expectedDomain = user?.university
    ? UNIVERSITY_DOMAINS[user.university] || ""
    : "";

  const [students, setStudents] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<any[]>([]);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [selectedSupervisorId, setSelectedSupervisorId] = useState("");

  // Add Student state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentMajor, setNewStudentMajor] = useState("");

  // Password Reveal Modal state
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generatedUser, setGeneratedUser] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await adminApi.getStudents();
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const res = await adminApi.getSupervisors();
      setSupervisors(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch supervisors", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchSupervisors();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddDialog = () => {
    setNewStudentName("");
    setNewStudentId("");
    setNewStudentEmail("");
    setNewStudentMajor("");
    setAddDialogOpen(true);
  };

  const handleAddStudent = async () => {
    if (
      !newStudentName ||
      !newStudentEmail ||
      !newStudentId ||
      !newStudentMajor
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const fullEmail = expectedDomain
      ? `${newStudentEmail}${expectedDomain}`
      : newStudentEmail;

    try {
      const res = await adminApi.createStudent({
        name: newStudentName,
        email: fullEmail,
        universityId: newStudentId,
        major: newStudentMajor,
      });

      setGeneratedUser(newStudentName);
      setGeneratedPassword(res.data.tempPassword);
      setAddDialogOpen(false);
      setPasswordModalOpen(true);
      fetchStudents();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create student.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  const handleOpenAssign = (studentId: string) => {
    setSelectedStudentId(studentId);
    setSelectedSupervisorId("");
    setAssignDialogOpen(true);
  };

  const handleAssignSupervisor = async () => {
    if (selectedStudentId && selectedSupervisorId) {
      try {
        await adminApi.assignSupervisor(
          selectedStudentId,
          selectedSupervisorId,
        );
        alert(`Supervisor successfully assigned!`);
        setAssignDialogOpen(false);
        fetchStudents();
      } catch (error: any) {
        alert(error.response?.data?.message || "Failed to assign supervisor.");
      }
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    const name = student.name?.toLowerCase() || "";
    const email = (student.userId?.email || student.email)?.toLowerCase() || "";
    return name.includes(query) || email.includes(query);
  });

  // Calculate paginated students
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredStudents.length) : 0;
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          All Students
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 250, bgcolor: "background.paper", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
            sx={{ textTransform: "none" }}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Major</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>FT1 Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>FT2 Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Supervisor</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map((student) => {
              return (
                <TableRow key={student._id}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {student.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {student.userId?.email || student.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>{getStatusChip("not_started")}</TableCell>
                  <TableCell>{getStatusChip("not_started")}</TableCell>
                  <TableCell>
                    {student.supervisorId?.email ||
                      student.supervisorId?.name ||
                      (student.supervisorId ? "Assigned" : "—")}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenAssign(student._id)}
                      sx={{ textTransform: "none" }}
                    >
                      Assign Supervisor
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 69 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Assign Supervisor Dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Assign Supervisor</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Supervisor</InputLabel>
            <Select
              value={selectedSupervisorId}
              label="Select Supervisor"
              onChange={(e) => setSelectedSupervisorId(e.target.value)}
            >
              {supervisors.map((supervisor) => (
                <MenuItem
                  key={supervisor.userId._id}
                  value={supervisor.userId._id}
                >
                  {supervisor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAssignDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAssignSupervisor}
            sx={{ textTransform: "none" }}
            disabled={!selectedSupervisorId}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Student Name *"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              fullWidth
            />
            <TextField
              label="University ID *"
              value={newStudentId}
              onChange={(e) => setNewStudentId(e.target.value)}
              fullWidth
            />
            <TextField
              label="University Email Prefix *"
              type="text"
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: expectedDomain ? (
                    <InputAdornment position="end">
                      {expectedDomain}
                    </InputAdornment>
                  ) : null,
                },
              }}
              helperText={
                expectedDomain
                  ? `Email domain is restricted to your university (${expectedDomain})`
                  : "Enter full university email"
              }
            />
            <TextField
              label="Major *"
              value={newStudentMajor}
              onChange={(e) => setNewStudentMajor(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddStudent}
            sx={{ textTransform: "none" }}
          >
            Create Student
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Reveal Modal */}
      <Dialog
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "success.main", fontWeight: "bold" }}>
          User Created Successfully!
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            The account for <strong>{generatedUser}</strong> has been created.
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.default",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Temporary Password:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                {generatedPassword}
              </Typography>
              <IconButton
                onClick={copyToClipboard}
                color="primary"
                size="small"
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 2, display: "block" }}
          >
            Please copy this temporary password and send it securely to the
            user. You will not be able to view it again once this window is
            closed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setPasswordModalOpen(false)}
            sx={{ textTransform: "none" }}
          >
            I have copied the password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
