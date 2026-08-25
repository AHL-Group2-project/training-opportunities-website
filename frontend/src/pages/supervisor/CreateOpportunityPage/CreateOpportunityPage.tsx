import { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import api from "../../../lib/axios";
import { useAuth } from "../../../context/authContext";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import type { Opportunity } from "../../../types/opportunity.types";

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

const TYPES = ["FT1", "FT2"];

const WORK_MODES = [
  { value: "on-site", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

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

type OpportunityResponse = Omit<Opportunity, "companyId"> & {
  companyId?: string | { _id: string; name?: string };
};

function CreateOpportunityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const isEdit = Boolean(id);
  const isCompanyUser = user?.role === "company";
  const isAdmin = user?.role === "admin";

  const [title, setTitle] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    isCompanyUser ? String(user?.companyId || "") : "",
  );
  const [type, setType] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [department, setDepartment] = useState("");
  const [field, setField] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [seats, setSeats] = useState(1);
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const getOpportunitiesListPath = () => {
    if (isCompanyUser) return "/company/opportunities";
    if (isAdmin) return "/admin/opportunities";
    return "/supervisor/opportunities";
  };

  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<OpportunityResponse>(
          `/opportunities/${id}`,
        );
        const opportunity = response.data;
        const responseCompanyId =
          typeof opportunity.companyId === "object"
            ? opportunity.companyId._id
            : opportunity.companyId;

        setTitle(opportunity.title || "");
        setSelectedCompanyId(
          responseCompanyId || String(user?.companyId || ""),
        );
        setType(opportunity.type || "");
        setWorkMode(opportunity.workMode || "");
        setDepartment(opportunity.department || "");
        setField(opportunity.field || "");
        setDuration(opportunity.duration || "");
        setLocation(opportunity.location || "");
        setSkills(opportunity.skills || []);
        setSeats(opportunity.seats || 1);
        setDeadline(opportunity.deadline?.slice(0, 10) || "");
        setDescription(opportunity.description || "");
        setResponsibilities((opportunity.responsibilities || []).join("\n"));
        setRequirements((opportunity.requirements || []).join("\n"));
      } catch {
        setError("Unable to load this opportunity. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchOpportunity();
  }, [id, isEdit, user?.companyId]);

  const handleSave = async (publish: boolean) => {
    if (
      !title.trim() ||
      !selectedCompanyId ||
      !type ||
      !workMode ||
      !department ||
      !field ||
      !duration ||
      !location ||
      skills.length === 0 ||
      !deadline ||
      !description.trim() ||
      !responsibilities.trim() ||
      !requirements.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      title: title.trim(),
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
      description: description.trim(),
      responsibilities: responsibilities
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      requirements: requirements
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      status: publish ? "active" : "draft",
    };

    try {
      setSaving(true);
      setError("");

      if (isEdit && id) {
        await api.put(`/opportunities/${id}`, payload);
      } else {
        await api.post("/opportunities", payload);
      }

      navigate(getOpportunitiesListPath());
    } catch {
      setError(
        isEdit
          ? "Unable to update the opportunity. Please try again."
          : "Unable to create the opportunity. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 10, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ borderRadius: 3, borderColor: "divider" }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Basic Information
            </Typography>

            <TextField
              label="Title *"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g., Frontend Engineering Intern"
              fullWidth
              required
            />

            <FormControl fullWidth required disabled={isCompanyUser}>
              <InputLabel>Company *</InputLabel>
              <Select
                value={selectedCompanyId}
                label="Company *"
                onChange={(event) => setSelectedCompanyId(event.target.value)}
              >
                {isCompanyUser && selectedCompanyId && (
                  <MenuItem value={selectedCompanyId}>
                    {user?.name || "Your company"}
                  </MenuItem>
                )}
                {!isCompanyUser &&
                  MOCK_COMPANIES.map((company) => (
                    <MenuItem key={company.id} value={String(company.id)}>
                      {company.name}
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
                  {TYPES.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
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
                  {WORK_MODES.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
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
                  {DEPARTMENTS.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
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
                  {FIELDS.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
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
                  {DURATIONS.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
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
                  {LOCATIONS.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Seats *"
                type="number"
                value={seats}
                onChange={(event) => setSeats(Number(event.target.value))}
                slotProps={{ htmlInput: { min: 1, max: 20 } }}
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
              onChange={(event) => setDeadline(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              required
            />

            <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
              Content
            </Typography>

            <TextField
              label="Description *"
              multiline
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the internship opportunity..."
              required
            />

            <TextField
              label="Responsibilities *"
              multiline
              rows={4}
              value={responsibilities}
              onChange={(event) => setResponsibilities(event.target.value)}
              placeholder="Enter each responsibility on a new line"
              helperText="Enter each item on a new line"
              required
            />

            <TextField
              label="Requirements *"
              multiline
              rows={4}
              value={requirements}
              onChange={(event) => setRequirements(event.target.value)}
              placeholder="Enter each requirement on a new line"
              helperText="Enter each item on a new line"
              required
            />
          </Box>
        </CardContent>
      </Card>

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
          disabled={saving}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={() => void handleSave(false)}
          disabled={saving}
          sx={{ textTransform: "none" }}
        >
          Save as Draft
        </Button>

        <Button
          variant="contained"
          startIcon={
            saving ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SaveIcon />
            )
          }
          onClick={() => void handleSave(true)}
          disabled={saving}
          sx={{ bgcolor: "text.primary", textTransform: "none" }}
        >
          {saving ? "Saving..." : "Publish"}
        </Button>
      </Box>
    </Container>
  );
}

export default CreateOpportunityPage;
