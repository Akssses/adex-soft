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
    name: "Web Development",
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
    name: "UX/UI Design",
    icon: FaPaintBrush,
    color: "#fce4ec",
    component: UxUiCalc,
  },
  {
    name: "Telegram Bots",
    icon: FaRobot,
    color: "#f1f8e9",
    component: TelegramBotsCalc,
  },
  {
    name: "Tokenomics",
    icon: FaChartPie,
    color: "#fff3e0",
    component: TokenomicsCalc,
  },
  {
    name: "Development & Integration",
    icon: FaCode,
    color: "#e0f7fa",
    component: DevIntegrationCalc,
  },
  {
    name: "DeFi Solutions",
    icon: FaCoins,
    color: "#f3e5f5",
    component: DeFiCalc,
  },
  {
    name: "NFT & Metaverse",
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
      <main className="container">
        <section className={s.calc_container}>
          <div className={s.calc_block}>
            {!selectedService ? (
              <>
                <h2>Select a service:</h2>
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
                  ← Back to services
                </button>
                <selectedService.component />
              </>
            )}
          </div>
          <div className={s.total}>
            <div className={s.summa}>
              <h2>Total Cost:</h2>
              <span>${total}</span>
            </div>
            <Link
              href={"https://t.me/adex_soft_manager"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={s.contact}>
                <RiTelegram2Fill size={25} />
                Contact Us
              </button>
            </Link>
            <div className={s.warning}>
              <RiErrorWarningLine color="red" size={30} />
              <p>
                The actual cost may vary from the calculated estimate and
                depends on multiple factors.
              </p>
            </div>
          </div>
        </section>
      </main>
      <BannerCTA />
    </div>
  );
}
