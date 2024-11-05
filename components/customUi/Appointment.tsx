"use client";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
const Appointment = () => {
  const pathname = usePathname();
  if (pathname === "/randevu-al") return null;
  return (
    <Link
      href="/randevu-al"
      className={`flex items-center justify-center gap-2 bg-teal-500 text-white fixed right-2 bottom-4 px-3 py-2 rounded-full z-[9999] cursor-pointer font-bold`}
    >
      <FaPlus />
      Randevu Al
    </Link>
  );
};

export default Appointment;
