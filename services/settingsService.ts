import { settingsPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { Settings } from "@/types/settingsServiceTypes";

export const ApiGetSettings = async () => {
  try {
    const response = await apiClient.get(settingsPaths.settings);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiCreateSetting = async (settingsData: Settings) => {
  try {
    const response = await apiClient.post(settingsPaths.create, settingsData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiUpdateSetting = async (id: string, settingsData: Settings) => {
  try {
    const response = await apiClient.put(
      `${settingsPaths.settings}/?id=${id}`,
      settingsData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
