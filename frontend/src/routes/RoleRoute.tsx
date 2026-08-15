import { Navigate, Outlet } from "react-router-dom";
import { useAuth, type UserRole } from "../context/authContext";

interface RoleRouteProps {
  allowedRoles: UserRole[];
  fallback?: string;
}

function RoleRoute({
  allowedRoles,
  fallback = "/unauthorized",
}: RoleRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
