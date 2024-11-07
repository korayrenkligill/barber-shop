"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
import { ApiGetProfile, ApiStaff } from "@/services/userService";
import { UserType } from "@/types/globalTypes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ApiCreateAppointment,
  GetAllAppointments,
} from "@/services/appointmentService";
import { toast } from "react-toastify";
import { ApiServices } from "@/services/servicesService";
import { ServiceType } from "@/types/servicesServiceTypes";
import Divider from "@/components/Divider";
import { AppointmentsResp } from "@/types/appointmentServiceTypes";
import { ApiCreatePayment } from "@/services/paymentsService";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [date, setDate] = React.useState<Date>();
  const timeSlots = generateTimeSlots("10:00", "22:00", 45);
  const [selectedSlots, setSelectedSlots] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [user, setUser] = useState<UserType | null>(null);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [staff, setStaff] = useState<UserType[] | null>([]);
  const [appointments, setAppointments] = useState<AppointmentsResp[]>([]);

  const handleServicesChange = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((_id) => _id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const isTimeSlotDisabled = (timeSlot: string) => {
    const startTime = timeSlot.split(" - ")[0];
    const [timeHour, timeMinute] = startTime.split(":").map(Number);
    return appointments.some((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      appointmentDate.setHours(appointmentDate.getHours() - 3);
      return (
        date &&
        appointmentDate.toDateString() === date.toDateString() &&
        appointmentDate.getHours() === timeHour &&
        appointmentDate.getMinutes() === timeMinute &&
        appointment.staffId._id === selectedStaff
      );
    });
  };

  const handleSubmit = async () => {
    if (!selectedStaff) {
      toast.error("Randevu olusturabilmek icin bir kuaför secmelisiniz");
      return;
    }
    if (!selectedServices.length) {
      toast.error("Randevu olusturabilmek icin en az bir hizmet secmelisiniz");
      return;
    }
    if (!name || !phone) {
      toast.error("Ad ve telefon bilgilerini doldurunuz");
      return;
    }
    if (!date || !selectedSlots) {
      toast.error("Tarih ve saat bilgilerini doldurunuz");
      return;
    }
    const selectedDate = date;
    const startTime = selectedSlots.split(" - ")[0]; // "13:00"
    const [hours, minutes] = startTime.split(":").map(Number);
    console.log(hours, minutes);
    selectedDate.setHours(hours, minutes, 0, 0);
    const localISOTime = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    ).toISOString();
    await ApiCreateAppointment({
      ...(user?._id && { customerId: user._id }),
      staffId: selectedStaff ?? "",
      serviceId: selectedServices ?? [],
      name: name ?? "",
      phone: phone ?? "",
      appointmentDate: localISOTime,
      ...(note && { notes: note }),
      status: "pending",
    }).then((res) => {
      toast.success("Randevu olusturuldu");
      router.push("/");
      // const totalPrice = services
      //   .filter((service) => res.serviceId.includes(service._id))
      //   .reduce((total, service) => total + service.price, 0);

      // AddPayment(res._id, totalPrice);
    });
  };

  const GetProfile = async () => {
    await ApiGetProfile().then((res) => {
      setUser(res);
      setName(res.name);
      setPhone(res.phone);
    });
  };

  const GetServices = async () => {
    await ApiServices().then((res) => setServices(res));
  };

  const GetStaff = async () => {
    await ApiStaff().then((res) => setStaff(res));
  };

  const GetAppointments = async () => {
    await GetAllAppointments().then((res) => setAppointments(res));
  };

  React.useEffect(() => {
    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);
    setSelectedSlots("");
    if (date && AppointmentDateComparison(date, dateNow)) {
      console.log("büyük");
    } else {
      setDate(undefined);
    }
  }, [date]);
  React.useEffect(() => {
    setSelectedSlots("");
  }, [selectedStaff]);

  React.useEffect(() => {
    if (localStorage.getItem("AccessToken")) GetProfile();
    GetServices();
    GetStaff();
    GetAppointments();
  }, []);
  return (
    <div className="container mx-auto px-2 py-8">
      <header className="text-center">
        <h1 className="text-3xl font-semibold">Randevu Al</h1>
        <p className="text-zinc-400">
          Size uygun hizmeti ve zamanı seçerek randevunuzu kolayca oluşturun.
          Bilgilerinizi doldurun ve en iyi deneyim için randevunuzu hemen
          ayırtın.
        </p>
      </header>
      <div className="grid gap-2 py-4">
        <div className="flex flex-col gap-2">
          <Divider text="Kuaför" />
          <RadioGroup
            value={selectedStaff}
            onValueChange={(e) => setSelectedStaff(e)}
          >
            {staff.map((staf, index) => (
              <Label
                key={index}
                htmlFor={`id-${staf._id}`}
                className={`flex flex-col justify-end rounded-sm select-none cursor-pointer transition-all ${
                  selectedStaff == staf._id
                    ? "bg-teal-500/70 shadow-[0_0_20px_5px_rgba(20,184,166,0.3)]"
                    : "bg-zinc-400/20 hover:bg-zinc-400/40"
                }`}
              >
                <RadioGroupItem
                  key={staf._id}
                  id={`id-${staf._id}`}
                  value={staf._id}
                  checked={selectedStaff === staf._id}
                  className="cursor-pointer hidden"
                />

                <div className="p-2 text-zinc-950 dark:text-zinc-50 font-semibold text-center flex items-center justify-center gap-2">
                  {staf.name}
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>
        <Divider text="İstenilen Hizmetler" />
        <div className="flex justify-center flex-wrap gap-2">
          {services.map((service, index) => (
            <Label
              key={index}
              htmlFor={`id-${service._id}`}
              className={`flex flex-col justify-end border rounded-xl select-none cursor-pointer ${
                selectedServices.includes(service._id) && "border-teal-500"
              }`}
            >
              <Checkbox
                key={service._id}
                id={`id-${service._id}`}
                checked={selectedServices.includes(service._id)}
                onCheckedChange={() => handleServicesChange(service._id)}
                className="hidden"
              />

              <div className="p-2 text-zinc-950 dark:text-zinc-50 text-xs font-semibold text-center flex items-center justify-center gap-2">
                {service.name}
                <span className="scale-150">
                  {selectedServices.includes(service._id) ? (
                    <IoClose />
                  ) : (
                    <IoAdd />
                  )}
                </span>
              </div>
            </Label>
          ))}
        </div>
        <Divider text="Randevu Bilgileri" />
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İsim"
          disabled={user ? true : false}
        />
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefon Numarası"
          disabled={user ? true : false}
        />
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
        <RadioGroup onValueChange={(e) => setSelectedSlots(e)}>
          {date && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2">
              {timeSlots.map((timeSlot, index) => (
                <div key={index}>
                  <RadioGroupItem
                    key={timeSlot}
                    id={`id-${timeSlot}`}
                    value={timeSlot}
                    checked={selectedSlots === timeSlot}
                    className="cursor-pointer"
                    disabled={isTimeSlotDisabled(timeSlot)}
                  />
                  <Label
                    htmlFor={`id-${timeSlot}`}
                    className={`ml-2 cursor-pointer ${
                      isTimeSlotDisabled(timeSlot)
                        ? "line-through text-red-500"
                        : ""
                    }`}
                  >
                    {timeSlot}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </RadioGroup>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Not"
          className="resize-none"
          rows={8}
        />

        <Button onClick={handleSubmit} className="w-full">
          Randevu Al
        </Button>
      </div>
    </div>
  );
};

export default Page;
