"use client";

import React from "react";
import Header from "@/components/layout/Header/Header";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import ServicesList from "@/components/partials/ServicesList/ServicesList";
import AboutHero from "@/app/about/components/Hero/Hero";
import Achievements from "@/app/about/components/Achievements/Achievements";
import Team from "@/app/about/components/Team/Team";
import Principles from "@/app/about/components/Principles/Principles";
import s from "@/styles/AboutPage.module.scss";

export default function AboutPage() {
  return (
    <>
      <main className={s.aboutPage}>
        <AboutHero />
        <Achievements />
        <ServicesList />
        <Team />
        <Principles />
        <BannerCTA />
      </main>
    </>
  );
}
