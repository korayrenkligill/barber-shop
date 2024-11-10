"use client";
import AdditionalServices from "@/components/AdditionalServices";
import Contact from "@/components/Contact";
import Employees from "@/components/Employees";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import { ApiServices } from "@/services/servicesService";
import { ServiceType } from "@/types/servicesServiceTypes";
import * as React from "react";
export default function Home() {
  const [services, setServices] = React.useState<ServiceType[]>([]);
  const [additionalServices, setAdditionalServices] = React.useState<
    ServiceType[]
  >([]);
  const [servicesLoading, setServicesLoading] = React.useState<boolean>(true);
  const GetServices = async () => {
    await ApiServices()
      .then((res) => {
        setAdditionalServices(
          res.filter((item: ServiceType) => item?.serviceType == "additional")
        );
        setServices(
          res.filter((item: ServiceType) => item?.serviceType == "main")
        );
        setServicesLoading(false);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    GetServices();
  }, []);
  return (
    <div>
      <Services services={services} loading={servicesLoading} />
      <AdditionalServices
        services={additionalServices}
        loading={servicesLoading}
      />
      <Employees />
      <Gallery />
      <Contact />
    </div>
  );
}
