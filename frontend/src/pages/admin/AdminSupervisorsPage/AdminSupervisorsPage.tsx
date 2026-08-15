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
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { MOCK_USERS } from "../../../mock/users";
import { MOCK_STUDENT_PROFILES } from "../../../mock/studentTrainingState";

export default function AdminSupervisorsPage() {
  const supervisors = MOCK_USERS.filter((u) => u.role === "supervisor");

  // Add Supervisor state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSupervisorName, setNewSupervisorName] = useState("");
  const [newSupervisorEmail, setNewSupervisorEmail] = useState("");
  const [newSupervisorDepartment, setNewSupervisorDepartment] = useState("");
  const [newSupervisorPassword, setNewSupervisorPassword] = useState("");

  const handleOpenAddDialog = () => {
    setNewSupervisorName("");
    setNewSupervisorEmail("");
    setNewSupervisorDepartment("");
    setNewSupervisorPassword(Math.random().toString(36).slice(-8) + "A1!");
    setAddDialogOpen(true);
  };

  const handleAddSupervisor = () => {
    // TODO: POST /api/admin/supervisors
    alert(
      `Supervisor ${newSupervisorName} created with password: ${newSupervisorPassword}`,
    );
    setAddDialogOpen(false);
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
          Supervisors
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ textTransform: "none" }}
        >
          Add Supervisor
        </Button>
      </Box>
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

      {/* Add Supervisor Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Supervisor</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Supervisor Name *"
              value={newSupervisorName}
              onChange={(e) => setNewSupervisorName(e.target.value)}
              fullWidth
            />
            <TextField
              label="University Email *"
              type="email"
              value={newSupervisorEmail}
              onChange={(e) => setNewSupervisorEmail(e.target.value)}
              fullWidth
              helperText="Must use the university domain (e.g., @ppu.edu.ps)"
            />
            <TextField
              label="Department *"
              value={newSupervisorDepartment}
              onChange={(e) => setNewSupervisorDepartment(e.target.value)}
              fullWidth
            />
            <TextField
              label="Temporary Password *"
              value={newSupervisorPassword}
              onChange={(e) => setNewSupervisorPassword(e.target.value)}
              fullWidth
              helperText="Provide this temporary password to the supervisor. They will be forced to change it on their first login."
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
            onClick={handleAddSupervisor}
            sx={{ textTransform: "none" }}
          >
            Create Supervisor
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
