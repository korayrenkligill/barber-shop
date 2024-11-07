import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Süleyman Ahat | Kaliteli ve Modern Saç Tasarımı - Kütahya",
  description:
    "Süleyman Ahat, şehrinizde profesyonel saç kesimi, bakım ve stil hizmetleri sunar. Modern ve kaliteli hizmet anlayışını deneyimleyin. Hemen randevu alın!",
  keywords: [
    "berber",
    "kuaför",
    "saç kesimi",
    "sakal tıraşı",
    "erkek kuaförü",
    "Kütahya",
    "saç bakımı",
    "erkek berberi",
  ],
  openGraph: {
    title: "Süleyman Ahat | Kaliteli ve Modern Saç Tasarımı - Kütahya",
    description:
      "Süleyman Ahat, profesyonel saç kesimi, bakım ve stil hizmetleri sunar. Modern ve kaliteli hizmet anlayışını deneyimleyin.",
    url: "https://suleymanahat.com",
    type: "website",
    images: [
      {
        url: "/images/barberShop.png",
        width: 800,
        height: 600,
        alt: "Süleyman Ahat Berber Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Süleyman Ahat | Kaliteli ve Modern Saç Tasarımı - Kütahya",
    description:
      "Süleyman Ahat, profesyonel saç kesimi, bakım ve stil hizmetleri sunar. Modern ve kaliteli hizmet anlayışını deneyimleyin.",
    images: ["/images/barberShop.png"],
  },
  alternates: {
    canonical: "https://suleymanahat.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex-1">{children}</div>
          <footer className="flex flex-col gap-1 items-center bg-zinc-800 text-white text-center p-2">
            <p>
              &copy; {new Date().getFullYear()} Koray Renkligil. Tüm hakları
              saklıdır.
            </p>
          </footer>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
