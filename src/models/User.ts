import { Role } from "@/models/Role";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: "Pending" | "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
}
