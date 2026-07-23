export type Opportunity = {
  id: number;

  company: string;
  title: string;

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
