export interface HoursLog {
  id: number;
  studentId: number;
  date: string;
  hours: number;
  description: string;
  status: "pending" | "approved" | "rejected";
  supervisorComment?: string;
  submittedAt: string;
}

export const MOCK_HOURS: HoursLog[] = [
  {
    id: 1,
    studentId: 1,
    date: "2026-09-01",
    hours: 6,
    description: "Built login page component",
    status: "approved",
    submittedAt: "2026-09-01T18:00:00Z",
  },
  {
    id: 2,
    studentId: 1,
    date: "2026-09-02",
    hours: 8,
    description: "Integrated API endpoints",
    status: "approved",
    submittedAt: "2026-09-02T18:00:00Z",
  },
  {
    id: 3,
    studentId: 1,
    date: "2026-09-03",
    hours: 7,
    description: "Fixed responsive layout issues",
    status: "pending",
    submittedAt: "2026-09-03T18:00:00Z",
  },
];
