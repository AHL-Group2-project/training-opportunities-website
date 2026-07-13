import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import type { UserRole } from "../components/layout/navigation";
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
        <Box
          component="main"
          sx={{ flex: 1, backgroundColor: "#F0F4FA", pt: 8 }}
        >
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Routes>
              <Route path="/" element={<div>Landing Page</div>} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Box>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default AppRouter;
