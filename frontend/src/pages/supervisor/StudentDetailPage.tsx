import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  Button,
  Paper,
  LinearProgress,
  Divider,
  TextField,
  Rating,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { getStudentDetails, assignCompany } from "../../services/supervisorService";
import { getPublicCompanies, type PublicCompany } from "../../services/companyService";
import type { EvaluationCriteria } from "../../mock/studentProgress";

const reportStatusColors: Record<string, "success" | "warning" | "default"> = {
  Approved: "success",
  "Needs Revision": "warning",
  "Pending Review": "default",
};

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [evaluationScores, setEvaluationScores] = useState<EvaluationCriteria>({
    attendance: 0,
    performance: 0,
    reportQuality: 0,
    initiative: 0,
    communication: 0,
  });
  const [overallComment, setOverallComment] = useState("");

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [companies, setCompanies] = useState<PublicCompany[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [noAccount, setNoAccount] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      const data = await getPublicCompanies();
      setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignSubmit = async () => {
    if (!id) return;
    if (!noAccount && !selectedCompanyId) {
      setError("Please select a company.");
      return;
    }
    if (noAccount && !newCompanyName.trim()) {
      setError("Please enter a company name.");
      return;
    }
    try {
      setAssignLoading(true);
      await assignCompany(
        id,
        noAccount ? null : selectedCompanyId,
        noAccount ? newCompanyName : undefined
      );
      setAssignDialogOpen(false);
      // Refresh details
      const data = await getStudentDetails(id);
      setStudentData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to assign company");
    } finally {
      setAssignLoading(false);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getStudentDetails(id);
        setStudentData(data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load student details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !studentData) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error || "Student not found."}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/supervisor/students")}
        >
          Back to My Students
        </Button>
      </Container>
    );
  }

  const { student, progress } = studentData;

  const isCompleted =
    progress.currentInternship.hoursCompleted >=
    progress.currentInternship.hoursRequired;
  const hoursPercent = Math.min(
    100,
    Math.round(
      (progress.currentInternship.hoursCompleted /
        progress.currentInternship.hoursRequired) *
        100,
    ),
  );

  const handleCriteriaChange = (
    key: keyof EvaluationCriteria,
    value: number,
  ) => {
    setEvaluationScores((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitEvaluation = () => {
    // TODO: connect to backend once API is ready
    console.log("Evaluation submitted", { evaluationScores, overallComment });
  };

  return (
    <>
      {/* Hero section */}
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",
          py: { xs: 6, md: 8 },
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/supervisor/students")}
            sx={{ mb: 3 }}
          >
            All students
          </Button>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ alignItems: { sm: "center" } }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: 28,
                bgcolor: "primary.main",
              }}
            >
              {student.initials}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {student.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {student.major} • {student.year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.location}
              </Typography>
            </Box>
            
            <Box sx={{ ml: "auto !important", display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => {
                  fetchCompanies();
                  setAssignDialogOpen(true);
                }}
              >
                Assign / Edit Company
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* About */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            About
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.bio}
          </Typography>
        </Paper>

        {/* Internship Progress Card */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Internship Progress
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 2, flexWrap: "wrap" }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Current Internship
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {progress.currentInternship.position} —{" "}
                {progress.currentInternship.company}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mb: 2 }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="body2">Hours</Typography>
              <Typography variant="body2">
                {progress.currentInternship.hoursCompleted} /{" "}
                {progress.currentInternship.hoursRequired}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={hoursPercent}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Reports submitted: {progress.reports.length} / required
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1.5 }}>
            Status Timeline
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {progress.statusTimeline.map((step: any) => (
              <Chip
                key={step.label}
                label={`${step.label} — ${step.date}`}
                color={step.completed ? "success" : "default"}
                variant={step.completed ? "filled" : "outlined"}
              />
            ))}
          </Stack>
        </Paper>

        {/* Reports List */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Reports
          </Typography>

          {progress.reports.length === 0 ? (
            <Typography color="text.secondary">
              No reports submitted yet.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {progress.reports.map((report: any) => (
                <Paper key={report.id} sx={{ p: 2 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: { sm: "center" },
                    }}
                    spacing={1}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "medium" }}>
                        {report.period}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Submitted: {report.submittedDate}
                      </Typography>
                    </Box>
                    <Chip
                      label={report.status}
                      size="small"
                      color={reportStatusColors[report.status]}
                    />
                  </Stack>

                  {report.supervisorFeedback && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                      color="text.secondary"
                    >
                      Feedback: {report.supervisorFeedback}
                    </Typography>
                  )}

                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Button size="small" startIcon={<DownloadIcon />}>
                      View / Download
                    </Button>
                    <Button size="small" color="success">
                      Approve
                    </Button>
                    <Button size="small" color="warning">
                      Request Revision
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>

        {/* Evaluation Form */}
        {isCompleted && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Evaluation Form
            </Typography>

            {progress.evaluation?.submitted ? (
              <Alert severity="success">
                Evaluation already submitted: "
                {progress.evaluation.overallComment}"
              </Alert>
            ) : (
              <>
                <Stack spacing={2} sx={{ mb: 2 }}>
                  {(
                    [
                      ["attendance", "Attendance"],
                      ["performance", "Performance"],
                      ["reportQuality", "Report Quality"],
                      ["initiative", "Initiative"],
                      ["communication", "Communication"],
                    ] as [keyof EvaluationCriteria, string][]
                  ).map(([key, label]) => (
                    <Stack
                      key={key}
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2">{label}</Typography>
                      <Rating
                        value={evaluationScores[key]}
                        onChange={(_, value) =>
                          handleCriteriaChange(key, value ?? 0)
                        }
                      />
                    </Stack>
                  ))}
                </Stack>

                <TextField
                  label="Overall comment"
                  multiline
                  minRows={3}
                  fullWidth
                  value={overallComment}
                  onChange={(e) => setOverallComment(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Button variant="contained" onClick={handleSubmitEvaluation}>
                  Submit Evaluation
                </Button>
              </>
            )}
          </Paper>
        )}

        {/* Previous Internships */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Previous Internships
          </Typography>

          {progress.previousInternships.length === 0 ? (
            <Typography color="text.secondary">
              No previous internships.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {progress.previousInternships.map((internship: any, index: number) => (
                <Box key={index}>
                  <Typography sx={{ fontWeight: "medium" }}>
                    {internship.position} — {internship.company}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {internship.period}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Container>

      {/* Assign Company Dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Company</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Assigning a company will automatically approve any pending request and update the student's active internship record.
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={noAccount}
                onChange={(e) => {
                  setNoAccount(e.target.checked);
                  setSelectedCompanyId(null);
                  setNewCompanyName("");
                }}
              />
            }
            label="The company does not have an account on this platform"
            sx={{ mb: 2 }}
          />

          {!noAccount ? (
            <FormControl fullWidth size="small">
              <InputLabel>Select Company</InputLabel>
              <Select
                value={selectedCompanyId || ""}
                label="Select Company"
                onChange={(e) => setSelectedCompanyId(e.target.value)}
              >
                <MenuItem value="" disabled>
                  <em>Choose a company</em>
                </MenuItem>
                {companies.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              size="small"
              label="Company Name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              placeholder="e.g. Acme Corp"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAssignSubmit}
            disabled={assignLoading}
          >
            {assignLoading ? "Assigning..." : "Assign Company"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
