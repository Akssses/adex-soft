"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";
import s from "./CaseHero.module.scss";

export default function CaseHero({
  title,
  subtitle,
  industry,
  platform,
  services,
  projectUrl = "#",
  stages,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const projectImages = [
    {
      src: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?w=800&auto=format",
      alt: "Web3 Dashboard",
      caption: "Главная страница платформы",
    },
    {
      src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format",
      alt: "NFT Gallery",
      caption: "Галерея NFT токенов",
    },
    {
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format",
      alt: "Trading Interface",
      caption: "Интерфейс торговли",
    },
    {
      src: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format",
      alt: "Wallet Connect",
      caption: "Подключение кошелька",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setCardsPerPage(1);
      } else if (width <= 1200) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }

      // Reset to first page when layout changes
      setCurrentPage(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(projectImages.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const visibleImages = projectImages.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section className={s.hero}>
      <div className={s.slider}>
        <div className={s.sliderWrapper}>
          <div className={s.sliderTrack}>
            {visibleImages.map((image, idx) => (
              <div key={`${currentPage}-${idx}`} className={s.card}>
                <div className={s.cardImage}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={s.slideImage}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.sliderControls}>
          <button
            onClick={handlePrev}
            className={s.sliderButton}
            disabled={currentPage === 0}
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={handleNext}
            className={s.sliderButton}
            disabled={currentPage === totalPages - 1}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <div className="container">
        <div className={s.content}>
          <div className={s.mainInfo}>
            <div className={s.tags}>
              <span className={s.tag}>{industry}</span>
              <span className={s.tag}>{platform}</span>
            </div>

            <div className={s.titleBlock}>
              <h1 className={s.title}>{title}</h1>
              <p className={s.subtitle}>{subtitle}</p>
            </div>

            <div className={s.meta}>
              <div className={s.metaGroup}>
                <div className={s.metaItem}>
                  <span className={s.label}>Услуги</span>
                  <div className={s.services}>
                    {services.map((service, index) => (
                      <span key={index} className={s.service}>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={s.actions}>
                {projectUrl && projectUrl !== "#" && (
                  <Link href={projectUrl} className={s.projectLink}>
                    <span>Посмотреть проект</span>
                    <FiArrowUpRight />
                  </Link>
                )}
                <button className={s.cta}>
                  www.site.com{" "}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16666 10H15.8333"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8333 5L15.8333 10L10.8333 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={s.timeline}>
            {stages.map((stage, index) => (
              <div key={index} className={s.stage}>
                <div className={s.stageNumber}>{index + 1}</div>
                <div className={s.stageContent}>
                  <div className={s.stageMeta}>
                    <h3 className={s.stageTitle}>{stage.title}</h3>
                    <span className={s.stageDuration}>{stage.duration}</span>
                  </div>
                  <p className={s.stageDescription}>{stage.description}</p>
                </div>
                {index < stages.length - 1 && <div className={s.connector} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
