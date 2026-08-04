import {
  type StudentTrainingState,
  type SingleTrainingState,
  type StudentProfile,
  MOCK_STUDENT_PROFILES,
} from "../../mock/studentTrainingState";
import type { RolePermissions } from "../../types/HoursPage.types";

export function getPermissions(
  role: string,
  isOwnView: boolean,
): RolePermissions {
  switch (role) {
    case "student":
      return {
        canEditHours: isOwnView,
        canCompanyApprove: false,
        canSupervisorFinal: false,
        canView: true,
      };
    case "company":
      return {
        canEditHours: false,
        canCompanyApprove: true,
        canSupervisorFinal: false,
        canView: true,
      };
    case "supervisor":
      return {
        canEditHours: false,
        canCompanyApprove: false,
        canSupervisorFinal: true,
        canView: true,
      };
    case "admin":
      return {
        canEditHours: false,
        canCompanyApprove: true,
        canSupervisorFinal: true,
        canView: true,
      };
    default:
      return {
        canEditHours: false,
        canCompanyApprove: false,
        canSupervisorFinal: false,
        canView: false,
      };
  }
}

export function getFtState(
  overview: StudentTrainingState | undefined,
  ft: "ft1" | "ft2",
): SingleTrainingState {
  if (!overview)
    return {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    };
  return overview[ft];
}

export function findStudentByUserId(
  userId: number,
): StudentProfile | undefined {
  return MOCK_STUDENT_PROFILES.find((s) => s.userId === userId);
}
