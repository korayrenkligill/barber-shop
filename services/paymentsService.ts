import { paymentsPaths } from "@/data/apiUrls";
import apiClient from "../utils/apiClient";
import { PaymentType } from "@/types/paymentServiceTypes";

export const ApiGetPayments = async () => {
  try {
    const response = await apiClient.get(paymentsPaths.payments);
    console.log(response.data);
    return response.data as PaymentType[];
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
