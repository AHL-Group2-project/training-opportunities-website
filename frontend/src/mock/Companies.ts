export interface Opportunity {
  id: number;
  title: string;
  type: string;
  skills: string[];
  location: string;
  seats: number;
  daysLeft: number;
  applicants: number;
  status?: "active" | "closed" | "draft";
}

export interface PastIntern {
  name: string;
  major: string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  logo?: string;
  description: string;
  location: string;
  activeOpportunities: number;
  website: string;
  verified: boolean;
  isActive?: boolean;
  activationStatus: "pending" | "active" | "inactive";
  email?: string;
  phone?: string;
  opportunities: Opportunity[];
  pastInterns: PastIntern[];
  gallery: string[];
}

export const MOCK_COMPANIES: Company[] = [
  {
    id: 1,
    name: "AsalTech Solutions",
    industry: "Software",
    logo: "/src/assets/images/companies/asal.png",
    description: "Leading software house delivering enterprise solutions.",
    location: "Nablus",
    activeOpportunities: 3,
    website: "asaltech.ps",
    verified: true,
    isActive: true,
    activationStatus: "active",
    email: "careers@asaltech.ps",
    phone: "+970 9 234 5678",
    opportunities: [
      {
        id: 1,
        title: "Frontend Developer Intern",
        type: "Full-time",
        skills: ["React", "TypeScript", "MUI"],
        location: "Nablus",
        seats: 2,
        daysLeft: 12,
        applicants: 18,
        status: "active",
      },
      {
        id: 2,
        title: "Backend Developer Intern",
        type: "Full-time",
        skills: ["Node.js", "Express", "MongoDB"],
        location: "Nablus",
        seats: 1,
        daysLeft: 20,
        applicants: 9,
        status: "active",
      },
    ],
    pastInterns: [
      { name: "Layla Haddad", major: "Computer Engineering" },
      { name: "Omar Nasser", major: "Software Engineering" },
      { name: "Sara Odeh", major: "IT" },
    ],
    gallery: [],
  },
  {
    id: 2,
    name: "Foothill",
    industry: "Design",
    logo: "/src/assets/images/companies/foothill.png",
    description: "Creative studio crafting modern digital experiences.",
    location: "Ramallah",
    activeOpportunities: 1,
    website: "designstudio.ps",
    verified: false,
    isActive: true,
    activationStatus: "active",
    email: "hello@designstudio.ps",
    phone: "+970 9 298 7654",
    opportunities: [
      {
        id: 3,
        title: "UI/UX Design Intern",
        type: "Remote",
        skills: ["Figma", "Adobe XD"],
        location: "Ramallah",
        seats: 1,
        daysLeft: 15,
        applicants: 6,
        status: "active",
      },
    ],
    pastInterns: [{ name: "Yousef Karam", major: "Communications Eng." }],
    gallery: [],
  },
  {
    id: 3,
    name: "PalSoft Solutions",
    industry: "Software",
    logo: "/src/assets/images/companies/palsoft.png",
    description:
      "Custom software development and IT consulting for local businesses.",
    location: "Ramallah",
    activeOpportunities: 2,
    website: "palsoft.ps",
    verified: true,
    isActive: true,
    activationStatus: "active",
    email: "jobs@palsoft.ps",
    phone: "+970 9 251 0000",
    opportunities: [
      {
        id: 4,
        title: "Full Stack Developer Intern",
        type: "Hybrid",
        skills: ["React", "Node.js", "PostgreSQL"],
        location: "Ramallah",
        seats: 2,
        daysLeft: 18,
        applicants: 14,
        status: "active",
      },
      {
        id: 5,
        title: "QA Engineer Intern",
        type: "Full-time",
        skills: ["Selenium", "Jest", "Manual Testing"],
        location: "Ramallah",
        seats: 1,
        daysLeft: 10,
        applicants: 7,
        status: "closed",
      },
    ],
    pastInterns: [
      { name: "Ahmad Nazzal", major: "Computer Science" },
      { name: "Rana Qasem", major: "Software Engineering" },
    ],
    gallery: [],
  },
  {
    id: 4,
    name: "Hebron Digital Works",
    industry: "Marketing",
    logo: "/src/assets/images/companies/hebrondigital.png",
    description:
      "Digital marketing agency helping brands grow their online presence.",
    location: "Hebron",
    activeOpportunities: 1,
    website: "hebrondigital.ps",
    verified: false,
    isActive: true,
    activationStatus: "active",
    email: "careers@hebrondigital.ps",
    phone: "+970 2 222 3333",
    opportunities: [
      {
        id: 6,
        title: "Social Media Marketing Intern",
        type: "On-site",
        skills: ["Content Creation", "SEO", "Analytics"],
        location: "Hebron",
        seats: 3,
        daysLeft: 25,
        applicants: 22,
        status: "active",
      },
    ],
    pastInterns: [{ name: "Nour Titi", major: "Business Administration" }],
    gallery: [],
  },
  {
    id: 5,
    name: "AHL Logics",
    industry: "IT Infrastructure",
    logo: "/src/assets/images/companies/ahl.png",
    description:
      "Networking and cybersecurity solutions for enterprises across Palestine.",
    location: "Hebron",
    activeOpportunities: 2,
    website: "bethlehemnet.ps",
    verified: true,
    isActive: true,
    activationStatus: "active",
    email: "hr@bethlehemnet.ps",
    phone: "+970 2 277 8888",
    opportunities: [
      {
        id: 7,
        title: "Network Administrator Intern",
        type: "On-site",
        skills: ["Cisco", "Linux", "Networking"],
        location: "Bethlehem",
        seats: 1,
        daysLeft: 14,
        applicants: 5,
        status: "draft",
      },
      {
        id: 8,
        title: "Cybersecurity Intern",
        type: "Hybrid",
        skills: ["Security+", "Wireshark", "Firewalls"],
        location: "Bethlehem",
        seats: 1,
        daysLeft: 22,
        applicants: 11,
        status: "active",
      },
    ],
    pastInterns: [
      { name: "Khalil Awad", major: "Network Engineering" },
      { name: "Dina Sabbah", major: "Cybersecurity" },
    ],
    gallery: [],
  },
  {
    id: 6,
    name: "Jenin AgriTech",
    industry: "AgriTech",
    logo: "/src/assets/images/companies/jeninagritech.png",
    description:
      "Building smart agriculture technology to support local farmers.",
    location: "Jenin",
    activeOpportunities: 1,
    website: "jeninagritech.ps",
    verified: false,
    isActive: true,
    activationStatus: "active",
    email: "jobs@jeninagritech.ps",
    phone: "+970 4 250 1234",
    opportunities: [
      {
        id: 9,
        title: "Data Analyst Intern",
        type: "Remote",
        skills: ["Python", "Pandas", "Data Visualization"],
        location: "Jenin",
        seats: 2,
        daysLeft: 16,
        applicants: 9,
        status: "active",
      },
    ],
    pastInterns: [
      { name: "Firas Abu Ghosh", major: "Agricultural Engineering" },
    ],
    gallery: [],
  },
  {
    id: 7,
    name: "Nablus FinTech",
    industry: "Finance",
    logo: "/src/assets/images/companies/nablusfintech.png",
    description:
      "Financial technology startup building payment solutions for the region.",
    location: "Nablus",
    activeOpportunities: 2,
    website: "nablusfintech.ps",
    verified: true,
    isActive: true,
    activationStatus: "active",
    email: "careers@nablusfintech.ps",
    phone: "+970 9 235 9999",
    opportunities: [
      {
        id: 10,
        title: "Backend Developer Intern",
        type: "Full-time",
        skills: ["Java", "Spring Boot", "MySQL"],
        location: "Nablus",
        seats: 2,
        daysLeft: 19,
        applicants: 16,
        status: "active",
      },
      {
        id: 11,
        title: "Mobile Developer Intern",
        type: "Hybrid",
        skills: ["Flutter", "Dart", "Firebase"],
        location: "Nablus",
        seats: 1,
        daysLeft: 8,
        applicants: 13,
        status: "active",
      },
    ],
    pastInterns: [
      { name: "Majd Sider", major: "Software Engineering" },
      { name: "Lina Kilani", major: "Computer Science" },
    ],
    gallery: [],
  },
  {
    id: 8,
    name: "Gaza Creative Media",
    industry: "Media Production",
    logo: "/src/assets/images/companies/gazacreative.png",
    description:
      "Video production and creative media studio for regional clients.",
    location: "Gaza",
    activeOpportunities: 1,
    website: "gazacreative.ps",
    verified: false,
    isActive: true,
    activationStatus: "active",
    email: "jobs@gazacreative.ps",
    phone: "+970 8 282 7777",
    opportunities: [
      {
        id: 12,
        title: "Video Editor Intern",
        type: "On-site",
        skills: ["Premiere Pro", "After Effects", "Color Grading"],
        location: "Gaza",
        seats: 2,
        daysLeft: 20,
        applicants: 10,
        status: "active",
      },
    ],
    pastInterns: [{ name: "Sami Barakat", major: "Media Studies" }],
    gallery: [],
  },
];

// Also export as lowercase for backward compatibility
export const mockCompanies = MOCK_COMPANIES;
