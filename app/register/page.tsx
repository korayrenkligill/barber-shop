"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ApiRegister } from "@/services/authService";
import { toast } from "react-toastify";

// E-posta kontrolü için regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Telefon numarası kontrolü (Türkiye formatı)
const phoneRegex = /^0[5-9]\d{9}$/;
// İsim Soyisim kontrolü (en az iki kelime)
const nameRegex = /^([A-Za-zÇĞİÖŞÜçğışöü]+\s)+[A-Za-zÇĞİÖŞÜçğışöü]+$/;

const Page = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form verilerini al
    const name = e.currentTarget._name.value.trim();
    const phone = e.currentTarget.phone.value.trim();
    const email = e.currentTarget.email.value.trim();
    const password = e.currentTarget.password.value;
    const passwordAgain = e.currentTarget.passwordAgain.value;

    // İsim Soyisim kontrolü
    if (!nameRegex.test(name)) {
      toast.warn("Lütfen geçerli bir isim ve soyisim girin.");
      return;
    }

    // Telefon numarası kontrolü
    if (!phoneRegex.test(phone)) {
      toast.warn("Lütfen geçerli bir telefon numarası girin.");
      return;
    }

    // E-posta kontrolü
    if (!emailRegex.test(email)) {
      toast.warn("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    // Şifrelerin eşleştiğini kontrol et
    if (password !== passwordAgain) {
      toast.warn("Şifreler aynı olmalıdır.");
      return;
    }

    // API'ye kayıt isteği gönder
    await ApiRegister({ name, email, password, phone })
      .then(() => {
        toast.success("Kayıt olundu. Lütfen giriş yapın.");
        router.push("/login");
      })
      .catch((err: any) => {
        if (err?.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Kayıt olurken bir hata oluştu.");
        }
      });
  };

  return (
    <div className="container mx-auto px-2 pt-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] w-full mx-auto flex flex-col items-center justify-center gap-2"
      >
        <h1 className="text-2xl font-semibold">Kayıt Ol</h1>
        <Input type="text" name="_name" placeholder="İsim Soyisim" />
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
