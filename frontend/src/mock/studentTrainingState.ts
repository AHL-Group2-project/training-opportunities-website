export type TrainingPhaseStatus =
  | "not_started"
  | "request_pending"
  | "request_rejected"
  | "in_progress"
  | "completed";

export interface SingleTrainingState {
  status: TrainingPhaseStatus;
  requestId?: number;
  requestRejectionReason?: string;
  supervisorFinalStatus: "pending" | "approved" | "rejected";
  supervisorFinalComment?: string;
  companyApprovedHours: number;
  requiredHours: number;
}

export interface StudentTrainingState {
  studentId: number;
  ft1: SingleTrainingState;
  ft2: SingleTrainingState;
}

export interface StudentProfile {
  id: number;
  userId: number;
  name: string;
  major: string;
  gpa: number;
  year: number;
  email: string;
  avatar?: string;
  companyId?: number; // Assigned company
  supervisorId?: number; // Assigned supervisor
}

/* ─── Student Profiles ─── */
export const MOCK_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 1,
    userId: 101,
    name: "Ahmad",
    major: "Computer Science",
    gpa: 3.5,
    year: 3,
    email: "ahmad@student.edu.ps",
    avatar: "https://i.pravatar.cc/150?u=ahmad",
  },
  {
    id: 2,
    userId: 102,
    name: "Dina",
    major: "Software Engineering",
    gpa: 3.7,
    year: 3,
    email: "dina@student.edu.ps",
    avatar: "https://i.pravatar.cc/150?u=dina",
  },
  {
    id: 3,
    userId: 103,
    name: "Jana",
    major: "Computer Science",
    gpa: 3.4,
    year: 3,
    email: "jana@student.edu.ps",
    avatar: "https://i.pravatar.cc/150?u=jana",
    companyId: 1,
    supervisorId: 201,
  },
  {
    id: 4,
    userId: 104,
    name: "Ameed",
    major: "Information Systems",
    gpa: 3.6,
    year: 4,
    email: "ameed@student.edu.ps",
    avatar: "https://i.pravatar.cc/150?u=ameed",
    companyId: 2,
    supervisorId: 201,
  },
  {
    id: 5,
    userId: 105,
    name: "Layan",
    major: "Computer Engineering",
    gpa: 3.8,
    year: 3,
    email: "layan@student.edu.ps",
    avatar: "https://i.pravatar.cc/150?u=layan",
    companyId: 1,
    supervisorId: 201,
  },
  {
    id: 6,
    userId: 106,
    name: "Sara",
    major: "Software Engineering",
    gpa: 3.9,
    year: 4,
    email: "sara@student.edu.ps",
    avatar: "https://i.pravatar.cc/150?u=sara",
    companyId: 3,
    supervisorId: 201,
  },
];

export const MOCK_TRAINING_STATES: StudentTrainingState[] = [
  /* 1. Ahmad — FT1 not started (no request yet) */
  {
    studentId: 1,
    ft1: {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    },
    ft2: {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    },
  },
  /* 2. Dina — FT1 request pending (submitted, waiting supervisor) */
  {
    studentId: 2,
    ft1: {
      status: "request_pending",
      requestId: 1002,
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    },
    ft2: {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    },
  },
  /* 3. Jana — FT1 in progress (supervisor approved request, logging hours now) */
  {
    studentId: 3,
    ft1: {
      status: "in_progress",
      requestId: 1003,
      supervisorFinalStatus: "pending",
      companyApprovedHours: 48,
      requiredHours: 150,
    },
    ft2: {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    },
  },
  /* 4. Ameed — FT1 completed (supervisor final approved) */
  {
    studentId: 4,
    ft1: {
      status: "completed",
      requestId: 1004,
      supervisorFinalStatus: "approved",
      supervisorFinalComment: "Excellent work and dedication.",
      companyApprovedHours: 150,
      requiredHours: 150,
    },
    ft2: {
      status: "not_started",
      supervisorFinalStatus: "pending",
      companyApprovedHours: 0,
      requiredHours: 150,
    },
  },
  /* 5. Layan — FT1 completed, FT2 in progress */
  {
    studentId: 5,
    ft1: {
      status: "completed",
      requestId: 1005,
      supervisorFinalStatus: "approved",
      supervisorFinalComment: "Great performance.",
      companyApprovedHours: 150,
      requiredHours: 150,
    },
    ft2: {
      status: "in_progress",
      requestId: 1006,
      supervisorFinalStatus: "pending",
      companyApprovedHours: 32,
      requiredHours: 150,
    },
  },
  /* 6. Sara — Both completed */
  {
    studentId: 6,
    ft1: {
      status: "completed",
      requestId: 1007,
      supervisorFinalStatus: "approved",
      supervisorFinalComment: "Outstanding.",
      companyApprovedHours: 150,
      requiredHours: 150,
    },
    ft2: {
      status: "completed",
      requestId: 1008,
      supervisorFinalStatus: "approved",
      supervisorFinalComment: "Exceptional work.",
      companyApprovedHours: 150,
      requiredHours: 150,
    },
  },
];

/* ─── Helpers ─── */
export function getStudentProfile(
  studentId: number,
): StudentProfile | undefined {
  return MOCK_STUDENT_PROFILES.find((s) => s.id === studentId);
}

export function getTrainingState(
  studentId: number,
): StudentTrainingState | undefined {
  return MOCK_TRAINING_STATES.find((s) => s.studentId === studentId);
}

export function getAllStudents(): StudentProfile[] {
  return MOCK_STUDENT_PROFILES;
}
