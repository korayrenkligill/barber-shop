"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";

import { Button } from "@/components/ui/button";
import { AppointmentsResp } from "@/types/appointmentServiceTypes";
import { GetAllAppointments } from "@/services/appointmentService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import AdminAppointment from "@/components/AdminAppointment";

const AppointmentsGrid: React.FC = () => {
  const [appointments, setAppointments] = React.useState<AppointmentsResp[]>(
    []
  );
  const [date, setDate] = React.useState<Date>();

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
          <AdminAppointment
            key={appointment._id}
            appointment={appointment}
            GetAppointments={GetAppointments}
          />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsGrid;
