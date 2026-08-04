export interface ActiveInternship {
  id: number;
  studentId: number;
  studentName: string;
  companyId: number;
  supervisorId: number;
  position: string;
  startDate: string;
  endDate: string;
  requiredHours: number;
  status: "active" | "completed" | "cancelled";
}

export const MOCK_ACTIVE_INTERNSHIPS: ActiveInternship[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "Ahmad Joba",
    companyId: 1, // AsalTech
    supervisorId: 1,
    position: "Frontend Intern",
    startDate: "2026-09-01",
    endDate: "2026-11-30",
    requiredHours: 150,
    status: "active",
  },
];
