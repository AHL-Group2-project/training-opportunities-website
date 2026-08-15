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
  Alert,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  MOCK_TRAINING_STATES,
  MOCK_STUDENT_PROFILES,
} from "../../../mock/studentTrainingState";

interface RequestRow {
  studentId: number;
  studentName: string;
  type: "FT1" | "FT2";
  status: string;
}

const STATUS_CHIP: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  request_pending: { label: "Pending", color: "#d97706", bg: "#fffbeb" },
  approved: { label: "Approved", color: "#059669", bg: "#ecfdf5" },
  rejected: { label: "Rejected", color: "#dc2626", bg: "#fef2f2" },
};

export default function AdminRequestsPage() {
  // TODO: Replace with GET /api/internship-requests (all, for admin's university)
  const rows: RequestRow[] = [];
  MOCK_TRAINING_STATES.forEach((s) => {
    const profile = MOCK_STUDENT_PROFILES.find((p) => p.id === s.studentId);
    const name = profile?.name ?? `Student ${s.studentId}`;
    if (s.ft1.status === "request_pending")
      rows.push({
        studentId: s.studentId,
        studentName: name,
        type: "FT1",
        status: s.ft1.status,
      });
    if (s.ft2.status === "request_pending")
      rows.push({
        studentId: s.studentId,
        studentName: name,
        type: "FT2",
        status: s.ft2.status,
      });
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Training Requests
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Overview of all student internship requests. Approval is handled by the
        assigned supervisor.
      </Typography>

      {/* Admin is read-only on internship request approvals */}
      <Alert
        severity="info"
        icon={<InfoOutlinedIcon />}
        sx={{ mb: 3, borderRadius: 2 }}
      >
        Internship requests are reviewed and approved by the student's assigned
        supervisor. Admins have read-only access here.
      </Alert>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Training Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No pending requests.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const chip =
                  STATUS_CHIP[row.status] ?? STATUS_CHIP["request_pending"];
                return (
                  <TableRow key={`${row.studentId}-${row.type}`} hover>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {row.studentName}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
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
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
