import { createContext, useContext } from "react";

export type UserRole = "student" | "supervisor" | "admin" | "company";

export interface AuthUser {
  id: string;
  profileId: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
  mustChangePassword: boolean;
  companyId?: string;
  university?: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
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
