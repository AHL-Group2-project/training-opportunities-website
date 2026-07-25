export interface Opportunity {
  id: number;
  title: string;
  type: string;
  skills: string[];
  location: string;
  seats: number;
  daysLeft: number;
  appliedCount: number;
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
  opportunities: Opportunity[];
  pastInterns: PastIntern[];
  gallery: string[];
}

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Software",
    description: "Leading software house delivering enterprise solutions.",
    location: "Nablus",
    activeOpportunities: 3,
    website: "techcorp.ps",
    verified: true,
    opportunities: [
      {
        id: 1,
        title: "Frontend Developer Intern",
        type: "FT1",
        skills: ["React", "TypeScript", "MUI"],
        location: "Nablus",
        seats: 2,
        daysLeft: 12,
        appliedCount: 18,
      },
      {
        id: 2,
        title: "Backend Developer Intern",
        type: "FT2",
        skills: ["Node.js", "Express", "MongoDB"],
        location: "Nablus",
        seats: 1,
        daysLeft: 20,
        appliedCount: 9,
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
    name: "Design Studio",
    industry: "Design",
    description: "Creative studio crafting modern digital experiences.",
    location: "Ramallah",
    activeOpportunities: 1,
    website: "designstudio.ps",
    verified: false,
    opportunities: [
      {
        id: 3,
        title: "UI/UX Design Intern",
        type: "FT1",
        skills: ["Figma", "Adobe XD"],
        location: "Ramallah",
        seats: 1,
        daysLeft: 15,
        appliedCount: 6,
      },
    ],
    pastInterns: [{ name: "Yousef Karam", major: "Communications Eng." }],
    gallery: [],
  },
  {
    id: 3,
    name: "PalSoft Solutions",
    industry: "Software",
    description:
      "Custom software development and IT consulting for local businesses.",
    location: "Ramallah",
    activeOpportunities: 2,
    website: "palsoft.ps",
    verified: true,
    opportunities: [
      {
        id: 4,
        title: "Full Stack Developer Intern",
        type: "FT1",
        skills: ["React", "Node.js", "PostgreSQL"],
        location: "Ramallah",
        seats: 2,
        daysLeft: 18,
        appliedCount: 14,
      },
      {
        id: 5,
        title: "QA Engineer Intern",
        type: "FT2",
        skills: ["Selenium", "Jest", "Manual Testing"],
        location: "Ramallah",
        seats: 1,
        daysLeft: 10,
        appliedCount: 7,
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
    description:
      "Digital marketing agency helping brands grow their online presence.",
    location: "Hebron",
    activeOpportunities: 1,
    website: "hebrondigital.ps",
    verified: false,
    opportunities: [
      {
        id: 6,
        title: "Social Media Marketing Intern",
        type: "FT1",
        skills: ["Content Creation", "SEO", "Analytics"],
        location: "Hebron",
        seats: 3,
        daysLeft: 25,
        appliedCount: 22,
      },
    ],
    pastInterns: [{ name: "Nour Titi", major: "Business Administration" }],
    gallery: [],
  },
  {
    id: 5,
    name: "Bethlehem Networks",
    industry: "IT Infrastructure",
    description:
      "Networking and cybersecurity solutions for enterprises across Palestine.",
    location: "Bethlehem",
    activeOpportunities: 2,
    website: "bethlehemnet.ps",
    verified: true,
    opportunities: [
      {
        id: 7,
        title: "Network Administrator Intern",
        type: "FT1",
        skills: ["Cisco", "Linux", "Networking"],
        location: "Bethlehem",
        seats: 1,
        daysLeft: 14,
        appliedCount: 5,
      },
      {
        id: 8,
        title: "Cybersecurity Intern",
        type: "FT2",
        skills: ["Security+", "Wireshark", "Firewalls"],
        location: "Bethlehem",
        seats: 1,
        daysLeft: 22,
        appliedCount: 11,
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
    description:
      "Building smart agriculture technology to support local farmers.",
    location: "Jenin",
    activeOpportunities: 1,
    website: "jeninagritech.ps",
    verified: false,
    opportunities: [
      {
        id: 9,
        title: "Data Analyst Intern",
        type: "FT1",
        skills: ["Python", "Pandas", "Data Visualization"],
        location: "Jenin",
        seats: 2,
        daysLeft: 16,
        appliedCount: 9,
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
    description:
      "Financial technology startup building payment solutions for the region.",
    location: "Nablus",
    activeOpportunities: 2,
    website: "nablusfintech.ps",
    verified: true,
    opportunities: [
      {
        id: 10,
        title: "Backend Developer Intern",
        type: "FT1",
        skills: ["Java", "Spring Boot", "MySQL"],
        location: "Nablus",
        seats: 2,
        daysLeft: 19,
        appliedCount: 16,
      },
      {
        id: 11,
        title: "Mobile Developer Intern",
        type: "FT2",
        skills: ["Flutter", "Dart", "Firebase"],
        location: "Nablus",
        seats: 1,
        daysLeft: 8,
        appliedCount: 13,
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
    description:
      "Video production and creative media studio for regional clients.",
    location: "Gaza",
    activeOpportunities: 1,
    website: "gazacreative.ps",
    verified: false,
    opportunities: [
      {
        id: 12,
        title: "Video Editor Intern",
        type: "FT1",
        skills: ["Premiere Pro", "After Effects", "Color Grading"],
        location: "Gaza",
        seats: 2,
        daysLeft: 20,
        appliedCount: 10,
      },
    ],
    pastInterns: [{ name: "Sami Barakat", major: "Media Studies" }],
    gallery: [],
  },
];
