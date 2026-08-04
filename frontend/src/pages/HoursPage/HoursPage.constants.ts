export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const LOCATION_STYLES = {
  office: { bg: "#E8F5E9", color: "#2E7D32" },
  remotely: { bg: "#FFF8E1", color: "#F57F17" },
} as const;

export const COMPANY_STATUS_STYLES = {
  pending: { bg: "#FFF3E0", color: "#E65100", label: "Pending" },
  approved: { bg: "#E8F5E9", color: "#2E7D32", label: "Approved" },
  rejected: { bg: "#FFEBEE", color: "#C62828", label: "Rejected" },
} as const;
