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
} from "@mui/material";
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
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        All Students
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
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
                        borderColor: "#20324a",
                        color: "#20324a",
                      }}
                    >
                      View Hours
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
