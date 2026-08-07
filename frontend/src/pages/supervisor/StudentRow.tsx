import {
  TableRow,
  TableCell,
  Avatar,
  Stack,
  Typography,
  Chip,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { Student } from "../../types/student.types";

type StudentStatus = "Completed" | "Active" | "Not Started";

interface StudentRowProps {
  student: Student;
}

function getStudentStatus(student: Student): StudentStatus {
  if (student.ft1 && student.ft2) return "Completed";
  if (student.ft1 || student.ft2) return "Active";
  return "Not Started";
}

function getCurrentInternship(student: Student): string {
  if (student.experience && student.experience.length > 0) {
    return student.experience[0].title;
  }
  return "—";
}

const statusColors: Record<StudentStatus, "success" | "info" | "default"> = {
  Completed: "success",
  Active: "info",
  "Not Started": "default",
};

export default function StudentRow({ student }: StudentRowProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const status = getStudentStatus(student);
  const currentInternship = getCurrentInternship(student);

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
          <Avatar sx={{ bgcolor: "primary.main" }}>{student.initials}</Avatar>
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
          {student.year}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{currentInternship}</Typography>
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
          —{" "}
          {/* TODO: totalHours not in mock yet, waiting on team to add field */}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Chip label={status} size="small" color={statusColors[status]} />
      </TableCell>

      <TableCell align="right">
        <Button
          size="small"
          onClick={handleMenuOpen}
          endIcon={<MoreVertIcon />}
        >
          Actions
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => handleAction(`/supervisor/students/${student.id}`)}
          >
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => handleAction(`/training/hours/${student.id}`)}
          >
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
