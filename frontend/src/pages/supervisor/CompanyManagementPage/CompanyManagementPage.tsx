import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import type { Company } from "../../../mock/Companies";
import { MOCK_USERS } from "../../../mock/users";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useAuth } from "../../../context/authContext";

const INDUSTRIES = [
  "Technology",
  "Telecommunications",
  "Finance",
  "Healthcare",
  "Education",
  "Construction",
  "Manufacturing",
  "Consulting",
  "IT Infrastructure",
  "Other",
];

const LOCATIONS = [
  "Ramallah",
  "Hebron",
  "Nablus",
  "Bethlehem",
  "Jenin",
  "Tulkarm",
  "Qalqilya",
  "Jericho",
  "Remote",
];

function CompanyManagementPage() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // TODO: Replace with API call
  // useEffect(() => {
  //   api.get("/companies").then(res => setCompanies(res.data));
  // }, []);

  const filtered = companies.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" || c.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const handleOpenDialog = (company?: Company) => {
    if (company) {
      setEditingCompany(company);
      setName(company.name);
      setIndustry(company.industry || "");
      setLocation(company.location || "");
      setWebsite(company.website || "");
      setDescription(company.description || "");
      setEmail(company.email || "");
      setPhone(company.phone || "");
    } else {
      setEditingCompany(null);
      setName("");
      setIndustry("");
      setLocation("");
      setWebsite("");
      setDescription("");
      setEmail("");
      setPhone("");
      setTempPassword("");
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    const payload = {
      name,
      industry,
      location,
      website,
      description,
      email,
      phone,
      tempPassword,
    };

    if (editingCompany) {
      // TODO: PATCH /api/companies/:id
      console.log("UPDATE", editingCompany.id, payload);
    } else {
      if (!name || !email || !tempPassword) {
        alert("Please fill required fields (Name, Email, Temp Password).");
        return;
      }
      const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
      const newUserId = MOCK_USERS.length > 0 ? Math.max(...MOCK_USERS.map(u => u.id)) + 1 : 1;
      
      const newCompany: Company = {
        id: newId,
        name,
        industry,
        location,
        website,
        description,
        email,
        phone,
        logo: "https://via.placeholder.com/150", // default logo
        isActive: true,
        activationStatus: "active",
        activeOpportunities: 0,
        verified: false,
        opportunities: [],
        pastInterns: [],
        gallery: []
      };

      MOCK_COMPANIES.push(newCompany);
      MOCK_USERS.push({
        id: newUserId,
        name: name,
        email: email,
        password: tempPassword,
        role: "company",
        companyId: newId,
        mustChangePassword: true,
      });

      setCompanies([...MOCK_COMPANIES]);
      alert(
        `Company account for "${name}" created. They can log in using email: ${email} and password: ${tempPassword}.`,
      );
    }

    setDialogOpen(false);
  };

  const handleToggleActive = (companyId: number) => {
    // TODO: PATCH /api/companies/:id/status
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId ? { ...c, isActive: !c.isActive } : c,
      ),
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Companies
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage companies offering internships
          </Typography>
        </Box>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              textTransform: "none",
            }}
          >
            Add Company
          </Button>
        )}
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Industry</InputLabel>
          <Select
            value={industryFilter}
            label="Industry"
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {INDUSTRIES.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <Card sx={{ borderRadius: 2, borderColor: "divider" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.paper" }}>
                <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Industry</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                {isAdmin && (
                  <>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Activation</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 6 : 3}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    <Typography color="text.secondary">
                      No companies found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((company) => (
                  <TableRow key={company.id} hover>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          component="img"
                          src={company.logo}
                          alt={company.name}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            objectFit: "contain",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, color: "text.primary" }}
                        >
                          {company.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{company.industry || "—"}</TableCell>
                    <TableCell>{company.location || "—"}</TableCell>
                    {isAdmin && (
                      <>
                        <TableCell>
                          <Chip
                            label={
                              company.isActive !== false ? "Active" : "Inactive"
                            }
                            size="small"
                            sx={{
                              bgcolor:
                                company.isActive !== false
                                  ? "#ECFDF5"
                                  : "#F3F4F6",
                              color:
                                company.isActive !== false
                                  ? "#059669"
                                  : "#6B7280",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              company.activationStatus === "active"
                                ? "Active"
                                : "Pending"
                            }
                            size="small"
                            sx={{
                              bgcolor:
                                company.activationStatus === "active"
                                  ? "#ECFDF5"
                                  : "#FEF3C7",
                              color:
                                company.activationStatus === "active"
                                  ? "#059669"
                                  : "#D97706",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                navigate(`/companies/${company.id}`)
                              }
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDialog(company)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleToggleActive(company.id)}
                            >
                              {company.isActive !== false ? (
                                <ToggleOnIcon
                                  fontSize="small"
                                  color="success"
                                />
                              ) : (
                                <ToggleOffIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Box>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingCompany ? "Edit Company" : "Add New Company"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Company Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel>Industry</InputLabel>
              <Select
                value={industry}
                label="Industry"
                onChange={(e) => setIndustry(e.target.value)}
              >
                {INDUSTRIES.map((i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={location}
                label="Location"
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
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://company.com"
              fullWidth
            />

            <TextField
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />

            <TextField
              label="Contact Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />

            {!editingCompany && (
              <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                <TextField
                  label="Temporary Password *"
                  type="text"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  fullWidth
                  required
                  helperText="This password will be emailed to the company so they can log in."
                />
                <Button
                  variant="outlined"
                  sx={{ mt: 1, minWidth: 140, textTransform: "none" }}
                  onClick={() =>
                    setTempPassword(
                      Math.random().toString(36).slice(-8) + "A1!",
                    )
                  }
                >
                  Generate
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              textTransform: "none",
            }}
          >
            {editingCompany
              ? "Save Changes"
              : "Create Account & Send Credentials"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CompanyManagementPage;
