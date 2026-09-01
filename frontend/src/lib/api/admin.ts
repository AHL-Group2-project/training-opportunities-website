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

  updateCompany: (companyId: string, data: any) => 
    api.patch(`/admin/companies/${companyId}`, data),
  toggleCompanyStatus: (companyId: string) => 
    api.patch(`/admin/companies/${companyId}/status`),

  updateStudent: (studentId: string, data: any) =>
    api.patch(`/admin/students/${studentId}`, data),
  updateSupervisor: (supervisorId: string, data: any) =>
    api.patch(`/admin/supervisors/${supervisorId}`, data),
};
