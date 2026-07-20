import uwaveLogo from "../assets/images/companies/uwave.png";
import asalLogo from "../assets/images/companies/asal.png";
import jawwalLogo from "../assets/images/companies/Jawwal.png";
import foothillLogo from "../assets/images/companies/foothill.png";

export interface Opportunity {
  id: number;
  company: string;
  logo: string;
  initials: string;
  color: string;
  position: string;
  type: string;
  skills: string[];
  location: string;
  seats: number;
  daysLeft: number;
  applicants: number;
}

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    company: "uWave",
    logo: uwaveLogo,
    initials: "UW",
    color: "#4F46E5",
    position: "Frontend Intern",
    type: "Full-time",
    skills: ["React", "TypeScript", "Git"],
    location: "Ramallah",
    seats: 3,
    daysLeft: 6,
    applicants: 42,
  },
  {
    id: 2,
    company: "ASAL Technologies",
    logo: asalLogo,
    initials: "AS",
    color: "#7C3AED",
    position: "Data Analytics Intern",
    type: "Remote",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    location: "Ramallah",
    seats: 2,
    daysLeft: 12,
    applicants: 31,
  },
  {
    id: 3,
    company: "Jawwal",
    logo: jawwalLogo,
    initials: "JW",
    color: "#059669",
    position: "Mobile App Intern",
    type: "Hybrid",
    skills: ["Flutter", "Dart"],
    location: "Hebron",
    seats: 2,
    daysLeft: 3,
    applicants: 18,
  },
  {
    id: 4,
    company: "Foothill",
    logo: foothillLogo,
    initials: "FH",
    color: "#DC2626",
    position: "UI/UX Design Intern",
    type: "Full-time",
    skills: ["Figma", "Adobe XD"],
    location: "Ramallah",
    seats: 1,
    daysLeft: 8,
    applicants: 24,
  },
];
