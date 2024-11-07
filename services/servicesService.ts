import { servicePaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { ServiceCreateType, ServiceType } from "@/types/servicesServiceTypes";

export const ApiServices = async () => {
  try {
    const response = await apiClient.get(servicePaths.allServices);
    return response.data as ServiceType[];
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
export const ApiCreateService = async (serviceData: ServiceCreateType) => {
  try {
    const response = await apiClient.post(servicePaths.create, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiService = async (id: string) => {
  try {
    const response = await apiClient.get(`${servicePaths.service}/?id=${id}`);
    return response.data as ServiceType;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiUpdateService = async (
  id: string,
  serviceData: ServiceCreateType
) => {
  const _serviceData = {
    id: id,
    ...serviceData,
  };
  try {
    const response = await apiClient.put(servicePaths.update, _serviceData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiDeleteService = async (id: string) => {
  try {
    const response = await apiClient.delete(`${servicePaths.delete}/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
