import { useState, useEffect, useCallback } from "react";
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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../../lib/axios";

interface SupervisorSummary {
  _id: string;
  name: string;
  university?: string;
  department?: string;
}

interface ChangeRequestApiResponse {
  _id: string;
  supervisorId: SupervisorSummary;
  field: "university" | "department";
  currentValue: string;
  requestedValue: string;
  status: "pending" | "approved" | "rejected";
  reviewNote?: string;
  createdAt: string;
}

const STATUS_CHIP: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#d97706", bg: "#fffbeb" },
  approved: { label: "Approved", color: "#059669", bg: "#ecfdf5" },
  rejected: { label: "Rejected", color: "#dc2626", bg: "#fef2f2" },
};

export default function AdminChangeRequestsPage() {
  const [requests, setRequests] = useState<ChangeRequestApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Review dialog state
  const [reviewTarget, setReviewTarget] =
    useState<ChangeRequestApiResponse | null>(null);
  const [reviewDecision, setReviewDecision] = useState
    "approved" | "rejected" | null
  >(null);
  const [reviewNote, setReviewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get<ChangeRequestApiResponse[]>(
        "/change-requests",
      );
      setRequests(response.data);
    } catch (err) {
      console.error("Failed to load change requests:", err);
      setError("Failed to load change requests. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleOpenReview = (
    request: ChangeRequestApiResponse,
    decision: "approved" | "rejected",
  ) => {
    setReviewTarget(request);
    setReviewDecision(decision);
    setReviewNote("");
    setSubmitError(null);
  };

  const handleCloseReview = () => {
    setReviewTarget(null);
    setReviewDecision(null);
  };

  const handleSubmitReview = async () => {
    if (!reviewTarget || !reviewDecision) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await api.patch(`/change-requests/${reviewTarget._id}`, {
        decision: reviewDecision,
        reviewNote: reviewNote || undefined,
      });

      handleCloseReview();
      await fetchRequests();
    } catch (err) {
      console.error("Failed to submit review:", err);
      setSubmitError("Failed to submit decision. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Change Requests
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Review supervisor requests to update university or department information.
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell sx={{ fontWeight: 700 }}>Supervisor</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Field</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Current → Requested</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No change requests found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              requests.map((req) => {
                const chip = STATUS_CHIP[req.status] ?? STATUS_CHIP.pending;
                const isPending = req.status === "pending";
                return (
                  <TableRow key={req._id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        {req.supervisorId?.name ?? "Unknown"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {req.field}
                    </TableCell>
                    <TableCell>
                      "{req.currentValue}" → "{req.requestedValue}"
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={chip.label}
                        size="small"
                        sx={{
                          bgcolor: chip.bg,
                          color: chip.color,
                          fontWeight: 600,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {isPending ? (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            startIcon={<CheckIcon />}
                            onClick={() => handleOpenReview(req, "approved")}
                            sx={{ textTransform: "none" }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<CloseIcon />}
                            onClick={() => handleOpenReview(req, "rejected")}
                            sx={{ textTransform: "none" }}
                          >
                            Reject
                          </Button>
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          {req.reviewNote || "—"}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Review confirmation dialog */}
      <Dialog
        open={reviewTarget !== null}
        onClose={handleCloseReview}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {reviewDecision === "approved" ? "Approve" : "Reject"} Change Request
        </DialogTitle>
        <DialogContent>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          {reviewTarget && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <Typography variant="body2">
                <strong>{reviewTarget.supervisorId?.name}</strong> requested to
                change <strong>{reviewTarget.field}</strong> from "
                {reviewTarget.currentValue}" to "{reviewTarget.requestedValue}
                ".
              </Typography>
              <TextField
                label="Review note (optional)"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReview} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={reviewDecision === "approved" ? "success" : "error"}
            onClick={handleSubmitReview}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? <CircularProgress size={16} color="inherit" /> : null
            }
            sx={{ textTransform: "none" }}
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}