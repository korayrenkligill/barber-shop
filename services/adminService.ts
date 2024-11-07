import { adminPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { UpdateRoleType, UserType } from "@/types/globalTypes";

export const ApiGetAllUsers = async () => {
  try {
    const response = await apiClient.get(adminPaths.allUsers);
    return response.data as UserType[];
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiGetUser = async (id: string) => {
  try {
    const response = await apiClient.get(`${adminPaths.user}/?id=${id}`);
    return response.data as UserType;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiUpdateUserRole = async (userData: UpdateRoleType) => {
  try {
    const response = await apiClient.put(adminPaths.updateRole, userData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiDeleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`${adminPaths.delete}/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
