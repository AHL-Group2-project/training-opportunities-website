// src/pages/Error/NotFoundPage.tsx
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function NotFoundPage() {
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
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "6rem", md: "8rem" },
          fontWeight: 800,
          color: "#1C2B4A",
          lineHeight: 1,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#1C2B4A",
          mt: 2,
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 1, maxWidth: 400 }}
      >
        The page you are looking for does not exist or has been moved.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<HomeIcon />}
        sx={{
          mt: 4,
          textTransform: "none",
          bgcolor: "#1C2B4A",
          "&:hover": { bgcolor: "#2a3d5c" },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
