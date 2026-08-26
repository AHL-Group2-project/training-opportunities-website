import api from "../lib/axios";
import type { SupervisorTrainingRequest } from "../types/supervisorRequests.types";

export const getMyRequests = async (): Promise<SupervisorTrainingRequest[]> => {
  const { data } = await api.get<SupervisorTrainingRequest[]>(
    "/supervisor/requests",
  );

  return data;
};

export const updateRequestStatus = async (
  id: string,
  status: "approved" | "rejected",
  rejectionComment?: string,
): Promise<void> => {
  await api.put(`/supervisor/requests/${id}/status`, {
    status,
    rejectionComment,
  });
};