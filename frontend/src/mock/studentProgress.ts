export interface HoursLogEntry {
  id: string;
  date: string;
  hours: number;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface ReportEntry {
  id: string;
  period: string;
  submittedDate: string;
  status: "Pending Review" | "Approved" | "Needs Revision";
  supervisorFeedback: string;
}

export interface EvaluationCriteria {
  attendance: number;
  performance: number;
  reportQuality: number;
  initiative: number;
  communication: number;
}

export interface Evaluation {
  criteria: EvaluationCriteria;
  overallComment: string;
  submitted: boolean;
}

export interface StatusTimelineStep {
  label: string;
  date: string;
  completed: boolean;
}

export interface PreviousInternship {
  company: string;
  position: string;
  period: string;
}

export interface StudentProgress {
  studentId: number;
  currentInternship: {
    company: string;
    position: string;
    hoursCompleted: number;
    hoursRequired: number;
  };
  statusTimeline: StatusTimelineStep[];
  hoursLog: HoursLogEntry[];
  reports: ReportEntry[];
  evaluation: Evaluation | null;
  previousInternships: PreviousInternship[];
}

export const studentProgress: StudentProgress[] = [
  {
    studentId: 1,
    currentInternship: {
      company: "Exalt Technologies",
      position: "Frontend Intern (FT2)",
      hoursCompleted: 92,
      hoursRequired: 150,
    },
    statusTimeline: [
      { label: "Started", date: "2026-03-01", completed: true },
      { label: "Mid Review", date: "2026-04-15", completed: true },
      { label: "Final Review", date: "2026-06-01", completed: false },
    ],
    hoursLog: [
      {
        id: "h1",
        date: "2026-05-01",
        hours: 6,
        description: "Built companies page UI",
        status: "Approved",
      },
      {
        id: "h2",
        date: "2026-05-02",
        hours: 5,
        description: "Fixed MUI Grid bugs",
        status: "Approved",
      },
      {
        id: "h3",
        date: "2026-05-05",
        hours: 7,
        description: "Worked on profile page",
        status: "Pending",
      },
    ],
    reports: [
      {
        id: "r1",
        period: "April 2026",
        submittedDate: "2026-05-01",
        status: "Approved",
        supervisorFeedback: "Good progress, keep it up.",
      },
      {
        id: "r2",
        period: "May 2026",
        submittedDate: "2026-06-01",
        status: "Pending Review",
        supervisorFeedback: "",
      },
    ],
    evaluation: null,
    previousInternships: [
      {
        company: "Hulul Group",
        position: "FT1 - Data Analytics",
        period: "Summer 2025",
      },
    ],
  },
  {
    studentId: 2,
    currentInternship: {
      company: "ASAL Technologies",
      position: "Data Analyst Intern (FT2)",
      hoursCompleted: 150,
      hoursRequired: 150,
    },
    statusTimeline: [
      { label: "Started", date: "2026-02-01", completed: true },
      { label: "Mid Review", date: "2026-03-15", completed: true },
      { label: "Final Review", date: "2026-05-01", completed: true },
    ],
    hoursLog: [
      {
        id: "h1",
        date: "2026-04-01",
        hours: 8,
        description: "Built sales dashboard",
        status: "Approved",
      },
      {
        id: "h2",
        date: "2026-04-10",
        hours: 8,
        description: "Data cleaning pipeline",
        status: "Approved",
      },
    ],
    reports: [
      {
        id: "r1",
        period: "March 2026",
        submittedDate: "2026-04-01",
        status: "Approved",
        supervisorFeedback: "Excellent analysis work.",
      },
      {
        id: "r2",
        period: "April 2026",
        submittedDate: "2026-05-01",
        status: "Approved",
        supervisorFeedback: "Great final report.",
      },
    ],
    evaluation: {
      criteria: {
        attendance: 5,
        performance: 5,
        reportQuality: 4,
        initiative: 5,
        communication: 4,
      },
      overallComment: "Layla was one of our top interns this cycle.",
      submitted: true,
    },
    previousInternships: [
      {
        company: "PPU IT Center",
        position: "FT1 - Database Management",
        period: "Summer 2025",
      },
    ],
  },
  {
    studentId: 3,
    currentInternship: {
      company: "Jawwal",
      position: "Flutter Intern (FT2)",
      hoursCompleted: 60,
      hoursRequired: 150,
    },
    statusTimeline: [
      { label: "Started", date: "2026-05-01", completed: true },
      { label: "Mid Review", date: "2026-06-15", completed: false },
      { label: "Final Review", date: "2026-08-01", completed: false },
    ],
    hoursLog: [
      {
        id: "h1",
        date: "2026-05-10",
        hours: 6,
        description: "Mobile UI screens",
        status: "Approved",
      },
      {
        id: "h2",
        date: "2026-05-17",
        hours: 6,
        description: "Firebase integration",
        status: "Pending",
      },
    ],
    reports: [
      {
        id: "r1",
        period: "May 2026",
        submittedDate: "2026-06-01",
        status: "Needs Revision",
        supervisorFeedback: "Please add more detail on challenges faced.",
      },
    ],
    evaluation: null,
    previousInternships: [],
  },
  {
    studentId: 4,
    currentInternship: {
      company: "Hulul Group",
      position: "Backend Intern (FT1)",
      hoursCompleted: 40,
      hoursRequired: 150,
    },
    statusTimeline: [
      { label: "Started", date: "2026-06-01", completed: true },
      { label: "Mid Review", date: "2026-07-15", completed: false },
      { label: "Final Review", date: "2026-09-01", completed: false },
    ],
    hoursLog: [
      {
        id: "h1",
        date: "2026-06-05",
        hours: 5,
        description: "Set up Spring Boot project",
        status: "Approved",
      },
    ],
    reports: [],
    evaluation: null,
    previousInternships: [],
  },
  {
    studentId: 5,
    currentInternship: {
      company: "GSG",
      position: "AI Intern (FT2)",
      hoursCompleted: 150,
      hoursRequired: 150,
    },
    statusTimeline: [
      { label: "Started", date: "2026-01-01", completed: true },
      { label: "Mid Review", date: "2026-02-15", completed: true },
      { label: "Final Review", date: "2026-04-01", completed: true },
    ],
    hoursLog: [
      {
        id: "h1",
        date: "2026-02-01",
        hours: 8,
        description: "Built classification model",
        status: "Approved",
      },
      {
        id: "h2",
        date: "2026-02-10",
        hours: 8,
        description: "Model evaluation",
        status: "Approved",
      },
    ],
    reports: [
      {
        id: "r1",
        period: "January 2026",
        submittedDate: "2026-02-01",
        status: "Approved",
        supervisorFeedback: "Strong technical depth.",
      },
      {
        id: "r2",
        period: "February 2026",
        submittedDate: "2026-03-01",
        status: "Approved",
        supervisorFeedback: "Consistent quality.",
      },
    ],
    evaluation: {
      criteria: {
        attendance: 5,
        performance: 5,
        reportQuality: 5,
        initiative: 4,
        communication: 5,
      },
      overallComment: "Omar showed exceptional independence on this project.",
      submitted: true,
    },
    previousInternships: [],
  },
  {
    studentId: 6,
    currentInternship: {
      company: "Foothill",
      position: "Frontend Intern (FT2)",
      hoursCompleted: 75,
      hoursRequired: 150,
    },
    statusTimeline: [
      { label: "Started", date: "2026-04-01", completed: true },
      { label: "Mid Review", date: "2026-05-15", completed: true },
      { label: "Final Review", date: "2026-07-01", completed: false },
    ],
    hoursLog: [
      {
        id: "h1",
        date: "2026-04-10",
        hours: 6,
        description: "E-commerce UI components",
        status: "Approved",
      },
      {
        id: "h2",
        date: "2026-04-20",
        hours: 6,
        description: "Responsive layout fixes",
        status: "Pending",
      },
    ],
    reports: [
      {
        id: "r1",
        period: "April 2026",
        submittedDate: "2026-05-01",
        status: "Approved",
        supervisorFeedback: "Nice UI polish.",
      },
    ],
    evaluation: null,
    previousInternships: [],
  },
];
