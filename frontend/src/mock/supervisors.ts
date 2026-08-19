export interface Supervisor {
  id: number;
  name: string;
  email: string;
  department: string;
  avatar?: string;
}

export const MOCK_SUPERVISORS: Supervisor[] = [
  {
    id: 1,
    name: "Dr. Maher Salamin",
    email: "maher.salamin@university.edu",
    department: "Computer Engineering",
  },
  {
    id: 2,
    name: "Dr. Maysaa Alhaj",
    email: "maysaa.alhaj@university.edu",
    department: "Information Technology",
  },
  {
    id: 3,
    name: "Dr. Mohammad Khalaf",
    email: "mohammad.khalaf@university.edu",
    department: "Electrical Engineering",
  },
];
