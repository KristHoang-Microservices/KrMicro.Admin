import { UserRole } from "../../models/enums/UserRole.enum.ts";

export interface CreateUserRequest {
  role?: UserRole;
  userName: string;
  fullName: string;
  phoneNumber?: string;
  email: string;
  password: string;
}
