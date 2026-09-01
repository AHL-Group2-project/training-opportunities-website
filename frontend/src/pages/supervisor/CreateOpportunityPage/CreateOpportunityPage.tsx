import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import AddIcon from "@mui/icons-material/Add";

import api from "../../../lib/axios";
import { useAuth } from "../../../context/authContext";
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

interface ExternalCompany {
  id?: string;
  _id?: string;
  name: string;
  industry?: string;
  location?: string;
  website?: string;
  description?: string;
  logo?: string;
  isExternal?: boolean;
}
interface ExternalCompanyForm {
  name: string;
  industry: string;
  location: string;
  website: string;
  description: string;
}
const EMPTY_EXTERNAL_COMPANY: ExternalCompanyForm = {
  name: "",
  industry: "",
  location: "",
  website: "",
  description: "",
};

const getCompanyId = (company: ExternalCompany) =>
  String(company.id || company._id || "");

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getRequestMessage = (requestError: unknown, fallback: string) => {
  if (axios.isAxiosError<{ message?: string }>(requestError)) {
    return requestError.response?.data?.message || fallback;
  }

  return fallback;
};

function CreateOpportunityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const isEdit = Boolean(id);
  const isCompanyUser = user?.role === "company";
  const isSupervisorUser = user?.role === "supervisor";
  const isAdmin = user?.role === "admin";

  const [title, setTitle] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
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
  const [externalApplicationUrl, setExternalApplicationUrl] = useState("");

  const [externalCompanies, setExternalCompanies] = useState<ExternalCompany[]>(
    [],
  );
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [newCompany, setNewCompany] = useState<ExternalCompanyForm>(
    EMPTY_EXTERNAL_COMPANY,
  );
  const [newCompanyLogo, setNewCompanyLogo] = useState<File | null>(null);

  const [companySaving, setCompanySaving] = useState(false);
  const [companyError, setCompanyError] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const getOpportunitiesListPath = () => {
    if (isCompanyUser) return "/company/opportunities";
    if (isAdmin) return "/admin/opportunities";
    return "/supervisor/opportunities";
  };

  useEffect(() => {
    if (!isSupervisorUser) return;

    let isMounted = true;

    const fetchExternalCompanies = async () => {
      try {
        setCompaniesLoading(true);
        const response = await api.get<ExternalCompany[]>(
          "/external-companies",
        );

        if (isMounted) {
          setExternalCompanies(response.data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            getRequestMessage(
              requestError,
              "Unable to load external companies. Please try again.",
            ),
          );
        }
      } finally {
        if (isMounted) {
          setCompaniesLoading(false);
        }
      }
    };

    void fetchExternalCompanies();

    return () => {
      isMounted = false;
    };
  }, [isSupervisorUser]);

  useEffect(() => {
    if (!isEdit || !id) return;

    let isMounted = true;

    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        setError("");

        const opportunityEndpoint = isCompanyUser
          ? `/opportunities/company/me/${id}`
          : `/opportunities/supervisor/me/${id}`;

        const response =
          await api.get<OpportunityResponse>(opportunityEndpoint);
        const opportunity = response.data;
        const responseCompanyId =
          typeof opportunity.companyId === "object"
            ? opportunity.companyId._id
            : opportunity.companyId;

        if (!isMounted) return;

        setTitle(opportunity.title || "");
        setSelectedCompanyId(responseCompanyId || "");
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
        setExternalApplicationUrl(opportunity.externalApplicationUrl || "");

        if (
          isSupervisorUser &&
          typeof opportunity.companyId === "object" &&
          responseCompanyId
        ) {
          setExternalCompanies((current) => {
            const alreadyExists = current.some(
              (company) => getCompanyId(company) === responseCompanyId,
            );

            return alreadyExists
              ? current
              : [...current, opportunity.companyId as ExternalCompany];
          });
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            getRequestMessage(
              requestError,
              "Unable to load this opportunity. Please try again.",
            ),
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchOpportunity();

    return () => {
      isMounted = false;
    };
  }, [id, isCompanyUser, isEdit, isSupervisorUser]);

  const handleNewCompanyChange = (
    fieldName: keyof ExternalCompanyForm,
    value: string,
  ) => {
    setNewCompany((current) => ({ ...current, [fieldName]: value }));
  };

  const handleCreateExternalCompany = async () => {
    if (
      !newCompany.name.trim() ||
      !newCompany.industry.trim() ||
      !newCompany.location.trim()
    ) {
      setCompanyError("Name, industry, and location are required.");
      return;
    }

    if (newCompany.website.trim() && !isHttpUrl(newCompany.website.trim())) {
      setCompanyError("Website must be a valid HTTP or HTTPS URL.");
      return;
    }

    if (newCompanyLogo) {
      const allowedLogoTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedLogoTypes.includes(newCompanyLogo.type)) {
        setCompanyError("Logo must be a JPG, PNG, or WebP image.");
        return;
      }

      const maxLogoSize = 5 * 1024 * 1024;

      if (newCompanyLogo.size > maxLogoSize) {
        setCompanyError("Logo image must not exceed 5 MB.");
        return;
      }
    }

    try {
      setCompanySaving(true);
      setCompanyError("");

      const formData = new FormData();

      formData.append("name", newCompany.name.trim());
      formData.append("industry", newCompany.industry.trim());
      formData.append("location", newCompany.location.trim());
      formData.append("website", newCompany.website.trim());
      formData.append("description", newCompany.description.trim());

      if (newCompanyLogo) {
        formData.append("logo", newCompanyLogo);
      }

      const response = await api.post<{ company: ExternalCompany }>(
        "/external-companies",
        formData,
        {
          headers: {
            "Content-Type": undefined,
          },
        },
      );

      const createdCompany = response.data.company;
      const createdCompanyId = getCompanyId(createdCompany);

      if (!createdCompanyId) {
        throw new Error("The server did not return a company ID.");
      }

      setExternalCompanies((current) => [...current, createdCompany]);
      setSelectedCompanyId(createdCompanyId);
      setNewCompany(EMPTY_EXTERNAL_COMPANY);
      setNewCompanyLogo(null);
      setCompanyDialogOpen(false);
    } catch (requestError) {
      setCompanyError(
        getRequestMessage(
          requestError,
          "Unable to create the external company. Please try again.",
        ),
      );
    } finally {
      setCompanySaving(false);
    }
  };

  const handleSave = async (publish: boolean) => {
    if (!isCompanyUser && !isSupervisorUser) {
      setError("This account cannot create or edit opportunities.");
      return;
    }

    if (
      !title.trim() ||
      (isSupervisorUser && !selectedCompanyId) ||
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

    if (seats < 1 || seats > 20) {
      setError("Seats must be between 1 and 20.");
      return;
    }

    if (
      isSupervisorUser &&
      (!externalApplicationUrl.trim() ||
        !isHttpUrl(externalApplicationUrl.trim()))
    ) {
      setError("Please enter a valid external application URL.");
      return;
    }

    const payload = {
      title: title.trim(),
      ...(isSupervisorUser ? { companyId: selectedCompanyId } : {}),
      ...(isSupervisorUser
        ? { externalApplicationUrl: externalApplicationUrl.trim() }
        : {}),
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
    } catch (requestError) {
      setError(
        getRequestMessage(
          requestError,
          isEdit
            ? "Unable to update the opportunity. Please try again."
            : "Unable to create the opportunity. Please try again.",
        ),
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
          {isSupervisorUser
            ? "Create an external opportunity and provide the company application link."
            : "Fill in all required fields. Use select inputs where available."}
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

            {isCompanyUser ? (
              <TextField
                label="Company"
                value={user?.name || "Your company"}
                disabled
                fullWidth
              />
            ) : (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <FormControl
                    fullWidth
                    required
                    disabled={companiesLoading || saving}
                  >
                    <InputLabel>External Company *</InputLabel>
                    <Select
                      value={selectedCompanyId}
                      label="External Company *"
                      onChange={(event) =>
                        setSelectedCompanyId(event.target.value)
                      }
                    >
                      {externalCompanies.map((company) => {
                        const companyId = getCompanyId(company);
                        return (
                          <MenuItem key={companyId} value={companyId}>
                            {company.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setCompanyError("");
                      setCompanyDialogOpen(true);
                    }}
                    disabled={saving}
                    sx={{
                      minWidth: { sm: 210 },
                      minHeight: 56,
                      textTransform: "none",
                    }}
                  >
                    Add External Company
                  </Button>
                </Box>

                {companiesLoading && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Loading external companies...
                  </Typography>
                )}
              </Box>
            )}

            {isSupervisorUser && (
              <TextField
                label="External Application URL *"
                value={externalApplicationUrl}
                onChange={(event) =>
                  setExternalApplicationUrl(event.target.value)
                }
                placeholder="https://www.linkedin.com/jobs/... or https://forms.gle/..."
                helperText="Students will be redirected to this link when they click Apply Externally."
                type="url"
                fullWidth
                required
              />
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Type *</InputLabel>
                <Select
                  value={type}
                  label="Type *"
                  onChange={(event) => setType(event.target.value)}
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
                  onChange={(event) => setWorkMode(event.target.value)}
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
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Department *</InputLabel>
                <Select
                  value={department}
                  label="Department *"
                  onChange={(event) => setDepartment(event.target.value)}
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
                  onChange={(event) => setField(event.target.value)}
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
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Duration *</InputLabel>
                <Select
                  value={duration}
                  label="Duration *"
                  onChange={(event) => setDuration(event.target.value)}
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
                  onChange={(event) => setLocation(event.target.value)}
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

      <Dialog
        open={companyDialogOpen}
        onClose={() => {
          if (!companySaving) {
            setCompanyDialogOpen(false);
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add External Company</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {companyError && <Alert severity="error">{companyError}</Alert>}

            <TextField
              label="Company Name *"
              value={newCompany.name}
              onChange={(event) =>
                handleNewCompanyChange("name", event.target.value)
              }
              required
              fullWidth
            />

            <TextField
              label="Industry *"
              value={newCompany.industry}
              onChange={(event) =>
                handleNewCompanyChange("industry", event.target.value)
              }
              required
              fullWidth
            />

            <TextField
              label="Location *"
              value={newCompany.location}
              onChange={(event) =>
                handleNewCompanyChange("location", event.target.value)
              }
              required
              fullWidth
            />

            <TextField
              label="Website"
              value={newCompany.website}
              onChange={(event) =>
                handleNewCompanyChange("website", event.target.value)
              }
              placeholder="https://company.com"
              type="url"
              fullWidth
            />

            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.primary", fontWeight: 700 }}
              >
                Company Logo
              </Typography>

              <Button
                component="label"
                variant="outlined"
                disabled={companySaving}
                sx={{ textTransform: "none" }}
              >
                {newCompanyLogo ? "Change Logo" : "Choose Logo"}

                <input
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                  onChange={(event) => {
                    const selectedLogo = event.target.files?.[0] ?? null;
                    setNewCompanyLogo(selectedLogo);
                    setCompanyError("");
                  }}
                />
              </Button>

              {newCompanyLogo && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Selected image: {newCompanyLogo.name}
                </Typography>
              )}
            </Box>

            <TextField
              label="Description"
              value={newCompany.description}
              onChange={(event) =>
                handleNewCompanyChange("description", event.target.value)
              }
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCompanyDialogOpen(false);
              setCompanyError("");
              setNewCompanyLogo(null);
            }}
            disabled={companySaving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => void handleCreateExternalCompany()}
            disabled={companySaving}
            startIcon={
              companySaving ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <AddIcon />
              )
            }
          >
            {companySaving ? "Adding..." : "Add Company"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateOpportunityPage;
