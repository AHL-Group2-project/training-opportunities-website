import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PublicRoute() {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    // Redirect based on role
    if (user.role === "student") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/supervisor/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
