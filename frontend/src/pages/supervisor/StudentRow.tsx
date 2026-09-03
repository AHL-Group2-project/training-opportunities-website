import {
  TableRow,
  TableCell,
  Avatar,
  Stack,
  Typography,
  Chip,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type {
  SupervisorStudentListItem,
  StudentStatus,
} from "../../types/supervisorStudents.types";
import { getPublicCompanies } from "../../services/companyService";
import { assignCompany } from "../../services/supervisorService";

interface StudentRowProps {
  student: SupervisorStudentListItem;
}

const statusColors: Record<StudentStatus, "success" | "info" | "default"> = {
  Completed: "success",
  Active: "info",
  "Not Started": "default",
};

const getInitials = (name: string) =>
  (name || "Unknown")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function StudentRow({ student }: StudentRowProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [noAccount, setNoAccount] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  
  const fetchCompanies = async () => {
    try {
      const data = await getPublicCompanies();
      setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignClick = () => {
    handleMenuClose();
    fetchCompanies();
    setAssignDialogOpen(true);
  };

  const handleAssignSubmit = async () => {
    if (!noAccount && !selectedCompanyId) return;
    if (noAccount && !newCompanyName.trim()) return;
    
    try {
      setAssignLoading(true);
      await assignCompany(
        student.id,
        noAccount ? null : selectedCompanyId,
        noAccount ? newCompanyName : undefined
      );
      setAssignDialogOpen(false);
      window.location.reload(); // Refresh the page to show the new company assignment
    } catch (err) {
      console.error(err);
    } finally {
      setAssignLoading(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (path: string) => {
    handleMenuClose();
    navigate(path);
  };

  return (
    <TableRow hover>
      <TableCell>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate(`/supervisor/students/${student.id}`)}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {getInitials(student.name)}
          </Avatar>
          <Typography
            sx={{
              fontWeight: "medium",
              "&:hover": { textDecoration: "underline", color: "primary.main" },
            }}
          >
            {student.name || "Unknown Student"}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{student.major}</Typography>
        <Typography variant="caption" color="text.secondary">
          {student.university} • Year {student.year}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {student.currentInternship || "—"}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Chip
          label={student.ft1 ? "Completed" : (student.currentInternship && student.status === "Active" ? "Active" : "Not Started")}
          size="small"
          color={student.ft1 ? "success" : (student.currentInternship && student.status === "Active" ? "primary" : "default")}
        />
      </TableCell>

      <TableCell align="center">
        <Chip
          label={student.ft2 ? "Completed" : (student.ft1 && student.status === "Active" ? "Active" : "Not Started")}
          size="small"
          color={student.ft2 ? "success" : (student.ft1 && student.status === "Active" ? "primary" : "default")}
        />
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2" color="text.secondary">
          {student.totalHours}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Chip
          label={student.status}
          size="small"
          color={statusColors[student.status]}
        />
      </TableCell>

      <TableCell align="right">
        <Button size="small" onClick={handleMenuOpen} endIcon={<MoreVertIcon />}>
          Actions
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleAction(`/supervisor/students/${student.id}`)}>
            View Profile
          </MenuItem>
          <MenuItem onClick={() => handleAction(`/training/hours/${student.id}`)}>
            View Hours
          </MenuItem>
          <MenuItem onClick={() => handleAction(`/training/reports`)}>
            View Reports
          </MenuItem>
          <MenuItem onClick={handleAssignClick}>
            Assign Company
          </MenuItem>
        </Menu>
      </TableCell>

      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Company</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Assigning a company will automatically approve any pending request and update the student's active internship record.
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={noAccount}
                onChange={(e) => {
                  setNoAccount(e.target.checked);
                  setSelectedCompanyId(null);
                  setNewCompanyName("");
                }}
              />
            }
            label="The company does not have an account on this platform"
            sx={{ mb: 2 }}
          />

          {!noAccount ? (
            <FormControl fullWidth size="small">
              <InputLabel>Select Company</InputLabel>
              <Select
                value={selectedCompanyId || ""}
                label="Select Company"
                onChange={(e) => setSelectedCompanyId(e.target.value)}
              >
                <MenuItem value="" disabled>
                  <em>Choose a company</em>
                </MenuItem>
                {companies.map((c: any) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Company Name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              placeholder="e.g. Acme Corp"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAssignSubmit}
            disabled={assignLoading}
          >
            {assignLoading ? "Assigning..." : "Assign Company"}
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}