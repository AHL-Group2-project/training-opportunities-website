import { Box, Button, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import type { Opportunity } from "../../../types/opportunity.types";

interface ApplicationPanelProps {
  opportunity: Opportunity;
  hasApplied: boolean;
  isDeadlinePassed: boolean;
  isAuthenticated: boolean;
  isStudent: boolean;
  onApply: () => void;
}

function ApplicationPanel({
  opportunity,
  hasApplied,
  isDeadlinePassed,
  isAuthenticated,
  isStudent,
  onApply,
}: ApplicationPanelProps) {
  const getButtonText = () => {
    if (!isAuthenticated) return "Login to Apply";
    if (!isStudent) return "Students Only";
    if (hasApplied) return "Already Applied";
    if (isDeadlinePassed) return "Deadline Passed";
    if (opportunity.applicationType === "external") return "Apply Externally";
    return "Apply Now";
  };

  const isDisabled =
    isAuthenticated && (!isStudent || hasApplied || isDeadlinePassed);

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "text.primary", mb: 2 }}
      >
        Apply for this position
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WorkOutlineOutlinedIcon
            sx={{ color: "text.secondary", fontSize: 20 }}
          />
          <Typography variant="body2" color="text.secondary">
            {opportunity.type}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnOutlinedIcon
            sx={{ color: "text.secondary", fontSize: 20 }}
          />
          <Typography variant="body2" color="text.secondary">
            {opportunity.location}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayOutlinedIcon
            sx={{ color: "text.secondary", fontSize: 20 }}
          />
          <Typography variant="body2" color="text.secondary">
            {opportunity.daysLeft == null
              ? "No deadline"
              : isDeadlinePassed
                ? "Deadline passed"
                : `${opportunity.daysLeft} days left`}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={isDisabled}
        onClick={onApply}
        sx={{
          textTransform: "none",
          py: 1.2,
        }}
      >
        {getButtonText()}
      </Button>
    </Box>
  );
}

export default ApplicationPanel;
