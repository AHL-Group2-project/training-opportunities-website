// src/pages/Error/UnauthorizedPage.tsx
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlockIcon from "@mui/icons-material/Block";

function UnauthorizedPage() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <BlockIcon sx={{ fontSize: 80, color: "#DC2626", mb: 2 }} />

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4rem", md: "6rem" },
          fontWeight: 800,
          color: "text.primary",
          lineHeight: 1,
        }}
      >
        403
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          mt: 2,
        }}
      >
        Access Denied
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 1, maxWidth: 400 }}
      >
        You don't have permission to access this page. Please contact your
        supervisor if you think this is a mistake.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          mt: 4,
          textTransform: "none",
          bgcolor: "text.primary",
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default UnauthorizedPage;
