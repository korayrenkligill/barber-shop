"use client";

import React from "react";
import AdditionalService from "./AdditionalService";
import { ServiceType } from "@/types/servicesServiceTypes";
import { Skeleton } from "./ui/skeleton";

type Props = {
  services: ServiceType[];
  loading?: boolean;
};

const AdditionalServices = ({ services, loading }: Props) => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 container mx-auto p-4 gap-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-4 dark:bg-zinc-950/20 bg-zinc-950/5 rounded-xl h-[89px]"
              >
                <div className="flex gap-2">
                  <Skeleton className="w-[20px] h-[20px] rounded-sm " />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))
          : null}
        {services.map((additionalService: ServiceType, index) => (
          <AdditionalService key={index} service={additionalService} />
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;
