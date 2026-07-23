import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import type { UserRole } from "../components/layout/navigation";
import StudentsPage from "../pages/public/StudentsPage/StudentsPage";
import PublicStudentProfilePage from "../pages/public/StudentsPage/PublicStudentProfilePage";

import LandingPage from "../pages/public/LandingPage/LandingPage";

function AppRouter() {
  //test navbar
  const demoRole: UserRole = "student"; // roles: "public", "student", "supervisor", "admin"

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
          role={demoRole}
          isAuthenticated={true}
          userName="Student User"
          notificationCount={1}
        />
        <Box component="main" sx={{ flex: 1, backgroundColor: "white", pt: 0 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route path="/students" element={<StudentsPage />} />
            <Route
              path="/students/:id"
              element={<PublicStudentProfilePage />}
            />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default AppRouter;
