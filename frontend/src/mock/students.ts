import type { Student } from "../types/student.types";

export const students: Student[] = [
  {
    id: 1,
    name: "Ahmad Odeh",
    initials: "AO",
    major: "Computer Engineering",

    year: "Third Year • PPU",

    bio: "Frontend developer passionate about React and modern web technologies.",

    location: "Hebron, Palestine",

    availableFor: "Open to FT2",

    skills: ["React", "TypeScript", "Node.js", "Next.js", "Material UI"],

    ft1: true,
    ft2: false,

    experience: [
      {
        year: "2026",
        title: "FT2 - Exalt Technologies",
        description: "Frontend engineering intern, shipped 3 major features.",
      },
      {
        year: "2025",
        title: "FT1 - Hulul Group",
        description: "Worked with the data analytics team on dashboards.",
      },
      {
        year: "2024",
        title: "Google Developer Student Club",
        description: "Organized workshops and technical events.",
      },
    ],

    projects: [
      {
        title: "Course Registration System",
        description:
          "Web application for students to register university courses.",
        technologies: "React • Node.js",
      },
      {
        title: "Palestine Tourism App",
        description: "Mobile application for tourism places in Palestine.",
        technologies: "Flutter • Firebase",
      },
      {
        title: "AI Study Buddy",
        description: "AI assistant that helps students study.",
        technologies: "React • OpenAI",
      },
    ],

    certificates: [
      "AWS Cloud Practitioner",
      "Meta React Advanced",
      "Google Data Analytics",
      "Flutter Development",
    ],
  },

  {
    id: 2,
    name: "Layla Khalil",
    initials: "LK",
    major: "Information Technology",
    year: "Fourth Year • PPU",
    bio: "Passionate about data analysis and building business intelligence dashboards.",
    location: "Nablus, Palestine",
    availableFor: "Open to Full-time",
    skills: ["Python", "SQL", "Power BI", "Excel", "Tableau"],
    ft1: true,
    ft2: true,
    experience: [
      {
        year: "2026",
        title: "Data Analyst Intern - ASAL Technologies",
        description: "Built dashboards and analyzed company performance data.",
      },
      {
        year: "2025",
        title: "FT1 - PPU IT Center",
        description: "Worked on database management and reporting.",
      },
    ],
    projects: [
      {
        title: "Sales Dashboard",
        description: "Interactive dashboard for sales analysis.",
        technologies: "Power BI • SQL",
      },
      {
        title: "Library Management System",
        description: "Desktop system for university library.",
        technologies: "C# • SQL Server",
      },
    ],
    certificates: [
      "Google Data Analytics",
      "Microsoft Excel Expert",
      "SQL Fundamentals",
    ],
  },

  {
    id: 3,
    name: "Yousef Sabbah",
    initials: "YS",
    major: "Software Engineering",
    year: "Third Year • PPU",
    bio: "Flutter developer interested in cross-platform mobile applications.",
    location: "Bethlehem, Palestine",
    availableFor: "Looking for FT2",
    skills: ["Flutter", "Dart", "Firebase", "Git"],
    ft1: false,
    ft2: true,
    experience: [
      {
        year: "2026",
        title: "Flutter Intern - Jawwal",
        description: "Developed mobile application features.",
      },
    ],
    projects: [
      {
        title: "Restaurant App",
        description: "Food ordering application.",
        technologies: "Flutter • Firebase",
      },
      {
        title: "Weather App",
        description: "Real-time weather application.",
        technologies: "Flutter • API",
      },
    ],
    certificates: ["Flutter Development", "Firebase Essentials"],
  },

  {
    id: 4,
    name: "Sara Nasser",
    initials: "SN",
    major: "Computer Science",
    year: "Second Year • PPU",
    bio: "Backend developer interested in scalable web applications.",
    location: "Hebron, Palestine",
    availableFor: "Open to FT1",
    skills: ["Java", "Spring Boot", "MySQL", "Docker"],
    ft1: true,
    ft2: false,
    experience: [
      {
        year: "2025",
        title: "Backend Intern - Hulul Group",
        description: "Developed REST APIs using Spring Boot.",
      },
    ],
    projects: [
      {
        title: "Hospital Management System",
        description: "Backend for hospital services.",
        technologies: "Java • Spring Boot",
      },
    ],
    certificates: ["Java Programming", "Spring Boot Fundamentals"],
  },

  {
    id: 5,
    name: "Omar Hamdan",
    initials: "OH",
    major: "Artificial Intelligence",
    year: "Fourth Year • PPU",
    bio: "Machine learning enthusiast focused on computer vision.",
    location: "Jerusalem, Palestine",
    availableFor: "Open to AI Internship",
    skills: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
    ft1: true,
    ft2: true,
    experience: [
      {
        year: "2026",
        title: "AI Intern - GSG",
        description: "Built image classification models.",
      },
    ],
    projects: [
      {
        title: "Face Recognition System",
        description: "AI-based attendance system.",
        technologies: "Python • OpenCV",
      },
      {
        title: "Plant Disease Detection",
        description: "CNN model for crop disease detection.",
        technologies: "TensorFlow",
      },
    ],
    certificates: ["Machine Learning", "Deep Learning Specialization"],
  },

  {
    id: 6,
    name: "Rana Abu Ali",
    initials: "RA",
    major: "Information Systems",
    year: "Third Year • PPU",
    bio: "Frontend developer with UI/UX design experience.",
    location: "Ramallah, Palestine",
    availableFor: "Open to FT2",
    skills: ["React", "JavaScript", "Figma", "CSS"],
    ft1: false,
    ft2: true,
    experience: [
      {
        year: "2026",
        title: "Frontend Intern - Foothill",
        description: "Built responsive React interfaces.",
      },
    ],
    projects: [
      {
        title: "E-Commerce Website",
        description: "Responsive shopping platform.",
        technologies: "React • Material UI",
      },
    ],
    certificates: ["Meta Front-End", "Figma UI Design"],
  },
];
