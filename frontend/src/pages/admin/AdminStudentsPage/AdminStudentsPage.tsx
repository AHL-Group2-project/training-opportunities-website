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
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  MOCK_STUDENT_PROFILES,
  MOCK_TRAINING_STATES,
} from "../../../mock/studentTrainingState";

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

export default function AdminStudentsPage() {
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [selectedSupervisorId, setSelectedSupervisorId] = useState("");

  // Add Student state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentMajor, setNewStudentMajor] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");

  const handleOpenAddDialog = () => {
    setNewStudentName("");
    setNewStudentId("");
    setNewStudentEmail("");
    setNewStudentMajor("");
    setNewStudentPassword(Math.random().toString(36).slice(-8) + "A1!");
    setAddDialogOpen(true);
  };

  const handleAddStudent = () => {
    // TODO: POST /api/admin/students
    alert(
      `Student ${newStudentName} created with password: ${newStudentPassword}`,
    );
    setAddDialogOpen(false);
  };

  const handleOpenAssign = (studentId: number) => {
    setSelectedStudentId(studentId);
    setSelectedSupervisorId("");
    setAssignDialogOpen(true);
  };

  const handleAssignSupervisor = () => {
    if (selectedStudentId && selectedSupervisorId) {
      console.log(
        `Assigning supervisor ${selectedSupervisorId} to student ${selectedStudentId}`,
      );
      alert(`Supervisor successfully assigned!`);
    }
    setAssignDialogOpen(false);
  };

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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ textTransform: "none" }}
        >
          Add Student
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
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
            {MOCK_STUDENT_PROFILES.map((student) => {
              const state = MOCK_TRAINING_STATES.find(
                (s) => s.studentId === student.id,
              );
              return (
                <TableRow key={student.id}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {student.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {student.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>
                    {getStatusChip(state?.ft1.status ?? "not_started")}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(state?.ft2.status ?? "not_started")}
                  </TableCell>
                  <TableCell>
                    {student.supervisorId ? `ID: ${student.supervisorId}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/training/hours/${student.id}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        borderColor: "divider",
                        color: "#20324a",
                        mr: 1,
                      }}
                    >
                      View Hours
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenAssign(student.id)}
                      sx={{ textTransform: "none" }}
                    >
                      Assign Supervisor
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
              <MenuItem value="101">Dr. Ahmad</MenuItem>
              <MenuItem value="102">Dr. Sarah</MenuItem>
              <MenuItem value="103">Dr. Khalid</MenuItem>
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
              label="University Email *"
              type="email"
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
              fullWidth
              helperText="Must use the university domain (e.g., @ppu.edu.ps)"
            />
            <TextField
              label="Major *"
              value={newStudentMajor}
              onChange={(e) => setNewStudentMajor(e.target.value)}
              fullWidth
            />
            <TextField
              label="Temporary Password *"
              value={newStudentPassword}
              onChange={(e) => setNewStudentPassword(e.target.value)}
              fullWidth
              helperText="Provide this temporary password to the student. They will be forced to change it on their first login."
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
    </Container>
  );
}
