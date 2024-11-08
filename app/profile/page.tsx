"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/globalTypes";
import { AppointmentsResp } from "@/types/appointmentServiceTypes";
import {
  ApiUpdateAppointment,
  GetAllAppointments,
} from "@/services/appointmentService";
import { ApiGetProfile, ApiUpdateProfile } from "@/services/userService";
import { formatDate } from "@/utils/formatDate";
import { ApiLogout } from "@/services/authService";
import { userAtom } from "@/data/globalStorage";
import { useSetAtom } from "jotai";

// E-posta kontrolü için regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Telefon numarası kontrolü (Türkiye formatı)
const phoneRegex = /^0[5-9]\d{9}$/;
// İsim Soyisim kontrolü (en az iki kelime)
const nameRegex = /^([A-Za-zÇĞİÖŞÜçğışöü]+\s)+[A-Za-zÇĞİÖŞÜçğışöü]+$/;

const ProfilePage = () => {
  const router = useRouter();
  const setAtomUser = useSetAtom(userAtom);

  const [user, setUser] = useState<UserType | null>(null);
  const [appointments, setAppointments] = useState<AppointmentsResp[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const UpdateAsCanceled = async (id: string) => {
    try {
      await ApiUpdateAppointment(id, {
        status: "canceled",
      });
      toast.success("Randevu iptal edildi");
      fetchAppointments();
    } catch (err) {
      toast.error("Randevu iptal edilemedi");
    }
  };

  const GetUser = async () => {
    await ApiGetProfile().then((res) => {
      setUser(res);
      setFormData({
        name: res?.name || "",
        email: res?.email || "",
        phone: res?.phone || "",
      });
    });
  };

  useEffect(() => {
    GetUser();
  }, []);

  // Randevuları API'den çek
  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const resp = await GetAllAppointments();

      // Randevuları `createdAt` alanına göre en yeniden eskiye sıralama
      const sortedAppointments = resp.sort(
        (a: AppointmentsResp, b: AppointmentsResp) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Kullanıcıya ait randevuları filtreleme
      const userAppointments = sortedAppointments.filter(
        (appointment: AppointmentsResp) =>
          appointment?.customerId._id === user?._id
      );

      setAppointments(userAppointments);
    } catch (err) {
      toast.error("Randevular yüklenirken bir hata oluştu");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Profil güncelleme işlemi
  const handleUpdateProfile = async () => {
    const { name, email, phone } = formData;

    // Validasyon kontrolleri
    if (!nameRegex.test(name)) {
      toast.warn("Lütfen geçerli bir isim ve soyisim girin.");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.warn("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.warn("Lütfen geçerli bir telefon numarası girin.");
      return;
    }

    try {
      await ApiUpdateProfile({ name, email, phone });
      toast.success("Profil başarıyla güncellendi");
      setEditMode(false);
      setUser({ ...user, ...formData } as UserType);
    } catch (err) {
      toast.error("Profil güncellenirken bir hata oluştu");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Profilim</h1>

      {/* Profil Bilgileri */}
      <div className="border p-4 rounded mb-6">
        {!editMode ? (
          <>
            <p>
              <strong>İsim:</strong> {user?.name}
            </p>
            <p>
              <strong>E-posta:</strong> {user?.email || "Belirtilmemiş"}
            </p>
            <p>
              <strong>Telefon:</strong> {user?.phone || "Belirtilmemiş"}
            </p>
            <Button onClick={() => setEditMode(true)} className="mt-4">
              Profili Düzenle
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="İsim Soyisim"
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-posta"
            />
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Telefon"
            />
            <div className="flex gap-2">
              <Button onClick={handleUpdateProfile}>Kaydet</Button>
              <Button variant="ghost" onClick={() => setEditMode(false)}>
                İptal
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Kullanıcıya Ait Randevular */}
      <h2 className="text-xl font-semibold mb-4">Randevularım</h2>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className={`${
                (appointment.status === "canceled" ||
                  appointment.status === "completed") &&
                "opacity-40"
              } border p-4 rounded`}
            >
              <p>
                <strong>Randevu Tarihi:</strong>{" "}
                {formatDate(appointment.appointmentDate)}
              </p>
              <p>
                <strong>Hizmetler:</strong>{" "}
                {appointment.serviceId
                  .map((service) => service.name)
                  .join(", ")}
              </p>
              <p>
                <strong>Notlar:</strong> {appointment.notes || "Belirtilmemiş"}
              </p>
              <p>
                <strong>Durum:</strong> {appointment.status}
              </p>
              {appointment.status !== "completed" &&
                appointment.status !== "canceled" && (
                  <Button
                    variant="secondary"
                    className="mt-2"
                    onClick={() => UpdateAsCanceled(appointment._id)}
                  >
                    İptal Et
                  </Button>
                )}
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz bir randevunuz yok.</p>
      )}

      {/* Çıkış Yap Butonu */}
      <Button
        className="mt-4"
        onClick={async () => {
          await ApiLogout().then(() => {
            localStorage.removeItem("AccessToken");
            setAtomUser(null);
            router.push("/");
          });
        }}
      >
        Çıkış Yap
      </Button>
    </div>
  );
};

export default ProfilePage;
