import { RoleType } from "./globalTypes";

export type User = {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  token: string;
};

export interface AuthResp {
  message: string;
  user?: User;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
