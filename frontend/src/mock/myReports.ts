export type ReportStatus = "Pending Review" | "Approved" | "Needs Revision";

export interface MyReportEntry {
  id: string;
  period: string;
  submittedDate: string;
  status: ReportStatus;
  supervisorFeedback: string;
  content: string;
  fileName?: string;
}

export const myReportsHistory: MyReportEntry[] = [
  {
    id: "rep1",
    period: "April 2026",
    submittedDate: "2026-05-01",
    status: "Approved",
    supervisorFeedback: "Good progress, keep it up.",
    content: "Worked on the Companies page UI and fixed several MUI bugs.",
    fileName: "april-2026-report.pdf",
  },
  {
    id: "rep2",
    period: "May 2026",
    submittedDate: "2026-06-01",
    status: "Pending Review",
    supervisorFeedback: "",
    content:
      "Completed the Companies and Company Profile pages, started Student Management.",
    fileName: "may-2026-report.pdf",
  },
];
