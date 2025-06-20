"use client";

import { useEffect, useState, useRef } from "react";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import CaseSLider from "@/components/partials/CaseSlider/CaseSLider";
import HeroSection from "@/components/partials/Hero/HeroSection";
import ServicesList from "@/components/partials/ServicesList/ServicesList";
import TechBar from "@/components/partials/TechBar/TechBar";
import Header from "@/components/layout/Header/Header";
import s from "./page.module.scss";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isFullPageEnabled, setIsFullPageEnabled] = useState(true);
  const isScrollingRef = useRef(false);
  const containerRef = useRef(null);

  const sections = [
    { component: HeroSection, id: "hero" },
    { component: ServicesList, id: "services" },
    { component: TechBar, id: "tech" },
    { component: CaseSLider, id: "cases" },
    { component: BannerCTA, id: "cta" },
  ];

  const scrollToSection = (index) => {
    if (
      !isFullPageEnabled ||
      isScrollingRef.current ||
      index < 0 ||
      index >= sections.length
    )
      return;

    isScrollingRef.current = true;
    setCurrentSection(index);

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsFullPageEnabled(isLargeScreen);
      document.body.style.overflow = isLargeScreen ? "hidden" : "auto";
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!isFullPageEnabled) return;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      if (nextSection >= 0 && nextSection < sections.length) {
        scrollToSection(nextSection);
      }
    };

    const handleKeyDown = (e) => {
      if (isScrollingRef.current) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [currentSection, sections.length, isFullPageEnabled]);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className={`${s.homeContainer} ${
          !isFullPageEnabled ? s.scrollable : ""
        }`}
      >
        <div
          className={s.sectionsWrapper}
          style={
            isFullPageEnabled
              ? { transform: `translateY(-${currentSection * 100}vh)` }
              : {}
          }
        >
          {sections.map(({ component: Component, id }, index) => (
            <div
              key={id}
              className={`${s.section} ${id === "cases" ? s.casesSection : ""}`}
            >
              <Component />
            </div>
          ))}
        </div>

        {isFullPageEnabled && (
          <div className={s.pagination}>
            {sections.map((_, index) => (
              <button
                key={index}
                className={s.dot}
                data-active={index === currentSection}
                onClick={() => scrollToSection(index)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
