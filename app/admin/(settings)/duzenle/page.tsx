"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiGetSettings, ApiUpdateSetting } from "@/services/settingsService";
import { toast } from "react-toastify";
import { OpeningHours, Settings } from "@/types/settingsServiceTypes";

const EditSettingsPage: React.FC = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [openingHours, setOpeningHours] = useState<{
    monday: OpeningHours;
    tuesday: OpeningHours;
    wednesday: OpeningHours;
    thursday: OpeningHours;
    friday: OpeningHours;
    saturday: OpeningHours;
    sunday: OpeningHours;
  }>({
    monday: { open: "", close: "", closed: false },
    tuesday: { open: "", close: "", closed: false },
    wednesday: { open: "", close: "", closed: false },
    thursday: { open: "", close: "", closed: false },
    friday: { open: "", close: "", closed: false },
    saturday: { open: "", close: "", closed: false },
    sunday: { open: "", close: "", closed: true },
  });
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const fetchSettings = async () => {
    try {
      const response = await ApiGetSettings();
      if (response.length > 0) {
        const setting = response[0];
        setId(setting._id);
        setBusinessName(setting.businessName);
        setAddress(setting.address);
        setEmail(setting.email);
        setPhone(setting.phone);
        setOpeningHours(setting.openingHours);
        setSocialMedia(setting.socialMedia || {});
      } else {
        router.push("/admin/ayar-olustur");
      }
    } catch (error) {
      console.error("Ayarlar alınırken bir hata oluştu:", error);
      toast.error("Ayarlar alınırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUpdateSettings = async () => {
    if (!businessName || !address || !email || !phone) {
      toast.error("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    const updatedSettings: Settings = {
      businessName,
      address,
      email,
      phone,
      openingHours,
      socialMedia,
    };

    try {
      await ApiUpdateSetting(id, updatedSettings);
      toast.success("Ayarlar başarıyla güncellendi");
      router.push("/admin/ayarlar");
    } catch (error) {
      console.error("Ayarlar güncellenirken bir hata oluştu:", error);
      toast.error("Ayarlar güncellenirken bir hata oluştu.");
    }
  };

  const handleOpeningHoursChange = (
    day: keyof typeof openingHours,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  // Günleri Türkçe olarak tanımlıyoruz
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
      <h1 className="text-2xl font-semibold mb-4">Ayarları Düzenle</h1>

      <Label htmlFor="businessName">İşletme Adı</Label>
      <Input
        id="businessName"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        required
      />

      <Label htmlFor="address" className="mt-4">
        Adres
      </Label>
      <Input
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <Label htmlFor="email" className="mt-4">
        E-posta
      </Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Label htmlFor="phone" className="mt-4">
        Telefon
      </Label>
      <Input
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <h2 className="text-xl font-semibold mt-4">Açılış Saatleri</h2>
      {Object.entries(openingHours).map(([day, hours]) => (
        <div key={day} className="mt-2">
          <Label>{daysInTurkish[day as keyof typeof daysInTurkish]}</Label>
          <div className="flex space-x-2 mt-1">
            <Input
              placeholder="Açılış"
              value={hours.open}
              disabled={hours.closed}
              onChange={(e) =>
                handleOpeningHoursChange(
                  day as keyof typeof openingHours,
                  "open",
                  e.target.value
                )
              }
            />
            <Input
              placeholder="Kapanış"
              value={hours.close}
              disabled={hours.closed}
              onChange={(e) =>
                handleOpeningHoursChange(
                  day as keyof typeof openingHours,
                  "close",
                  e.target.value
                )
              }
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hours.closed || false}
                onChange={(e) =>
                  handleOpeningHoursChange(
                    day as keyof typeof openingHours,
                    "closed",
                    e.target.checked
                  )
                }
              />
              <span>Kapalı</span>
            </label>
          </div>
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-4">Sosyal Medya</h2>
      <Label htmlFor="facebook" className="mt-2">
        Facebook
      </Label>
      <Input
        id="facebook"
        value={socialMedia.facebook}
        onChange={(e) =>
          setSocialMedia((prev) => ({ ...prev, facebook: e.target.value }))
        }
      />

      <Label htmlFor="instagram" className="mt-2">
        Instagram
      </Label>
      <Input
        id="instagram"
        value={socialMedia.instagram}
        onChange={(e) =>
          setSocialMedia((prev) => ({ ...prev, instagram: e.target.value }))
        }
      />

      <Label htmlFor="twitter" className="mt-2">
        Twitter
      </Label>
      <Input
        id="twitter"
        value={socialMedia.twitter}
        onChange={(e) =>
          setSocialMedia((prev) => ({ ...prev, twitter: e.target.value }))
        }
      />

      <Button
        onClick={handleUpdateSettings}
        variant="outline"
        className="w-full mt-6"
      >
        Ayarları Güncelle
      </Button>
    </div>
  );
};

export default EditSettingsPage;
