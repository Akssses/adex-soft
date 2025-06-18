"use client";

import React from "react";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import BannerCTA from "@/components/partials/BannerCTA/BannerCTA";
import ServicesList from "@/components/partials/ServicesList/ServicesList";
import AboutHero from "@/components/partials/AboutPage/Hero/Hero";
import Achievements from "@/components/partials/AboutPage/Achievements/Achievements";
import Team from "@/components/partials/AboutPage/Team/Team";
import Principles from "@/components/partials/AboutPage/Principles/Principles";
import s from "./about.module.scss";

export default function AboutPage() {
  return (
    <>
      <Header />
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
