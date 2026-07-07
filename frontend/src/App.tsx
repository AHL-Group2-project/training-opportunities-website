import { ThemeProvider, CssBaseline } from "@mui/material";
import AppRouter from "./routes/AppRouter";
import theme from "./lib/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
