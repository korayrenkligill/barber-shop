"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { ServiceModelType, ServiceType } from "@/types/servicesServiceTypes";
import { ApiService, ApiUpdateService } from "@/services/servicesService";

const EditService: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const [service, setService] = useState<ServiceType | null>(null);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [serviceType, setServiceType] = useState<ServiceModelType>("main");

  const fetchService = async () => {
    try {
      const fetchedService = await ApiService(id as string);
      setService(fetchedService);
      setName(fetchedService.name);
      setDuration(fetchedService.duration);
      setPrice(fetchedService.price);
      setDescription(fetchedService.description || "");
      setServiceType(fetchedService.serviceType || "main");
    } catch (err) {
      console.log(err);
      toast.error("Hizmet bilgileri alınırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    if (id) fetchService();
    console.log(id);
  }, [id]);

  const handleUpdateService = async () => {
    if (!name || !duration || !price) {
      toast.error("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    try {
      await ApiUpdateService(id as string, {
        name,
        duration: Number(duration),
        price: Number(price),
        description,
        serviceType,
      });
      toast.success("Hizmet başarıyla güncellendi");
      router.push("/admin/tum-servisler");
    } catch (err) {
      console.log(err);
      toast.error("Hizmet güncellenirken bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Hizmeti Düzenle</h1>

      <Label htmlFor="name">Hizmet Adı</Label>
      <Input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Hizmet Adı"
        required
      />

      <Label htmlFor="duration" className="mt-4">
        Süre (dakika)
      </Label>
      <Input
        id="duration"
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        placeholder="Süre"
        required
      />

      <Label htmlFor="price" className="mt-4">
        Fiyat (TL)
      </Label>
      <Input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Fiyat"
        required
      />

      <Label htmlFor="description" className="mt-4">
        Açıklama
      </Label>
      <Input
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Açıklama (isteğe bağlı)"
      />

      <Label htmlFor="serviceType" className="mt-4">
        Hizmet Türü
      </Label>
      <Select
        value={serviceType}
        onValueChange={(value) => setServiceType(value as ServiceModelType)}
      >
        <SelectTrigger id="serviceType">
          <span>{serviceType === "main" ? "Ana Hizmet" : "Ek Hizmet"}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="main">Ana Hizmet</SelectItem>
          <SelectItem value="additional">Ek Hizmet</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleUpdateService}
        variant="outline"
        className="w-full mt-6"
      >
        Hizmeti Güncelle
      </Button>
    </div>
  );
};

export default EditService;
