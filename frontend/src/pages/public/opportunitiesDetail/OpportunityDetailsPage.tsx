import { Box, Button, Typography } from "@mui/material";

import { Link, useParams } from "react-router-dom";

import { opportunitiesMock } from "../OpportunitiesPage/mock";

import OpportunityDetailsHeader from "./OpportunityDetailsHeader";
import OpportunityContent from "./OpportunityContent";
import ApplicationPanel from "./ApplicationPanel";
import CompanyCard from "./CompanyCard";

function OpportunityDetailsPage() {
  const { id } = useParams();

  const opportunity = opportunitiesMock.find((item) => item.id === Number(id));

  if (!opportunity) {
    return (
      <Box
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
          Opportunity not found
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
          }}
        >
          The opportunity you are looking for does not exist.
        </Typography>

        <Button
          component={Link}
          to="/opportunities"
          variant="contained"
          sx={{
            mt: 3,
            textTransform: "none",
          }}
        >
          Back to opportunities
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1520px",
        mx: "auto",
        px: {
          xs: 1,
          sm: 2,
        },
        pb: 6,
      }}
    >
      <OpportunityDetailsHeader opportunity={opportunity} />

      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* العمود الرئيسي */}
        <OpportunityContent opportunity={opportunity} />

        {/* العمود الجانبي */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ApplicationPanel opportunity={opportunity} />

          <CompanyCard opportunity={opportunity} />
        </Box>
      </Box>
    </Box>
  );
}

export default OpportunityDetailsPage;
