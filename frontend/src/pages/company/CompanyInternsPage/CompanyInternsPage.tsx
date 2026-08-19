import {
  Box,
  Container,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Stack,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
// TODO: Replace with GET /api/companies/:companyId/active-interns
// Expected shape from backend:
// {
//   studentId: string,           // studentProfiles _id
//   name: string,
//   major: string,
//   university: string,
//   trainingType: "FT1" | "FT2",
//   approvedHours: number,
//   requiredHours: number,
//   lastActivity: string,        // ISO date
// }
// ─────────────────────────────────────────────────────────────

interface ActiveIntern {
  studentId: string;
  name: string;
  major: string;
  university: string;
  trainingType: "FT1" | "FT2";
  approvedHours: number;
  requiredHours: number;
  lastActivity: string;
}

// Mock data — remove once API is connected
const MOCK_ACTIVE_INTERNS: ActiveIntern[] = [
  {
    studentId: "student-001",
    name: "Ahmad Joba",
    major: "Computer Engineering",
    university: "Palestine Polytechnic University (PPU)",
    trainingType: "FT1",
    approvedHours: 72,
    requiredHours: 150,
    lastActivity: "2026-08-14",
  },
  {
    studentId: "student-002",
    name: "Noor Khalil",
    major: "Software Engineering",
    university: "Palestine Polytechnic University (PPU)",
    trainingType: "FT2",
    approvedHours: 110,
    requiredHours: 150,
    lastActivity: "2026-08-13",
  },
];

function HoursProgress({
  approved,
  required,
}: {
  approved: number;
  required: number;
}) {
  const pct = Math.min((approved / required) * 100, 100);
  const color = pct >= 100 ? "#059669" : pct >= 60 ? "#2563eb" : "#f59e0b";
  return (
    <Box sx={{ minWidth: 140 }}>
      <Stack direction="row" justifyContent="space-between" mb={0.5}>
        <Typography variant="caption" fontWeight={600}>
          {approved} / {required} h
        </Typography>
        <Typography variant="caption" sx={{ color }}>
          {Math.round(pct)}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: "grey.200",
          "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 3 },
        }}
      />
    </Box>
  );
}

function CompanyInternsPage() {
  // TODO: const { data: interns } = useQuery(["activeInterns", user?.companyId], fetchActiveInterns);
  const interns = MOCK_ACTIVE_INTERNS;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        mb={4}
        gap={2}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
          >
            Active Interns
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Students currently doing their internship at your company. Click
            "Review Hours" to approve or reject their daily entries.
          </Typography>
        </Box>
        <Chip
          icon={<PeopleAltOutlinedIcon />}
          label={`${interns.length} Active`}
          sx={{ fontWeight: 600, fontSize: "0.85rem", px: 1 }}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {interns.length === 0 ? (
        <Card sx={{ borderRadius: 3, p: 6, textAlign: "center" }}>
          <PeopleAltOutlinedIcon
            sx={{ fontSize: 56, color: "text.disabled", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            No active interns right now.
          </Typography>
          <Typography variant="body2" color="text.disabled" mt={0.5}>
            Students will appear here once their internship request is approved
            by a supervisor.
          </Typography>
        </Card>
      ) : (
        <Card sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "background.paper" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>University</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Training</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Hours Progress</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Last Activity</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interns.map((intern) => (
                  <TableRow key={intern.studentId} hover>
                    {/* Student */}
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: "primary.main",
                            fontSize: "0.9rem",
                          }}
                        >
                          {intern.name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {intern.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {intern.major}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* University */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {intern.university}
                      </Typography>
                    </TableCell>

                    {/* Training type */}
                    <TableCell>
                      <Chip
                        label={intern.trainingType}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor:
                            intern.trainingType === "FT1"
                              ? "#eff6ff"
                              : "#f5f3ff",
                          color:
                            intern.trainingType === "FT1"
                              ? "#2563eb"
                              : "#7c3aed",
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>

                    {/* Hours progress bar */}
                    <TableCell>
                      <HoursProgress
                        approved={intern.approvedHours}
                        required={intern.requiredHours}
                      />
                    </TableCell>

                    {/* Last activity */}
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <AccessTimeIcon
                          sx={{ fontSize: 14, color: "text.disabled" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(intern.lastActivity).toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* Action */}
                    <TableCell align="right">
                      <Button
                        component={Link}
                        to={`/training/hours/${intern.studentId}`}
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      >
                        Review Hours
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Container>
  );
}

export default CompanyInternsPage;
