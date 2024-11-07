import { paymentsPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import {
  MonthlyPaymentResp,
  PaymentReq,
  PaymentType,
} from "@/types/paymentServiceTypes";

export const ApiGetPayments = async () => {
  try {
    const response = await apiClient.get(paymentsPaths.payments);
    return response.data as PaymentType[];
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiGetPayment = async (id: string) => {
  try {
    const response = await apiClient.get(`${paymentsPaths.payment}/?id=${id}`);
    return response.data as PaymentType;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiCreatePayment = async (paymentData: PaymentReq) => {
  try {
    const response = await apiClient.post(paymentsPaths.payments, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiUpdatePayment = async (id: string, paymentData: PaymentReq) => {
  try {
    const response = await apiClient.put(
      `${paymentsPaths.update}/?id=${id}`,
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiDeletePayment = async (id: string) => {
  try {
    const response = await apiClient.delete(
      `${paymentsPaths.delete}/?id=${id}`
    );
    return response.data as PaymentType;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const ApiMonthlyPayment = async (mouth: number, year: number) => {
  try {
    const response = await apiClient.get(
      `${paymentsPaths.monthly}/?month=${mouth}&year=${year}`
    );
    return response.data as MonthlyPaymentResp;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
