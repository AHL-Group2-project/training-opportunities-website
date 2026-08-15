import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../context/authContext";

const DEPARTMENTS = [
  "Computer Engineering",
  "Information Technology",
  "Electrical Engineering",
  "Architecture",
  "Business Administration",
  "Mechanical Engineering",
  "Civil Engineering",
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
  "Project Management",
  "Business Analysis",
];

const TYPES = ["Full-time", "Part-time", "Remote", "Hybrid"];

const WORK_MODES = ["On-site", "Remote", "Hybrid"];

const DURATIONS = ["2 months", "3 months", "4 months", "6 months"];

const LOCATIONS = [
  "Ramallah",
  "Hebron",
  "Nablus",
  "Bethlehem",
  "Gaza",
  "Jerusalem",
  "Remote",
];

const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Figma",
  "Flutter",
  "Dart",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
  "Linux",
  "Selenium",
  "Postman",
];

function CreateOpportunityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { user } = useAuth();
  const isCompanyUser = user?.role === "company";
  const userCompanyId = user?.companyId; // Renamed to avoid conflict
  const isAdmin = user?.role === "admin";

  // Find existing opportunity if editing
  const existing = isEdit
    ? MOCK_OPPORTUNITIES.find((o) => o.id === Number(id))
    : null;

  // Form state
  const [title, setTitle] = useState(existing?.title || "");
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    isEdit
      ? existing?.company || ""
      : isCompanyUser
        ? userCompanyId?.toString() || ""
        : "",
  );
  const [type, setType] = useState(existing?.type || "");
  const [workMode, setWorkMode] = useState(existing?.workMode || "");
  const [department, setDepartment] = useState(existing?.department || "");
  const [field, setField] = useState(existing?.field || "");
  const [duration, setDuration] = useState(existing?.duration || "");
  const [location, setLocation] = useState(existing?.location || "");
  const [skills, setSkills] = useState<string[]>(existing?.skills || []);
  const [seats, setSeats] = useState(existing?.seats || 1);
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState(existing?.description || "");
  const [responsibilities, setResponsibilities] = useState(
    existing?.responsibilities?.join("\n") || "",
  );
  const [requirements, setRequirements] = useState(
    existing?.requirements?.join("\n") || "",
  );

  const getOpportunitiesListPath = () => {
    if (isCompanyUser) return "/company/opportunities";
    if (isAdmin) return "/admin/opportunities";
    return "/supervisor/opportunities";
  };

  const handleSave = (publish: boolean) => {
    const payload = {
      title,
      companyId: selectedCompanyId,
      type,
      workMode,
      department,
      field,
      duration,
      location,
      skills,
      seats,
      deadline,
      description,
      responsibilities: responsibilities.split("\n").filter(Boolean),
      requirements: requirements.split("\n").filter(Boolean),
      status: publish ? "active" : "draft",
    };

    console.log(publish ? "PUBLISH" : "SAVE DRAFT", payload);
    navigate(getOpportunitiesListPath());
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(getOpportunitiesListPath())}
          sx={{ textTransform: "none", color: "text.secondary", mb: 1 }}
        >
          Back to Opportunities
        </Button>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          {isEdit ? "Edit Opportunity" : "Create Opportunity"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in all required fields. Use select inputs where available.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3, borderColor: "divider" }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Basic Info */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              Basic Information
            </Typography>

            <TextField
              label="Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Frontend Engineering Intern"
              fullWidth
              required
            />

            <FormControl fullWidth required disabled={isCompanyUser}>
              <InputLabel>Company *</InputLabel>
              <Select
                value={selectedCompanyId}
                label="Company *"
                onChange={(e) => setSelectedCompanyId(e.target.value)}
              >
                {MOCK_COMPANIES.map((c) => (
                  <MenuItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <FormControl fullWidth required>
                <InputLabel>Type *</InputLabel>
                <Select
                  value={type}
                  label="Type *"
                  onChange={(e) => setType(e.target.value)}
                >
                  {TYPES.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Work Mode *</InputLabel>
                <Select
                  value={workMode}
                  label="Work Mode *"
                  onChange={(e) => setWorkMode(e.target.value)}
                >
                  {WORK_MODES.map((w) => (
                    <MenuItem key={w} value={w}>
                      {w}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Details */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "text.primary", mt: 1 }}
            >
              Details
            </Typography>

            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <FormControl fullWidth required>
                <InputLabel>Department *</InputLabel>
                <Select
                  value={department}
                  label="Department *"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {DEPARTMENTS.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Field *</InputLabel>
                <Select
                  value={field}
                  label="Field *"
                  onChange={(e) => setField(e.target.value)}
                >
                  {FIELDS.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 2,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Duration *</InputLabel>
                <Select
                  value={duration}
                  label="Duration *"
                  onChange={(e) => setDuration(e.target.value)}
                >
                  {DURATIONS.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Location *</InputLabel>
                <Select
                  value={location}
                  label="Location *"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {LOCATIONS.map((l) => (
                    <MenuItem key={l} value={l}>
                      {l}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Seats *"
                type="number"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                slotProps={{
                  htmlInput: {
                    min: 1,
                    max: 20,
                  },
                }}
                required
              />
            </Box>

            <Autocomplete
              multiple
              options={SKILLS}
              value={skills}
              onChange={(_, newValue) => setSkills(newValue)}

              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Required Skills *"
                  placeholder="Select skills"
                />
              )}
            />
            <TextField
              label="Application Deadline *"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              required
            />

            {/* Content */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "text.primary", mt: 1 }}
            >
              Content
            </Typography>

            <TextField
              label="Description *"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the internship opportunity..."
              required
            />

            <TextField
              label="Responsibilities *"
              multiline
              rows={4}
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Enter each responsibility on a new line"
              helperText="Enter each item on a new line"
              required
            />

            <TextField
              label="Requirements *"
              multiline
              rows={4}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Enter each requirement on a new line"
              helperText="Enter each item on a new line"
              required
            />
          </Box>
        </CardContent>
      </Card>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(getOpportunitiesListPath())}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={() => handleSave(false)}
          sx={{ textTransform: "none" }}
        >
          Save as Draft
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => handleSave(true)}
          sx={{
            bgcolor: "text.primary",
            textTransform: "none",
          }}
        >
          Publish
        </Button>
      </Box>
    </Container>
  );
}

export default CreateOpportunityPage;
