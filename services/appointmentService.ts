import { appointmentPaths, authPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { LoginReq } from "@/types/authServiceTypes";
import {
  AppointmentsResp,
  CreateAppointmentReq,
  UpdateAppointmentReq,
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

export const ApiGetAppointment = async (id: string) => {
  try {
    const response = await apiClient.get(
      `${appointmentPaths.appointment}/?id=${id}`
    );
    return response.data as AppointmentsResp;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiCreateAppointment = async (
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

export const ApiUpdateAppointment = async (
  id: string,
  appointmetData: UpdateAppointmentReq
) => {
  try {
    const response = await apiClient.put(
      `${appointmentPaths.update}/?id=${id}`,
      appointmetData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
