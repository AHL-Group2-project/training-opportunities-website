import { Box, Button, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import type { Opportunity } from "../../../mock/opportunities";

interface ApplicationPanelProps {
  opportunity: Opportunity;
  hasApplied: boolean;
  isDeadlinePassed: boolean;
  isSeatsFilled: boolean;
  isAuthenticated: boolean;
  onApply: () => void;
}

function ApplicationPanel({
  opportunity,
  hasApplied,
  isDeadlinePassed,
  isSeatsFilled,
  isAuthenticated,
  onApply,
}: ApplicationPanelProps) {
  const getButtonText = () => {
    if (!isAuthenticated) return "Login to Apply";
    if (hasApplied) return "Already Applied";
    if (isDeadlinePassed) return "Deadline Passed";
    if (isSeatsFilled) return "Seats Filled";
    return "Apply Now";
  };

  const isDisabled =
    !isAuthenticated || hasApplied || isDeadlinePassed || isSeatsFilled;

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
            {opportunity.daysLeft} days left
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

      {opportunity.seats && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block", textAlign: "center" }}
        >
          {opportunity.applicants} applied • {opportunity.seats} seats
        </Typography>
      )}
    </Box>
  );
}

export default ApplicationPanel;
