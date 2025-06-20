"use client";

import React, { useRef, useState, useEffect } from "react";
import s from "./RelatedCases.module.scss";
import CaseCard from "@/components/shared/CaseCard/CaseCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const projects = [
  {
    title: "Seneca",
    description: "Seneca — бренд премиальной мужской одежды из Нью-Йорка",
    tags: ["eCommerce", "Fashion", "UI/UX"],
    link: "https://thinkseneca.com/",
    image:
      "https://adchitects.co/_next/image?url=https%3A%2F%2Fadchitects-www-strapi.s3.us-west-1.wasabisys.com%2Fcase_study-SENECA-miniature-0%25402x_case_study_SENECA_miniature_0_2x_6f33213f29.png&w=1080&q=70",
  },
  {
    title: "Sequins",
    description: "Биотехнологический стартап: будущее качества геномных данных",
    tags: ["Biotech", "AI", "SaaS"],
    link: "https://sequins.bio/",
    image:
      "https://adchitects.co/_next/image?url=https%3A%2F%2Fadchitects-www-strapi.s3.us-west-1.wasabisys.com%2Fcase-study-sequins-horizontal-miniature-2%25402x_case_study_sequins_horizontal_miniature_2_2x_b9d7b4cbb9.jpg&w=1080&q=70",
  },
  {
    title: "Chesscoin",
    description:
      "Играй в шахматы с друзьями, участвуй в турнирах и зарабатывай chesscoin!",
    tags: ["Telegram Mini App", "Web3", "Crypto"],
    link: "https://t.me/ChesscoinRobot",
    image: "./assets/images/chesscoin.png",
  },
  {
    title: "Armitron",
    description:
      "Редизайн и улучшение пользовательского опыта интернет-магазина Armitron",
    tags: ["eCommerce", "Watch Brand", "UX"],
    link: "https://www.armitron.com/",
    image:
      "https://adchitects.co/_next/image?url=https%3A%2F%2Fadchitects-www-strapi.s3.us-west-1.wasabisys.com%2FArmitron-miniature-1%25402x-min_Armitron_miniature_1_2x_min_055556d3f1.jpg&w=1080&q=70",
  },
  {
    title: "Gravity Team",
    description:
      "Современный сайт для глобального провайдера крипто-ликвидности",
    tags: ["Crypto", "Web3", "Corporate"],
    link: "https://gravityteam.co/",
    image:
      "https://adchitects.co/_next/image?url=https%3A%2F%2Fadchitects-www-strapi.s3.us-west-1.wasabisys.com%2F05-image%25402x_05_image_2x_d82f92c98f.png&w=3840&q=75",
  },
  {
    title: "CatchUp",
    description:
      "CatchUp — ваш помощник для удобного бронирования встреч прямо в Telegram",
    tags: ["Telegram mini app", "Bots"],
    link: "https://t.me/catch_app_bot",
    image: "./assets/images/cutchup.png",
  },
];

export default function RelatedCases() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1024);

      if (width <= 768) {
        setCardsPerPage(1);
      } else if (width <= 1024) {
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

  const totalPages = Math.ceil(projects.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + cardsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const content = (
    <div className={s.case_section}>
      <header className={s.header}>
        <h1 className={s.title}>Похожие проекты</h1>
      </header>

      <div className={s.sliderWrapper}>
        <div className={s.case_slider_container}>
          {visibleProjects.map((proj, idx) => (
            <CaseCard key={`${currentPage}-${idx}`} {...proj} />
          ))}
        </div>
      </div>

      <div className={s.slider_buttons}>
        <button onClick={handlePrev} disabled={currentPage === 0}>
          <IoIosArrowBack />
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );

  return isMobile ? content : <div className="container">{content}</div>;
}
