"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

import services from "@/data/ourServices.json";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AppointmentDateComparison from "@/utils/dateComparison";

import { IoClose, IoAdd } from "react-icons/io5";
import { generateTimeSlots } from "@/utils/generateTimeSlots";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
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
    <div className="container mx-auto px-2 py-8">
      <header>
        <h1 className="text-3xl font-semibold">Randevu Al</h1>
        <p className="text-zinc-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          non!
        </p>
      </header>
      <div className="grid gap-4 py-4">
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Label
              key={index}
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

              <div className="p-2 text-zinc-950 dark:text-zinc-50 text-xs font-semibold text-center flex items-center justify-center gap-2">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2">
            {timeSlots.map((timeSlot, index) => (
              <div key={index}>
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
              </div>
            ))}
          </div>
        )}
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Not"
          className="resize-none"
          rows={8}
        />
        <Button type="submit" className="w-full">
          Randevu Al
        </Button>
      </div>
    </div>
  );
};

export default Page;
