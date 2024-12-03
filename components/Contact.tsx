"use client";
import React, { useEffect, useState } from "react";
import { ApiGetSettings } from "@/services/settingsService";
import { Settings } from "@/types/settingsServiceTypes";
import { Skeleton } from "./ui/skeleton";

const Contact: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  const fetchSettings = async () => {
    try {
      const response = await ApiGetSettings();
      if (response.length > 0) {
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
    return (
      <div className="container mx-auto px-2 py-16 flex flex-col items-center justify-center gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-center">
            Konum & İletişim
          </h2>
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-center">
            Çalışma Saatleri
          </h3>
          <div className="text-center text-zinc-600 dark:text-zinc-400">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-center">
            Telefon Numaraları
          </h3>
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-center">Adres</h3>
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385.2487513625881!2d29.987478311703473!3d39.424350338120334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c949c79318d14d%3A0xde1e1274031c8b09!2sBARBERIA!5e0!3m2!1str!2str!4v1731002902482!5m2!1str!2str"
          style={{ border: "0" }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[400px] rounded-xl shadow-md"
        ></iframe>
      </div>
    );
  }

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
    <div className="container mx-auto px-2 py-16 flex flex-col items-center justify-center gap-4">
      <div>
        <h2 className="text-3xl font-semibold text-center">Konum & İletişim</h2>
        <p className="text-center text-zinc-400 dark:text-zinc-600">
          {settings.businessName} olarak profesyonel hizmetlerimizle size en iyi
          deneyimi sunuyoruz.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">Çalışma Saatleri</h3>
        <div className="text-center text-zinc-600 dark:text-zinc-400">
          {Object.entries(settings.openingHours).map(([day, hours]) => (
            <p key={day}>
              <strong>
                {daysInTurkish[day as keyof typeof daysInTurkish]}:
              </strong>{" "}
              {hours.closed ? "Kapalı" : `${hours.open} - ${hours.close}`}
            </p>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">
          Telefon Numaraları
        </h3>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          {settings.phone}
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">Adres</h3>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          {settings.address}
        </p>
      </div>

      {/* Sosyal Medya Hesapları */}
      {settings.socialMedia.facebook ||
        settings.socialMedia.instagram ||
        (settings.socialMedia.twitter && (
          <div>
            <h3 className="text-2xl font-semibold text-center">Sosyal Medya</h3>
            <div className="flex flex-col items-center gap-2 text-zinc-600 dark:text-zinc-400">
              {settings.socialMedia.facebook && (
                <p>
                  <a
                    href={settings.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Facebook
                  </a>
                </p>
              )}
              {settings.socialMedia.instagram && (
                <p>
                  <a
                    href={settings.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:underline"
                  >
                    Instagram
                  </a>
                </p>
              )}
              {settings.socialMedia.twitter && (
                <p>
                  <a
                    href={settings.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Twitter
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385.2487513625881!2d29.987478311703473!3d39.424350338120334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c949c79318d14d%3A0xde1e1274031c8b09!2sBARBERIA!5e0!3m2!1str!2str!4v1731002902482!5m2!1str!2str"
        style={{ border: "0" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[400px] rounded-xl shadow-md"
      ></iframe>
    </div>
  );
};

export default Contact;
