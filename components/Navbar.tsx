"use client";
import React, { useEffect, useState } from "react";
import NavLink from "./customUi/NavLink";
import { UserType } from "@/types/globalTypes";
import { ApiGetProfile } from "@/services/userService";
import { useAtom } from "jotai";
import { userAtom } from "@/data/globalStorage";

const Navbar = () => {
  const [user, setUser] = useAtom<UserType | null>(userAtom);

  const GetProfile = async () => {
    await ApiGetProfile().then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) GetProfile();
  }, []);
  return (
    <div className="absolute bottom-0 left-0 w-full flex flex-wrap items-center justify-center bg-stone-800/50 p-2 gap-2">
      <NavLink
        href="/"
        className="px-2 md:px-3 py-2"
        activeClassName="text-zinc-50"
        nonActiveClassName="text-zinc-400/60"
      >
        Ana Sayfa
      </NavLink>
      <NavLink
        href="/hakkimizda"
        className="px-2 md:px-3 py-2"
        activeClassName="text-zinc-50"
        nonActiveClassName="text-zinc-400/60"
      >
        Hakkımızda
      </NavLink>
      <NavLink
        href="/galeri"
        className="px-2 md:px-3 py-2"
        activeClassName="text-zinc-50"
        nonActiveClassName="text-zinc-400/60"
      >
        Galeri
      </NavLink>
      <NavLink
        href="/iletisim"
        className="px-2 md:px-3 py-2"
        activeClassName="text-zinc-50"
        nonActiveClassName="text-zinc-400/60"
      >
        İletişim
      </NavLink>
      {user ? (
        user.isAdmin ? (
          <NavLink
            href="/admin"
            className="px-2 md:px-3 py-2"
            activeClassName="text-zinc-50"
            nonActiveClassName="text-zinc-400/60"
          >
            Admin
          </NavLink>
        ) : (
          <NavLink
            href="/profile"
            className="px-2 md:px-3 py-2"
            activeClassName="text-zinc-50"
            nonActiveClassName="text-zinc-400/60"
          >
            Profil
          </NavLink>
        )
      ) : (
        <NavLink
          href="/login"
          className="px-2 md:px-3 py-2 text-white rounded-full"
          activeClassName="bg-yellow-950"
          nonActiveClassName="bg-yellow-950/50"
        >
          Giriş Yap
        </NavLink>
      )}
    </div>
  );
};

export default Navbar;
