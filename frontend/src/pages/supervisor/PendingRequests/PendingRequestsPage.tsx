import { useEffect, useMemo, useState } from "react";

import {
  AssignmentOutlined,
  CancelOutlined,
  CheckCircle,
  Close,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  getMyRequests,
  updateRequestStatus as updateRequestStatusApi,
} from "../../../services/supervisorRequestsService";

type RequestStatus = "pending" | "approved" | "rejected";
type TrainingType = "ft1" | "ft2";
type RequestTab = "pending" | "approved" | "rejected" | "All";

interface InternshipRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  company: string;
  position: string;
  trainingType: TrainingType;
  submittedDate: string;
  status: RequestStatus;
  attachmentName?: string;
  attachmentUrl?: string;
  rejectionComment?: string;
}

const statusStyles = {
  pending: {
    color: "#eab308",
    backgroundColor: "rgba(234, 179, 8, 0.1)",
  },
  approved: {
    color: "#22c55e",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
  },
  rejected: {
    color: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
};

function PendingRequestsPage() {
  const [requests, setRequests] = useState<InternshipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] =
    useState<InternshipRequest | null>(null);

  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionComment, setRejectionComment] = useState("");

  const [selectedTab, setSelectedTab] = useState<RequestTab>("pending");

  const [selectedType, setSelectedType] = useState<TrainingType | "All">("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getMyRequests();
      const formatted = data.map((req: any) => ({
        id: req._id,
        studentName: req.studentId?.name || "Unknown",
        studentEmail: req.studentId?.userId?.email || "No Email",
        company: req.companyName,
        position: req.position,
        trainingType: req.type,
        submittedDate: new Date(req.createdAt).toISOString().split("T")[0],
        status: req.status,
        attachmentName:
          req.attachments && req.attachments.length > 0
            ? req.attachments[0]
            : undefined,
        attachmentUrl:
          req.attachments && req.attachments.length > 0 ? "#" : undefined, // Placeholder for actual download URL
        rejectionComment: req.rejectionComment,
      }));
      setRequests(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesTab =
        selectedTab === "All" || request.status === selectedTab;

      const matchesType =
        selectedType === "All" || request.trainingType === selectedType;

      const matchesStartDate = !startDate || request.submittedDate >= startDate;

      const matchesEndDate = !endDate || request.submittedDate <= endDate;

      return matchesTab && matchesType && matchesStartDate && matchesEndDate;
    });
  }, [requests, selectedTab, selectedType, startDate, endDate]);

  function clearFilters() {
    setSelectedType("All");
    setStartDate("");
    setEndDate("");
  }

  function openReviewDialog(request: InternshipRequest) {
    setSelectedRequest(request);
    setIsRejecting(false);
    setRejectionComment(request.rejectionComment ?? "");
  }

  function closeReviewDialog() {
    setSelectedRequest(null);
    setIsRejecting(false);
    setRejectionComment("");
  }

  async function updateRequestStatus(
    status: "approved" | "rejected",
    comment?: string,
  ) {
    if (!selectedRequest) return;

    try {
      await updateRequestStatusApi(selectedRequest.id, status, comment);

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === selectedRequest.id
            ? {
                ...request,
                status,
                rejectionComment: status === "rejected" ? comment : undefined,
              }
            : request,
        ),
      );
    } catch (err) {
      console.error(err);
    }

    closeReviewDialog();
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        px: { xs: 2, sm: 3, md: 5 },
        py: 4,
      }}
    >
      {/* Page header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          Internship Requests
        </Typography>

        <Typography color="text.secondary">
          Review students&apos; internship requests and track their approval
          status.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Tabs */}
        <Box
          sx={{
            px: { xs: 1, sm: 3 },
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={(_, newValue: RequestTab) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              value="pending"
              label="Pending"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />

            <Tab
              value="approved"
              label="Approved"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />

            <Tab
              value="rejected"
              label="Rejected"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />

            <Tab
              value="All"
              label="All"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
          </Tabs>
        </Box>

        {/* Filters */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 160 },
            }}
          >
            <InputLabel>Training Type</InputLabel>

            <Select
              value={selectedType}
              label="Training Type"
              onChange={(event) =>
                setSelectedType(event.target.value as TrainingType | "All")
              }
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="ft1">FT1</MenuItem>
              <MenuItem value="ft2">FT2</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            size="small"
            label="From"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              width: { xs: "100%", sm: 180 },
            }}
          />

          <TextField
            type="date"
            size="small"
            label="To"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              width: { xs: "100%", sm: 180 },
            }}
          />

          <Button
            onClick={clearFilters}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Table or empty state */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 9 }}>
            <CircularProgress sx={{ color: "#6D4CCB" }} />
          </Box>
        ) : filteredRequests.length > 0 ? (
          <TableContainer>
            <Table sx={{ minWidth: 950 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "background.paper" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>Position</TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Submitted Date
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>

                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRequests.map((request) => {
                  const initials = request.studentName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2);

                  return (
                    <TableRow
                      key={request.id}
                      hover
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: "rgba(109, 76, 203, 0.1)",
                              color: "#6D4CCB",
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            {initials}
                          </Avatar>

                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {request.studentName}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {request.studentEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>{request.company}</TableCell>

                      <TableCell>{request.position}</TableCell>

                      <TableCell>
                        <Chip
                          label={request.trainingType}
                          size="small"
                          sx={{
                            color: "#6D4CCB",
                            backgroundColor: "rgba(109, 76, 203, 0.1)",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell>{request.submittedDate}</TableCell>

                      <TableCell>
                        <Chip
                          label={request.status}
                          size="small"
                          sx={{
                            color: statusStyles[request.status].color,
                            backgroundColor:
                              statusStyles[request.status].backgroundColor,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={() => openReviewDialog(request)}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                          }}
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              py: 9,
              px: 2,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                backgroundColor: "rgba(109, 76, 203, 0.1)",
                color: "#6D4CCB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AssignmentOutlined sx={{ fontSize: 30 }} />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {selectedTab === "pending"
                ? "No pending requests"
                : "No requests found"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              There are no internship requests matching the selected filters.
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog
        open={Boolean(selectedRequest)}
        onClose={closeReviewDialog}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: { borderRadius: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Review Internship Request
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              Review the request details before making a decision.
            </Typography>
          </Box>

          <IconButton onClick={closeReviewDialog} aria-label="Close dialog">
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider />

        {selectedRequest && (
          <>
            <DialogContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  mb: 3,
                  borderRadius: 2.5,
                  backgroundColor: "rgba(109, 76, 203, 0.05)",
                }}
              >
                <Avatar
                  sx={{
                    width: 52,
                    height: 52,
                    backgroundColor: "rgba(109, 76, 203, 0.1)",
                    color: "#6D4CCB",
                    fontWeight: 700,
                  }}
                >
                  {selectedRequest.studentName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </Avatar>

                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    {selectedRequest.studentName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {selectedRequest.studentEmail}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                  },
                  gap: 2.5,
                }}
              >
                <RequestDetail
                  label="Company"
                  value={selectedRequest.company}
                />
                <RequestDetail
                  label="Position"
                  value={selectedRequest.position}
                />
                <RequestDetail
                  label="Training Type"
                  value={selectedRequest.trainingType}
                />
                <RequestDetail
                  label="Submitted Date"
                  value={selectedRequest.submittedDate}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "text.secondary",
                    mb: 0.75,
                  }}
                >
                  Current Status
                </Typography>

                <Chip
                  label={selectedRequest.status}
                  size="small"
                  sx={{
                    color: statusStyles[selectedRequest.status].color,
                    backgroundColor:
                      statusStyles[selectedRequest.status].backgroundColor,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2.5,
                }}
              >
                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                  Attachments
                </Typography>

                {selectedRequest.attachmentUrl &&
                selectedRequest.attachmentName ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ overflowWrap: "anywhere" }}
                    >
                      {selectedRequest.attachmentName}
                    </Typography>

                    <Button
                      component="a"
                      href={selectedRequest.attachmentUrl}
                      download={selectedRequest.attachmentName}
                      variant="outlined"
                      size="small"
                      sx={{
                        flexShrink: 0,
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      Download
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No attachments were submitted.
                  </Typography>
                )}
              </Box>

              {isRejecting && selectedRequest.status === "pending" && (
                <TextField
                  autoFocus
                  fullWidth
                  required
                  multiline
                  minRows={3}
                  label="Rejection reason"
                  placeholder="Explain why this request is being rejected..."
                  value={rejectionComment}
                  onChange={(event) => setRejectionComment(event.target.value)}
                  error={isRejecting && rejectionComment.trim().length === 0}
                  helperText="A rejection comment is required."
                  sx={{ mt: 3 }}
                />
              )}

              {selectedRequest.status === "rejected" &&
                selectedRequest.rejectionComment && (
                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      borderRadius: 2.5,
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ display: "block", mb: 0.5 }}
                    >
                      Rejection comment
                    </Typography>
                    <Typography variant="body2">
                      {selectedRequest.rejectionComment}
                    </Typography>
                  </Box>
                )}
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
              <Button
                onClick={closeReviewDialog}
                sx={{
                  mr: "auto",
                  textTransform: "none",
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>

              {isRejecting ? (
                <>
                  <Button
                    onClick={() => {
                      setIsRejecting(false);
                      setRejectionComment("");
                    }}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelOutlined />}
                    onClick={() =>
                      updateRequestStatus("rejected", rejectionComment.trim())
                    }
                    disabled={rejectionComment.trim().length === 0}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: "none",
                      fontWeight: 600,
                    }}
                  >
                    Confirm Reject
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelOutlined />}
                    onClick={() => setIsRejecting(true)}
                    disabled={selectedRequest.status !== "pending"}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Reject
                  </Button>

                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => updateRequestStatus("approved")}
                    disabled={selectedRequest.status !== "pending"}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: "none",
                      fontWeight: 600,
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

interface RequestDetailProps {
  label: string;
  value: string;
}

function RequestDetail({ label, value }: RequestDetailProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          color: "text.secondary",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default PendingRequestsPage;