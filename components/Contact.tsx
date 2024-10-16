import React from "react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="container mx-auto px-2 py-16 flex flex-col items-center justify-center gap-4">
      <div>
        <h2 className="text-3xl font-semibold text-center">Konum & İletişim</h2>
        <p className="text-center text-zinc-400 dark:text-zinc-600">
          Profesyonel saç kesimi, sakal tıraşı ve kişisel bakım hizmetlerimizle
          size en iyi deneyimi sunuyoruz.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">Çalışma Saatleri</h3>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Pazartesi - Cumartesi: 12:00 - 22:00
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">
          Telefon Numaraları
        </h3>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          +90 555 555 55 55
        </p>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          +90 555 555 55 55
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">Adres</h3>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
          eligendi?
        </p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192.62378931640555!2d29.987722992026324!3d39.424562487854786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c9476382a376e9%3A0x7c68ec2407b9735f!2sColombia%20Coffee%20K%C3%BCtahya!5e0!3m2!1str!2str!4v1728309709781!5m2!1str!2str"
        style={{ border: "0" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[400px] rounded-xl shadow-md"
      ></iframe>
    </div>
  );
};

export default Contact;
