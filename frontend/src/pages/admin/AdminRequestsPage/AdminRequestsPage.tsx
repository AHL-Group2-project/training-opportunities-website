import { useState } from "react";
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
  TextField,
} from "@mui/material";
import { MOCK_TRAINING_STATES } from "../../../mock/studentTrainingState";
import { MOCK_STUDENT_PROFILES } from "../../../mock/studentTrainingState";

interface RequestRow {
  studentId: number;
  studentName: string;
  type: "FT1" | "FT2";
  status: string;
}

export default function AdminRequestsPage() {
  const [rows, setRows] = useState<RequestRow[]>(() => {
    const list: RequestRow[] = [];
    MOCK_TRAINING_STATES.forEach((s) => {
      const profile = MOCK_STUDENT_PROFILES.find((p) => p.id === s.studentId);
      const name = profile?.name ?? `Student ${s.studentId}`;
      if (s.ft1.status === "request_pending")
        list.push({
          studentId: s.studentId,
          studentName: name,
          type: "FT1",
          status: s.ft1.status,
        });
      if (s.ft2.status === "request_pending")
        list.push({
          studentId: s.studentId,
          studentName: name,
          type: "FT2",
          status: s.ft2.status,
        });
    });
    return list;
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"approve" | "reject" | null>(
    null,
  );
  const [selectedRow, setSelectedRow] = useState<RequestRow | null>(null);
  const [reason, setReason] = useState("");

  const openDialog = (row: RequestRow, action: "approve" | "reject") => {
    setSelectedRow(row);
    setDialogAction(action);
    setReason("");
    setDialogOpen(true);
  };

  const confirm = () => {
    if (!selectedRow) return;
    if (dialogAction === "reject" && !reason.trim()) return;

    setRows((prev) =>
      prev.filter(
        (r) =>
          !(
            r.studentId === selectedRow.studentId && r.type === selectedRow.type
          ),
      ),
    );
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Training Requests
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Request</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No pending requests.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={`${row.studentId}-${row.type}`}>
                  <TableCell>{row.studentName}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Chip
                      label="Pending"
                      size="small"
                      sx={{
                        bgcolor: "#fffbeb",
                        color: "#d97706",
                        fontWeight: 600,
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => openDialog(row, "approve")}
                      sx={{ textTransform: "none", color: "#059669" }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      onClick={() => openDialog(row, "reject")}
                      sx={{ textTransform: "none", color: "#dc2626", ml: 1 }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogAction === "approve" ? "Approve Request" : "Reject Request"}
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Typography sx={{ mb: 2 }}>
              {selectedRow.studentName} — {selectedRow.type}
            </Typography>
          )}
          {dialogAction === "reject" && (
            <TextField
              label="Rejection Reason"
              fullWidth
              multiline
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirm}
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: dialogAction === "approve" ? "#059669" : "#dc2626",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
