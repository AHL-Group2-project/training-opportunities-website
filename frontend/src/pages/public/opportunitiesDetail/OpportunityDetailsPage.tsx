import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import api from "../../../lib/axios";
import type { Opportunity } from "../../../types/opportunity.types";
import OpportunityDetailsHeader from "./OpportunityDetailsHeader";
import OpportunityContent from "./OpportunityContent";
import ApplicationPanel from "./ApplicationPanel";
import CompanyCard from "./CompanyCard";

interface StudentApplication {
  opportunityId: string | null;
}

function OpportunityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const isStudent = isAuthenticated && user?.role === "student";

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [loadedKey, setLoadedKey] = useState("");

  const requestKey = JSON.stringify([
    id,
    isAuthenticated,
    user?.id,
    user?.role,
    retryKey,
  ]);

  useEffect(() => {
    let isMounted = true;

    const loadOpportunity = async () => {
      setLoading(true);
      setError("");
      setHasApplied(false);
      setOpportunity(null);

      if (!id) {
        setError("Opportunity not found");
        setLoadedKey(requestKey);
        setLoading(false);
        return;
      }

      let checkingApplications = false;

      try {
        const response = await api.get<Opportunity>(`/opportunities/${id}`);

        let alreadyApplied = false;

        if (isStudent) {
          checkingApplications = true;

          const applicationsResponse =
            await api.get<StudentApplication[]>("/applications/me");

          alreadyApplied = applicationsResponse.data.some(
            (application) =>
              application.opportunityId !== null &&
              String(application.opportunityId) === String(response.data.id),
          );
        }

        if (isMounted) {
          setOpportunity(response.data);
          setHasApplied(alreadyApplied);
        }
      } catch (requestError) {
        if (!isMounted) return;

        if (checkingApplications) {
          setError(
            "Unable to check whether you already applied. Please try again.",
          );
        } else if (
          axios.isAxiosError(requestError) &&
          requestError.response?.status === 404
        ) {
          setError("Opportunity not found");
        } else {
          setError("Unable to load opportunity. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoadedKey(requestKey);
          setLoading(false);
        }
      }
    };

    void loadOpportunity();

    return () => {
      isMounted = false;
    };
  }, [id, isStudent, requestKey]);

  if (loading || loadedKey !== requestKey) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress aria-label="Loading opportunity and application status" />
      </Box>
    );
  }

  if (error || !opportunity) {
    return (
      <Box sx={{ py: 10, px: 2, textAlign: "center" }}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
          {error || "Opportunity not found"}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setRetryKey((current) => current + 1)}
            sx={{ textTransform: "none" }}
          >
            Retry
          </Button>

          <Button
            component={Link}
            to="/opportunities"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Back to opportunities
          </Button>
        </Box>
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

  const isDeadlinePassed =
    opportunity.daysLeft != null && opportunity.daysLeft <= 0;

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/opportunities/${opportunity.id}` },
      });
      return;
    }

    if (!isStudent || hasApplied || isDeadlinePassed) {
      return;
    }

    if (opportunity.applicationType === "external") {
      if (!opportunity.externalApplicationUrl) {
        setError("The external application link is unavailable.");
        return;
      }

      window.open(
        opportunity.externalApplicationUrl,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    navigate(`/opportunities/${opportunity.id}/apply`);
  };
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
            isAuthenticated={isAuthenticated}
            isStudent={isStudent}
            onApply={handleApply}
          />

          <CompanyCard opportunity={opportunity} />
        </Box>
      </Box>
    </Box>
  );
}

export default OpportunityDetailsPage;
