import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  Alert,
  Stack,
  Divider,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { mockCompanies } from "../../../mock/Companies";

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

  const company = mockCompanies.find((c) => c.id === Number(id));

  if (!company) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">Company not found</Typography>
      </Container>
    );
  }

  const initials = company.name.slice(0, 2).toUpperCase();

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",
          py: 8,
          mb: 4,
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          mt: "-24px",
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            to="/companies"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            All companies
          </Button>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: stringToBackgroundColor(company.name),
                color: stringToColor(company.name),
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography variant="h4">{company.name}</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {company.industry}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <LocationOnOutlinedIcon fontSize="small" color="action" />
                  <Typography variant="body2">{company.location}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <LanguageOutlinedIcon fontSize="small" color="action" />
                  <Typography variant="body2">{company.website}</Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ p: 3, borderRadius: 3, boxShadow: 1, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                About
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {company.description}
              </Typography>
            </Box>
            <Box sx={{ p: 3, borderRadius: 3, boxShadow: 1, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Current opportunities</Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.opportunities.length} open
                </Typography>
              </Box>

              {company.opportunities.map((opp) => (
                <Box key={opp.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: stringToBackgroundColor(company.name),
                          color: stringToColor(company.name),
                          fontSize: 14,
                        }}
                      >
                        {initials}
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{company.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {company.industry}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip label={opp.type} size="small" />
                  </Box>

                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {opp.title}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    {opp.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      📍 {opp.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      👥 {opp.seats} seats
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📅 {opp.daysLeft}d left
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {opp.appliedCount} applied
                    </Typography>
                    <Button variant="outlined" size="small">
                      Apply
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </Box>

            <Box sx={{ p: 3, borderRadius: 3, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Past interns
              </Typography>
              <Grid container spacing={2}>
                {company.pastInterns.map((intern) => {
                  const internInitials = intern.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={intern.name}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: 2,
                          boxShadow: 1,
                        }}
                      >
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          {internInitials}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{intern.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {intern.major}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Active internships
                  </Typography>
                  <Typography variant="body2">
                    {company.activeOpportunities}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {company.verified && (
              <Alert
                icon={<VerifiedOutlinedIcon fontSize="inherit" />}
                severity="info"
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  PPU verified partner
                </Typography>
                <Typography variant="caption">
                  This company has signed the PPU field training agreement.
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
