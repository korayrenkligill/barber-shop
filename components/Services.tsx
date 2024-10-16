"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import services from "@/data/ourServices.json";

export default function Services() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-8 bg-zinc-100 dark:bg-zinc-900">
      <h2 className="text-3xl">Servislerimiz</h2>
      <p className="text-center text-zinc-400 dark:text-zinc-600">
        Profesyonel saç kesimi, sakal tıraşı ve kişisel bakım hizmetlerimizle
        size en iyi deneyimi sunuyoruz.
      </p>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full container px-2"
      >
        <CarouselContent className="-ml-1">
          {services.map((service) => (
            <CarouselItem
              key={service.id}
              className="pl-1 md:basis-1/2 lg:basis-1/3 2xl:basis-1/5"
            >
              <div
                className="flex flex-col justify-end min-h-[300px] bg-zinc-950/10 rounded-xl select-none"
                style={{
                  backgroundImage: `url(${service.resim})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* <img
                  className="w-full max-h-[200px] rounded-xl"
                  src={service.resim}
                  alt={service.title}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    overflow: "hidden",
                  }}
                /> */}
                <div className="bg-black/60 p-2 text-white">
                  <h3 className="text-xl font-semibold text-center mt-2">
                    {service.title}
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
