import React from "react";
import NavLink from "./customUi/NavLink";

const Navbar = () => {
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
    </div>
  );
};

export default Navbar;
