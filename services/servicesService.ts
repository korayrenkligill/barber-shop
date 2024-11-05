import { servicePaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { ServiceType } from "@/types/servicesServiceTypes";

export const ApiServices = async () => {
  try {
    const response = await apiClient.get(servicePaths.allServices);
    console.log(response.data);
    return response.data as ServiceType[];
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
