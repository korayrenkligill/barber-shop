"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ApiLogin } from "@/services/authService";
import { useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { userAtom } from "@/data/globalStorage";
import { ApiGetProfile } from "@/services/userService";

const Page = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await ApiLogin({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });
      if (resp.user) {
        localStorage.setItem("AccessToken", resp.user.token);
        toast.success("Başarıyla giriş yaptınız!");
        await ApiGetProfile().then((res) => setUser(res));
        if (resp.user.role === "staff") router.push("/admin");
        else router.push("/");
      }
    } catch (error) {
      toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mx-auto px-2 pt-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] w-full mx-auto flex flex-col items-center justify-center gap-2"
      >
        <h1 className="text-2xl font-semibold">Giriş Yap</h1>
        {
          //TODO add email validation
        }
        <Input type="text" name="email" placeholder="E-posta" />
        <Input type="password" name="password" placeholder="Şifre" />
        <Button type="submit" className="w-full">
          Giriş Yap
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/register")}
        >
          Kayıt Ol
        </Button>
      </form>
    </div>
  );
};

export default Page;
