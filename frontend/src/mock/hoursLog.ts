export type HoursStatus = "pending" | "approved" | "rejected";
export type LocationType = "office" | "remotely";
export type TrainingType = "FT1" | "FT2";
export type CompanyStatus = "pending" | "approved" | "rejected";

export interface HoursEntry {
  id: number;
  studentId: number | string;
  weekId?: string;
  isNew?: boolean;
  day: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm (24h)
  endTime: string; // HH:mm (24h)
  location: LocationType;
  status: HoursStatus; // Student submission status
  companyStatus: CompanyStatus;
  supervisorComment?: string;
  trainingType: TrainingType;
  hours?: number;
  taskDescription?: string;
}

export const HOURS_CONFIG = {
  maxHoursPerDay: 8,
  maxHoursPerEntry: 8,
  minStartTime: "08:00",
  maxEndTime: "17:00",
  forbiddenDay: 5,
  requiredFt1Hours: 150,
  requiredFt2Hours: 150,
} as const;

export function calcHours(start: string, end: string): number {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const diff = eh * 60 + em - (sh * 60 + sm);
  return diff > 0 ? diff / 60 : 0;
}

export function formatHours(decimal: number): string {
  const h = Math.floor(decimal);
  const m = Math.round((decimal - h) * 60);
  return `${h}:${m.toString().padStart(2, "0")}:00`;
}

export function getDayName(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][d.getDay()];
}

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

export function validateHoursEntry(
  row: Pick<HoursEntry, "date" | "startTime" | "endTime">,
  siblingEntries: Pick<
    HoursEntry,
    "id" | "date" | "startTime" | "endTime" | "status"
  >[] = [],
  excludeId?: number,
): ValidationResult {
  const { date, startTime, endTime } = row;

  if (!date) return { valid: false, error: "Date is required." };
  if (!startTime) return { valid: false, error: "Start time is required." };
  if (!endTime) return { valid: false, error: "End time is required." };

  const dayIndex = new Date(date + "T00:00:00").getDay();
  if (dayIndex === HOURS_CONFIG.forbiddenDay) {
    return { valid: false, error: "Training is not allowed on Fridays." };
  }

  if (startTime < HOURS_CONFIG.minStartTime) {
    return { valid: false, error: "Start time cannot be before 8:00 AM." };
  }
  if (endTime > HOURS_CONFIG.maxEndTime) {
    return { valid: false, error: "End time cannot be after 5:00 PM." };
  }

  if (startTime >= endTime) {
    return { valid: false, error: "End time must be after start time." };
  }

  const entryHours = calcHours(startTime, endTime);
  if (entryHours > HOURS_CONFIG.maxHoursPerEntry) {
    return {
      valid: false,
      error: `Single entry cannot exceed ${HOURS_CONFIG.maxHoursPerEntry} hours.`,
    };
  }

  const sameDateHours = siblingEntries
    .filter(
      (e) => e.date === date && e.status !== "rejected" && e.id !== excludeId,
    )
    .reduce((sum, e) => sum + calcHours(e.startTime, e.endTime), 0);

  if (sameDateHours + entryHours > HOURS_CONFIG.maxHoursPerDay) {
    const remaining = HOURS_CONFIG.maxHoursPerDay - sameDateHours;
    return {
      valid: false,
      error:
        remaining > 0
          ? `Daily limit is ${HOURS_CONFIG.maxHoursPerDay}h. You have ${formatHours(remaining)} remaining.`
          : `Daily limit of ${HOURS_CONFIG.maxHoursPerDay}h already reached.`,
    };
  }

  return { valid: true, error: null };
}

/* ─── ID Generator ─── */
let _nextId = 1000;
export function getNextHoursId(): number {
  return _nextId++;
}

const HOURS_S3_FT1: HoursEntry[] = [
  {
    id: 3001,
    studentId: 3,
    day: "Sunday",
    date: "2026-07-20",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3002,
    studentId: 3,
    day: "Monday",
    date: "2026-07-21",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3003,
    studentId: 3,
    day: "Tuesday",
    date: "2026-07-22",
    startTime: "09:00",
    endTime: "13:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3004,
    studentId: 3,
    day: "Wednesday",
    date: "2026-07-23",
    startTime: "09:00",
    endTime: "13:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3005,
    studentId: 3,
    day: "Thursday",
    date: "2026-07-24",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3006,
    studentId: 3,
    day: "Sunday",
    date: "2026-07-27",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3007,
    studentId: 3,
    day: "Monday",
    date: "2026-07-28",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3008,
    studentId: 3,
    day: "Tuesday",
    date: "2026-07-29",
    startTime: "09:00",
    endTime: "13:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3009,
    studentId: 3,
    day: "Wednesday",
    date: "2026-07-30",
    startTime: "09:00",
    endTime: "13:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3010,
    studentId: 3,
    day: "Thursday",
    date: "2026-07-31",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 3011,
    studentId: 3,
    day: "Sunday",
    date: "2026-08-03",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "pending",
    companyStatus: "pending",
    trainingType: "FT1",
  },
  {
    id: 3012,
    studentId: 3,
    day: "Monday",
    date: "2026-08-04",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "pending",
    companyStatus: "pending",
    trainingType: "FT1",
  },
];

/* ── Student 4 (Ameed) — FT1 completed ── */
const HOURS_S4_FT1: HoursEntry[] = [
  {
    id: 4001,
    studentId: 4,
    day: "Sunday",
    date: "2026-02-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4002,
    studentId: 4,
    day: "Monday",
    date: "2026-02-16",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4003,
    studentId: 4,
    day: "Tuesday",
    date: "2026-02-17",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4004,
    studentId: 4,
    day: "Wednesday",
    date: "2026-02-18",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4005,
    studentId: 4,
    day: "Thursday",
    date: "2026-02-19",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4006,
    studentId: 4,
    day: "Sunday",
    date: "2026-02-22",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4007,
    studentId: 4,
    day: "Monday",
    date: "2026-02-23",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4008,
    studentId: 4,
    day: "Tuesday",
    date: "2026-02-24",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4009,
    studentId: 4,
    day: "Wednesday",
    date: "2026-02-25",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4010,
    studentId: 4,
    day: "Thursday",
    date: "2026-02-26",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4011,
    studentId: 4,
    day: "Sunday",
    date: "2026-03-01",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4012,
    studentId: 4,
    day: "Monday",
    date: "2026-03-02",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4013,
    studentId: 4,
    day: "Tuesday",
    date: "2026-03-03",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4014,
    studentId: 4,
    day: "Wednesday",
    date: "2026-03-04",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4015,
    studentId: 4,
    day: "Thursday",
    date: "2026-03-05",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4016,
    studentId: 4,
    day: "Sunday",
    date: "2026-03-08",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4017,
    studentId: 4,
    day: "Monday",
    date: "2026-03-09",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4018,
    studentId: 4,
    day: "Tuesday",
    date: "2026-03-10",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "rejected",
    supervisorComment: "Wrong location — should be office",
    trainingType: "FT1",
  },
  {
    id: 4019,
    studentId: 4,
    day: "Wednesday",
    date: "2026-03-11",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 4020,
    studentId: 4,
    day: "Thursday",
    date: "2026-03-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
];

/* ── Student 5 (Layan) — FT2 in progress ── */
const HOURS_S5_FT1: HoursEntry[] = [
  {
    id: 5001,
    studentId: 5,
    day: "Sunday",
    date: "2026-01-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5002,
    studentId: 5,
    day: "Monday",
    date: "2026-01-13",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5003,
    studentId: 5,
    day: "Tuesday",
    date: "2026-01-14",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5004,
    studentId: 5,
    day: "Wednesday",
    date: "2026-01-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5005,
    studentId: 5,
    day: "Thursday",
    date: "2026-01-16",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5006,
    studentId: 5,
    day: "Sunday",
    date: "2026-01-19",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5007,
    studentId: 5,
    day: "Monday",
    date: "2026-01-20",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5008,
    studentId: 5,
    day: "Tuesday",
    date: "2026-01-21",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5009,
    studentId: 5,
    day: "Wednesday",
    date: "2026-01-22",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 5010,
    studentId: 5,
    day: "Thursday",
    date: "2026-01-23",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
];

const HOURS_S5_FT2: HoursEntry[] = [
  {
    id: 5501,
    studentId: 5,
    day: "Sunday",
    date: "2026-08-03",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 5502,
    studentId: 5,
    day: "Monday",
    date: "2026-08-04",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 5503,
    studentId: 5,
    day: "Tuesday",
    date: "2026-08-05",
    startTime: "09:00",
    endTime: "13:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 5504,
    studentId: 5,
    day: "Wednesday",
    date: "2026-08-06",
    startTime: "09:00",
    endTime: "13:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 5505,
    studentId: 5,
    day: "Thursday",
    date: "2026-08-07",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "pending",
    companyStatus: "pending",
    trainingType: "FT2",
  },
  {
    id: 5506,
    studentId: 5,
    day: "Sunday",
    date: "2026-08-10",
    startTime: "09:00",
    endTime: "13:00",
    location: "office",
    status: "pending",
    companyStatus: "pending",
    trainingType: "FT2",
  },
];

const HOURS_S6_FT1: HoursEntry[] = [
  {
    id: 6001,
    studentId: 6,
    day: "Sunday",
    date: "2026-01-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6002,
    studentId: 6,
    day: "Monday",
    date: "2026-01-13",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6003,
    studentId: 6,
    day: "Tuesday",
    date: "2026-01-14",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6004,
    studentId: 6,
    day: "Wednesday",
    date: "2026-01-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6005,
    studentId: 6,
    day: "Thursday",
    date: "2026-01-16",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6006,
    studentId: 6,
    day: "Sunday",
    date: "2026-01-19",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6007,
    studentId: 6,
    day: "Monday",
    date: "2026-01-20",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6008,
    studentId: 6,
    day: "Tuesday",
    date: "2026-01-21",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6009,
    studentId: 6,
    day: "Wednesday",
    date: "2026-01-22",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
  {
    id: 6010,
    studentId: 6,
    day: "Thursday",
    date: "2026-01-23",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT1",
  },
];

const HOURS_S6_FT2: HoursEntry[] = [
  {
    id: 6501,
    studentId: 6,
    day: "Sunday",
    date: "2026-06-01",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6502,
    studentId: 6,
    day: "Monday",
    date: "2026-06-02",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6503,
    studentId: 6,
    day: "Tuesday",
    date: "2026-06-03",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6504,
    studentId: 6,
    day: "Wednesday",
    date: "2026-06-04",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6505,
    studentId: 6,
    day: "Thursday",
    date: "2026-06-05",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6506,
    studentId: 6,
    day: "Sunday",
    date: "2026-06-08",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6507,
    studentId: 6,
    day: "Monday",
    date: "2026-06-09",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6508,
    studentId: 6,
    day: "Tuesday",
    date: "2026-06-10",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6509,
    studentId: 6,
    day: "Wednesday",
    date: "2026-06-11",
    startTime: "09:00",
    endTime: "17:00",
    location: "remotely",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
  {
    id: 6510,
    studentId: 6,
    day: "Thursday",
    date: "2026-06-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "office",
    status: "approved",
    companyStatus: "approved",
    trainingType: "FT2",
  },
];

export const MOCK_ALL_HOURS: HoursEntry[] = [
  ...HOURS_S3_FT1,
  ...HOURS_S4_FT1,
  ...HOURS_S5_FT1,
  ...HOURS_S5_FT2,
  ...HOURS_S6_FT1,
  ...HOURS_S6_FT2,
];

export function getStudentHours(studentId: number): HoursEntry[] {
  return MOCK_ALL_HOURS.filter((e) => e.studentId === studentId);
}
