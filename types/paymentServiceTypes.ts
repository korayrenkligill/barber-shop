export interface PaymentType {
  _id?: string;
  amount: number;
  method: string;
  appointment?: any;
  status?: string;
  createdAt?: string;
  paymentDate?: string;
  updatedAt?: string;
  __v?: number;
}
