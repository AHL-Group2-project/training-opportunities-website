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

  experience: {
    year: string;
    title: string;
    description: string;
  }[];

  projects: {
    title: string;
    description: string;
    technologies: string;
  }[];

  certificates: string[];
}
