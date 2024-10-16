import React from "react";
import AdditionalService from "./AdditionalService";
import { LuBookmarkPlus } from "react-icons/lu";

type Props = {};

type AdditionalServiceType = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const AdditionalServices = (props: Props) => {
  const additionalServices: AdditionalServiceType[] = [
    {
      icon: <LuBookmarkPlus />,
      title: "Ek Servis",
      description: "Ek Servis kısa metinsel acıklama",
    },
    {
      icon: <LuBookmarkPlus />,
      title: "Ek Servis",
      description: "Ek Servis kısa metinsel acıklama",
    },
    {
      icon: <LuBookmarkPlus />,
      title: "Ek Servis",
      description: "Ek Servis kısa metinsel acıklama",
    },
    {
      icon: <LuBookmarkPlus />,
      title: "Ek Servis",
      description: "Ek Servis kısa metinsel acıklama",
    },
    {
      icon: <LuBookmarkPlus />,
      title: "Ek Servis",
      description: "Ek Servis kısa metinsel acıklama",
    },
    {
      icon: <LuBookmarkPlus />,
      title: "Ek Servis",
      description: "Ek Servis kısa metinsel acıklama",
    },
  ];
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 container mx-auto p-4 gap-2">
        {additionalServices.map((additionalService) => (
          <AdditionalService
            key={additionalService.title}
            icon={additionalService.icon}
            title={additionalService.title}
            description={additionalService.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;
