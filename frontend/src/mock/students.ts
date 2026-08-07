import type { Student } from "../types/student.types";

export const students: Student[] = [
  {
    id: 101,
    name: "Ahmad Odeh",
    initials: "AO",
    major: "Computer Engineering",
    year: "Third Year • PPU",
    bio: "Frontend developer passionate about React and modern web technologies.",
    location: "Hebron, Palestine",
    availableFor: "Open to FT2",

    skills: ["React", "TypeScript", "Next.js", "Node.js", "Material UI"],

    ft1: true,
    ft2: false,

    experience: [
      {
        year: "2026",
        title: "Frontend Intern - Exalt Technologies",
        description:
          "Built reusable React components and responsive dashboards.",
      },
      {
        year: "2025",
        title: "FT1 - Hulul Group",
        description: "Worked with frontend and UI teams.",
      },
    ],

    projects: [
      {
        title: "Training Opportunities Platform",
        description: "University graduation project.",
        technologies: "React • Express • MongoDB",
      },
      {
        title: "Course Registration System",
        description: "Student registration platform.",
        technologies: "React • Node.js",
      },
    ],

    certificates: ["Meta React", "JavaScript Advanced", "Git & GitHub"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },

      ft2: {
        registered: false,
        completed: false,
        requiredHours: 200,
        loggedHours: 0,
      },

      hoursHistory: [
        {
          date: "2026-07-10",
          hours: 6,
          description: "React Dashboard",
          status: "Approved",
        },
        {
          date: "2026-07-11",
          hours: 5,
          description: "Bug Fixes",
          status: "Approved",
        },
      ],

      reports: [
        {
          id: 1,
          title: "Week 1 Report",
          submitted: true,
          status: "Approved",
        },
        {
          id: 2,
          title: "Week 2 Report",
          submitted: true,
          status: "Pending",
        },
      ],

      applications: [
        {
          id: 1,
          company: "Exalt",
          position: "Frontend Intern",
          status: "Accepted",
          appliedDate: "2026-06-15",
        },
      ],

      deadlines: [
        {
          title: "Weekly Report",
          date: "2026-08-06",
        },
      ],

      supervisorStatus: "Pending",

      evaluation: {
        score: null,
        notes: "",
      },
    },
  },

  {
    id: 2,
    name: "Layla Khalil",
    initials: "LK",
    major: "Information Technology",
    year: "Fourth Year • PPU",
    bio: "Data analyst passionate about dashboards and business intelligence.",
    location: "Nablus, Palestine",
    availableFor: "Open to Full-time",

    skills: ["Python", "SQL", "Power BI", "Excel", "Tableau"],

    ft1: true,
    ft2: true,

    experience: [
      {
        year: "2026",
        title: "Data Analyst Intern - ASAL",
        description: "Built business dashboards.",
      },
    ],

    projects: [
      {
        title: "Sales Dashboard",
        description: "Interactive BI dashboard.",
        technologies: "Power BI • SQL",
      },
    ],

    certificates: ["Google Data Analytics", "Power BI"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },

      ft2: {
        registered: true,
        completed: false,
        requiredHours: 200,
        loggedHours: 82,
      },

      hoursHistory: [
        {
          date: "2026-07-15",
          hours: 7,
          description: "Dashboard Development",
          status: "Approved",
        },
      ],

      reports: [
        {
          id: 1,
          title: "FT2 Week 1",
          submitted: true,
          status: "Approved",
        },
      ],

      applications: [
        {
          id: 2,
          company: "ASAL",
          position: "Data Analyst",
          status: "Accepted",
          appliedDate: "2026-05-22",
        },
      ],

      deadlines: [
        {
          title: "Monthly Evaluation",
          date: "2026-08-15",
        },
      ],

      supervisorStatus: "Approved",

      evaluation: {
        score: 95,
        notes: "Excellent analytical skills.",
      },
    },
  },

  {
    id: 3,
    name: "Yousef Sabbah",
    initials: "YS",
    major: "Software Engineering",
    year: "Third Year • PPU",
    bio: "Flutter developer interested in mobile applications.",
    location: "Bethlehem, Palestine",
    availableFor: "Looking for FT2",

    skills: ["Flutter", "Firebase", "Dart", "Git"],

    ft1: false,
    ft2: false,

    experience: [],

    projects: [
      {
        title: "Restaurant App",
        description: "Food ordering application.",
        technologies: "Flutter • Firebase",
      },
    ],

    certificates: ["Flutter Development"],

    training: {
      ft1: {
        registered: true,
        completed: false,
        requiredHours: 150,
        loggedHours: 96,
      },

      ft2: {
        registered: false,
        completed: false,
        requiredHours: 200,
        loggedHours: 0,
      },

      hoursHistory: [],

      reports: [],

      applications: [],

      deadlines: [],

      supervisorStatus: "Pending",

      evaluation: {
        score: null,
        notes: "",
      },
    },
  },

  {
    id: 4,
    name: "Sara Nasser",
    initials: "SN",
    major: "Computer Science",
    year: "Second Year • PPU",
    bio: "Backend developer interested in scalable systems.",
    location: "Hebron, Palestine",
    availableFor: "Open to FT1",

    skills: ["Java", "Spring Boot", "MySQL", "Docker"],

    ft1: true,
    ft2: false,

    experience: [
      {
        year: "2025",
        title: "Backend Intern",
        description: "REST API development.",
      },
    ],

    projects: [
      {
        title: "Hospital System",
        description: "Hospital management backend.",
        technologies: "Java • Spring",
      },
    ],

    certificates: ["Spring Boot", "Docker Essentials"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },

      ft2: {
        registered: false,
        completed: false,
        requiredHours: 200,
        loggedHours: 0,
      },

      hoursHistory: [],

      reports: [],

      applications: [],

      deadlines: [],

      supervisorStatus: "Approved",

      evaluation: {
        score: 90,
        notes: "Very good performance.",
      },
    },
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

    skills: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Machine Learning"],

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
        description: "Attendance system using AI.",
        technologies: "Python • OpenCV",
      },
      {
        title: "Plant Disease Detection",
        description: "CNN model for crop diseases.",
        technologies: "TensorFlow",
      },
    ],

    certificates: ["Machine Learning", "Deep Learning Specialization"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },
      ft2: {
        registered: true,
        completed: false,
        requiredHours: 200,
        loggedHours: 118,
      },
      hoursHistory: [
        {
          date: "2026-07-18",
          hours: 8,
          description: "Model Training",
          status: "Approved",
        },
      ],
      reports: [
        {
          id: 1,
          title: "Week 3 Report",
          submitted: true,
          status: "Approved",
        },
      ],
      applications: [
        {
          id: 5,
          company: "GSG",
          position: "AI Intern",
          status: "Accepted",
          appliedDate: "2026-05-10",
        },
      ],
      deadlines: [
        {
          title: "Final Evaluation",
          date: "2026-08-20",
        },
      ],
      supervisorStatus: "Approved",
      evaluation: {
        score: 98,
        notes: "Outstanding performance.",
      },
    },
  },

  {
    id: 6,
    name: "Rana Abu Ali",
    initials: "RA",
    major: "Information Systems",
    year: "Third Year • PPU",
    bio: "Frontend developer with UI/UX experience.",
    location: "Ramallah, Palestine",
    availableFor: "Open to FT2",

    skills: ["React", "JavaScript", "CSS", "Figma", "Material UI"],

    ft1: false,
    ft2: false,

    experience: [],

    projects: [
      {
        title: "E-Commerce Website",
        description: "Responsive shopping platform.",
        technologies: "React • Material UI",
      },
    ],

    certificates: ["Meta Front-End", "Figma UI Design"],

    training: {
      ft1: {
        registered: true,
        completed: false,
        requiredHours: 150,
        loggedHours: 104,
      },
      ft2: {
        registered: false,
        completed: false,
        requiredHours: 200,
        loggedHours: 0,
      },
      hoursHistory: [],
      reports: [],
      applications: [],
      deadlines: [],
      supervisorStatus: "Pending",
      evaluation: {
        score: null,
        notes: "",
      },
    },
  },

  {
    id: 7,
    name: "Mohammad Taha",
    initials: "MT",
    major: "Cyber Security",
    year: "Fourth Year • PPU",
    bio: "Interested in penetration testing and network security.",
    location: "Hebron, Palestine",
    availableFor: "Open to FT2",

    skills: ["Linux", "Python", "Wireshark", "Burp Suite", "Networking"],

    ft1: true,
    ft2: true,

    experience: [
      {
        year: "2026",
        title: "Security Intern",
        description: "Performed vulnerability assessments.",
      },
    ],

    projects: [
      {
        title: "Network Scanner",
        description: "Python security toolkit.",
        technologies: "Python",
      },
    ],

    certificates: ["Cisco CCNA", "Ethical Hacking"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },
      ft2: {
        registered: true,
        completed: false,
        requiredHours: 200,
        loggedHours: 75,
      },
      hoursHistory: [],
      reports: [
        {
          id: 1,
          title: "Security Weekly Report",
          submitted: true,
          status: "Pending",
        },
      ],
      applications: [
        {
          id: 7,
          company: "Unit One",
          position: "Security Intern",
          status: "Accepted",
          appliedDate: "2026-06-02",
        },
      ],
      deadlines: [
        {
          title: "Weekly Report",
          date: "2026-08-08",
        },
      ],
      supervisorStatus: "Pending",
      evaluation: {
        score: null,
        notes: "",
      },
    },
  },

  {
    id: 8,
    name: "Noor Abu Sneineh",
    initials: "NS",
    major: "Software Engineering",
    year: "Third Year • PPU",
    bio: "Full-stack developer interested in scalable web applications.",
    location: "Bethlehem, Palestine",
    availableFor: "Open to FT1",

    skills: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],

    ft1: true,
    ft2: false,

    experience: [
      {
        year: "2025",
        title: "Junior Web Developer",
        description: "Built internal web tools.",
      },
    ],

    projects: [
      {
        title: "Task Management System",
        description: "Kanban project management platform.",
        technologies: "MERN Stack",
      },
    ],

    certificates: ["MongoDB Basics", "Node.js"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },
      ft2: {
        registered: false,
        completed: false,
        requiredHours: 200,
        loggedHours: 0,
      },
      hoursHistory: [],
      reports: [],
      applications: [],
      deadlines: [],
      supervisorStatus: "Approved",
      evaluation: {
        score: 93,
        notes: "Excellent teamwork.",
      },
    },
  },
  {
    id: 9,
    name: "Lina Khalil",
    initials: "LK",
    major: "Data Science",
    year: "Fourth Year • PPU",
    bio: "Data analyst interested in machine learning and data visualization.",
    location: "Ramallah, Palestine",
    availableFor: "Open to Data Internship",

    skills: ["Python", "Pandas", "NumPy", "Machine Learning", "Power BI"],

    ft1: true,
    ft2: true,

    experience: [
      {
        year: "2026",
        title: "Data Analyst Intern",
        description: "Analyzed datasets and created dashboards.",
      },
    ],

    projects: [
      {
        title: "Customer Behavior Analysis",
        description: "Data analysis project using real-world datasets.",
        technologies: "Python • Pandas",
      },
      {
        title: "Sales Dashboard",
        description: "Interactive dashboard for business insights.",
        technologies: "Power BI",
      },
    ],

    certificates: ["Data Analysis with Python", "Power BI Fundamentals"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },
      ft2: {
        registered: true,
        completed: false,
        requiredHours: 200,
        loggedHours: 90,
      },
      hoursHistory: [
        {
          date: "2026-07-20",
          hours: 6,
          description: "Data Cleaning",
          status: "Approved",
        },
      ],
      reports: [
        {
          id: 1,
          title: "Data Analysis Report",
          submitted: true,
          status: "Approved",
        },
      ],
      applications: [
        {
          id: 9,
          company: "DataLab",
          position: "Data Analyst Intern",
          status: "Accepted",
          appliedDate: "2026-05-15",
        },
      ],
      deadlines: [
        {
          title: "Final Presentation",
          date: "2026-08-25",
        },
      ],
      supervisorStatus: "Approved",
      evaluation: {
        score: 95,
        notes: "Strong analytical skills.",
      },
    },
  },

  {
    id: 10,
    name: "Yazan Odeh",
    initials: "YO",
    major: "Computer Engineering",
    year: "Fourth Year • PPU",
    bio: "Embedded systems developer interested in IoT solutions.",
    location: "Nablus, Palestine",
    availableFor: "Open to Embedded Internship",

    skills: ["C++", "Arduino", "Embedded Systems", "IoT", "Electronics"],

    ft1: true,
    ft2: false,

    experience: [
      {
        year: "2025",
        title: "Embedded Systems Trainee",
        description: "Developed microcontroller-based projects.",
      },
    ],

    projects: [
      {
        title: "Smart Home System",
        description: "IoT system for home automation.",
        technologies: "Arduino • C++",
      },
      {
        title: "Temperature Monitoring Device",
        description: "Embedded sensor monitoring solution.",
        technologies: "Arduino",
      },
    ],

    certificates: ["Embedded Systems Basics", "IoT Fundamentals"],

    training: {
      ft1: {
        registered: true,
        completed: true,
        requiredHours: 150,
        loggedHours: 150,
      },
      ft2: {
        registered: false,
        completed: false,
        requiredHours: 200,
        loggedHours: 0,
      },
      hoursHistory: [],
      reports: [],
      applications: [],
      deadlines: [],
      supervisorStatus: "Approved",
      evaluation: {
        score: 90,
        notes: "Good technical performance.",
      },
    },
  },

  {
    id: 11,
    name: "Sara Nassar",
    initials: "SN",
    major: "Software Engineering",
    year: "Third Year • PPU",
    bio: "Backend developer passionate about APIs and databases.",
    location: "Jenin, Palestine",
    availableFor: "Open to Backend Internship",

    skills: ["Node.js", "Express", "MongoDB", "SQL", "REST API"],

    ft1: false,
    ft2: true,

    experience: [
      {
        year: "2026",
        title: "Backend Developer Intern",
        description: "Created REST APIs and database services.",
      },
    ],

    projects: [
      {
        title: "Online Learning Platform",
        description: "Backend system for managing courses.",
        technologies: "Node.js • MongoDB",
      },
      {
        title: "University Portal API",
        description: "API for student management system.",
        technologies: "Express • SQL",
      },
    ],

    certificates: ["Backend Development", "Database Design"],

    training: {
      ft1: {
        registered: false,
        completed: false,
        requiredHours: 150,
        loggedHours: 0,
      },
      ft2: {
        registered: true,
        completed: false,
        requiredHours: 200,
        loggedHours: 130,
      },
      hoursHistory: [
        {
          date: "2026-07-22",
          hours: 7,
          description: "API Development",
          status: "Approved",
        },
      ],
      reports: [
        {
          id: 1,
          title: "Backend Progress Report",
          submitted: true,
          status: "Pending",
        },
      ],
      applications: [
        {
          id: 11,
          company: "Tech Solutions",
          position: "Backend Intern",
          status: "Accepted",
          appliedDate: "2026-05-20",
        },
      ],
      deadlines: [
        {
          title: "Project Submission",
          date: "2026-08-18",
        },
      ],
      supervisorStatus: "Pending",
      evaluation: {
        score: null,
        notes: "",
      },
    },
  },

  {
    id: 12,
    name: "Ahmad Saleh",
    initials: "AS",
    major: "Artificial Intelligence",
    year: "Third Year • PPU",
    bio: "AI student interested in natural language processing.",
    location: "Tulkarm, Palestine",
    availableFor: "Open to AI Research Internship",

    skills: ["Python", "NLP", "PyTorch", "Transformers", "Deep Learning"],

    ft1: true,
    ft2: false,

    experience: [
      {
        year: "2026",
        title: "AI Research Assistant",
        description: "Worked on text classification models.",
      },
    ],

    projects: [
      {
        title: "Sentiment Analysis System",
        description: "NLP model for analyzing user reviews.",
        technologies: "Python • NLP",
      },
      {
        title: "Arabic Text Classifier",
        description: "Deep learning model for Arabic documents.",
        technologies: "PyTorch",
      },
    ],

    certificates: ["Deep Learning", "Natural Language Processing"],

    training: {
      ft1: {
        registered: true,
        completed: false,
        requiredHours: 150,
        loggedHours: 80,
      },
      ft2: {
        registered: false,
        completed: false,
        requiredHours: 200,
        loggedHours: 0,
      },
      hoursHistory: [
        {
          date: "2026-07-25",
          hours: 5,
          description: "Model Evaluation",
          status: "Approved",
        },
      ],
      reports: [],
      applications: [
        {
          id: 12,
          company: "AI Lab",
          position: "AI Research Intern",
          status: "Pending",
          appliedDate: "2026-06-10",
        },
      ],
      deadlines: [
        {
          title: "Research Review",
          date: "2026-08-15",
        },
      ],
      supervisorStatus: "Pending",
      evaluation: {
        score: null,
        notes: "",
      },
    },
  },
];
