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
import { RoleType, UserType } from "@/types/globalTypes";
import { ApiGetUser, ApiUpdateUserRole } from "@/services/adminService";

const UserDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState<UserType | null>(null);
  const [role, setRole] = useState<RoleType>("customer"); // Varsayılan rol

  const fetchUser = async () => {
    try {
      const fetchedUser = await ApiGetUser(id as string);
      setUser(fetchedUser);
      setRole(fetchedUser.role); // Mevcut rolü state’e ata
    } catch (err) {
      console.log(err);
      toast.error("Kullanıcı bilgileri alınırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const handleRoleUpdate = async () => {
    try {
      await ApiUpdateUserRole({ userId: id as string, role: role });
      toast.success("Rol başarıyla güncellendi");
      router.push("/admin/kullanicilar");
    } catch (err) {
      console.log(err);
      toast.error("Rol güncellenirken bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Kullanıcı Detayları</h1>

      {user && (
        <>
          <Label htmlFor="name">Adı</Label>
          <Input id="name" value={user.name} readOnly />

          <Label htmlFor="email" className="mt-4">
            Email
          </Label>
          <Input id="email" value={user.email || "Belirtilmemiş"} readOnly />

          <Label htmlFor="phone" className="mt-4">
            Telefon
          </Label>
          <Input id="phone" value={user.phone || "Belirtilmemiş"} readOnly />

          <Label htmlFor="isAdmin" className="mt-4">
            Admin Durumu
          </Label>
          <Input
            id="isAdmin"
            value={user.isAdmin ? "Evet" : "Hayır"}
            readOnly
          />

          <Label htmlFor="createdAt" className="mt-4">
            Oluşturulma Tarihi
          </Label>
          <Input
            id="createdAt"
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Belirtilmemiş"
            }
            readOnly
          />

          <Label htmlFor="role" className="mt-4">
            Rol
          </Label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as RoleType)}
          >
            <SelectTrigger id="role">
              <span>{role === "customer" ? "Kullanıcı" : "Kuaför"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Kullanıcı</SelectItem>
              <SelectItem value="staff">Kuaför</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleRoleUpdate}
            variant="outline"
            className="w-full mt-6"
          >
            Rolü Güncelle
          </Button>
        </>
      )}
    </div>
  );
};

export default UserDetail;
