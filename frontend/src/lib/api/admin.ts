import api from "../axios";

export const adminApi = {
  getStudents: () => api.get("/admin/students"),
  getSupervisors: () => api.get("/admin/supervisors"),
  getCompanies: () => api.get("/admin/companies"),

  createStudent: (data: any) => api.post("/admin/users/student", data),
  createSupervisor: (data: any) => api.post("/admin/users/supervisor", data),
  createCompany: (data: any) => api.post("/admin/users/company", data),

  assignSupervisor: (studentId: string, supervisorId: string) =>
    api.put(`/admin/students/${studentId}/assign-supervisor`, { supervisorId }),
};
