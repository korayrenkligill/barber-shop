import { AppointmentsResp } from "./appointmentServiceTypes";

export type PaymentStatusType = "paid" | "pending" | "failed";
export type PaymentMethodType = "credit_card" | "cash";

export interface PaymentType {
  _id?: string;
  amount: number;
  method: PaymentMethodType;
  appointment?: AppointmentsResp;
  status?: PaymentStatusType;
  createdAt?: string;
  paymentDate?: string;
  updatedAt?: string;
  __v?: number;
}

export interface PaymentReq {
  appointment?: string;
  amount?: number;
  method?: PaymentMethodType;
  status?: PaymentStatusType;
}

export interface MonthlyPaymentResp {
  payments: PaymentType[];
  totalAmount: number;
}
