import { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import { MOCK_SUPERVISORS } from "../../../mock/supervisors";
import { MOCK_INTERNSHIP_REQUESTS } from "../../../mock/internshipRequests";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const steps = [
  "Internship Type",
  "Company & Position",
  "Duration & Supervisor",
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

  // Form state
  const [type, setType] = useState<"ft1" | "ft2">("ft1");
  const [companyId, setCompanyId] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [field, setField] = useState("");
  const [workMode, setWorkMode] = useState("on-site");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expectedHours, setExpectedHours] = useState(150);
  const [supervisorId, setSupervisorId] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  // Check FT1 prerequisite for FT2
  const ft1Completed = MOCK_INTERNSHIP_REQUESTS.some(
    (r) =>
      r.studentId === user?.id && r.type === "ft1" && r.status === "completed",
  );

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

  const handleSubmit = () => {
    // TODO: POST /api/internship-requests
    console.log({
      type,
      companyId: companyId || null,
      companyName: newCompanyName || null,
      position,
      department,
      field,
      workMode,
      startDate,
      endDate,
      expectedHours,
      supervisorId,
      description,
      attachments: attachments.map((f) => f.name),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card
          variant="outlined"
          sx={{ borderRadius: 3, p: 4, textAlign: "center" }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1C2B4A", mb: 2 }}
          >
            Request Submitted Successfully
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your internship request has been sent to your supervisor for review.
            You will be notified when it is approved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/training/requests")}
              sx={{ bgcolor: "#1C2B4A", textTransform: "none" }}
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
              <FormLabel sx={{ fontWeight: 600, color: "#1C2B4A", mb: 1 }}>
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
                  disabled={!ft1Completed}
                />
              </RadioGroup>
              {type === "ft2" && !ft1Completed && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  You must complete FT1 before requesting FT2.
                </Alert>
              )}
            </FormControl>

            {type === "ft2" && ft1Completed && (
              <Alert severity="info">
                FT1 completed. You are eligible for FT2.
              </Alert>
            )}
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>
              <Select
                value={companyId}
                label="Company"
                onChange={(e) => {
                  setCompanyId(e.target.value);
                  setNewCompanyName("");
                }}
              >
                <MenuItem value="">
                  <em>Select existing company</em>
                </MenuItem>
                {MOCK_COMPANIES.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {!companyId && (
              <TextField
                label="Or add new company name"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            )}

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
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />

              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />
            </Box>

            <TextField
              label="Expected Hours"
              type="number"
              value={expectedHours}
              onChange={(e) => setExpectedHours(Number(e.target.value))}
              slotProps={{
                htmlInput: {
                  min: 1,
                  max: 500,
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={supervisorId}
                label="Supervisor"
                onChange={(e) => setSupervisorId(e.target.value)}
              >
                {MOCK_SUPERVISORS.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name} — {s.department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            <ReviewItem
              label="Company"
              value={
                companyId
                  ? MOCK_COMPANIES.find((c) => c.id === Number(companyId))?.name
                  : newCompanyName
              }
            />
            <ReviewItem label="Position" value={position} />
            <ReviewItem label="Department" value={department} />
            <ReviewItem label="Field" value={field} />
            <ReviewItem label="Work Mode" value={workMode} />
            <ReviewItem label="Duration" value={`${startDate} to ${endDate}`} />
            <ReviewItem
              label="Expected Hours"
              value={expectedHours.toString()}
            />
            <ReviewItem
              label="Supervisor"
              value={
                MOCK_SUPERVISORS.find((s) => s.id === Number(supervisorId))
                  ?.name
              }
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
        sx={{ fontWeight: 700, color: "#1C2B4A", mb: 1 }}
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

      <Card variant="outlined" sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {renderStepContent()}
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === 4 && !confirmed}
          sx={{
            bgcolor: "#1C2B4A",
            textTransform: "none",
            "&:hover": { bgcolor: "#2a3f6b" },
          }}
        >
          {activeStep === steps.length - 1 ? "Submit Request" : "Next"}
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
      <Typography variant="body2" sx={{ fontWeight: 600, color: "#1C2B4A" }}>
        {value || "—"}
      </Typography>
    </Box>
  );
}

export default InternshipRequestPage;
