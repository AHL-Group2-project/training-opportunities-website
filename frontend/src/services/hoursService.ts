import api from "../lib/axios";

export interface HourDailyLog {
  date: string;
  startTime: string;
  endTime: string;
  location: "office" | "remotely";
  hours: number;
  description?: string;
}

export interface HourWeekResponse {
  _id: string;
  studentId: string;
  internshipRequestId: string;
  companyId: string | null;
  trainingType: string;
  weekStartDate: string;
  totalHours: number;
  dailyLogs: HourDailyLog[];
  companyStatus: "pending" | "approved" | "rejected";
  companyComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitHoursPayload {
  trainingType: "FT1" | "FT2";
  entries: {
    date: string;
    startTime: string;
    endTime: string;
    location: "office" | "remotely";
    hours: number;
    description?: string;
  }[];
}

// Student routes
export const getMyHours = async (): Promise<HourWeekResponse[]> => {
  const { data } = await api.get<HourWeekResponse[]>("/students/me/hours");
  return data;
};

export const getMyTrainingState = async (): Promise<any> => {
  const { data } = await api.get<any>("/students/me/training-state");
  return data;
};

export const submitMyHoursBulk = async (payload: SubmitHoursPayload): Promise<void> => {
  await api.post("/students/me/hours/bulk", payload);
};

// Supervisor routes
export const getStudentHours = async (studentId: string): Promise<HourWeekResponse[]> => {
  const { data } = await api.get<HourWeekResponse[]>(`/supervisors/students/${studentId}/hours`);
  return data;
};

export const getStudentTrainingState = async (studentId: string): Promise<any> => {
  const { data } = await api.get<any>(`/supervisors/students/${studentId}/training-state`);
  return data;
};

export const reviewStudentHours = async (
  hourId: string,
  status: "approved" | "rejected",
  comment?: string
): Promise<void> => {
  await api.patch(`/supervisors/hours/${hourId}/review`, { status, comment });
};

// Company routes
export const getInternHours = async (studentId: string): Promise<HourWeekResponse[]> => {
  const { data } = await api.get<HourWeekResponse[]>(`/companies/me/interns/${studentId}/hours`);
  return data;
};

export const getInternTrainingState = async (studentId: string): Promise<any> => {
  const { data } = await api.get<any>(`/companies/me/interns/${studentId}/training-state`);
  return data;
};

export const reviewInternHours = async (
  hourId: string,
  status: "approved" | "rejected",
  comment?: string
): Promise<void> => {
  await api.patch(`/companies/me/hours/${hourId}`, { status, comment });
};
