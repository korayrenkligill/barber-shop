"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ApiRegister } from "@/services/authService";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      e.currentTarget.password.value !== e.currentTarget.passwordAgain.value
    ) {
      toast.warn("Sifreler aynı olmalıdır");
      return;
    }
    await ApiRegister({
      name: e.currentTarget._name.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      phone: e.currentTarget.phone.value,
    })
      .then(() => {
        toast.success("Kayıt olundu. Lütfen giris yapın");
        router.push("/login");
      })
      .catch((err: any) => {
        if (err?.response?.data?.message)
          toast.error(err.response.data.message);
        else toast.error("Kayıt olurken bir hata oluştu");
      });
  };
  return (
    <div className="container mx-auto px-2 pt-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] w-full mx-auto flex flex-col items-center justify-center gap-2"
      >
        <h1 className="text-2xl font-semibold">Kayıt Ol</h1>
        <Input type="text" name="_name" placeholder="İsim" />
        <Input type="text" name="phone" placeholder="Telefon" />
        <Input type="email" name="email" placeholder="E-posta" />
        <Input type="password" name="password" placeholder="Şifre" />
        <Input
          type="password"
          name="passwordAgain"
          placeholder="Şifre Tekrar"
        />
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

export default Page;
