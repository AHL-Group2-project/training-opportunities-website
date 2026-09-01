import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  Alert,
  Stack,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

function stringToColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 45%)`;
}

function stringToBackgroundColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 92%)`;
}

function CompanyProfilePage() {
  const { id } = useParams();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/companies/public/${id}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Failed to fetch company profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!company) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">Company not found</Typography>
      </Container>
    );
  }

  const initials = company.name?.slice(0, 2).toUpperCase() || "CO";
  const accentColor = stringToColor(company.name || "Company");

  return (
    <Box>
      <Box
        sx={{
          py: 8,
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          mt: "-24px",
          background: `linear-gradient(135deg, ${accentColor}11 0%, ${accentColor}33 100%)`,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            to="/companies"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 4, color: "text.secondary", "&:hover": { color: "primary.main" } }}
          >
            All companies
          </Button>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 100,
                height: 100,
                bgcolor: "background.paper",
                color: accentColor,
                fontWeight: "bold",
                fontSize: 32,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                border: "2px solid",
                borderColor: "background.paper",
              }}
            >
              {company.logoUrl ? (
                <Box
                  component="img"
                  src={company.logoUrl}
                  alt={company.name}
                  sx={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 1 }}
                />
              ) : (
                initials
              )}
            </Avatar>
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 0.5 }}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {company.name}
                </Typography>
                {company.verified && (
                  <VerifiedOutlinedIcon color="primary" sx={{ fontSize: 32 }} />
                )}
              </Stack>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                {company.industry}
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            spacing={3}
            sx={{ alignItems: "center", flexWrap: "wrap", ml: { xs: 0, sm: 15.5 } }}
          >
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "text.secondary" }}>
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {company.location || "Location not specified"}
              </Typography>
            </Stack>
            {company.website && (
              <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "primary.main" }}>
                <LanguageOutlinedIcon fontSize="small" />
                <Typography 
                  variant="body1" 
                  component="a" 
                  href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                  target="_blank" 
                  sx={{ fontWeight: 500, color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  {company.website}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3, borderRadius: 3, boxShadow: 1, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                About
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {company.description || "No description provided."}
              </Typography>
            </Box>

            {company.pastInterns && company.pastInterns.length > 0 && (
              <Box sx={{ p: 3, borderRadius: 3, boxShadow: 1, mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Past Interns
                </Typography>
                <Grid container spacing={2}>
                  {company.pastInterns.map((intern: any) => {
                    const internInitials = intern.name
                      ? intern.name.substring(0, 2).toUpperCase()
                      : "ST";

                    return (
                      <Grid item xs={12} sm={6} key={intern.userId}>
                        <Box
                          component={Link}
                          to={`/students/${intern.userId}`}
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                            p: 1.5,
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            border: "1px solid",
                            borderColor: "divider",
                            textDecoration: "none",
                            color: "inherit",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }
                          }}
                        >
                          <Avatar src={intern.avatarUrl || undefined} sx={{ bgcolor: "primary.main" }}>
                            {!intern.avatarUrl && internInitials}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{intern.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                              {intern.major}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {intern.university}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderRadius: 3, boxShadow: 1, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Company at a glance
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Industry
                  </Typography>
                  <Typography variant="body2">{company.industry}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body2">{company.location}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Website
                  </Typography>
                  <Typography variant="body2">{company.website}</Typography>
                </Box>
              </Stack>
            </Box>

            {company.verified && (
              <Alert
                icon={<VerifiedOutlinedIcon fontSize="inherit" />}
                severity="info"
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Verified partner
                </Typography>
                <Typography variant="caption">
                  This company has signed the university field training
                  agreement.
                </Typography>
              </Alert>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CompanyProfilePage;
