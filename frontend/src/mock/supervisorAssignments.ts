export interface SupervisorAssignment {
  id: number;
  studentId: number;
  supervisorId: number;
  semester: string;
}

export const MOCK_ASSIGNMENTS: SupervisorAssignment[] = [
  {
    id: 1,
    studentId: 1,
    supervisorId: 1,
    semester: "Fall 2026",
  },
];
