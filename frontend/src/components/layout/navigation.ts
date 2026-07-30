export type UserRole = "public" | "student" | "supervisor" | "admin";

export type NavItem = {
  label: string;
  path: string;
  action?: "logout";
};

export type NavEntry =
  | {
      type: "link";
      item: NavItem;
    }
  | {
      type: "group";
      label: string;
      items: NavItem[];
    };

const publicNavEntries: NavEntry[] = [
  { type: "link", item: { label: "Opportunities", path: "/opportunities" } },
  { type: "link", item: { label: "Companies", path: "/companies" } },
  {
    type: "link",
    item: { label: "Students", path: "/students" },
  },
];

const studentNavEntries: NavEntry[] = [
  { type: "link", item: { label: "Dashboard", path: "/dashboard" } },
  { type: "link", item: { label: "Applications", path: "/applications" } },
  {
    type: "group",
    label: "Training",
    items: [
      { label: "Hours", path: "/training/hours" },
      { label: "Reports", path: "/training/reports" },
      { label: "FT1", path: "/training/ft1" },
      { label: "FT2", path: "/training/ft2" },
    ],
  },
];

const supervisorNavEntries: NavEntry[] = [
  { type: "link", item: { label: "Dashboard", path: "/supervisor/dashboard" } },
  { type: "link", item: { label: "Students", path: "/supervisor/students" } },
  { type: "link", item: { label: "Requests", path: "/supervisor/requests" } },
  {
    type: "group",
    label: "Manage",
    items: [
      { label: "Opportunities", path: "/supervisor/opportunities" },
      { label: "Companies", path: "/supervisor/companies" },
      { label: "Announcements", path: "/supervisor/announcements" },
    ],
  },
];

const adminNavEntries: NavEntry[] = [
  { type: "link", item: { label: "Dashboard", path: "/supervisor/dashboard" } },
  { type: "link", item: { label: "Students", path: "/supervisor/students" } },
  { type: "link", item: { label: "Requests", path: "/supervisor/requests" } },
  {
    type: "group",
    label: "Management",
    items: [
      { label: "Opportunities", path: "/supervisor/opportunities" },
      { label: "Companies", path: "/supervisor/companies" },
      { label: "Announcements", path: "/supervisor/announcements" },
    ],
  },
];

export function getNavEntries(role: UserRole): NavEntry[] {
  switch (role) {
    case "student":
      return studentNavEntries;
    case "supervisor":
      return supervisorNavEntries;
    case "admin":
      return adminNavEntries;
    case "public":
    default:
      return publicNavEntries;
  }
}

export const accountMenuItems = [
  { label: "Profile", path: "/profile" },
  { label: "Logout", action: "logout" },
];
