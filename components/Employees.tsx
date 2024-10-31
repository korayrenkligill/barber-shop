import React from "react";
import Worker from "./Worker";

export type WorkerType = {
  name: string;
  surname: string;
  resume: string;
  image: string;
  phone?: string;
  instagram?: string;
};

const Employees = () => {
  const workers: WorkerType[] = [
    {
      name: "Ali",
      surname: "Yılmaz",
      resume:
        "Deneyimli bir berber olarak, müşterilere profesyonel saç kesimi, sakal tıraşı ve stil danışmanlığı hizmeti sunuyorum. Modern ve klasik saç trendleri konusunda bilgiliyim, müşteri memnuniyetini ön planda tutarak çalışırım. Hızlı ve titiz çalışma prensibimle birlikte hijyen kurallarına tam riayet ederim. Ekip çalışmasına uyumlu olup, müşteri portföyümü sürekli geliştirmekteyim.",
      image:
        "https://live-production.wcms.abc-cdn.net.au/b931d4f5243e8dafbb3e48261599481f?impolicy=wcms_crop_resize&cropH=3024&cropW=4032&xPos=0&yPos=0&width=862&height=647",
      phone: "555-123-4567",
      instagram: "@ali_hairmaster",
    },
    {
      name: "Ayşe",
      surname: "Demir",
      resume:
        "Deneyimli bir berber olarak, müşterilere profesyonel saç kesimi, sakal tıraşı ve stil danışmanlığı hizmeti sunuyorum. Modern ve klasik saç trendleri konusunda bilgiliyim, müşteri memnuniyetini ön planda tutarak çalışırım. Hızlı ve titiz çalışma prensibimle birlikte hijyen kurallarına tam riayet ederim. Ekip çalışmasına uyumlu olup, müşteri portföyümü sürekli geliştirmekteyim.",
      image:
        "https://img.freepik.com/premium-photo/handsome-man-visit-barber-shop_392895-100794.jpg",
      instagram: "@ayse_styles",
    },
  ];
  return (
    <div className="container mx-auto px-2 py-16">
      <div className="flex flex-col gap-2">
        {workers.map((worker, i) => {
          return <Worker key={i} worker={worker} />;
        })}
      </div>
    </div>
  );
};

export default Employees;
