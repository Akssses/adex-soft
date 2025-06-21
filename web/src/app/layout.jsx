import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";
import "@/styles/editor.scss";

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

export const metadata = {
  title: "ADEX SOFT",
  description:
    "ADEX — агентство по разработке Web3 и блокчейн-решений. Мы помогаем стартапам и бизнесу развиваться с помощью dApp, смарт-контрактов, DeFi-платформ и NFT-решений. Начните свой проект с ADEX уже сегодня!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${gilroy.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
