"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CalcPage.module.scss";
import {
  FaCode,
  FaChartPie,
  FaTelegramPlane,
  FaLaptopCode,
  FaPaintBrush,
  FaCoins,
  FaRobot,
  FaCubes,
} from "react-icons/fa";
import WebDevCalc from "@/components/shared/CostBlocks/WebDevCalc";
import TelegramMiniAppCalc from "@/components/shared/CostBlocks/TelegramMiniAppCalc";
import TokenomicsCalc from "@/components/shared/CostBlocks/TokenomicsCalc";
import UxUiCalc from "@/components/shared/CostBlocks/UxUiCalc";
import TelegramBotsCalc from "@/components/shared/CostBlocks/TelegramBotsCalc";
import DevIntegrationCalc from "@/components/shared/CostBlocks/DevIntegrationCalc";
import DeFiCalc from "@/components/shared/CostBlocks/DeFiCalc";
import NFTMetaverseCalc from "@/components/shared/CostBlocks/NFTMetaverseCalc";
import Link from "next/link";
import { RiErrorWarningLine } from "react-icons/ri";
import { RiTelegram2Fill } from "react-icons/ri";
import Header from "@/components/layout/Header/Header";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";

const SERVICES = [
  {
    name: "Веб-разработка",
    icon: FaLaptopCode,
    color: "#ede7f6",
    component: WebDevCalc,
  },
  {
    name: "Telegram Mini App",
    icon: FaTelegramPlane,
    color: "#e3f2fd",
    component: TelegramMiniAppCalc,
  },
  {
    name: "UX/UI дизайн",
    icon: FaPaintBrush,
    color: "#fce4ec",
    component: UxUiCalc,
  },
  {
    name: "Telegram-боты",
    icon: FaRobot,
    color: "#f1f8e9",
    component: TelegramBotsCalc,
  },
  {
    name: "Токеномика",
    icon: FaChartPie,
    color: "#fff3e0",
    component: TokenomicsCalc,
  },
  {
    name: "Разработка и интеграция",
    icon: FaCode,
    color: "#e0f7fa",
    component: DevIntegrationCalc,
  },
  {
    name: "DeFi-решения",
    icon: FaCoins,
    color: "#f3e5f5",
    component: DeFiCalc,
  },
  {
    name: "NFT и метаверс",
    icon: FaCubes,
    color: "#f9fbe7",
    component: NFTMetaverseCalc,
  },
];

export default function ProjectCalcPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      setTotal(e.detail ?? 0);
    };
    window.addEventListener("calc:update", handler);
    return () => {
      window.removeEventListener("calc:update", handler);
    };
  }, []);

  const handleBack = () => {
    setSelectedService(null);
    setTotal(0);
  };

  return (
    <div>
      <Header />
      <main className="container">
        <section className={s.calc_container}>
          <div className={s.calc_block}>
            {!selectedService ? (
              <>
                <h2>Выберите направление:</h2>
                <div className={s.services}>
                  {SERVICES.map((service, index) => (
                    <div
                      key={index}
                      className={s.serviceCard}
                      style={{ backgroundColor: service.color }}
                      onClick={() =>
                        service.component && setSelectedService(service)
                      }
                    >
                      <service.icon size={28} />
                      <span>{service.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button className={s.backBtn} onClick={handleBack}>
                  ← Назад к списку услуг
                </button>
                <selectedService.component />
              </>
            )}
          </div>
          <div className={s.total}>
            <div className={s.summa}>
              <h2>Итоговая стоимость:</h2>
              <span>${total}</span>
            </div>
            <Link
              href={"https://t.me/adex_soft_manager"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={s.contact}>
                <RiTelegram2Fill size={25} />
                Связаться с нами
              </button>
            </Link>
            <div className={s.warning}>
              <RiErrorWarningLine color="red" size={30} />
              <p>
                Реальная стоимость может отличаться от расчётной и зависит от
                множества факторов.
              </p>
            </div>
          </div>
        </section>
      </main>
      <BannerCTA />
    </div>
  );
}
