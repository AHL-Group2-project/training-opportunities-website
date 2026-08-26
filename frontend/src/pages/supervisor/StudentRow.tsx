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
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type {
  SupervisorStudentListItem,
  StudentStatus,
} from "../../types/supervisorStudents.types";

interface StudentRowProps {
  student: SupervisorStudentListItem;
}

const statusColors: Record<StudentStatus, "success" | "info" | "default"> = {
  Completed: "success",
  Active: "info",
  "Not Started": "default",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function StudentRow({ student }: StudentRowProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
            {student.name}
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
          label={student.ft1 ? "Done" : "Pending"}
          size="small"
          color={student.ft1 ? "success" : "default"}
        />
      </TableCell>

      <TableCell align="center">
        <Chip
          label={student.ft2 ? "Done" : "Pending"}
          size="small"
          color={student.ft2 ? "success" : "default"}
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
        </Menu>
      </TableCell>
    </TableRow>
  );
}