export interface InternshipRequest {
  id: number;
  studentId: number;
  type: "ft1" | "ft2";
  companyId: number;
  companyName?: string;
  position: string;
  department: string;
  field: string;
  workMode: "on-site" | "remote" | "hybrid";
  startDate: string;
  endDate: string;
  expectedHours: number;
  supervisorId: number;
  supervisorName: string;
  attachments: string[];
  status:
    | "submitted"
    | "under_review"
    | "approved"
    | "rejected"
    | "active"
    | "completed";
  supervisorComment?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export const MOCK_INTERNSHIP_REQUESTS: InternshipRequest[] = [
  {
    id: 1,
    studentId: 1,
    type: "ft1",
    companyId: 1,
    position: "Frontend Intern",
    department: "Computer Engineering",
    field: "Frontend Development",
    workMode: "on-site",
    startDate: "2026-09-01",
    endDate: "2026-11-30",
    expectedHours: 150,
    supervisorId: 2,
    supervisorName: "Dr. Maher Salamin",
    attachments: [
      "/uploads/offer_letter_uwave.pdf",
      "/uploads/insurance_doc.pdf",
    ],
    status: "approved",
    submittedAt: "2026-07-20T09:00:00Z",
    reviewedAt: "2026-07-22T11:00:00Z",
  },
  {
    id: 2,
    studentId: 1,
    type: "ft2",
    companyId: 2,
    position: "Backend Developer Intern",
    department: "Computer Engineering",
    field: "Backend Development",
    workMode: "hybrid",
    startDate: "2027-02-01",
    endDate: "2027-05-31",
    expectedHours: 150,
    supervisorId: 2,
    supervisorName: "Dr. Maher Salamin",
    attachments: ["/uploads/offer_letter_asal.pdf"],
    status: "submitted",
    submittedAt: "2026-07-28T10:00:00Z",
  },
];
