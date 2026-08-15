export interface RolePermissions {
  canEditHours: boolean;
  canCompanyApprove: boolean;
  canSupervisorFinal: boolean;
  canView: boolean;
}

export interface RejectTarget {
  type: "row" | "final";
  entryId?: number;
}
