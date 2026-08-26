import api from "../lib/axios";
import type { StudentsListResponse } from "../types/supervisorStudents.types";

export interface GetMyStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const getMyStudents = async (
  params: GetMyStudentsParams,
): Promise<StudentsListResponse> => {
  const { data } = await api.get<StudentsListResponse>(
    "/supervisor/students",
    { params },
  );
  return data;
};

export const exportMyStudents = async (
  params: Omit<GetMyStudentsParams, "page" | "limit">,
): Promise<void> => {
  const response = await api.get("/supervisor/students/export", {
    params,
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "my-students.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};