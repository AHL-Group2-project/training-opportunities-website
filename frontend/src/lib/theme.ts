import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E3A59",
    },
    secondary: {
      main: "#4A90D9",
    },
    background: {
      default: "#F0F4FA",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
