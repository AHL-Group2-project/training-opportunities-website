import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { AuthProvider } from "../context/AuthProvider";
import { useAuth } from "../context/authContext";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";

function AppRouter() {
  //test navbar
  const { user, isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
          }}
        >
          {/* props to navbar for testing */}
          <Navbar
            role={user?.role ?? "public"}
            isAuthenticated={isAuthenticated}
            userName={user?.name ?? "Guest"}
            notificationCount={1}
          />
          <Box
            component="main"
            sx={{ flex: 1, backgroundColor: "#F0F4FA", pt: 0 }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRouter;
