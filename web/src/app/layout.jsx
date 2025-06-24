"use client";

import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import "./globals.scss";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const gilroy = localFont({
  src: [
    {
      path: "../../public/assets/fonts/gilroy/Gilroy-Light.otf",
      weight: "300",
      style: "normal",
    },
    // {
    //   path: "../../public/assets/fonts/gilroy/Gilroy-ExtraBold.otf",
    //   weight: "800",
    //   style: "normal",
    // },
  ],
  variable: "--font-gilroy",
  display: "swap",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const shouldShowHeaderFooter = !isAdminPage && !isLoginPage;

  return (
    <html lang="ru">
      <body
        className={`${gilroy.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        {shouldShowHeaderFooter && <Header />}
        {children}
        {shouldShowHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
