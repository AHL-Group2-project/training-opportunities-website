// src/mock/opportunities.ts
import uwaveLogo from "../assets/images/companies/uwave.png";
import asalLogo from "../assets/images/companies/asal.png";
import jawwalLogo from "../assets/images/companies/Jawwal.png";
import foothillLogo from "../assets/images/companies/foothill.png";

export interface Opportunity {
  id: number;
  company: string;
  logo?: string;
  initials?: string;
  color?: string;
  title: string;
  type: string;
  workMode?: "On-site" | "Remote" | "Hybrid";
  department?: string;
  field?: string;
  duration?: string;
  skills: string[];
  location: string;
  seats: number;
  daysLeft: number;
  applicants: number;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
}

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 1,
    company: "uWave",
    logo: uwaveLogo,
    initials: "UW",
    color: "#4F46E5",
    title: "Frontend Intern",
    type: "Full-time",
    workMode: "On-site",
    department: "Computer Engineering",
    field: "Frontend Development",
    duration: "3 months",
    skills: ["React", "TypeScript", "Git"],
    location: "Ramallah",
    seats: 3,
    daysLeft: 6,
    applicants: 42,
    description:
      "Join the frontend team and help build responsive and accessible web applications for real clients.",
    responsibilities: [
      "Build reusable React components",
      "Convert UI designs into responsive pages",
      "Work with APIs provided by the backend team",
      "Participate in code reviews and team meetings",
    ],
    requirements: [
      "Basic knowledge of React and TypeScript",
      "Good understanding of HTML and CSS",
      "Familiarity with Git and GitHub",
      "Ability to work and communicate within a team",
    ],
  },
  {
    id: 2,
    company: "ASAL Technologies",
    logo: asalLogo,
    initials: "AS",
    color: "#7C3AED",
    title: "Data Analytics Intern",
    type: "Remote",
    workMode: "Remote",
    department: "Computer Engineering",
    field: "Data Analytics",
    duration: "4 months",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    location: "Ramallah",
    seats: 2,
    daysLeft: 12,
    applicants: 31,
    description:
      "Work on scalable APIs and backend services powering enterprise applications for local and international clients.",
    responsibilities: [
      "Design and implement REST APIs",
      "Write clean and tested Node.js code",
      "Work with PostgreSQL databases",
      "Debug application issues under supervision",
    ],
    requirements: [
      "Strong programming fundamentals",
      "Basic understanding of databases",
      "Familiarity with JavaScript or TypeScript",
      "Good communication and problem-solving skills",
    ],
  },
  {
    id: 3,
    company: "Jawwal",
    logo: jawwalLogo,
    initials: "JW",
    color: "#059669",
    title: "Mobile App Intern",
    type: "Hybrid",
    workMode: "Hybrid",
    department: "Computer Engineering",
    field: "Mobile Development",
    duration: "3 months",
    skills: ["Flutter", "Dart"],
    location: "Hebron",
    seats: 2,
    daysLeft: 3,
    applicants: 18,
    description:
      "Join the mobile development team and contribute to building cross-platform mobile applications using Flutter.",
    responsibilities: [
      "Develop mobile screens using Flutter",
      "Connect the application with Firebase services",
      "Fix bugs and improve application performance",
      "Collaborate with designers and developers",
    ],
    requirements: [
      "Basic knowledge of object-oriented programming",
      "Familiarity with Flutter or Dart",
      "Understanding of mobile application concepts",
      "Willingness to learn new technologies",
    ],
  },
  {
    id: 4,
    company: "Foothill",
    logo: foothillLogo,
    initials: "FH",
    color: "#DC2626",
    title: "UI/UX Design Intern",
    type: "Full-time",
    workMode: "On-site",
    department: "Information Technology",
    field: "UI/UX Design",
    duration: "2 months",
    skills: ["Figma", "Adobe XD"],
    location: "Ramallah",
    seats: 1,
    daysLeft: 8,
    applicants: 24,
    description:
      "Work with the design team to create user-friendly interfaces and improve the overall user experience.",
    responsibilities: [
      "Create wireframes and prototypes",
      "Design user interfaces for web and mobile",
      "Collaborate with developers to implement designs",
      "Conduct user research and usability testing",
    ],
    requirements: [
      "Basic knowledge of Figma or Adobe XD",
      "Good understanding of design principles",
      "Creativity and attention to detail",
      "Ability to take feedback and iterate",
    ],
  },
];
