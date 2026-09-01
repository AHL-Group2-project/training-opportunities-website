import { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import api from "../../../lib/axios";

interface ActiveIntern {
  studentId: string;
  name: string;
  major: string;
  university: string;
  trainingType: string;
  approvedHours: number;
  requiredHours: number;
  endDate?: string;
}

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
      <Stack sx={{ direction: "row", justifyContent: "space-between", mb: {xs: 0.5} }}>
        <Typography sx={{variant:"caption", fontWeight:600}}>
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
  const [interns, setInterns] = useState<ActiveIntern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await api.get("/companies/me/interns");
        setInterns(Array.isArray(res.data) ? res.data : []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load interns.");
      } finally {
        setLoading(false);
      }
    };
    fetchInterns();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
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
            "Review Hours" to approve or reject their weekly entries.
          </Typography>
        </Box>
        {!loading && !error && (
          <Chip
            icon={<PeopleAltOutlinedIcon />}
            label={`${interns.length} Active`}
            sx={{ fontWeight: 600, fontSize: "0.85rem", px: 1 }}
            color="primary"
            variant="outlined"
          />
        )}
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && interns.length === 0 && (
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
      )}

      {!loading && !error && interns.length > 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "background.paper" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>University</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Training</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Hours Progress</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
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
                          {intern.name ? intern.name[0] : "?"}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {intern.name || "Unknown Student"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {intern.major || "Unknown Major"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* University */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {intern.university || "Unknown University"}
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

                    {/* End date */}
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <AccessTimeIcon
                          sx={{ fontSize: 14, color: "text.disabled" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {intern.endDate
                            ? new Date(intern.endDate).toLocaleDateString()
                            : "—"}
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
