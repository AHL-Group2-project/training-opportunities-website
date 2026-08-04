import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../../context/authContext";
import { MOCK_COMPANIES } from "../../../mock/Companies";
import SaveIcon from "@mui/icons-material/Save";

function CompanyProfilePage() {
  const { user } = useAuth();
  const companyId = user?.companyId;

  const company = MOCK_COMPANIES.find((c) => c.id === companyId);

  const [name, setName] = useState(company?.name || "");
  const [description, setDescription] = useState(company?.description || "");
  const [website, setWebsite] = useState(company?.website || "");
  const [email, setEmail] = useState(company?.email || "");
  const [phone, setPhone] = useState(company?.phone || "");

  const handleSave = () => {
    // TODO: PATCH /api/companies/:id
    console.log("UPDATE COMPANY", { name, description, website, email, phone });
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#1C2B4A", mb: 4 }}
      >
        Company Profile
      </Typography>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar src={company?.logo} sx={{ width: 80, height: 80 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {company?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company?.industry} • {company?.location}
                </Typography>
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
              <Button variant="outlined" sx={{ textTransform: "none" }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ bgcolor: "#1C2B4A", textTransform: "none" }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CompanyProfilePage;
