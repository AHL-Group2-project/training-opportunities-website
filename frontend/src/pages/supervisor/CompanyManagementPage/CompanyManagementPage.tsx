import { useState, useEffect } from "react";
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
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAuth } from "../../../context/authContext";
import { adminApi } from "../../../lib/api/admin";

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
  const [companies, setCompanies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Form state
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Password Reveal Modal state
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generatedUser, setGeneratedUser] = useState("");

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const fetchCompanies = async () => {
    try {
      const res = await adminApi.getCompanies();
      setCompanies(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = companies.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" || c.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  // Calculate paginated companies
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtered.length) : 0;
  const paginatedCompanies = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleOpenDialog = (company?: any) => {
    if (company) {
      setEditingCompany(company);
      setName(company.name);
      setIndustry(company.industry || "");
      setLocation(company.location || "");
      setWebsite(company.website || "");
      setDescription(company.description || "");
      setEmail(company.userId?.email || company.email || "");
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
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (editingCompany) {
      try {
        await adminApi.updateCompany(editingCompany._id, {
          name,
          email,
          industry,
          location,
          website,
          description,
          phone,
        });
        setDialogOpen(false);
        fetchCompanies();
      } catch (error: any) {
        alert(error.response?.data?.message || "Failed to update company.");
      }
    } else {
      if (!name || !email) {
        alert("Please fill required fields (Name, Email).");
        return;
      }

      try {
        const res = await adminApi.createCompany({
          name,
          email,
          industry,
          location,
          website,
          description,
          phone,
        });

        setGeneratedUser(name);
        setGeneratedPassword(res.data.tempPassword);
        setDialogOpen(false);
        setPasswordModalOpen(true);
        fetchCompanies();
      } catch (error: any) {
        alert(error.response?.data?.message || "Failed to create company.");
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  const handleToggleActive = async (companyId: string) => {
    try {
      await adminApi.toggleCompanyStatus(companyId);
      fetchCompanies();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to toggle company status.");
    }
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
      <Card sx={{ borderRadius: 0, borderColor: "divider", boxShadow: 1 }}>
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
              {paginatedCompanies.length === 0 ? (
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
                paginatedCompanies.map((company) => (
                  <TableRow key={company._id} hover>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          component="img"
                          src={
                            company.logoUrl || "https://via.placeholder.com/150"
                          }
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
                              (company.userId?.isActive ?? company.isActive) !== false ? "Active" : "Inactive"
                            }
                            size="small"
                            sx={{
                              bgcolor:
                                (company.userId?.isActive ?? company.isActive) !== false
                                  ? "#ECFDF5"
                                  : "#F3F4F6",
                              color:
                                (company.userId?.isActive ?? company.isActive) !== false
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
                              company.activationStatus === "active" ||
                              company.isVerified
                                ? "Active"
                                : "Pending"
                            }
                            size="small"
                            sx={{
                              bgcolor:
                                company.activationStatus === "active" ||
                                company.isVerified
                                  ? "#ECFDF5"
                                  : "#FEF3C7",
                              color:
                                company.activationStatus === "active" ||
                                company.isVerified
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
                                navigate(`/companies/${company._id}`)
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
                              onClick={() => handleToggleActive(company._id)}
                            >
                              {(company.userId?.isActive ?? company.isActive) !== false ? (
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 69 * emptyRows }}>
                  <TableCell colSpan={isAdmin ? 6 : 3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
              label="Contact Email *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              disabled={!!editingCompany}
              helperText={
                editingCompany
                  ? "Cannot change email after creation."
                  : "This will be the company's login email."
              }
            />

            <TextField
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
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
            {editingCompany ? "Save Changes" : "Create Account"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Reveal Modal */}
      <Dialog
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "success.main", fontWeight: "bold" }}>
          Company Created Successfully!
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            The account for <strong>{generatedUser}</strong> has been created.
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.default",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Temporary Password:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                {generatedPassword}
              </Typography>
              <IconButton
                onClick={copyToClipboard}
                color="primary"
                size="small"
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 2, display: "block" }}
          >
            Please copy this temporary password and send it securely to the
            company. You will not be able to view it again once this window is
            closed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setPasswordModalOpen(false)}
            sx={{ textTransform: "none" }}
          >
            I have copied the password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CompanyManagementPage;
