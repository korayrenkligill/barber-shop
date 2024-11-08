import { authPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { AuthResp, LoginReq, RegisterReq } from "@/types/authServiceTypes";

export const ApiLogin = async (userData: LoginReq) => {
  try {
    const response = await apiClient.post(authPaths.login, userData);
    return response.data as AuthResp;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiRegister = async (userData: RegisterReq) => {
  try {
    const response = await apiClient.post(authPaths.register, userData);
    return response.data as AuthResp;
  } catch (error) {
    console.error("Error updating user data", error);
    throw error;
  }
};

export const ApiLogout = async () => {
  try {
    const response = await apiClient.post(authPaths.logout);
    return response.data;
  } catch (error) {
    console.error("Error updating user data", error);
    throw error;
  }
};
