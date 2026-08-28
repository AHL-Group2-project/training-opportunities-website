import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Alert,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { studentApi } from "../../../lib/api/student";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const steps = [
  "Internship Type",
  "Company & Position",
  "Duration & Details",
  "Attachments",
  "Review",
];

const DEPARTMENTS = [
  "Computer Engineering",
  "Information Technology",
  "Electrical Engineering",
  "Architecture",
  "Business Administration",
  "Mechanical Engineering",
];

const FIELDS = [
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "Data Science",
  "UI/UX Design",
  "DevOps",
  "QA Engineering",
  "Embedded Systems",
  "Network Engineering",
];

const WORK_MODES = ["on-site", "remote", "hybrid"];

function InternshipRequestPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [studentProfile, setStudentProfile] = useState<any>(null);

  // Form state
  const [type, setType] = useState<"ft1" | "ft2">("ft1");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [field, setField] = useState("");
  const [workMode, setWorkMode] = useState("on-site");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expectedHours, setExpectedHours] = useState(150);
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await studentApi.getProfile();
        setStudentProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length <= 5) {
        setAttachments((prev) => [...prev, ...newFiles]);
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");
      await studentApi.submitRequest({
        type,
        companyName,
        position,
        department,
        field,
        workMode,
        startDate,
        endDate,
        expectedHours,
        description,
        attachments: attachments.map((f) => f.name), // Mocking upload for now
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProfile) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!studentProfile?.supervisorId) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card
          sx={{
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            borderColor: "error.main",
            border: "1px solid",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "error.main", mb: 2 }}
          >
            Action Required
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You cannot submit a training request because you have not been
            assigned a Supervisor yet. Please contact your university's
            administration to be assigned a supervisor before submitting a
            request.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard")}
            sx={{ textTransform: "none" }}
          >
            Return to Dashboard
          </Button>
        </Card>
      </Container>
    );
  }

  if (submitted) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card sx={{ borderRadius: 3, p: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}
          >
            Request Submitted Successfully
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your internship request has been sent to your supervisor (
            <strong>{studentProfile.supervisorId.name}</strong>) for review. You
            will be notified when it is approved, and your Hours Table will
            become available.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/training/requests")}
              sx={{ bgcolor: "text.primary", textTransform: "none" }}
            >
              View My Requests
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/dashboard")}
              sx={{ textTransform: "none" }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <FormControl>
              <FormLabel sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}>
                Select Internship Type
              </FormLabel>
              <RadioGroup
                value={type}
                onChange={(e) => setType(e.target.value as "ft1" | "ft2")}
              >
                <FormControlLabel
                  value="ft1"
                  control={<Radio />}
                  label="Field Training I (FT1)"
                />
                <FormControlLabel
                  value="ft2"
                  control={<Radio />}
                  label="Field Training II (FT2)"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <TextField
              label="Position / Title"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                {DEPARTMENTS.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Field</InputLabel>
              <Select
                value={field}
                label="Field"
                onChange={(e) => setField(e.target.value)}
              >
                {FIELDS.map((f) => (
                  <MenuItem key={f} value={f}>
                    {f}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Work Mode</InputLabel>
              <Select
                value={workMode}
                label="Work Mode"
                onChange={(e) => setWorkMode(e.target.value)}
              >
                {WORK_MODES.map((w) => (
                  <MenuItem key={w} value={w}>
                    {w.charAt(0).toUpperCase() + w.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
            </Box>
            <TextField
              label="Expected Hours"
              type="number"
              value={expectedHours}
              onChange={(e) => setExpectedHours(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1, max: 500 } }}
            />
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Your request will be routed directly to your assigned Supervisor:{" "}
              <strong>{studentProfile?.supervisorId?.name}</strong>
            </Alert>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you will be doing during this internship..."
            />
          </Box>
        );

      case 3:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Upload Proof of Acceptance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload acceptance email screenshot, offer letter, or any
              supporting documents. Max 5 files, 5MB each.
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ textTransform: "none", width: "fit-content" }}
            >
              Upload Files
              <input
                type="file"
                hidden
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />
            </Button>
            {attachments.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {attachments.map((file, index) => (
                  <Chip
                    key={index}
                    label={`${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`}
                    onDelete={() => removeAttachment(index)}
                    deleteIcon={<DeleteIcon />}
                    sx={{ justifyContent: "space-between" }}
                  />
                ))}
              </Box>
            )}
          </Box>
        );

      case 4:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Review Your Request
            </Typography>
            <ReviewItem label="Type" value={type.toUpperCase()} />
            <ReviewItem label="Company" value={companyName} />
            <ReviewItem label="Position" value={position} />
            <ReviewItem label="Department" value={department} />
            <ReviewItem label="Field" value={field} />
            <ReviewItem label="Start Date" value={startDate} />
            <ReviewItem label="End Date" value={endDate} />
            <ReviewItem
              label="Supervisor"
              value={studentProfile?.supervisorId?.name}
            />
            <ReviewItem
              label="Expected Hours"
              value={expectedHours.toString()}
            />
            <ReviewItem
              label="Attachments"
              value={`${attachments.length} file(s)`}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={confirmed}
                  onChange={() => setConfirmed(!confirmed)}
                />
              }
              label="I confirm this information is accurate"
              sx={{ mt: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
      >
        Submit Internship Request
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Request approval for your field training internship
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {renderStepContent()}
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0 || submitting}
          onClick={handleBack}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={(activeStep === 4 && !confirmed) || submitting}
          sx={{ bgcolor: "text.primary", textTransform: "none" }}
        >
          {submitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : activeStep === steps.length - 1 ? (
            "Submit Request"
          ) : (
            "Next"
          )}
        </Button>
      </Box>
    </Container>
  );
}

function ReviewItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        {value || "—"}
      </Typography>
    </Box>
  );
}

export default InternshipRequestPage;
