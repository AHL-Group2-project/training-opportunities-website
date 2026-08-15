import { type TrainingType } from "./mock_hours";

export interface TrainingRequest {
  id: number;
  studentId: number;
  supervisorId: number;
  companyId: number;
  type: TrainingType;
  position: string;
  department: string;
  field: string;
  workMode: string;
  startDate: string;
  endDate: string;
  expectedHours: number;
  offerLetterUrl?: string;
  insuranceUrl?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
}

export const MOCK_TRAINING_REQUESTS: TrainingRequest[] = [
  /* Student 2 (Dina) — FT1 request pending */
  {
    id: 1002,
    studentId: 2,
    supervisorId: 1,
    companyId: 1,
    type: "FT1",
    position: "Frontend Developer Intern",
    department: "Engineering",
    field: "Computer Science",
    workMode: "Hybrid",
    startDate: "2026-08-15",
    endDate: "2026-11-15",
    expectedHours: 150,
    offerLetterUrl: "https://drive.google.com/file/d/abc123",
    insuranceUrl: "https://drive.google.com/file/d/def456",
    status: "pending",
    createdAt: "2026-08-01T10:00:00Z",
  },

  /* Student 3 (Jana) — FT1 approved, in progress */
  {
    id: 1003,
    studentId: 3,
    supervisorId: 1,
    companyId: 1,
    type: "FT1",
    position: "Software Engineering Intern",
    department: "Engineering",
    field: "Computer Science",
    workMode: "Hybrid",
    startDate: "2026-07-20",
    endDate: "2026-10-20",
    expectedHours: 150,
    offerLetterUrl: "https://drive.google.com/file/d/abc123",
    insuranceUrl: "https://drive.google.com/file/d/def456",
    status: "approved",
    createdAt: "2026-07-15T09:00:00Z",
  },

  /* Student 4 (Ameed) — FT1 approved, waiting final */
  {
    id: 1004,
    studentId: 4,
    supervisorId: 1,
    companyId: 2,
    type: "FT1",
    position: "Backend Developer Intern",
    department: "Engineering",
    field: "Information Systems",
    workMode: "On-site",
    startDate: "2026-02-15",
    endDate: "2026-05-15",
    expectedHours: 150,
    offerLetterUrl: "https://drive.google.com/file/d/abc123",
    insuranceUrl: "https://drive.google.com/file/d/def456",
    status: "approved",
    createdAt: "2026-02-10T10:00:00Z",
  },

  /* Student 5 (Layan) — FT1 approved, completed */
  {
    id: 1005,
    studentId: 5,
    supervisorId: 1,
    companyId: 1,
    type: "FT1",
    position: "Mobile Developer Intern",
    department: "Engineering",
    field: "Computer Engineering",
    workMode: "Hybrid",
    startDate: "2026-01-15",
    endDate: "2026-04-15",
    expectedHours: 150,
    status: "approved",
    createdAt: "2026-01-10T08:00:00Z",
  },

  /* Student 6 (Omar) — FT1 approved, FT2 in progress */
  {
    id: 1006,
    studentId: 6,
    supervisorId: 1,
    companyId: 3,
    type: "FT1",
    position: "Data Analyst Intern",
    department: "Data Science",
    field: "Computer Science",
    workMode: "Remote",
    startDate: "2026-02-01",
    endDate: "2026-05-01",
    expectedHours: 150,
    status: "approved",
    createdAt: "2026-01-25T11:00:00Z",
  },
  {
    id: 1007,
    studentId: 6,
    supervisorId: 1,
    companyId: 1,
    type: "FT2",
    position: "ML Engineer Intern",
    department: "AI Lab",
    field: "Computer Science",
    workMode: "Hybrid",
    startDate: "2026-08-01",
    endDate: "2026-11-01",
    expectedHours: 150,
    status: "approved",
    createdAt: "2026-07-25T10:00:00Z",
  },

  /* Student 7 (Sara) — FT1 & FT2 both approved */
  {
    id: 1008,
    studentId: 7,
    supervisorId: 1,
    companyId: 2,
    type: "FT1",
    position: "Full-Stack Developer Intern",
    department: "Engineering",
    field: "Software Engineering",
    workMode: "On-site",
    startDate: "2026-01-05",
    endDate: "2026-04-05",
    expectedHours: 150,
    status: "approved",
    createdAt: "2025-12-28T09:00:00Z",
  },
  {
    id: 1009,
    studentId: 7,
    supervisorId: 1,
    companyId: 3,
    type: "FT2",
    position: "DevOps Engineer Intern",
    department: "Infrastructure",
    field: "Software Engineering",
    workMode: "Remote",
    startDate: "2026-06-01",
    endDate: "2026-09-01",
    expectedHours: 150,
    status: "approved",
    createdAt: "2026-05-25T10:00:00Z",
  },
];

export function getTrainingRequests(studentId: number): TrainingRequest[] {
  return MOCK_TRAINING_REQUESTS.filter((r) => r.studentId === studentId);
}

export function getTrainingRequestById(
  id: number,
): TrainingRequest | undefined {
  return MOCK_TRAINING_REQUESTS.find((r) => r.id === id);
}
