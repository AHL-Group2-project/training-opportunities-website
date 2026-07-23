export type Opportunity = {
  id: number;

  company: string;
  title: string;
  trainingType: "FT1" | "FT2";

  department: string;
  field: string;
  workMode: "On-site" | "Remote" | "Hybrid";
  duration: string;

  skills: string[];
  location: string;
  seats: number;
  daysLeft: number;
  applicants: number;

  description: string;
  responsibilities: string[];
  requirements: string[];
};