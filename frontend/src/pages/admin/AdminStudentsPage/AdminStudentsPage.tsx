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
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        All Students
      </Typography>
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
    </Container>
  );
}
