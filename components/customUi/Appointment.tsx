"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

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
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

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
  const timeSlots = generateTimeSlots("12:00", "22:00");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]); // Seçilen zaman dilimlerini tutacak state
  // Checkbox'ların durumunu değiştiren fonksiyon
  const handleCheckboxChange = (timeSlot: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(timeSlot)) {
        // Zaten seçili ise kaldır
        return prev.filter((slot) => slot !== timeSlot);
      } else {
        // Seçili değilse ekle
        return [...prev, timeSlot];
      }
    });
  };
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
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((timeSlot) => (
              <div>
                <Checkbox
                  key={timeSlot}
                  id="timeSlot"
                  checked={selectedSlots.includes(timeSlot)} // Seçili olup olmadığını kontrol et
                  onChange={() => handleCheckboxChange(timeSlot)} // Değişim olayını yönet
                />
                <Label htmlFor="timeSlot">{timeSlot}</Label>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="name" placeholder="İsim" className="col-span-4" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="phone"
              placeholder="Telefon Numarası"
              className="col-span-4"
            />
          </div>
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
