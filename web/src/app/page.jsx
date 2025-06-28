"use client";

import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import CaseSLider from "@/components/partials/CaseSlider/CaseSLider";
import HeroSection from "@/components/partials/Hero/HeroSection";
import ServicesList from "@/components/partials/ServicesList/ServicesList";
import TechBar from "@/components/partials/TechBar/TechBar";
import s from "@/styles/HomePage.module.scss";

export default function Home() {
  const sections = [
    { component: HeroSection, id: "hero" },
    { component: ServicesList, id: "services" },
    { component: TechBar, id: "tech" },
    { component: CaseSLider, id: "cases" },
    { component: BannerCTA, id: "cta" },
  ];

  return (
    <>
      <div className={s.homeContainer}>
        {sections.map(({ component: Component, id }) => (
          <div
            key={id}
            id={id}
            className={`${s.section} ${id === "cases" ? s.casesSection : ""}`}
          >
            <Component />
          </div>
        ))}
      </div>
    </>
  );
}
