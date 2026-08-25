import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/axios";
import type { Opportunity } from "../../../types/opportunity.types";
import OpportunityCard from "../../../components/ui/OpportunityCard";

function FeaturedOpportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedOpportunities = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<Opportunity[]>("/opportunities");

        if (isMounted) {
          setOpportunities(response.data.slice(0, 4));
        }
      } catch {
        if (isMounted) {
          setError("Unable to load featured opportunities.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFeaturedOpportunities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box
      sx={{
        py: 4,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Box sx={{ py: 8, px: 4, maxWidth: 1200, mx: "auto" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Featured Opportunities
          </Typography>

          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/opportunities")}
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            View all
          </Button>
        </Stack>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && opportunities.length === 0 && (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            No featured opportunities are available.
          </Typography>
        )}

        {!loading && !error && opportunities.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
              justifyItems: "center",
            }}
          >
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FeaturedOpportunities;
