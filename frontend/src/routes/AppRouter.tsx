import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import StudentsPage from "../pages/public/StudentsPage/StudentsPage";
import PublicStudentProfilePage from "../pages/public/StudentsPage/PublicStudentProfilePage";
import CompaniesPage from "../pages/public/CompaniesPage/CompaniesPage";
import CompanyProfilePage from "../pages/public/CompaniesPage/CompanyProfilePage";
import OpportunitiesPage from "../pages/public/OpportunitiesPage/OpportunitiesPage";
import OpportunityDetailsPage from "../pages/public/opportunitiesDetail/OpportunityDetailsPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import UnauthorizedPage from "../pages/error/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PublicRoute from "./PublicRoute";

import ApplicationsPage from "../pages/student/ApplicationsPage/ApplicationsPage";
import InternshipRequestPage from "../pages/student/InternshipRequestPage/InternshipRequestPage";

import ManageOpportunitiesPage from "../pages/supervisor/ManageOpportunitiesPage/ManageOpportunitiesPage";
import CreateOpportunityPage from "../pages/supervisor/CreateOpportunityPage/CreateOpportunityPage";
import CompanyManagementPage from "../pages/supervisor/CompanyManagementPage/CompanyManagementPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:id" element={<CompanyProfilePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/:id" element={<PublicStudentProfilePage />} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Student routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<div>Student Dashboard (coming soon)</div>} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/training/request" element={<InternshipRequestPage />} />
              <Route path="/training/hours" element={<div>Hours Tracker (coming soon)</div>} />
              <Route path="/training/reports" element={<div>Reports (coming soon)</div>} />
              <Route path="/training/ft1" element={<div>FT1 (coming soon)</div>} />
              <Route path="/training/ft2" element={<div>FT2 (coming soon)</div>} />
              <Route path="/notifications" element={<div>Notifications (coming soon)</div>} />
              <Route path="/profile" element={<div>Student Profile (coming soon)</div>} />
            </Route>

            {/* Supervisor + Admin routes */}
            <Route element={<RoleRoute allowedRoles={["supervisor", "admin"]} />}>
              <Route path="/supervisor/dashboard" element={<div>Supervisor Dashboard (coming soon)</div>} />
              <Route path="/supervisor/students" element={<div>Supervisor Students (coming soon)</div>} />
              <Route path="/supervisor/requests" element={<div>Pending Requests (coming soon)</div>} />
              <Route path="/supervisor/opportunities" element={<ManageOpportunitiesPage />} />
              <Route path="/supervisor/opportunities/new" element={<CreateOpportunityPage />} />
              <Route path="/supervisor/opportunities/:id/edit" element={<CreateOpportunityPage />} />
              <Route path="/supervisor/companies" element={<CompanyManagementPage />} />
              <Route path="/supervisor/announcements" element={<div>Announcements (coming soon)</div>} />
            </Route>

            {/* Error pages */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default AppRouter;