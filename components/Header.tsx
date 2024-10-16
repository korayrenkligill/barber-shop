import React from "react";
import { Abril_Fatface } from "next/font/google";
import backgroundImage from "../images/headerBackground.png";
import Navbar from "./Navbar";
import AppointmentButton from "./customUi/Appointment";
import ThemeToggle from "./ThemeToggle";

const abrilFatface = Abril_Fatface({
  subsets: ["latin"], // Latin alfabesi için gerekli
  weight: "400", // Font ağırlığı (Abril Fatface sadece 400 ağırlığında mevcuttur)
});

type Props = {};

const Header = (props: Props) => {
  return (
    <div
      className={`min-h-[50vh] flex flex-col items-center justify-center relative`}
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
      }}
    >
      <ThemeToggle />
      <h1 className="text-3xl md:text-4xl mb-5 text-zinc-50">LOGO</h1>
      <h1
        className={`${abrilFatface.className} text-3xl md:text-5xl border-t-4 border-b-4 border-dotted border-zinc-50/30 p-10 text-zinc-50`}
      >
        Barber Name
      </h1>
      <AppointmentButton />
      <Navbar />
    </div>
  );
};

export default Header;
