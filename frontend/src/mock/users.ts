export type UserRole =
  "student" | "supervisor" | "admin" | "company";

declare global {
  interface Window {
    switchDevUser: (userId: number) => void;
    clearDevAuth: () => void;
    whoami: () => void;
  }
}
export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  companyId?: number;
  studentId?: number; // For student users, links to StudentProfile
  mustChangePassword?: boolean;
}

export const MOCK_USERS: MockUser[] = [
  /* ─── Students ─── */
  {
    id: 101,
    name: "student1",
    email: "s1@student.edu.ps",
    password: "123456",
    role: "student",
    studentId: 1,
  },
  {
    id: 102,
    name: "student2",
    email: "s2@student.edu.ps",
    password: "123456",
    role: "student",
    studentId: 2,
  },
  {
    id: 103,
    name: "student3",
    email: "s3@student.edu.ps",
    password: "123456",
    role: "student",
    studentId: 3,
  },
  {
    id: 104,
    name: "student4",
    email: "s4@student.edu.ps",
    password: "123456",
    role: "student",
    studentId: 4,
  },
  {
    id: 105,
    name: "student5",
    email: "s5@student.edu.ps",
    password: "123456",
    role: "student",
    studentId: 5,
  },
  {
    id: 106,
    name: "student6",
    email: "s6@student.edu.ps",
    password: "123456",
    role: "student",
    studentId: 6,
  },

  /* ─── Supervisor ─── */
  {
    id: 201,
    name: "supervisor",
    email: "supervisor@university.edu.ps",
    password: "123456",
    role: "supervisor",
  },

  /* ─── Company ─── */
  {
    id: 301,
    name: "AsalTech HR",
    email: "hr@asaltech.ps",
    password: "123456",
    role: "company",
    companyId: 1,
  },

  /* ─── Admin ─── */
  {
    id: 401,
    name: "System Admin",
    email: "admin@university.edu.ps",
    password: "123456",
    role: "admin",
  },
];
