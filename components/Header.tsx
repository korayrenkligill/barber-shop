import React from "react";
import backgroundImage from "../images/headerBackground.png";
import Navbar from "./Navbar";
import AppointmentButton from "./customUi/Appointment";
import ThemeToggle from "./ThemeToggle";

import "../styles/fonts.css";

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
        className={`rye text-3xl md:text-6xl border-t-4 border-b-4 border-dotted border-zinc-50/30 p-10 text-zinc-50`}
      >
        BARBERIA
      </h1>
      <AppointmentButton />
      <Navbar />
    </div>
  );
};

export default Header;
