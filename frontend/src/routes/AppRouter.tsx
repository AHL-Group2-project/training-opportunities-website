import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import LandingPage from "../pages/public/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import StudentsPage from "../pages/public/StudentsPage/StudentsPage";
import PublicStudentProfilePage from "../pages/public/StudentsPage/PublicStudentProfilePage";
import CompaniesPage from "../pages/public/CompaniesPage/CompaniesPage";
import PublicCompanyProfilePage from "../pages/public/CompaniesPage/CompanyProfilePage";
import OpportunitiesPage from "../pages/public/OpportunitiesPage/OpportunitiesPage";
import OpportunityDetailsPage from "../pages/public/opportunitiesDetail/OpportunityDetailsPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import UnauthorizedPage from "../pages/error/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PublicRoute from "./PublicRoute";
import StudentsListPage from "../pages/supervisor/StudentsListPage";
import StudentDetailPage from "../pages/supervisor/StudentDetailPage";
import ReportsPage from "../pages/public/StudentsPage/ReportsPage";
import StudentProfilePage from "../pages/student/StudentProfilePage";

import ApplicationsPage from "../pages/student/ApplicationsPage/ApplicationsPage";
import InternshipRequestPage from "../pages/student/InternshipRequestPage/InternshipRequestPage";

import ManageOpportunitiesPage from "../pages/supervisor/ManageOpportunitiesPage/ManageOpportunitiesPage";
import CreateOpportunityPage from "../pages/supervisor/CreateOpportunityPage/CreateOpportunityPage";
import CompanyManagementPage from "../pages/supervisor/CompanyManagementPage/CompanyManagementPage";

import CompanyDashboardPage from "../pages/company/CompanyDashboardPage/CompanyDashboardPage";
import CompanyOpportunitiesPage from "../pages/company/CompanyOpportunitiesPage/CompanyOpportunitiesPage";
import CompanyRequestsPage from "../pages/company/CompanyRequestsPage/CompanyRequestsPage";
import CompanyProfilePage from "../pages/company/CompanyProfilePage/CompanyProfilePage";

import CompanyActivationPage from "../pages/auth/CompanyActivationPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Box component="main" sx={{ flex: 1, bgcolor: "white" }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route
              path="/opportunities/:id"
              element={<OpportunityDetailsPage />}
            />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route
              path="/companies/:id"
              element={<PublicCompanyProfilePage />}
            />
            <Route path="/students" element={<StudentsPage />} />
            <Route
              path="/students/:id"
              element={<PublicStudentProfilePage />}
            />
            <Route path="/activate" element={<CompanyActivationPage />} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Student routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={<div>Student Dashboard (coming soon)</div>}
              />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route
                path="/training/request"
                element={<InternshipRequestPage />}
              />
              <Route
                path="/training/hours"
                element={<div>Hours Tracker (coming soon)</div>}
              />
              <Route path="/training/reports" element={<ReportsPage />} />
              <Route
                path="/training/ft1"
                element={<div>FT1 (coming soon)</div>}
              />
              <Route
                path="/training/ft2"
                element={<div>FT2 (coming soon)</div>}
              />
              <Route
                path="/notifications"
                element={<div>Notifications (coming soon)</div>}
              />
              <Route path="/profile" element={<StudentProfilePage />} />
            </Route>

            {/* Supervisor routes */}
            <Route element={<RoleRoute allowedRoles={["supervisor"]} />}>
              <Route
                path="/supervisor/dashboard"
                element={<div>Supervisor Dashboard (coming soon)</div>}
              />
              <Route
                path="/supervisor/students"
                element={<StudentsListPage />}
              />
              <Route
                path="/supervisor/students/:id"
                element={<StudentDetailPage />}
              />
              <Route
                path="/supervisor/requests"
                element={<div>Pending Requests (coming soon)</div>}
              />
              <Route
                path="/supervisor/companies"
                element={<CompanyManagementPage />}
              />
              <Route
                path="/supervisor/opportunities"
                element={<ManageOpportunitiesPage />}
              />

              <Route
                path="/supervisor/opportunities/new"
                element={<CreateOpportunityPage />}
              />
              <Route
                path="/supervisor/opportunities/:id/edit"
                element={<CreateOpportunityPage />}
              />

              <Route
                path="/supervisor/announcements"
                element={<div>Announcements (coming soon)</div>}
              />
            </Route>

            {/* Admin routes */}
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route
                path="/admin/dashboard"
                element={<div>Admin Dashboard (coming soon)</div>}
              />
              <Route
                path="/admin/students"
                element={<div>Admin Students (coming soon)</div>}
              />
              <Route
                path="/admin/requests"
                element={<div>Admin Requests (coming soon)</div>}
              />
              <Route
                path="/admin/supervisors"
                element={<div>Supervisor Management (coming soon)</div>}
              />
              <Route
                path="/admin/companies"
                element={<CompanyManagementPage />}
              />
              <Route
                path="/admin/opportunities"
                element={<ManageOpportunitiesPage />}
              />
              <Route
                path="/admin/opportunities/new"
                element={<CreateOpportunityPage />}
              />
              <Route
                path="/admin/opportunities/:id/edit"
                element={<CreateOpportunityPage />}
              />
              <Route
                path="/admin/announcements"
                element={<div>Announcements (coming soon)</div>}
              />
            </Route>

            {/* Company routes */}
            <Route element={<RoleRoute allowedRoles={["company"]} />}>
              <Route
                path="/company/dashboard"
                element={<CompanyDashboardPage />}
              />
              <Route
                path="/company/opportunities"
                element={<CompanyOpportunitiesPage />}
              />
              <Route
                path="/company/opportunities/new"
                element={<CreateOpportunityPage />}
              />
              <Route
                path="/company/opportunities/:id/edit"
                element={<CreateOpportunityPage />}
              />
              <Route
                path="/company/requests"
                element={<CompanyRequestsPage />}
              />
              <Route path="/company/profile" element={<CompanyProfilePage />} />
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
