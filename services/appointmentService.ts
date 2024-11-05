import { appointmentPaths, authPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { LoginReq } from "@/types/authServiceTypes";
import {
  AppointmentsResp,
  CreateAppointmentReq,
} from "@/types/appointmentServiceTypes";

export const GetAllAppointments = async () => {
  try {
    const response = await apiClient.get(appointmentPaths.appointments);
    return response.data as AppointmentsResp[];
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
export const CreateAppointment = async (
  appointmetData: CreateAppointmentReq
) => {
  try {
    const response = await apiClient.post(
      appointmentPaths.appointments,
      appointmetData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
