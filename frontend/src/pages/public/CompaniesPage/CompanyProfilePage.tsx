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
  Container,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
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
  const accentColor = stringToColor(company.name);

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
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            to="/companies"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            All companies
          </Button>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: stringToBackgroundColor(company.name),
                color: accentColor,
                fontWeight: "bold",
                fontSize: 28,
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography variant="h4">{company.name}</Typography>
                {company.verified && (
                  <VerifiedOutlinedIcon color="primary" fontSize="medium" />
                )}
              </Stack>
              <Typography variant="body1" color="text.secondary">
                {company.industry}
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", flexWrap: "wrap", mb: 3 }}
          >
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <LocationOnOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2">{company.location}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <LanguageOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2">{company.website}</Typography>
            </Stack>
          </Stack>

          {/* Quick stats row */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WorkOutlineOutlinedIcon color="primary" fontSize="small" />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {company.activeOpportunities}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Active internships
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <GroupsOutlinedIcon color="primary" fontSize="small" />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {company.pastInterns.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Past interns
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
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

            <Box sx={{ mb: 1 }}>
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

              <Stack spacing={2}>
                {company.opportunities.map((opp) => (
                  <Paper
                    key={opp.id}
                    elevation={1}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        boxShadow: 4,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
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
                            color: accentColor,
                            fontSize: 14,
                          }}
                        >
                          {initials}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">
                            {company.name}
                          </Typography>
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

                    <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                      {opp.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "center", mb: 2 }}
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
                      <Button variant="contained" size="medium">
                        Apply
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: 3, borderRadius: 3, boxShadow: 1, mt: 3 }}>
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
