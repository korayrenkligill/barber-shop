"use client";

import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { usePathname, useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { ApiLogout } from "@/services/authService";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { userAtom } from "@/data/globalStorage";

const Sidebar = () => {
  const router = useRouter();

  const setUser = useSetAtom(userAtom);

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      title: "İstatistikler",
      items: [
        { name: "Tüm Ödemeler", path: "/admin" },
        { name: "Aylık Gelir", path: "/admin/aylik-gelir" },
      ],
    },
    {
      title: "Randevu İşlemleri",
      items: [
        { name: "Randevuları Listele", path: "/admin/randevular" },
        { name: "Randevu Oluştur", path: "/admin/randevu-olustur" },
      ],
    },
    {
      title: "Servisler",
      items: [
        { name: "Servisleri Listele", path: "/admin/tum-servisler" },
        { name: "Servis Oluştur", path: "/admin/servis-olustur" },
      ],
    },
    {
      title: "Kullanıcılar",
      items: [{ name: "Kullanıcıları Listele", path: "/admin/kullanicilar" }],
    },
    {
      title: "Ayarlar",
      items: [
        { name: "Sayfa Ayarları", path: "/admin/ayarlar" },
        {
          name: "Çıkış Yap",
          onClick: async () => {
            await ApiLogout().then(() => {
              localStorage.removeItem("AccessToken");
              setUser(null);
              router.push("/");
            });
          },
        },
      ],
    },
  ];

  return (
    <div>
      {/* Toggle button */}
      <button
        className="block fixed bottom-2 left-2 md:relative md:hidden p-3 bg-blue-500 text-white text-xl rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMenu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:w-64 z-[99999]`}
      >
        {menuItems.map((section, index) => (
          <div key={index} className="mb-2">
            <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 ml-2">
              {section.title}
            </h2>
            {section.items.map((item, idx) => (
              <SidebarItem
                key={idx}
                name={item.name}
                isActive={pathname === item.path}
                onClick={() => {
                  if (item.path) router.push(item.path);
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Overlay for closing sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1] bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
