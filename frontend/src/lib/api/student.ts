import api from "../axios";

export const studentApi = {
  getProfile: () => api.get("/student/profile"),
  submitRequest: (data: any) => api.post("/student/requests", data),
};
