"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { ApiDeleteService, ApiServices } from "@/services/servicesService";
import { ServiceType } from "@/types/servicesServiceTypes";
import { formatDate } from "@/utils/formatDate";

const ServiceList: React.FC = () => {
  const router = useRouter();
  const [services, setServices] = useState<ServiceType[]>([]);

  const GetServices = async () => {
    await ApiServices()
      .then((res) => {
        const sortedServices = res.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setServices(sortedServices);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetServices();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/tum-servisler/${id}`);
  };

  const handleDelete = async (id: string) => {
    await ApiDeleteService(id)
      .then(() => {
        toast.success("Hizmet başarıyla silindi");
        GetServices();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
      {services.map((service) => (
        <Card key={service._id} className="flex flex-col justify-start h-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {service.name}
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(service._id)}
                >
                  <FaRegEdit />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(service._id)}
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Oluşturma Tarihi: {formatDate(service.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Süre:</strong> {service.duration} dakika
            </p>
            <p>
              <strong>Fiyat:</strong> {service.price} TL
            </p>
            {service.description && (
              <p>
                <strong>Açıklama:</strong> {service.description}
              </p>
            )}
            <p>
              <strong>Tip:</strong>{" "}
              {service.serviceType === "main" ? "Ana Hizmet" : "Ek Hizmet"}
            </p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button
              onClick={() => handleEdit(service._id)}
              variant="outline"
              className="w-full"
            >
              Düzenle
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServiceList;
