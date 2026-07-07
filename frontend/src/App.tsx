import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./lib/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>Internship Hub</div>
    </ThemeProvider>
  );
}

export default App;
