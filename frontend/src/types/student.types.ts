export interface Experience {
  year: string;
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
}

export interface HoursHistory {
  date: string;
  hours: number;
  description: string;
  status: "Pending" | "Approved";
}

export interface Report {
  id: number;
  title: string;
  submitted: boolean;
  status: "Draft" | "Pending" | "Approved";
}

export interface Application {
  id: number;
  company: string;
  position: string;
  status: "Pending" | "Accepted" | "Rejected";
  appliedDate: string;
}

export interface Deadline {
  title: string;
  date: string;
}

export interface TrainingSection {
  registered: boolean;
  completed: boolean;
  requiredHours: number;
  loggedHours: number;
}

export interface Evaluation {
  score: number | null;
  notes: string;
}

export interface Training {
  ft1: TrainingSection;
  ft2: TrainingSection;

  hoursHistory: HoursHistory[];

  reports: Report[];

  applications: Application[];

  deadlines: Deadline[];

  supervisorStatus:
    | "Not Started"
    | "Pending"
    | "Approved";

  evaluation: Evaluation;
}

export interface Student {
  id: number;

  name: string;
  initials: string;

  major: string;

  year: string;

  bio: string;

  location: string;

  availableFor: string;

  skills: string[];

  ft1: boolean;
  ft2: boolean;

  experience: Experience[];

  projects: Project[];

  certificates: string[];

  training: Training;
}