"use client";

import { ApiGetPayments } from "@/services/paymentsService";
import { PaymentStatusType, PaymentType } from "@/types/paymentServiceTypes";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import * as React from "react";

import { BsCashStack } from "react-icons/bs";
import { IoCard } from "react-icons/io5";

type PaymentItemProp = {
  payment: PaymentType;
};

const getPaymentColor = (
  status: PaymentStatusType,
  type: "border" | "bg" | "text"
) => {
  if (type === "border") {
    switch (status) {
      case "paid":
        return "border-green-700/70";
      case "pending":
        return "border-zinc-500/50";
      case "failed":
        return "border-red-700/70";
    }
  }

  if (type === "bg") {
    switch (status) {
      case "paid":
        return "bg-green-700/70";
      case "pending":
        return "bg-zinc-500/50";
      case "failed":
        return "bg-red-700/70";
    }
  }

  if (type === "text") {
    switch (status) {
      case "paid":
        return "text-green-700/70";
      case "pending":
        return "text-zinc-500/50";
      case "failed":
        return "text-red-700/70";
    }
  }
};

const PaymentItem = ({ payment }: PaymentItemProp) => {
  return (
    <Link
      href={`/admin/${payment?._id}`}
      className={`flex min-h-20 rounded-lg overflow-hidden border ${getPaymentColor(
        payment?.status,
        "border"
      )}`}
    >
      <div
        className={`${getPaymentColor(
          payment?.status,
          "bg"
        )} text-white min-w-20 flex items-center justify-center text-2xl`}
      >
        {payment.method === "credit_card" ? <IoCard /> : <BsCashStack />}
      </div>
      <div className="p-2 flex-1">
        <div className="text-xs text-zinc-500 flex justify-between">
          <span>{formatDate(payment?.paymentDate)}</span>
          <span className={`${getPaymentColor(payment?.status, "text")}`}>
            {payment?.status}
          </span>
        </div>
        <h1 className="text-2xl font-bold">₺{payment?.amount ?? "-"}</h1>
        <h2 className="text-sm text-zinc-700 dark:text-zinc-400">
          {payment?.appointment?.name}
        </h2>
      </div>
    </Link>
  );
};

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
      <h1 className="text-2xl font-semibold mb-4">Tüm Ödemeler</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-2">
        {payments.map((payment: PaymentType, index) => (
          <PaymentItem key={index} payment={payment} />
        ))}
      </div>
    </div>
  );
}
