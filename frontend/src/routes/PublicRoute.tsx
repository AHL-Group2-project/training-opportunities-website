import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PublicRoute() {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    if (user.role === "student") {
      return <Navigate to="/dashboard" replace />;
    }
    if (user.role === "company") {
      return <Navigate to="/company/dashboard" replace />;
    }
    return <Navigate to="/supervisor/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
