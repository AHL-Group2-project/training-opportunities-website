import { alpha, createTheme } from "@mui/material/styles";

const surface = "rgba(255, 255, 255, 0.75)"; // Light frosted glass
const surfaceStrong = "rgba(255, 255, 255, 0.95)"; // Almost solid white
const border = "rgba(0, 0, 0, 0.08)"; // Subtle dark border

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#D97706",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#A855F7",
      light: "#C084FC",
      dark: "#7E22CE",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8FAFC",
      paper: surface,
    },
    text: {
      primary: "#0F172A", // Slate 900
      secondary: "#475569", // Slate 600
    },
    success: {
      main: "#10B981",
    },
    warning: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
    info: {
      main: "#3B82F6",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "'Manrope', 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.03em",
      color: "#0F172A",
    },
    h2: {
      fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.03em",
      color: "#0F172A",
    },
    h3: {
      fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#0F172A",
    },
    h4: {
      fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "#0F172A",
    },
    h5: {
      fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
      fontWeight: 700,
      color: "#0F172A",
    },
    h6: {
      fontFamily: "'Space Grotesk', 'Manrope', sans-serif",
      fontWeight: 600,
      color: "#0F172A",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#F8FAFC", // Off-white for better contrast with pure white cards
          backgroundAttachment: "fixed",
        },
        "#root": {
          minHeight: "100vh",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15, 23, 42, 0.85)", // Sleek dark slate
          backgroundImage: "none",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
          color: "#FFFFFF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: surface,
          backgroundImage: "none",
          border: `1px solid ${border}`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "0 10px 40px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: surface,
          border: `1px solid ${border}`,
          boxShadow:
            "0 12px 36px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 24,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          position: "relative",
          zIndex: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 24px",
          transition: "all 220ms ease",
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            background: "linear-gradient(125deg, #F59E0B 0%, #D97706 100%)",
            color: "#FFFFFF",
            boxShadow: "0 8px 20px rgba(245, 158, 11, 0.25)",
            "&:hover": {
              boxShadow: "0 12px 28px rgba(245, 158, 11, 0.35)",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderColor: "rgba(245, 158, 11, 0.5)",
            backgroundColor: "transparent",
            color: "#D97706",
            "&:hover": {
              borderColor: "#D97706",
              backgroundColor: "rgba(245, 158, 11, 0.08)",
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#64748B",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            color: "#0F172A",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: surfaceStrong,
          borderRadius: 18,
          border: `1px solid ${border}`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: "4px 10px",
          color: "#0F172A",
          "&:hover": {
            backgroundColor: alpha("#F59E0B", 0.15),
            color: "#D97706",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: surfaceStrong,
          color: "#0F172A",
          borderRight: `1px solid ${border}`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: "4px 8px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 10,
          backgroundColor: "rgba(0, 0, 0, 0.06)",
          color: "#334155",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#64748B",
          fontSize: "0.76rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          backgroundColor: "rgba(241, 245, 249, 0.6)",
          borderBottom: `1px solid ${border}`,
        },
        body: {
          borderBottom: `1px solid ${border}`,
          color: "#0F172A",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: surfaceStrong,
          borderRadius: 24,
          border: `1px solid ${border}`,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          color: "#0F172A",
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.15)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(0, 0, 0, 0.3)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#F59E0B",
            boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.15)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#64748B",
          "&.Mui-focused": {
            color: "#D97706",
          },
        },
      },
    },
  },
});

export default theme;
