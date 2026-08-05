import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8B5CF6",
      light: "#A78BFA",
      dark: "#7C3AED",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F2F0EB",
      paper: "rgba(255, 255, 255, 0.55)",
    },
    text: {
      primary: "#1C1917",
      secondary: "#78716C",
    },
    error: { main: "#EF4444", light: "#F87171", dark: "#DC2626" },
    warning: { main: "#F59E0B", light: "#FBBF24", dark: "#D97706" },
    success: { main: "#22C55E", light: "#4ADE80", dark: "#16A34A" },
    info: { main: "#3B82F6", light: "#60A5FA", dark: "#2563EB" },
    divider: "rgba(0, 0, 0, 0.04)",
  },
  typography: {
    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.02em", color: "#1C1917" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1917" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em", color: "#1C1917" },
    h4: { fontWeight: 700, color: "#1C1917" },
    h5: { fontWeight: 600, color: "#1C1917" },
    h6: { fontWeight: 600, color: "#1C1917" },
    body1: { color: "#78716C", letterSpacing: "0.01em" },
    body2: { color: "#78716C", letterSpacing: "0.01em" },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.02em" },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          color: "#1C1917",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.04)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          backgroundImage: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(245, 158, 11, 0.2)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.06), 0 0 24px rgba(245, 158, 11, 0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderRadius: 28,
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow:
            "0 25px 50px rgba(0, 0, 0, 0.08), 0 0 40px rgba(245, 158, 11, 0.03)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 28px",
          boxShadow: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(245, 158, 11, 0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              boxShadow: "0 6px 28px rgba(245, 158, 11, 0.35)",
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.25)",
            "&:hover": {
              boxShadow: "0 6px 28px rgba(139, 92, 246, 0.35)",
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            backgroundColor: "rgba(245, 158, 11, 0.04)",
            borderColor: "rgba(245, 158, 11, 0.3)",
            color: "#D97706",
            backdropFilter: "blur(8px)",
            "&:hover": {
              backgroundColor: "rgba(245, 158, 11, 0.08)",
              borderColor: "rgba(245, 158, 11, 0.5)",
              boxShadow: "0 0 20px rgba(245, 158, 11, 0.06)",
            },
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            backgroundColor: "rgba(139, 92, 246, 0.04)",
            borderColor: "rgba(139, 92, 246, 0.3)",
            color: "#7C3AED",
            "&:hover": {
              backgroundColor: "rgba(139, 92, 246, 0.08)",
              borderColor: "rgba(139, 92, 246, 0.5)",
            },
          },
        },
        {
          props: { variant: "contained", color: "inherit" },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(8px)",
            color: "#1C1917",
            border: "1px solid rgba(0,0,0,0.06)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            },
          },
        },
        {
          props: { variant: "outlined", color: "inherit" },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderColor: "rgba(0, 0, 0, 0.1)",
            color: "#1C1917",
            backdropFilter: "blur(8px)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        },
      ],
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(8px)",
          color: "#1C1917",
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s ease",
          },
          "&:hover fieldset": {
            borderColor: "rgba(245, 158, 11, 0.3)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#F59E0B",
            boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.08)",
          },
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: "16px 16px 0 0",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          color: "#1C1917",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.55)",
          },
          "&.Mui-focused": {
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          },
          "&:before": { borderBottomColor: "rgba(0,0,0,0.06)" },
          "&:hover:before": { borderBottomColor: "rgba(245,158,11,0.3)" },
          "&:after": { borderBottomColor: "#F59E0B" },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#A8A29E",
          "&.Mui-focused": {
            color: "#D97706",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          color: "#44403C",
        },
      },
      variants: [
        {
          props: { color: "primary" },
          style: {
            backgroundColor: "rgba(245, 158, 11, 0.08)",
            color: "#B45309",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            boxShadow: "0 0 12px rgba(245, 158, 11, 0.04)",
          },
        },
        {
          props: { color: "secondary" },
          style: {
            backgroundColor: "rgba(139, 92, 246, 0.08)",
            color: "#6D28D9",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            boxShadow: "0 0 12px rgba(139, 92, 246, 0.04)",
          },
        },
        {
          props: { color: "success" },
          style: {
            backgroundColor: "rgba(34, 197, 94, 0.08)",
            color: "#15803D",
            border: "1px solid rgba(34, 197, 94, 0.2)",
          },
        },
        {
          props: { color: "error" },
          style: {
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            color: "#B91C1C",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          },
        },
        {
          props: { color: "warning" },
          style: {
            backgroundColor: "rgba(245, 158, 11, 0.08)",
            color: "#B45309",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          },
        },
      ],
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.02)",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#44403C",
          borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
        },
        head: {
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(8px)",
          color: "#78716C",
          fontWeight: 700,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 20px rgba(245, 158, 11, 0.02)",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: "2px 10px",
          color: "#44403C",
          "&:hover": {
            backgroundColor: "rgba(245, 158, 11, 0.06)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(245, 158, 11, 0.14)",
            },
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "4px 0 30px rgba(0, 0, 0, 0.06)",
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          margin: "4px 12px",
          color: "#78716C",
          "&:hover": {
            backgroundColor: "rgba(245, 158, 11, 0.05)",
            color: "#1C1917",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(245, 158, 11, 0.08)",
            color: "#D97706",
            "&:hover": {
              backgroundColor: "rgba(245, 158, 11, 0.12)",
            },
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(8px)",
          borderRadius: 18,
          padding: 4,
          border: "1px solid rgba(255, 255, 255, 0.6)",
        },
        indicator: {
          backgroundColor: "#F59E0B",
          borderRadius: 16,
          height: "100%",
          opacity: 0.1,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 16,
          zIndex: 1,
          color: "#78716C",
          "&.Mui-selected": {
            color: "#D97706",
          },
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px !important",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
          color: "#1C1917",
          "&:before": { display: "none" },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(28, 25, 23, 0.9)",
          backdropFilter: "blur(8px)",
          borderRadius: 12,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          fontSize: "0.8rem",
          color: "#F5F5F4",
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        bar: {
          borderRadius: 10,
          background: "linear-gradient(90deg, #FBBF24, #F59E0B)",
        },
      },
    },

    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#F59E0B",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#78716C",
          "&:hover": {
            backgroundColor: "rgba(245, 158, 11, 0.06)",
            color: "#D97706",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          color: "#B45309",
          border: "2px solid rgba(245, 158, 11, 0.12)",
        },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },
  },
});

export default theme;
