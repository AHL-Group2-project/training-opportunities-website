export type RequestStatus = "pending" | "approved" | "rejected";
export type TrainingType = "ft1" | "ft2";

export interface SupervisorTrainingRequest {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    userId?: { email: string };
  };
  type: TrainingType;
  status: RequestStatus;
  companyName: string;
  position: string;
  department?: string;
  field?: string;
  workMode?: "on-site" | "remote" | "hybrid";
  startDate: string;
  endDate: string;
  expectedHours: number;
  description?: string;
  attachments?: string[];
  rejectionComment?: string;
  createdAt: string;
}