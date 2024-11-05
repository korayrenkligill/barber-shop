"use client";

import { ApiGetPayments } from "@/services/paymentsService";
import { PaymentType } from "@/types/paymentServiceTypes";
import * as React from "react";
export default function Home() {
  const [payments, setPayments] = React.useState<PaymentType[]>([]);

  const GetPayments = async () => {
    await ApiGetPayments()
      .then((res) => setPayments(res))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    GetPayments();
  }, []);
  return (
    <div>
      {payments.map((payment: PaymentType, index) => (
        <div key={index}>{payment?._id}</div>
      ))}
    </div>
  );
}
