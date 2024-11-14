import {
  getBiometricAttendanceLink,
  getCalendarLink,
  getDashboardLink,
  getDepartmentLink,
  getDesignationLink,
  getDocumentLink,
  getEmployeeAttendanceLink,
  getEmployeeLink,
  getFeedbackSuggestionsLink,
  getHelpSupportLink,
  getLeaveLink,
  getPayrollLink,
  getPerformanceReviewsLink,
  getRolePermissionLink,
  getSecurityLink,
  getSettingsLink,
  getTeamManagementLink,
  getUserProfileLink,
} from "@/routes/router-link";
import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: getDashboardLink(),
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Employee",
    url: getEmployeeLink(),
    icon: "user",
    isActive: false,
    shortcut: ["e", "e"],
    items: [],
  },
  {
    title: "Product",
    url: "/product",
    icon: "monitor",
    isActive: false,
    items: [],
  },
  {
    title: "Department",
    url: getDepartmentLink(),
    icon: "monitor",
    isActive: false,
    items: [],
  },
  {
    title: "Designation",
    url: getDesignationLink(),
    icon: "section",
    isActive: false,
    items: [],
  },
  {
    title: "Role & Permission",
    url: getRolePermissionLink(),
    icon: "settings",
    isActive: false,
    items: [
      {
        title: "Role",
        url: getRolePermissionLink(),
        icon: "settings",
        isActive: false,
        items: [],
      },
      {
        title: "Permission",
        url: getRolePermissionLink(),
        icon: "settings",
        isActive: false,
        items: [],
      },
      {
        title: "Role & Permission",
        url: getRolePermissionLink(),
        icon: "settings",
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Team Management",
    url: getTeamManagementLink(),
    icon: "treePalm",
    isActive: false,
    items: [],
  },
  {
    title: "Project & Task",
    url: "#",
    icon: "link",
    isActive: false,
    items: [
      {
        title: "Projects",
        url: getEmployeeAttendanceLink(),
        icon: "link",
        shortcut: ["p", "j"],
      },
      {
        title: "Tasks",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["t", "k"],
      },
      {
        title: "Task Board",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["t", "b"],
      },
    ],
  },
  {
    title: "Attendance",
    url: "#",
    icon: "link",
    isActive: false,
    items: [
      {
        title: "Employee",
        url: getEmployeeAttendanceLink(),
        icon: "link",
        shortcut: ["a", "e"],
      },
      {
        title: "Biometric",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["a", "b"],
      },
    ],
  },
  {
    title: "Tickets",
    url: getLeaveLink(),
    icon: "link",
    isActive: false,
    items: [],
  },
  {
    title: "Leave",
    url: getLeaveLink(),
    icon: "link",
    isActive: false,
    items: [],
  },
  {
    title: "Calendar",
    url: getCalendarLink(),
    icon: "link",
    isActive: false,
    items: [],
  },
  {
    title: "Performance Reviews",
    url: getPerformanceReviewsLink(),
    icon: "link",
    isActive: false,
    items: [],
  },
  {
    title: "Payroll",
    url: getPayrollLink(),
    icon: "link",
    isActive: false,
    items: [],
  },
  {
    title: "Document",
    url: getDocumentLink(),
    icon: "link",
    isActive: false,
    items: [],
  },
  {
    title: "Reports",
    url: "#",
    icon: "link",
    isActive: false,
    items: [
      {
        title: "Expense Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "e"],
      },
      {
        title: "Invoice Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "i"],
      },
      {
        title: "Payments Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "p"],
      },
      {
        title: "Project Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "j"],
      },
      {
        title: "Task Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "t"],
      },
      {
        title: "User Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "u"],
      },
      {
        title: "Employee Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "e"],
      },
      {
        title: "Daily Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "d"],
      },
      {
        title: "Leave Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "l"],
      },
      {
        title: "Attendance Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "a"],
      },
      {
        title: "Payslip Report",
        url: getBiometricAttendanceLink(),
        icon: "link",
        shortcut: ["r", "p"],
      },
    ],
  },
  {
    title: "Settings",
    url: getSettingsLink(),
    icon: "settings",
    isActive: false,
    items: [],
  },
  {
    title: "User Profile & Security",
    url: "#",
    icon: "link",
    isActive: false,
    items: [
      {
        title: "User Profile",
        url: getUserProfileLink(),
        icon: "link",
        shortcut: ["u", "p"],
      },
      {
        title: "Security",
        url: getSecurityLink(),
        icon: "link",
        shortcut: ["s", "e"],
      },
    ],
  },
  {
    title: "Help & Support",
    url: getHelpSupportLink(),
    icon: "help",
    isActive: false,
    items: [],
  },
  {
    title: "Feedback & Suggestions",
    url: getFeedbackSuggestionsLink(),
    icon: "link",
    isActive: false,
    items: [],
  },
];
