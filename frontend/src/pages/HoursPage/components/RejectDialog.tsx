import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import type { RejectTarget } from "../HoursPage.types";

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  rejectTarget: RejectTarget | null;
  rejectReason: string;
  onReasonChange: (value: string) => void;
  onConfirmRowReject: () => void;
  onConfirmFinalReject: () => void;
}

export default function RejectDialog({
  open,
  onClose,
  rejectTarget,
  rejectReason,
  onReasonChange,
  onConfirmRowReject,
  onConfirmFinalReject,
}: RejectDialogProps) {
  const isRow = rejectTarget?.type === "row";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#1C2B4A" }}>
        {isRow ? "Reject Hour Entry" : "Final Reject Training"}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {isRow
            ? "Provide a reason for rejecting this hour entry. The student will see this comment."
            : "Provide a reason for final rejection. The student must fix all issues and resubmit."}
        </Typography>
        <TextField
          label="Rejection Reason *"
          multiline
          rows={3}
          value={rejectReason}
          onChange={(e) => onReasonChange(e.target.value)}
          fullWidth
          placeholder="Explain why this is being rejected..."
        />
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
          color="error"
          onClick={isRow ? onConfirmRowReject : onConfirmFinalReject}
          disabled={!rejectReason.trim()}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Confirm Rejection
        </Button>
      </DialogActions>
    </Dialog>
  );
}
