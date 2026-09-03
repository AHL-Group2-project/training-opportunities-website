export type StudentStatus = "Completed" | "Active" | "Not Started";

export interface SupervisorStudentListItem {
  id: string;
  name: string;
  university: string;
  major: string;
  year: number;
  currentInternship: string | null;
  ft1: boolean;
  ft2: boolean;
  totalHours: number;
  status: StudentStatus;
}

export interface StudentsListResponse {
  data: SupervisorStudentListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}