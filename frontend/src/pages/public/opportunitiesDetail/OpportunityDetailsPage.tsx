import { Box, Button, Typography } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";
import { MOCK_APPLICATIONS } from "../../../mock/applications";
import { useAuth } from "../../../context/authContext";
import OpportunityDetailsHeader from "./OpportunityDetailsHeader";
import OpportunityContent from "./OpportunityContent";
import ApplicationPanel from "./ApplicationPanel";
import CompanyCard from "./CompanyCard";

function OpportunityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const opportunity = MOCK_OPPORTUNITIES.find((item) => item.id === Number(id));

  if (!opportunity) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
          Opportunity not found
        </Typography>
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          The opportunity you are looking for does not exist.
        </Typography>
        <Button
          component={Link}
          to="/opportunities"
          variant="contained"
          sx={{ mt: 3, textTransform: "none" }}
        >
          Back to opportunities
        </Button>
      </Box>
    );
  }

  // Check if already applied
  const hasApplied =
    isAuthenticated && user
      ? MOCK_APPLICATIONS.some(
          (a) => a.studentId === Number(user.id) && a.opportunityId === Number(opportunity.id),
        )
      : false;

  // Check if deadline passed
  const isDeadlinePassed =
    opportunity.daysLeft !== undefined && opportunity.daysLeft <= 0;

  // Check if seats filled (auto-close)
  const isSeatsFilled =
    opportunity.seats !== undefined &&
    opportunity.applicants >= opportunity.seats;

  return (
    <Box
      sx={{
        maxWidth: "1520px",
        mx: "auto",
        px: { xs: 1, sm: 2 },
        pb: 6,
      }}
    >
      <OpportunityDetailsHeader opportunity={opportunity} />
      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        <OpportunityContent opportunity={opportunity} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <ApplicationPanel
            opportunity={opportunity}
            hasApplied={hasApplied}
            isDeadlinePassed={isDeadlinePassed}
            isSeatsFilled={isSeatsFilled}
            isAuthenticated={isAuthenticated}
            onApply={() => navigate(`/opportunities/${opportunity.id}/apply`)}
          />
          <CompanyCard opportunity={opportunity} />
        </Box>
      </Box>
    </Box>
  );
}

export default OpportunityDetailsPage;
