import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PublicRoute() {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    switch (user.role) {
      case "student":
        return <Navigate to="/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "company":
        return <Navigate to="/company/dashboard" replace />;
      default:
        return <Navigate to="/supervisor/dashboard" replace />;
    }
  }

  return <Outlet />;
}

export default PublicRoute;
