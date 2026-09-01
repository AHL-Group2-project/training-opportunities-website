import api from "../axios";

export const supervisorApi = {
  getRequests: () => api.get("/supervisor/requests"),
  updateRequestStatus: (id: string, status: "approved" | "rejected") =>
    api.put(`/supervisor/requests/${id}/status`, { status }),
};
