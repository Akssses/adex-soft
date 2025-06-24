"use client";

import React from "react";
import Header from "@/components/layout/Header/Header";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import CaseHero from "@/app/cases/components/CaseHero/CaseHero";
import CaseTechStack from "@/app/cases/components/TechStack/TechStack";
import CaseTestimonial from "@/app/cases/components/Testimonial/Testimonial";
import RelatedCases from "@/app/cases/components/RelatedCases/RelatedCases";
import s from "@/styles/CaseDetail.module.scss";

const caseStudy = {
  id: 1,
  hero: {
    title: "NFT Ticketing Platform",
    subtitle:
      "Революционная платформа для продажи билетов на базе Solana blockchain",
    coverImage: "/images/cases/nft-ticketing/hero.jpg",
    client: "TicketChain",
    industry: "Web3",
    platform: "Web + Telegram",
    services: ["Разработка", "UI/UX", "Blockchain", "Support"],
  },
  process: {
    stages: [
      {
        title: "Discovery & UX Audit",
        duration: "2 недели",
        description: "Анализ требований и исследование пользовательского опыта",
      },
      {
        title: "Wireframes & UI Design",
        duration: "3 недели",
        description: "Создание прототипов и дизайн интерфейса",
      },
      {
        title: "Smart Contract Development",
        duration: "4 недели",
        description: "Разработка и аудит смарт-контрактов",
      },
      {
        title: "Web App Integration",
        duration: "6 недель",
        description: "Разработка веб-приложения и интеграция с блокчейном",
      },
      {
        title: "QA + Launch",
        duration: "3 недели",
        description: "Тестирование и запуск платформы",
      },
    ],
  },
};

export default function CaseDetailPage({ params }) {
  return (
    <>
      <main className={s.casePage}>
        <CaseHero {...caseStudy.hero} stages={caseStudy.process.stages} />
        <div className={`${s.content} container`}>
          <CaseTechStack />
          <CaseTestimonial />
          <RelatedCases />
        </div>
        <BannerCTA />
      </main>
    </>
  );
}
