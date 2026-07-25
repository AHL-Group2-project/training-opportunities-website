import { ThemeProvider, CssBaseline } from "@mui/material";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import theme from "./lib/theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
