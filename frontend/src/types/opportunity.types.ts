export interface Opportunity {
  id: string | number;
  _id?: string;

  company: string;
  companyId?: string;
  logo?: string;
  initials?: string;
  color?: string;

  title: string;
  type: string;
  workMode?: string;

  department?: string;
  field?: string;
  duration?: string;
  location: string;

  skills: string[];
  seats: number;
  daysLeft: number | null;
  applicants: number;

  deadline?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];

  status?: "draft" | "active" | "closed" | "archived";
  createdAt?: string;
  updatedAt?: string;
}
