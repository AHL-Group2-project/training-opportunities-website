import { useState } from "react";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DownloadIcon from "@mui/icons-material/Download";
import { students } from "../../mock/students";
import { studentProgress } from "../../mock/studentProgress";
import type { EvaluationCriteria } from "../../mock/studentProgress";

const reportStatusColors: Record<string, "success" | "warning" | "default"> = {
  Approved: "success",
  "Needs Revision": "warning",
  "Pending Review": "default",
};

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const studentId = Number(id);
  const student = students.find((s) => s.id === studentId);
  const progress = studentProgress.find((p) => p.studentId === studentId);

  const [evaluationScores, setEvaluationScores] = useState<EvaluationCriteria>({
    attendance: 0,
    performance: 0,
    reportQuality: 0,
    initiative: 0,
    communication: 0,
  });
  const [overallComment, setOverallComment] = useState("");

  if (!student || !progress) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Student not found.
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/supervisor/students")}
        >
          Back to My Students
        </Button>
      </Container>
    );
  }

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
            {progress.statusTimeline.map((step) => (
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
              {progress.reports.map((report) => (
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
              {progress.previousInternships.map((internship, index) => (
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
    </>
  );
}
