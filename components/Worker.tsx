import React from "react";
import { FaPhone } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { WorkerType } from "./Employees";

type Props = {
  worker: WorkerType;
};

const Worker = ({ worker }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 border rounded-xl shadow-md">
      <img
        src={worker.image}
        alt={`${worker.name} ${worker.surname}`}
        className="max-w-64 md:max-w-96 w-full h-auto max-h-64 object-cover object-center rounded-xl"
      />
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-semibold">{`${worker.name} ${worker.surname}`}</p>
          <div className="flex items-center gap-2">
            {worker.phone && (
              <a
                href={`tel:${worker.phone}`}
                className="w-[40px] h-[40px] flex items-center justify-center text-sm rounded-sm dark:bg-yellow-900/40 bg-yellow-900/80 text-yellow-500"
              >
                <FaPhone />
              </a>
            )}
            {worker.instagram && (
              <a
                href={worker.instagram}
                target="_blank"
                className="w-[40px] h-[40px] flex items-center justify-center text-sm rounded-sm dark:bg-yellow-900/40 bg-yellow-900/80 text-yellow-500"
              >
                <BiLogoInstagramAlt />
              </a>
            )}
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">{worker.resume}</p>
      </div>
    </div>
  );
};

export default Worker;
