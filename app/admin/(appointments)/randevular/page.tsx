"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AppointmentsResp,
  AppointmentStatusType,
} from "@/types/appointmentServiceTypes";
import {
  ApiUpdateAppointment,
  GetAllAppointments,
} from "@/services/appointmentService";
import { formatDate } from "@/utils/formatDate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ApiUpdatePayment } from "@/services/paymentsService";
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

const AppointmentsGrid: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = React.useState<AppointmentsResp[]>(
    []
  );
  const [date, setDate] = React.useState<Date>();

  const UpdateAsCompleted = async (id: string) => {
    await ApiUpdateAppointment(id, {
      status: "completed",
    }).then((res) => {
      // TODO: Payment update
      toast.success("Randevu tamamlandı olarak işaretlendi");
      GetAppointments();
    });
  };

  const GetAppointments = async () => {
    await GetAllAppointments()
      .then((res) => {
        const sortedAppointments = res.sort(
          (a, b) =>
            new Date(b.appointmentDate).getTime() -
            new Date(a.appointmentDate).getTime()
        );
        setAppointments(sortedAppointments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetAppointments();
  }, []);

  const filteredAppointments = date
    ? appointments.filter((appointment) =>
        isSameDay(new Date(appointment.appointmentDate), date)
      )
    : appointments;

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Tarih</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
        {filteredAppointments.map((appointment) => (
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
                  onClick={() =>
                    router.push(`/admin/randevular/${appointment._id}`)
                  }
                >
                  <FaRegEdit />
                </Button>
              </CardTitle>
              <CardDescription>
                {formatDate(appointment.appointmentDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Hizmet:</strong>{" "}
                {appointment.serviceId
                  .map((service) => service.name)
                  .join(", ")}
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
            {appointment.status !== "completed" && (
              <CardFooter>
                <Button
                  onClick={() => {
                    UpdateAsCompleted(appointment._id);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Tamamlandı
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsGrid;
