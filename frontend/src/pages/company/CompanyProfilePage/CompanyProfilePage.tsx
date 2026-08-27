import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import api from "../../../lib/axios";
import SaveIcon from "@mui/icons-material/Save";

interface CompanyProfile {
  _id: string;
  userId: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  linkedIn: string | null;
  logoUrl: string | null;
  description: string;
  contactEmail: string;
  phone: string;
  verified: boolean;
  isActive: boolean;
}

function CompanyProfilePage() {



  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get<CompanyProfile>("/companies/me/profile");
        const data = res.data;

        setCompany(data);
        setName(data.name || "");
        setDescription(data.description || "");
        setWebsite(data.website || "");
        setEmail(data.contactEmail || "");
        setPhone(data.phone || "");
        setLinkedIn(data.linkedIn || "");
      } catch (err) {
        console.error("Failed to fetch company profile", err);
        setError("Failed to load company profile. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleCancel = () => {
    if (!company) return;
    setName(company.name || "");
    setDescription(company.description || "");
    setWebsite(company.website || "");
    setEmail(company.contactEmail || "");
    setPhone(company.phone || "");
    setLinkedIn(company.linkedIn || "");
    setSuccess(false);
    setError("");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const res = await api.patch<CompanyProfile>("/companies/me/profile", {
        name,
        description,
        website,
        contactEmail: email,
        phone,
        linkedIn,
      });

      setCompany(res.data);
      setSuccess(true);
    } catch (err) {
      console.error("Failed to update company profile", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "text.primary", mb: 4 }}
      >
        Company Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Changes saved successfully.
        </Alert>
      )}

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                src={company?.logoUrl || undefined}
                sx={{ width: 80, height: 80 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {company?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company?.industry} • {company?.location}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip
                  label={company?.verified ? "Verified" : "Not Verified"}
                  color={company?.verified ? "success" : "default"}
                  size="small"
                />
                <Chip
                  label={company?.isActive ? "Active" : "Inactive"}
                  color={company?.isActive ? "primary" : "default"}
                  size="small"
                />
              </Box>
            </Box>

            <TextField
              label="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              label="LinkedIn"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              fullWidth
            />
            <TextField
              label="Contact Email"
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                sx={{ textTransform: "none" }}
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{ bgcolor: "text.primary", textTransform: "none" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CompanyProfilePage;