import { Routes, Route } from "react-router-dom";
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

import StudentDashboardPage from "../pages/public/StudentDashboardPage/StudentDashboardPage";
import HoursPage from "../pages/HoursPage/HoursPage";

import OpportunityApplicationPage from "../pages/students/OpportunityApplication/OpportunityApplicationPage";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard/SupervisorDashboard";
import PendingRequestsPage from "../pages/supervisor/PendingRequests/PendingRequestsPage";
import SupervisorProfilePage from "../pages/supervisor/SupervisorProfilePage";

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
import TrainingRequestsPage from "../pages/student/TrainingRequestsPage/TrainingRequestsPage";
import NotificationsPage from "../pages/shared/NotificationsPage/NotificationsPage";

import ManageOpportunitiesPage from "../pages/supervisor/ManageOpportunitiesPage/ManageOpportunitiesPage";
import CreateOpportunityPage from "../pages/supervisor/CreateOpportunityPage/CreateOpportunityPage";
import CompanyManagementPage from "../pages/supervisor/CompanyManagementPage/CompanyManagementPage";

import CompanyDashboardPage from "../pages/company/CompanyDashboardPage/CompanyDashboardPage";
import CompanyOpportunitiesPage from "../pages/company/CompanyOpportunitiesPage/CompanyOpportunitiesPage";
import CompanyRequestsPage from "../pages/company/CompanyRequestsPage/CompanyRequestsPage";
import CompanyProfilePage from "../pages/company/CompanyProfilePage/CompanyProfilePage";
import CompanyApplicationsPage from "../pages/company/CompanyApplicationsPage/CompanyApplicationsPage";
import CompanyInternsPage from "../pages/company/CompanyInternsPage/CompanyInternsPage";

import CompanyActivationPage from "../pages/auth/CompanyActivationPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";

/* ═══ ADMIN PAGES ═══ */
import AdminDashboardPage from "../pages/admin/AdminDashboardPage/AdminDashboardPage";
import AdminStudentsPage from "../pages/admin/AdminStudentsPage/AdminStudentsPage";
import AdminSupervisorsPage from "../pages/admin/AdminSupervisorsPage/AdminSupervisorsPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";

function AppRouter() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route
            path="/opportunities/:id"
            element={<OpportunityDetailsPage />}
          />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<PublicCompanyProfilePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/:id" element={<PublicStudentProfilePage />} />
          <Route path="/activate" element={<CompanyActivationPage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Student routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/dashboard" element={<StudentDashboardPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route
              path="/opportunities/:id/apply"
              element={<OpportunityApplicationPage />}
            />
            <Route
              path="/training/request"
              element={<InternshipRequestPage />}
            />
            <Route path="/training/requests" element={<TrainingRequestsPage />} />
            <Route path="/training/hours" element={<HoursPage />} />
            <Route path="/training/reports" element={<ReportsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<StudentProfilePage />} />
          </Route>

          {/* Supervisor routes */}
          <Route element={<RoleRoute allowedRoles={["supervisor"]} />}>
            <Route
              path="/supervisor/profile"
              element={<SupervisorProfilePage />}
            />
            <Route
              path="/supervisor/dashboard"
              element={<SupervisorDashboard />}
            />
            <Route path="/supervisor/students" element={<StudentsListPage />} />
            <Route
              path="/supervisor/students/:id"
              element={<StudentDetailPage />}
            />
            <Route
              path="/supervisor/requests"
              element={<PendingRequestsPage />}
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

          </Route>

          {/* Admin routes */}
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/profile" element={<AdminProfilePage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/students" element={<AdminStudentsPage />} />
            <Route path="/admin/students/:id" element={<StudentDetailPage />} />
            <Route
              path="/admin/supervisors"
              element={<AdminSupervisorsPage />}
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

          </Route>

          {/* Company routes */}
          <Route element={<RoleRoute allowedRoles={["company"]} />}>
            <Route
              path="/company/dashboard"
              element={<CompanyDashboardPage />}
            />
            <Route path="/company/interns" element={<CompanyInternsPage />} />
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
              path="/company/applications"
              element={<CompanyApplicationsPage />}
            />
            <Route path="/company/requests" element={<CompanyRequestsPage />} />
            <Route path="/company/profile" element={<CompanyProfilePage />} />

          </Route>

          {/* Shared Routes */}
          <Route element={<RoleRoute allowedRoles={["supervisor", "admin", "company"]} />}>
            <Route path="/training/hours/:studentId" element={<HoursPage />} />
          </Route>

          {/* Error pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default AppRouter;
