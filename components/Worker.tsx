import React from "react";
import { FaPhone } from "react-icons/fa";
import { UserType } from "@/types/globalTypes";
import { Skeleton } from "./ui/skeleton";

type Props = {
  worker: UserType;
};

const Worker = ({ worker }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 border rounded-xl shadow-md">
      {
        //TODO : Add image
      }
      <img
        src={"https://placehold.co/400x600"}
        alt={`${worker.name}`}
        className="max-w-64 md:max-w-96 w-full h-auto max-h-64 object-cover object-center rounded-xl"
      />
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl font-semibold">{`${worker.name}`}</p>
          <div className="flex items-center gap-2">
            {worker.phone && (
              <a
                href={`tel:${worker.phone}`}
                className="w-[40px] h-[40px] flex items-center justify-center text-sm rounded-sm dark:bg-yellow-900/40 bg-yellow-900/80 text-yellow-500"
              >
                <FaPhone />
              </a>
            )}
            {/* {worker.instagram && (
              <a
                href={worker.instagram}
                target="_blank"
                className="w-[40px] h-[40px] flex items-center justify-center text-sm rounded-sm dark:bg-yellow-900/40 bg-yellow-900/80 text-yellow-500"
              >
                <BiLogoInstagramAlt />
              </a>
            )} */}
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">
          "Yetenekli ve deneyimli berber ekibimizle sizlere en iyi hizmeti
          sunmaktan gurur duyuyoruz. Her bir ekibimiz üyesi, bireysel tarzınızı
          ve ihtiyaçlarınızı anlamak için titizlikle çalışır ve size özel kesim,
          bakım ve stil önerileri sunar. Modern trendleri takip eden ve klasik
          tekniklerle harmanlayan ekibimiz, her ziyaretinizde memnuniyetinizi
          garanti eder. Kendinizi profesyonel ellerde hissetmeniz ve rahat bir
          deneyim yaşamanız için buradayız."
        </p>
      </div>
    </div>
  );
};

export default Worker;
