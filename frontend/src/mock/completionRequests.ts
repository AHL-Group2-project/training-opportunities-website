export interface CompletionRequest {
  id: number;
  studentId: number;
  studentName: string;
  companyId: number;
  internshipId: number;
  totalHours: number;
  requiredHours: number;
  reportsSubmitted: number;
  status: "pending" | "approved" | "rejected";
  companyComment?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export const MOCK_COMPLETION_REQUESTS: CompletionRequest[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "Ahmad Joba",
    companyId: 1,
    internshipId: 1,
    totalHours: 150,
    requiredHours: 150,
    reportsSubmitted: 12,
    status: "pending",
    submittedAt: "2026-11-30T10:00:00Z",
  },
];
