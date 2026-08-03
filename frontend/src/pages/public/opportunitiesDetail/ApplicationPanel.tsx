import { Box, Button, Card, Chip, Divider, Typography } from "@mui/material";

import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";

import type { Opportunity } from "../../../mock/opportunities";

type ApplicationPanelProps = {
  opportunity: Opportunity;
};

function ApplicationPanel({ opportunity }: ApplicationPanelProps) {
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        p: {
          xs: 2.5,
          md: 3,
        },
        borderRadius: 3,

        backgroundColor: alpha(theme.palette.primary.main, 0.06),
        backgroundImage: "none",

        borderColor: alpha(theme.palette.primary.main, 0.25),

        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.06)}`,
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
        Application closes in
      </Typography>

      <Box
        sx={(theme) => ({
          mt: 2,
          p: 2.5,
          textAlign: "center",
          backgroundColor: "background.paper",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          borderRadius: 2,
        })}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: 700,
            fontSize: "2.5rem",
            lineHeight: 1,
          }}
        >
          {opportunity.daysLeft}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "text.secondary",
            fontSize: "0.8rem",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Days remaining
        </Typography>
      </Box>

      <Divider
        sx={(theme) => ({
          my: 2.5,
          borderColor: alpha(theme.palette.primary.main, 0.2),
        })}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Chip
          label={opportunity.workMode}
          variant="outlined"
          sx={{ backgroundColor: "background.paper" }}
        />

        <Chip
          label={opportunity.duration}
          variant="outlined"
          sx={{ backgroundColor: "background.paper" }}
        />

        <Chip
          label={`${opportunity.seats} seats`}
          variant="outlined"
          sx={{ backgroundColor: "background.paper" }}
        />
      </Box>

      <Button
        component={Link}
        to={`/opportunities/${opportunity.id}/apply`}
        variant="contained"
        fullWidth
        sx={{
          borderRadius: 3,
          py: 1.5,
          textTransform: "none",
          fontWeight: 700,
          textDecoration: "none",
          mt: 3,
        }}
      >
        Apply now
      </Button>
    </Card>
  );
}

export default ApplicationPanel;
