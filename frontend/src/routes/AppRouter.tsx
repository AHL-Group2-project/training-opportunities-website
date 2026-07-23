import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { useAuth } from "../context/authContext";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import StudentsPage from "../pages/public/StudentsPage/StudentsPage";
import PublicStudentProfilePage from "../pages/public/StudentsPage/PublicStudentProfilePage";

function AppRouter() {
  //test navbar
  const { user, isAuthenticated } = useAuth();

  return (
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
        <Box component="main" sx={{ flex: 1, backgroundColor: "white", pt: 0 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route
              path="/students/:id"
              element={<PublicStudentProfilePage />}
            />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default AppRouter;
