import { User } from "@/models/User";

export interface UserTableRow extends Omit<User, "role"> {
  role: string;
}
