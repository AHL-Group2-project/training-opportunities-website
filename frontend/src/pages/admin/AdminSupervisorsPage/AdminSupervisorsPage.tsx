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
  TablePagination,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { adminApi } from "../../../lib/api/admin";
import { useAuth } from "../../../context/authContext";

// Mapping of universities to their official email domains (must match backend)
const UNIVERSITY_DOMAINS: Record<string, string> = {
  "Palestine Polytechnic University": "@ppu.edu.ps",
  "Birzeit University": "@birzeit.edu",
  BZU: "@birzeit.edu",
  "An-Najah National University": "@najah.edu.ps",
  "Al-Quds University": "@alquds.edu",
  "Arab American University": "@aaup.edu",
  "Hebron University": "@hebron.edu.ps",
  "Al-Quds Open University": "@qou.edu.ps",
  "Al-Zaytoonah University": "@zaytoonah.edu.ps",
  "Palestine Technical University - Kadoorie": "@ptuk.edu.ps",
  PTUK: "@ptuk.edu.ps",
};

export default function AdminSupervisorsPage() {
  const { user } = useAuth();
  const expectedDomain = user?.university
    ? UNIVERSITY_DOMAINS[user.university] || ""
    : "";

  const [supervisorsList, setSupervisorsList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Add/Edit Supervisor state
  const [editingSupervisor, setEditingSupervisor] = useState<any | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSupervisorName, setNewSupervisorName] = useState("");
  const [newSupervisorEmail, setNewSupervisorEmail] = useState("");
  const [newSupervisorDepartment, setNewSupervisorDepartment] = useState("");

  // Password Reveal Modal state
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generatedUser, setGeneratedUser] = useState("");

  const fetchSupervisors = async () => {
    try {
      const res = await adminApi.getSupervisors();
      setSupervisorsList(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch supervisors", error);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddDialog = () => {
    setEditingSupervisor(null);
    setNewSupervisorName("");
    setNewSupervisorEmail("");
    setNewSupervisorDepartment("");
    setAddDialogOpen(true);
  };

  const handleOpenEditDialog = (supervisor: any) => {
    setEditingSupervisor(supervisor);
    setNewSupervisorName(supervisor.name);
    const email = supervisor.userId?.email || supervisor.email || "";
    setNewSupervisorEmail(email.replace(expectedDomain, ""));
    setNewSupervisorDepartment(supervisor.department || "");
    setAddDialogOpen(true);
  };

  const handleAddSupervisor = async () => {
    if (!newSupervisorName || !newSupervisorDepartment || (!editingSupervisor && !newSupervisorEmail)) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (editingSupervisor) {
        await adminApi.updateSupervisor(editingSupervisor._id, {
          name: newSupervisorName,
          department: newSupervisorDepartment,
        });
        setAddDialogOpen(false);
        fetchSupervisors();
      } else {
        const fullEmail = expectedDomain
          ? `${newSupervisorEmail}${expectedDomain}`
          : newSupervisorEmail;

        const res = await adminApi.createSupervisor({
          name: newSupervisorName,
          email: fullEmail,
          department: newSupervisorDepartment,
        });

        setGeneratedUser(newSupervisorName);
        setGeneratedPassword(res.data.tempPassword);
        setAddDialogOpen(false);
        setPasswordModalOpen(true);
        fetchSupervisors();
      }
    } catch (error: any) {
      alert(error.response?.data?.message || `Failed to ${editingSupervisor ? 'update' : 'create'} supervisor.`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  // Filter supervisors based on search query
  const filteredSupervisors = supervisorsList.filter((sup) => {
    const query = searchQuery.toLowerCase();
    const name = sup.name?.toLowerCase() || "";
    const email = (sup.userId?.email || sup.email)?.toLowerCase() || "";
    return name.includes(query) || email.includes(query);
  });

  // Calculate paginated supervisors
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredSupervisors.length)
      : 0;
  const paginatedSupervisors = filteredSupervisors.slice(
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
          Supervisors
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search supervisors..."
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
            Add Supervisor
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSupervisors.map((sup) => {
              return (
                <TableRow key={sup._id}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>{sup.name}</Typography>
                  </TableCell>
                  <TableCell>{sup.userId?.email || sup.email}</TableCell>
                  <TableCell>{sup.department}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpenEditDialog(sup)}
                      sx={{ textTransform: "none" }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredSupervisors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Add Supervisor Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingSupervisor ? "Edit Supervisor" : "Add New Supervisor"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Supervisor Name *"
              variant="outlined"
              value={newSupervisorName}
              onChange={(e) => setNewSupervisorName(e.target.value)}
              fullWidth
            />
            <TextField
              label="University Email Prefix *"
              type="text"
              variant="outlined"
              value={newSupervisorEmail}
              onChange={(e) => setNewSupervisorEmail(e.target.value)}
              fullWidth
              disabled={!!editingSupervisor}
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
              label="Department *"
              variant="outlined"
              value={newSupervisorDepartment}
              onChange={(e) => setNewSupervisorDepartment(e.target.value)}
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
            onClick={handleAddSupervisor}
            sx={{ textTransform: "none" }}
          >
            {editingSupervisor ? "Save Changes" : "Create Supervisor"}
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
