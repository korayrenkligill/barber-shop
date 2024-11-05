"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiGetProfile } from "@/services/userService";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  const GetProfile = async () => {
    await ApiGetProfile()
      .then((res) => {
        if (!res.isAdmin) router.push("/login");
        else setLoading(false);
      })
      .catch((err) => router.push("/login"));
  };

  React.useEffect(() => {
    GetProfile();
  }, [router]);

  if (loading) return <></>;
  return <>{children}</>;
};

export default AuthGuard;
