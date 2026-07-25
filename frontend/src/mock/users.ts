export type UserRole = "public" | "student" | "supervisor" | "admin";

export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "Student",
    email: "student@test.com",
    password: "123456",
    role: "student",
  },
  {
    id: 2,
    name: "Supervisor",
    email: "supervisor@test.com",
    password: "123456",
    role: "supervisor",
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
];
