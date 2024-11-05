"use client";

import React from "react";
import AdditionalService from "./AdditionalService";
import { ServiceType } from "@/types/servicesServiceTypes";

type Props = {
  services: ServiceType[];
};

const AdditionalServices = ({ services }: Props) => {
  if (services.length === 0) return <></>;
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 container mx-auto p-4 gap-2">
        {services.map((additionalService: ServiceType, index) => (
          <AdditionalService key={index} service={additionalService} />
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;
