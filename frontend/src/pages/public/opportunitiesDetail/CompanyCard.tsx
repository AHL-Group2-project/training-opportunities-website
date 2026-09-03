import { Avatar, Box, Card, Chip, Typography } from "@mui/material";

import { alpha } from "@mui/material/styles";

import type { Opportunity } from "../../../types/opportunity.types";
type CompanyCardProps = {
  opportunity: Opportunity;
};

function CompanyCard({ opportunity }: CompanyCardProps) {
  const companyInitials = opportunity.company.slice(0, 2).toUpperCase();

  return (
    <Card
      sx={(theme) => ({
        p: {
          xs: 2.5,
          md: 3,
        },
        borderRadius: 3,

        backgroundColor: alpha(theme.palette.primary.main, 0.035),
        backgroundImage: "none",

        borderColor: alpha(theme.palette.primary.main, 0.2),

        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.05)}`,
      })}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          fontSize: "0.85rem",
        }}
      >
        About the company
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 2.5,
        }}
      >
        <Avatar
          sx={{
            width: 54,
            height: 54,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 700,
          }}
        >
          {companyInitials}
        </Avatar>

        <Box>
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {opportunity.company}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {opportunity.location}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            Department
          </Typography>

          <Typography
            sx={{
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            {opportunity.department}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            Field
          </Typography>

          <Typography
            sx={{
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            {opportunity.field}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            Work mode
          </Typography>

          <Chip
            label={opportunity.workMode}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              mt: 0.75,
              backgroundColor: "background.paper",
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}

export default CompanyCard;
