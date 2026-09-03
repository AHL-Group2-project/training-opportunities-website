import api from "../axios";

export const studentApi = {
  getProfile: () => api.get("/students/me/profile"),
  getTrainingState: () => api.get("/students/me/training-state"),
  submitRequest: (data: any) => api.post("/students/requests", data),
};
