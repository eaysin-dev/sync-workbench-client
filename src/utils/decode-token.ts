import { Role } from "@/models/Role";
import { User } from "@/models/User";
import { jwtDecode } from "jwt-decode";

// Define the expected structure of the decoded token
export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  status: string;
  role: Role;
}

export const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<User>(token);

    const { id, username, email, status, role } = decoded;

    if (!id || !username || !email || !status) {
      console.error("[JWT] Missing expected fields in decoded token.");
      return null;
    }

    return { id, username, email, status, role };
  } catch (error) {
    console.error("[JWT] Error decoding token:", error);
    return null;
  }
};
