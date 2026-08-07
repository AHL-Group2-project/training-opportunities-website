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
} from "@mui/material";
import { MOCK_USERS } from "../../../mock/users";
import { MOCK_STUDENT_PROFILES } from "../../../mock/studentTrainingState";

export default function AdminSupervisorsPage() {
  const supervisors = MOCK_USERS.filter((u) => u.role === "supervisor");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Supervisors
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Assigned Students</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supervisors.map((sup) => {
              const assignedCount = MOCK_STUDENT_PROFILES.filter(
                (s) => s.supervisorId === sup.id,
              ).length;
              return (
                <TableRow key={sup.id}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>{sup.name}</Typography>
                  </TableCell>
                  <TableCell>{sup.email}</TableCell>
                  <TableCell>{assignedCount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
