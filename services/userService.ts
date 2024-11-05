import { userPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { UserType } from "@/types/globalTypes";

export const ApiGetProfile = async () => {
  try {
    const response = await apiClient.get(userPaths.profile);
    return response.data as UserType;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiStaff = async () => {
  try {
    const response = await apiClient.get(userPaths.staff);
    return response.data as UserType[];
  } catch (error) {
    console.error("Error updating user data", error);
    throw error;
  }
};
