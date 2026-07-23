import type { Opportunity } from "./opportunity.types";

export const opportunitiesMock: Opportunity[] = [
  {
    id: 1,
    company: "Exalt Technologies",
    title: "Frontend Engineering Intern",
    trainingType: "FT2",

    department: "Computer Engineering",
    field: "Frontend Development",
    workMode: "On-site",
    duration: "3 months",

    skills: ["React", "TypeScript", "Material UI", "Git"],
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
    title: "Backend Developer Intern",
    trainingType: "FT2",

    department: "Computer Engineering",
    field: "Backend Development",
    workMode: "Hybrid",
    duration: "4 months",

    skills: ["Node.js", "PostgreSQL", "REST", "Docker"],
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
    company: "Hulul Group",
    title: "Data Analyst Intern",
    trainingType: "FT1",

    department: "Information Technology",
    field: "Data Analysis",
    workMode: "On-site",
    duration: "2 months",

    skills: ["SQL", "Python", "Excel", "Power BI"],
    location: "Hebron",
    seats: 2,
    daysLeft: 3,
    applicants: 18,

    description:
      "Support the data team by analyzing business information and preparing clear reports and dashboards.",

    responsibilities: [
      "Clean and organize business data",
      "Write basic SQL queries",
      "Create dashboards using Power BI",
      "Present findings to the data team",
    ],

    requirements: [
      "Basic knowledge of SQL",
      "Good skills in Microsoft Excel",
      "Interest in data analysis and visualization",
      "Attention to detail",
    ],
  },

  {
    id: 4,
    company: "Mada Al-Arab",
    title: "Mobile Development Intern",
    trainingType: "FT2",

    department: "Computer Engineering",
    field: "Mobile Development",
    workMode: "Hybrid",
    duration: "3 months",

    skills: ["Flutter", "Dart", "Firebase"],
    location: "Nablus",
    seats: 3,
    daysLeft: 9,
    applicants: 25,

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
    id: 5,
    company: "Paltel Group",
    title: "DevOps Intern",
    trainingType: "FT2",

    department: "Information Technology",
    field: "DevOps",
    workMode: "On-site",
    duration: "4 months",

    skills: ["Linux", "Docker", "CI/CD", "AWS"],
    location: "Ramallah",
    seats: 2,
    daysLeft: 8,
    applicants: 29,

    description:
      "Learn how development and operations teams deploy, monitor, and maintain reliable software systems.",

    responsibilities: [
      "Assist with deployment pipelines",
      "Work with Docker containers",
      "Monitor application environments",
      "Document deployment procedures",
    ],

    requirements: [
      "Basic knowledge of Linux",
      "Understanding of software development workflows",
      "Interest in cloud computing and automation",
      "Good troubleshooting skills",
    ],
  },

  {
    id: 6,
    company: "Foothill Solutions",
    title: "QA Engineering Intern",
    trainingType: "FT1",

    department: "Information Technology",
    field: "Quality Assurance",
    workMode: "Remote",
    duration: "2 months",

    skills: ["Testing", "Selenium", "Postman"],
    location: "Ramallah",
    seats: 2,
    daysLeft: 10,
    applicants: 20,

    description:
      "Work with the quality assurance team to test web applications and ensure a reliable user experience.",

    responsibilities: [
      "Create and execute manual test cases",
      "Report and document software issues",
      "Test APIs using Postman",
      "Assist with basic automated testing",
    ],

    requirements: [
      "Understanding of software testing concepts",
      "Attention to detail",
      "Basic knowledge of web applications",
      "Good written communication skills",
    ],
  },
];