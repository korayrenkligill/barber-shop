import AdditionalServices from "@/components/AdditionalServices";
import Contact from "@/components/Contact";
import Employees from "@/components/Employees";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import * as React from "react";
export default function Home() {
  return (
    <div>
      <Services />
      <AdditionalServices />
      <Employees />
      <Gallery />
      <Contact />
    </div>
  );
}
