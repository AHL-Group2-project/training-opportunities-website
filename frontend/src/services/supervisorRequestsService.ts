import api from "../lib/axios";
import type { SupervisorTrainingRequest } from "../types/supervisorRequests.types";

export const getMyRequests = async (): Promise<SupervisorTrainingRequest[]> => {
  const { data } = await api.get<SupervisorTrainingRequest[]>(
    "/supervisors/requests",
  );

  return data;
};

export const updateRequestStatus = async (
  id: string,
  status: "approved" | "rejected",
  rejectionComment?: string,
  companyId?: string | null,
): Promise<void> => {
  await api.put(`/supervisors/requests/${id}/status`, {
    status,
    rejectionComment,
    companyId,
  });
};