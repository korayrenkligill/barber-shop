export type RoleType = "staff" | "customer";

export interface UserType {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  phone?: string;
  role: RoleType;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface UpdateRoleType {
  userId: string;
  role: string;
}
