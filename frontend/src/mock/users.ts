export type UserRole =
  "public" | "student" | "supervisor" | "admin" | "company";

export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  companyId?: number;
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
  {
    id: 4,
    name: "AsalTech HR",
    email: "hr@asaltech.ps",
    password: "123456",
    role: "company",
    companyId: 1, // Links to AsalTech in Companies mock
  },
];
