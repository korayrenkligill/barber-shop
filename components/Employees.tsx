"use client";

import React, { useEffect } from "react";
import Worker from "./Worker";
import { ApiStaff } from "@/services/userService";
import { UserType } from "@/types/globalTypes";
import { Skeleton } from "./ui/skeleton";

export type WorkerType = {
  name: string;
  surname: string;
  resume: string;
  image: string;
  phone?: string;
  instagram?: string;
};

const Employees = () => {
  const [employees, setEmployees] = React.useState<UserType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const GetEmployees = async () => {
    await ApiStaff()
      .then((res) => {
        setEmployees(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetEmployees();
  }, []);
  return (
    <div className="container mx-auto px-2 py-16">
      <div className="flex flex-col gap-2">
        {loading ? (
          <Skeleton className="h-64 rounded-xl" />
        ) : (
          employees.map((employee, i) => {
            return <Worker key={i} worker={employee} />;
          })
        )}
      </div>
    </div>
  );
};

export default Employees;
