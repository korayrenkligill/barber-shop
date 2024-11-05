"use client";

import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    {
      title: "İstatistikler",
      items: [
        { name: "Tüm Ödemeler", path: "/admin" },
        { name: "Aylık Gelir", path: "/admin/1" },
      ],
    },
    {
      title: "Randevu İşlemleri",
      items: [
        { name: "Randevuları Listele", path: "/admin/2" },
        { name: "Randevu Oluştur", path: "/admin/2" },
      ],
    },
    {
      title: "Servisler",
      items: [
        { name: "Servisleri Listele", path: "/admin/2" },
        { name: "Servis Oluştur", path: "/admin/2" },
      ],
    },
    {
      title: "Kullanıcılar",
      items: [{ name: "Kullanıcıları Listele", path: "/admin/2" }],
    },
    {
      title: "Ayarlar",
      items: [{ name: "Sayfa Ayarları", path: "/admin/2" }],
    },
  ];

  return (
    <div>
      {/* Toggle button */}
      <button
        className="block md:hidden p-2 bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Kapat" : "Menü"}
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
                  router.push(item.path);
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
