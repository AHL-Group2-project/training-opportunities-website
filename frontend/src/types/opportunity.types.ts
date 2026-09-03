export interface OpportunityCompany {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
  description?: string;
  website?: string;
  isExternal?: boolean;
}

export interface Opportunity {
  id: string | number;
  _id?: string;

  company: string;
  companyId?: string | OpportunityCompany;
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

  applicationType?: "internal" | "external";
  externalApplicationUrl?: string;

  status?: "draft" | "active" | "closed" | "archived";
  createdAt?: string;
  updatedAt?: string;
}
