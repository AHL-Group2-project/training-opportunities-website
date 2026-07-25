import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { MOCK_OPPORTUNITIES } from "../../../mock/opportunities";
import OpportunityCard from "../../../components/ui/OpportunityCard";

function FeaturedOpportunities() {
  const navigate = useNavigate();

  // for API
  // useEffect(() => {
  //   api.get("/opportunities").then(res => setOpportunities(res.data));
  // }, []);

  const [opportunities] = useState(MOCK_OPPORTUNITIES);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        py: 4,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "grey.100",
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
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1C2B4A" }}>
            Featured Opportunities
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/opportunities")}
            sx={{ color: "#4A90D9", fontWeight: 600 }}
          >
            View all
          </Button>
        </Stack>

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
          }}
        >
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default FeaturedOpportunities;
