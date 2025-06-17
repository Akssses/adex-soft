"use client";

import React, { useRef, useState, useEffect } from "react";
import s from "./CaseSlider.module.scss";
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

export default function CaseSlider() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  useEffect(() => {
    const calculateSizes = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const firstCard = trackRef.current.children[0];
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect();
          const style = window.getComputedStyle(firstCard);
          const marginRight = parseFloat(style.marginRight);
          const totalSlide = cardRect.width + marginRight;
          setSlideWidth(totalSlide);

          const children = Array.from(trackRef.current.children);
          const totalTrackWidth = children.reduce((sum, child) => {
            const rect = child.getBoundingClientRect();
            const mr = parseFloat(window.getComputedStyle(child).marginRight);
            return sum + rect.width + mr;
          }, 0);

          setMaxOffset(Math.max(totalTrackWidth - containerWidth, 0));
          setOffset((prev) =>
            Math.min(prev, Math.max(totalTrackWidth - containerWidth, 0))
          );
        }
      }
    };

    calculateSizes();
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, []);

  const handlePrev = () => setOffset((prev) => Math.max(prev - slideWidth, 0));
  const handleNext = () =>
    setOffset((prev) => Math.min(prev + slideWidth, maxOffset));

  return (
    <div className="container">
      <div className={s.case_section}>
        <header className={s.header}>
          <h1 className={s.title}>
            Наши кейсы <br /> говорят сами за себя
          </h1>
        </header>

        <div ref={containerRef} className={s.sliderWrapper}>
          <div
            ref={trackRef}
            className={s.case_slider_container}
            style={{
              transform: `translateX(-${offset}px)`,
              transition: "transform 0.5s ease",
            }}
          >
            {projects.map((proj, idx) => (
              <CaseCard key={idx} {...proj} />
            ))}
          </div>
        </div>

        <div className={s.slider_buttons}>
          <button onClick={handlePrev}>
            <IoIosArrowBack />
          </button>
          <button onClick={handleNext}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
