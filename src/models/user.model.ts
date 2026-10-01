export type UserRole = "PASSENGER" | "DRIVER" | "ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";

export interface User {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  password_hash: string;
  role: UserRole;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}