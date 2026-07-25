import { createContext, useContext } from "react";
import type { UserRole } from "../mock/users";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  token: string;
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
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
