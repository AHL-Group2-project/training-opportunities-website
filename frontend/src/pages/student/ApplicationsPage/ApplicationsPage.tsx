import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MOCK_APPLICATIONS } from "../../../mock/applications";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ApplicationsPage() {
  const navigate = useNavigate();
  const [applications] = useState(MOCK_APPLICATIONS);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1C2B4A", mb: 1 }}
        >
          My Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Track all the internship opportunities you've applied to
        </Typography>

        {/* How it works - improved */}
        <Card
          variant="outlined"
          sx={{
            mb: 4,
            borderRadius: 2,
            borderColor: "#4A90D9",
            bgcolor: "#F0F7FF",
            boxShadow: "none",
          }}
        >
          <CardContent
            sx={{ display: "flex", gap: 2, alignItems: "flex-start", py: 2 }}
          >
            <InfoOutlinedIcon
              sx={{ color: "#4A90D9", fontSize: 24, mt: 0.3, flexShrink: 0 }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#1C2B4A", mb: 0.5 }}
              >
                How it works
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                Applications are for your reference only. To start your
                internship, submit a{" "}
                <Button
                  size="small"
                  onClick={() => navigate("/training/request")}
                  sx={{
                    textTransform: "none",
                    p: 0,
                    minWidth: 0,
                    color: "#4A90D9",
                    fontWeight: 600,
                    textDecoration: "underline",
                    "&:hover": { bgcolor: "transparent", color: "#1C2B4A" },
                  }}
                >
                  training request
                </Button>{" "}
                after you receive an acceptance from the company.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Applications List */}
        {applications.length === 0 ? (
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, textAlign: "center", py: 8 }}
          >
            <CardContent>
              <WorkOutlineRoundedIcon
                sx={{ fontSize: 48, color: "grey.300", mb: 2 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1C2B4A", mb: 1 }}
              >
                No applications yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Browse opportunities and apply to start your journey
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/opportunities")}
                sx={{ bgcolor: "#1C2B4A", textTransform: "none" }}
              >
                Browse Opportunities
              </Button>
            </CardContent>
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
                  "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#1C2B4A", mb: 0.5 }}
                      >
                        {app.position}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {app.company}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Applied{" "}
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Chip
                        label="Submitted"
                        size="small"
                        sx={{
                          bgcolor: "#ECFDF5",
                          color: "#059669",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                        }}
                      />
                      <Button
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() =>
                          navigate(`/opportunities/${app.opportunityId}`)
                        }
                        sx={{ textTransform: "none", color: "#4A90D9" }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ApplicationsPage;
