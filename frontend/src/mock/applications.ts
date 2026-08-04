export interface Application {
  id: number;
  studentId: number;
  opportunityId: number;
  company: string;
  position: string;
  cvUrl?: string;
  portfolioUrl?: string;
  availabilityDate: string;
  appliedAt: string;
  status: "submitted";
}

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    studentId: 1,
    opportunityId: 1,
    company: "uWave",
    position: "Frontend Intern",
    cvUrl: "/uploads/cv_ahmad.pdf",
    portfolioUrl: "https://github.com/ahmad",
    availabilityDate: "2026-09-01",
    appliedAt: "2026-07-28T10:00:00Z",
    status: "submitted",
  },
  {
    id: 2,
    studentId: 1,
    opportunityId: 3,
    company: "Jawwal",
    position: "Mobile App Intern",
    cvUrl: "/uploads/cv_ahmad.pdf",
    portfolioUrl: "https://github.com/ahmad",
    availabilityDate: "2026-09-15",
    appliedAt: "2026-07-25T14:30:00Z",
    status: "submitted",
  },
];
