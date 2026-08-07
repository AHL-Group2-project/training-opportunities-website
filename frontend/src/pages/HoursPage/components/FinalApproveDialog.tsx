import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { formatHours } from "../../../mock/hoursLog.ts";
import type { TrainingType } from "../../../mock/hoursLog.ts";
import type { SingleTrainingState } from "../../../mock/studentTrainingState.ts";

interface FinalApproveDialogProps {
  open: boolean;
  onClose: () => void;
  activeFt: TrainingType;
  companyApprovedHours: number;
  ftState: SingleTrainingState;
  allEntriesReviewed: boolean;
  onConfirm: () => void;
}

export default function FinalApproveDialog({
  open,
  onClose,
  activeFt,
  companyApprovedHours,
  ftState,
  allEntriesReviewed,
  onConfirm,
}: FinalApproveDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "text.primary" }}>
        Final Approve {activeFt}
      </DialogTitle>
      <DialogContent>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Company approved hours:{" "}
            <strong>{formatHours(companyApprovedHours)}</strong> /{" "}
            {ftState.requiredHours}:00
          </Typography>
          <Typography variant="body2">
            All entries reviewed:{" "}
            <strong>{allEntriesReviewed ? "Yes" : "No"}</strong>
          </Typography>
        </Alert>
        <Typography variant="body2" color="text.secondary">
          This will mark {activeFt} as completed. The student can proceed to the
          next training.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: "none", color: "text.secondary" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            bgcolor: "#2E7D32",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#1B5E20" },
          }}
        >
          Confirm Final Approval
        </Button>
      </DialogActions>
    </Dialog>
  );
}
