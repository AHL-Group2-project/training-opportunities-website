export interface Report {
  id: number;
  studentId: number;
  period: string;
  content: string;
  fileUrl?: string;
  status: "pending" | "approved" | "needs_revision";
  supervisorFeedback?: string;
  submittedAt: string;
}

export const MOCK_REPORTS: Report[] = [
  {
    id: 1,
    studentId: 1,
    period: "Week 1 (Sep 1-7)",
    content: "Completed login and registration pages...",
    status: "approved",
    submittedAt: "2026-09-07T20:00:00Z",
  },
  {
    id: 2,
    studentId: 1,
    period: "Week 2 (Sep 8-14)",
    content: "Working on dashboard components...",
    status: "pending",
    submittedAt: "2026-09-14T20:00:00Z",
  },
];
