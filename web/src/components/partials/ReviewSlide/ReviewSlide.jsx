"use client";

import s from "./ReviewSlide.module.scss";
import ReviewCard from "@/components/shared/ReviewCard/ReviewCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useRef, useState, useEffect } from "react";

export default function ReviewSlide() {
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

  const reviews = [
    {
      text: "Мы выбрали ADEX для редизайна Seneca — и не пожалели. Новый сайт идеально передаёт эстетику нашего бренда. Работать с командой было легко: всё по делу, в срок и с вниманием к деталям.",
      author: "James Miller",
      role: "Creative Director at Seneca",
    },
    {
      text: "Для нас было важно найти команду, которая понимает как биотех, так и AI. ADEX глубоко вникли в суть проекта и реализовали удобную и понятную платформу. Потрясающий UX.",
      author: "Dr. Lena Hoffmann",
      role: "Co-founder at Sequins.bio",
    },
    {
      text: "Проект с шахматами и токеном звучал странно, но ADEX быстро поняли, как это реализовать. Наш бот теперь работает стабильно, и пользователи играют, зарабатывают и возвращаются каждый день.",
      author: "Daniyar Turdaliev",
      role: "Founder at Chesscoin",
    },
    {
      text: "Нам нужен был современный и стильный интернет-магазин. ADEX полностью обновили UX Armitron и сделали процесс покупки намного удобнее. Продажи пошли вверх уже в первый месяц.",
      author: "Monica Ray",
      role: "Head of Ecommerce at Armitron",
    },
    {
      text: "Сайт для Gravity Team требовал чёткого позиционирования на крипторынке. Команда ADEX сделала всё: от дизайна до оптимизации, и теперь наш сайт действительно отражает уровень нашей компании.",
      author: "Alex Romanov",
      role: "Marketing Lead at Gravity Team",
    },
    {
      text: "CatchUp вырос из идеи, которую мы накидали за час. Через месяц у нас уже был полноценный Telegram Mini App. ADEX не просто делают — они мыслят вместе с тобой.",
      author: "Olga Ivanova",
      role: "Co-founder at CatchUp",
    },
  ];

  const handlePrev = () => setOffset((prev) => Math.max(prev - slideWidth, 0));
  const handleNext = () =>
    setOffset((prev) => Math.min(prev + slideWidth, maxOffset));

  return (
    <div className="container">
      <header className={s.header}>
        <span className={s.subtitle}>Отзывы</span>
        <h1 className={s.title}>
          Что говорят о нас <br /> наши клиенты?
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
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
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
  );
}
