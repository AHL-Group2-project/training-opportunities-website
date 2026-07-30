import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MOCK_APPLICATIONS } from "../../../mock/applications";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ApplicationsPage() {
  const navigate = useNavigate();
  const [applications] = useState(MOCK_APPLICATIONS);

  // TODO: Replace with API call
  // useEffect(() => {
  //   api.get("/applications/me").then(res => setApplications(res.data));
  // }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1C2B4A", mb: 1 }}
        >
          My Applications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track all your internship applications
        </Typography>
      </Box>

      {/* Applications List */}
      {applications.length === 0 ? (
        <Card
          variant="outlined"
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            borderColor: "grey.200",
          }}
        >
          <Typography variant="h6" sx={{ color: "#1C2B4A", mb: 1 }}>
            No applications yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You haven't applied to any opportunities yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/opportunities")}
            sx={{
              bgcolor: "#1C2B4A",
              textTransform: "none",
              "&:hover": { bgcolor: "#2a3f6b" },
            }}
          >
            Browse Opportunities
          </Button>
        </Card>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {applications.map((app) => (
            <Card
              key={app.id}
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: "grey.200",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 2 },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {/* Left: Company + Position */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <BusinessIcon
                        sx={{ fontSize: 20, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {app.company}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1C2B4A",
                        mb: 1,
                      }}
                    >
                      {app.position}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Applied on {formatDate(app.appliedAt)}
                      </Typography>
                    </Box>

                    <Chip
                      label="Submitted"
                      size="small"
                      sx={{
                        bgcolor: "#EEF4FF",
                        color: "#4A90D9",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>

                  {/* Right: Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    <Button
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() =>
                        navigate(`/opportunities/${app.opportunityId}`)
                      }
                      sx={{
                        color: "#4A90D9",
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      View Opportunity
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default ApplicationsPage;
