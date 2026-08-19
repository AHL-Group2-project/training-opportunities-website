import { Avatar, Box, Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import type { Opportunity } from "../../../mock/opportunities";

type OpportunityDetailsHeaderProps = {
  opportunity: Opportunity;
};

function OpportunityDetailsHeader({
  opportunity,
}: OpportunityDetailsHeaderProps) {
  const companyInitials = opportunity.company.slice(0, 2).toUpperCase();

  return (
    <Box
      sx={{
        py: {
          xs: 3,
          md: 5,
        },
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Button
        component={Link}
        to="/opportunities"
        color="inherit"
        sx={{
          mb: 3,
          px: 0,
          textTransform: "none",
          color: "text.secondary",
        }}
      >
        ← All opportunities
      </Button>

      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2.5,
        }}
      >
        <Avatar
          sx={{
            width: {
              xs: 64,
              md: 80,
            },
            height: {
              xs: 64,
              md: 80,
            },
            bgcolor: "primary.main",
            fontSize: {
              xs: "1.25rem",
              md: "1.5rem",
            },
            fontWeight: 700,
            borderRadius: 3,
          }}
        >
          {companyInitials}
        </Avatar>

        <Box>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.05rem",
            }}
          >
            {opportunity.company}
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 0.5,
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.2,
              fontSize: {
                xs: "1.8rem",
                md: "2.5rem",
              },
            }}
          >
            {opportunity.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 1.5,
              mt: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {opportunity.location}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {opportunity.seats} seats
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {opportunity.daysLeft} days left
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {opportunity.workMode}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {opportunity.duration}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default OpportunityDetailsHeader;
