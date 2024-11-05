import { ServiceType } from "@/types/servicesServiceTypes";
import React from "react";
import { LuBookmarkPlus } from "react-icons/lu";
type Props = {
  service: ServiceType;
};

const AdditionalService = ({ service }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-4 dark:bg-zinc-950/20 bg-zinc-950/5 rounded-xl">
      <div className="flex gap-2">
        <div className="w-[20px] h-[20px] flex items-center justify-center text-sm rounded-sm dark:bg-yellow-900/40 bg-yellow-900/80 text-yellow-500">
          <LuBookmarkPlus />
        </div>
        <p className="border-b border-yellow-900/40 w-full font-semibold">
          {service.name}
        </p>
      </div>
      <div className="text-black/70 dark:text-white/70">
        {service?.description ?? ""}
      </div>
    </div>
  );
};

export default AdditionalService;
