import { UserType } from "./globalTypes";
import { ServiceType } from "./servicesServiceTypes";

export type AppointmentStatusType =
  | "pending"
  | "confirmed"
  | "completed"
  | "canceled";

export interface CreateAppointmentReq {
  customerId?: string;
  name: string;
  phone: string;
  staffId: string;
  serviceId: string[];
  appointmentDate: string;
  status: AppointmentStatusType;
  notes?: string;
}

export interface AppointmentsResp {
  customerId?: UserType;
  appointmentDate: string;
  createdAt: string;
  name: string;
  notes: string;
  phone: string;
  serviceId: ServiceType[];
  staffId: UserType;
  status: AppointmentStatusType;
  updatedAt: string;
  __v: number;
  _id: string;
  paymentId?: string;
}

export interface UpdateAppointmentReq {
  customerId?: string;
  staffId?: string;
  serviceId?: string[];
  date?: string;
  time?: string;
  status?: string;
  notes?: string;
}
