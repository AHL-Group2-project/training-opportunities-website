export interface Notification {
  id: number;
  userId: number;
  type:
    | "request_approved"
    | "request_rejected"
    | "hours_approved"
    | "company_approved"
    | "new_request"
    | "new_report";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    userId: 1,
    type: "request_approved",
    title: "Internship Request Approved",
    message: "Your FT1 request for Frontend Intern at uWave has been approved.",
    read: false,
    createdAt: "2026-07-22T11:00:00Z",
  },
  {
    id: 2,
    userId: 1,
    type: "hours_approved",
    title: "Hours Approved",
    message: "Your hours for Sep 1-2 have been approved.",
    read: false,
    createdAt: "2026-09-02T19:00:00Z",
  },
];
