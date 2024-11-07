"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiMonthlyPayment } from "@/services/paymentsService";
import { MonthlyPaymentResp } from "@/types/paymentServiceTypes";
import { formatDate } from "@/utils/formatDate";
import React, { useEffect } from "react";
import { IoIosRefresh } from "react-icons/io";

const page = () => {
  const [payments, setPayments] = React.useState<MonthlyPaymentResp>();

  const [month, setMonth] = React.useState(0);
  const [year, setYear] = React.useState(0);

  const MonthlyPayment = async (_month: number, _year: number) => {
    await ApiMonthlyPayment(_month, _year)
      .then((res) => {
        setPayments(res);
      })
      .catch((err) => {
        if (err.status === 404) {
          setPayments(null);
        }
      });
  };
  useEffect(() => {
    const date = new Date();

    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());

    MonthlyPayment(date.getMonth() + 1, date.getFullYear());
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Aylık Gelir</h1>
      <div className="flex flex-col sm:flex-row sm:items-end gap-2">
        <div>
          <p className="text-zinc-500 text-xs ml-2 mb-1">Ay:</p>
          <Input
            type="number"
            value={month}
            onChange={(e) => {
              if (Number(e.target.value) < 1 || Number(e.target.value) > 12)
                return;
              setMonth(Number(e.target.value));
            }}
            className="w-full border border-zinc-200 rounded-md p-2"
          />
        </div>
        <div>
          <p className="text-zinc-500 text-xs ml-2 mb-1">Yıl:</p>
          <Input
            type="number"
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value));
            }}
            className="w-full border border-zinc-200 rounded-md p-2"
          />
        </div>
        <Button
          onClick={() => {
            MonthlyPayment(month, year);
          }}
        >
          <IoIosRefresh />
        </Button>
      </div>
      <div className="mt-4">
        {!payments ? (
          <div>Kazanç bulunamadı</div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">
              Total Kazanç: ₺{payments?.totalAmount}
            </h1>
            <div className="max-w-[85vw] w-full overflow-x-auto">
              <table className="w-full min-w-max border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold border-b-2">
                      Kazanç
                    </th>
                    <th className="px-4 py-2 text-left font-semibold border-b-2">
                      Method
                    </th>
                    <th className="px-4 py-2 text-left font-semibold border-b-2">
                      Durum
                    </th>
                    <th className="px-4 py-2 text-left font-semibold border-b-2">
                      Tarih
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.payments.map((payment) => (
                    <tr key={payment._id} className="border-b">
                      <td className="px-4 py-2">₺{payment.amount}</td>
                      <td className="px-4 py-2">{payment.method}</td>
                      <td className="px-4 py-2">{payment.status}</td>
                      <td className="px-4 py-2">
                        {formatDate(payment.paymentDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
