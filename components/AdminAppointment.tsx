"use client";

import React, { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { formatDate } from "@/utils/formatDate";
import { FaRegEdit } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AppointmentsResp,
  AppointmentStatusType,
} from "@/types/appointmentServiceTypes";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { PaymentMethodType, PaymentType } from "@/types/paymentServiceTypes";
import { ApiUpdateAppointment } from "@/services/appointmentService";
import { toast } from "react-toastify";
import {
  ApiCreatePayment,
  ApiGetPayment,
  ApiUpdatePayment,
} from "@/services/paymentsService";

type Props = {
  appointment: AppointmentsResp;
  GetAppointments: () => Promise<void>;
};

const getBorderColor = (status: AppointmentStatusType) => {
  switch (status) {
    case "completed":
      return "border-green-500/70";
    case "canceled":
      return "border-red-500/70";
    case "pending":
      return "border-zinc-500/50";
    case "confirmed":
      return "border-yellow-500/50";
    default:
      return "border-zinc-500/50";
  }
};
const AdminAppointment = ({ appointment, GetAppointments }: Props) => {
  const router = useRouter();

  const [paymentAmount, setPaymentAmount] = React.useState<number>(0);
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethodType>("cash");

  const [payment, setPayment] = React.useState<PaymentType | undefined>();

  const AddPayment = async (id: string, amount: number) => {
    await ApiCreatePayment({
      appointment: id,
      amount: amount,
      method: paymentMethod,
      status: "pending",
    }).catch((error) => {
      console.log(error);
    });
  };

  const UpdatePayment = async () => {
    await ApiUpdatePayment(payment._id, {
      status: "paid",
    }).catch((error) => {
      console.log(error);
    });
  };

  const UpdateAsCompleted = async (id: string) => {
    await ApiUpdateAppointment(id, {
      status: "completed",
    }).then((res) => {
      toast.success("Randevu tamamlandı olarak işaretlendi");
      if (res.paymentId) UpdatePayment();
      GetAppointments();
    });
  };

  const UpdateAsConfirmed = async (id: string) => {
    await ApiUpdateAppointment(id, {
      status: "confirmed",
    }).then((res) => {
      toast.success("Randevu onaylandı olarak işaretlendi, ödeme oluşturuldu");
      AddPayment(res._id, paymentAmount);
      GetAppointments();
    });
  };

  const GetPayment = async (id: string) => {
    await ApiGetPayment(id).then((res) => {
      setPayment(res);
    });
  };

  useEffect(() => {
    const totalPrice = appointment.serviceId.reduce(
      (total, service) => total + service.price,
      0
    );

    if (appointment.paymentId) {
      GetPayment(appointment.paymentId);
    }
    setPaymentAmount(totalPrice);
  }, []);
  return (
    <Card
      key={appointment._id}
      className={`flex flex-col justify-start h-full ${getBorderColor(
        appointment.status
      )}`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {appointment.name}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/admin/randevular/${appointment._id}`)}
          >
            <FaRegEdit />
          </Button>
        </CardTitle>
        <CardDescription>
          {formatDate(appointment.appointmentDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {payment && (
          <p>
            <strong>Fiyat:</strong> {payment.amount}
          </p>
        )}
        <p>
          <strong>Hizmet:</strong>{" "}
          {appointment.serviceId.map((service) => service.name).join(", ")}
        </p>
        <p>
          <strong>Personel:</strong> {appointment.staffId.name}
        </p>
        <p>
          <strong>Durum:</strong> {appointment.status}
        </p>
        <p>
          <strong>Notlar:</strong> {appointment.notes}
        </p>
        <p>
          <strong>Telefon:</strong> {appointment.phone}
        </p>
      </CardContent>
      <CardFooter>
        {appointment.status == "confirmed" && (
          <Button
            onClick={() => {
              UpdateAsCompleted(appointment._id);
            }}
            variant="outline"
            className="w-full"
          >
            Tamamlandı
          </Button>
        )}
        {appointment.status == "pending" && (
          <AlertDialog>
            <AlertDialogTrigger className="rounded-md p-2 border bg-transparent w-full mt-auto">
              Ödeme Oluştur
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Emin misin?</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <div>
                    <Label className="text-xs">Toplam Tutar</Label>
                    <Input
                      type="number"
                      placeholder="Toplam Tutar"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Ödeme Türü</Label>
                    <Select
                      value={paymentMethod}
                      onValueChange={(value) =>
                        setPaymentMethod(value as PaymentMethodType)
                      }
                    >
                      <SelectTrigger id="role">
                        <span>
                          {paymentMethod === "cash" ? "Nakit" : "Kart"}
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Nakit</SelectItem>
                        <SelectItem value="credit_card">Kredi Kartı</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    UpdateAsConfirmed(appointment._id);
                  }}
                >
                  Evet
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          //   <Button
          //     onClick={() => {
          //       UpdateAsConfirmed(appointment._id);
          //     }}
          //     variant="outline"
          //     className="w-full"
          //   >
          //     Ödeme Oluştur
          //   </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdminAppointment;
