"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiGetSettings } from "@/services/settingsService";
import { Settings } from "@/types/settingsServiceTypes";
import { Button } from "@/components/ui/button";

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings | null>(null);

  const fetchSettings = async () => {
    try {
      const response = await ApiGetSettings();
      if (response.length === 0) {
        router.push("/admin/ayar-olustur");
      } else {
        setSettings(response[0]);
      }
    } catch (error) {
      console.error("Ayarlar alınırken bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (!settings) {
    return <p>Yükleniyor...</p>;
  }

  // İngilizce gün adlarını Türkçeye çeviren bir nesne
  const daysInTurkish = {
    monday: "Pazartesi",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    thursday: "Perşembe",
    friday: "Cuma",
    saturday: "Cumartesi",
    sunday: "Pazar",
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">İşletme Ayarları</h1>

      <p>
        <strong>İşletme Adı:</strong> {settings.businessName}
      </p>
      <p>
        <strong>Adres:</strong> {settings.address}
      </p>
      <p>
        <strong>E-posta:</strong> {settings.email}
      </p>
      <p>
        <strong>Telefon:</strong> {settings.phone}
      </p>

      <h2 className="text-xl font-semibold mt-4">Açılış Saatleri</h2>
      {Object.entries(settings.openingHours).map(([day, hours]) => (
        <p key={day}>
          <strong>{daysInTurkish[day as keyof typeof daysInTurkish]}:</strong>{" "}
          {hours.closed ? "Kapalı" : `${hours.open} - ${hours.close}`}
        </p>
      ))}

      <h2 className="text-xl font-semibold mt-4">Sosyal Medya</h2>
      <p>
        <strong>Facebook:</strong>{" "}
        {settings.socialMedia?.facebook || "Belirtilmemiş"}
      </p>
      <p>
        <strong>Instagram:</strong>{" "}
        {settings.socialMedia?.instagram || "Belirtilmemiş"}
      </p>
      <p>
        <strong>Twitter:</strong>{" "}
        {settings.socialMedia?.twitter || "Belirtilmemiş"}
      </p>

      <Button
        onClick={() => router.push("/admin/duzenle")}
        variant="outline"
        className="w-full mt-6"
      >
        Ayarları Düzenle
      </Button>
    </div>
  );
};

export default SettingsPage;
