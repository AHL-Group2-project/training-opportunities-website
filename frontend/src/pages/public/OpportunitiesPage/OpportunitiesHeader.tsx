import { Box, Typography } from "@mui/material";

function OpportunitiesHeader() {
  return (
    <Box
      sx={{
        py: {
          xs: 2,
          md: 3,
        },
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "primary.main",
          fontWeight: 700,
          letterSpacing: 1.5,
        }}
      >
        Opportunities
      </Typography>

      <Typography
        component="h1"
        sx={{
          mt: 0.5,
          fontWeight: 700,
          color: "text.primary",
          fontSize: {
            xs: "2rem",
            md: "3rem",
          },
          lineHeight: 1.2,
        }}
      >
        Open field training positions
      </Typography>

      <Typography
        sx={{
          mt: 1.5,
          color: "text.secondary",
          fontSize: {
            xs: "1rem",
            md: "1.15rem",
          },
        }}
      >
        Discover internship opportunities at Palestine's most active companies.
      </Typography>
    </Box>
  );
}

export default OpportunitiesHeader;
