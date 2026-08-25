import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MOCK_APPLICATIONS } from "../../../mock/applications";
import { useAuth } from "../../../context/authContext";
import api from "../../../lib/axios";
import type { Opportunity } from "../../../types/opportunity.types";
import OpportunityDetailsHeader from "./OpportunityDetailsHeader";
import OpportunityContent from "./OpportunityContent";
import ApplicationPanel from "./ApplicationPanel";
import CompanyCard from "./CompanyCard";

function OpportunityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadOpportunity = async () => {
      if (!id) {
        setError("Opportunity not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get<Opportunity>(`/opportunities/${id}`);

        if (isMounted) {
          setOpportunity(response.data);
        }
      } catch (requestError) {
        if (isMounted) {
          if (
            axios.isAxiosError(requestError) &&
            requestError.response?.status === 404
          ) {
            setError("Opportunity not found");
          } else {
            setError("Unable to load opportunity. Please try again.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOpportunity();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !opportunity) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
          {error || "Opportunity not found"}
        </Typography>

        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          The opportunity you are looking for could not be loaded.
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

  const hasApplied =
    isAuthenticated && user
      ? MOCK_APPLICATIONS.some(
          (application) =>
            String(application.studentId) === String(user.id) &&
            String(application.opportunityId) === String(opportunity.id),
        )
      : false;

  const isDeadlinePassed =
    opportunity.daysLeft !== null && opportunity.daysLeft <= 0;

  const isSeatsFilled = opportunity.applicants >= opportunity.seats;

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
