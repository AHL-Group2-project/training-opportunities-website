import type { RolePermissions } from "../../types/HoursPage.types";
import type { TrainingPhaseStatus } from "../../mock/studentTrainingState";

// Adjusting types to match backend response
export interface SingleTrainingState {
  status: TrainingPhaseStatus;
  supervisorFinalStatus: "pending" | "approved" | "rejected";
  supervisorFinalComment?: string;
  companyApprovedHours: number;
  requiredHours: number;
}
export interface StudentTrainingState {
  studentId: string | number;
  studentName?: string;
  ft1: SingleTrainingState;
  ft2: SingleTrainingState;
}


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


