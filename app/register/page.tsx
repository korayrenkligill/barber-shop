"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-2 pt-4">
      <form
        action=""
        className="max-w-[400px] w-full mx-auto flex flex-col items-center justify-center gap-2"
      >
        <h1 className="text-2xl font-semibold">Kayıt Ol</h1>
        <Input type="text" placeholder="İsim" />
        <Input type="text" placeholder="Telefon" />
        <Input type="email" placeholder="E-posta" />
        <Input type="password" placeholder="Şifre" />
        <Button type="submit" className="w-full">
          Kayıt Ol
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/login")}
        >
          Giriş Yap
        </Button>
      </form>
    </div>
  );
};

export default page;
