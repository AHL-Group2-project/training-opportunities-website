import { createContext, useContext } from "react";

export type UserRole = "student" | "supervisor" | "admin" | "company";

export interface AuthUser {
  id: string; // MongoDB ObjectId of the users document
  profileId: string; // ObjectId of the role-specific profile (studentProfiles, supervisorProfiles, etc.)
  name: string;
  email: string;
  role: UserRole;
  token: string;
  mustChangePassword: boolean;
  companyId?: string; // Only for role === "company"
  university?: string; // Exposed for admin role
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
