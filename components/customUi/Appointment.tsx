"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { format, set } from "date-fns";
import { cn } from "@/lib/utils";

import services from "@/data/ourServices.json";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AppointmentDateComparison from "@/utils/dateComparison";
import { Textarea } from "../ui/textarea";

import { IoClose, IoAdd } from "react-icons/io5";

type Props = {};

const generateTimeSlots = (start: string, end: string): string[] => {
  const startHour = parseInt(start.split(":")[0]);
  const endHour = parseInt(end.split(":")[0]);

  const timeSlots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const formattedStart = `${hour.toString().padStart(2, "0")}:00`;
    const formattedEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;
    timeSlots.push(`${formattedStart} - ${formattedEnd}`);
  }

  return timeSlots;
};

const Appointment = (props: Props) => {
  const [appointmentState, setAppointmentState] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const timeSlots = generateTimeSlots("12:00", "22:00");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [note, setNote] = useState<string>("");
  const handleSlotsChange = (timeSlot: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(timeSlot)) {
        return prev.filter((slot) => slot !== timeSlot);
      } else {
        return [...prev, timeSlot];
      }
    });
  };

  const handleServicesChange = (serviceTitle: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceTitle)) {
        return prev.filter((_serviceTitle) => _serviceTitle !== serviceTitle);
      } else {
        return [...prev, serviceTitle];
      }
    });
  };

  React.useEffect(() => {
    const dateNow = new Date();
    setSelectedSlots([]);
    if (date && AppointmentDateComparison(date, dateNow)) {
      console.log("büyük");
    } else {
      setDate(undefined);
    }
  }, [date]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${
            appointmentState ? "hidden" : "flex"
          } items-center justify-center gap-2 bg-teal-500 text-white fixed right-2 bottom-4 px-3 py-2 rounded-full z-[9999] cursor-pointer font-bold`}
        >
          <FaPlus />
          Randevu Al
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[765px]">
        <DialogHeader>
          <DialogTitle>Randevu Al</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            non!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <Label
                htmlFor={`id-${service.id}`}
                className={`flex flex-col justify-end border rounded-xl select-none cursor-pointer ${
                  selectedServices.includes(service.title) && "border-teal-500"
                }`}
              >
                <Checkbox
                  key={service.id}
                  id={`id-${service.id}`}
                  checked={selectedServices.includes(service.title)} // Seçili olup olmadığını kontrol et
                  onCheckedChange={() => handleServicesChange(service.title)} // Değişim olayını yönet
                  className="hidden"
                />

                <div className="p-2 text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
                  {service.title}
                  <span className="scale-150">
                    {selectedServices.includes(service.title) ? (
                      <IoClose />
                    ) : (
                      <IoAdd />
                    )}
                  </span>
                </div>
              </Label>
            ))}
          </div>
          <Input id="name" placeholder="İsim" />
          <Input id="phone" placeholder="Telefon Numarası" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Randevu Günü</span>}
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
          {date && (
            <div className="grid grid-cols-4 gap-2 p-2">
              {timeSlots.map((timeSlot) => (
                <>
                  <Checkbox
                    key={timeSlot}
                    id={`id-${timeSlot}`}
                    checked={selectedSlots.includes(timeSlot)} // Seçili olup olmadığını kontrol et
                    onCheckedChange={() => handleSlotsChange(timeSlot)} // Değişim olayını yönet
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={`id-${timeSlot}`}
                    className="ml-2 cursor-pointer"
                  >
                    {timeSlot}
                  </Label>
                </>
              ))}
            </div>
          )}
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Not"
            className="resize-none"
          />
        </div>
        <DialogFooter>
          <Button type="submit">Randevu Al</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Appointment;

//  <Link
//       href="/randevu-al"
//       className={`${
//         isActive ? "flex items-center justify-center gap-2" : "hidden"
//       } bg-teal-500 text-white fixed right-2 bottom-4 px-3 py-2 rounded-full z-[9999] cursor-pointer font-bold`}
//     >
//       <FaPlus />
//       Randevu Al
//     </Link>
