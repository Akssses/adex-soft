"use client"; // Важно: указываем, что это клиентский компонент

import React, { useEffect, useRef, useState } from "react";
import s from "./Slogan.module.scss";

export default function Slogan() {
  const text =
    "Кодим, проектируем, внедряем: web, app, дизайн, блокчейн, Telegram и всё, что придумаешь. Нет задач, которые мы не берём.";
  const containerRef = useRef(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Компонент смонтирован, можно работать с window

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Начинаем эффект при появлении элемента в зоне видимости
      const startPoint = windowHeight * 0.5;
      const progress = Math.min(
        1,
        Math.max(0, (startPoint - rect.top) / (startPoint * 0.5))
      );

      setVisibleChars(Math.floor(text.length * Math.pow(progress, 0.5)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [text.length]);

  const renderText = () => {
    return text.split("").map((char, index) => {
      // На сервере рендерим все символы с базовым цветом
      const color = !isMounted
        ? "rgba(255, 255, 255, 0.44)"
        : index < visibleChars
        ? "#ffffff"
        : "rgba(255, 255, 255, 0.44)";

      return (
        <span
          key={index}
          style={{
            color,
            transition: "color 0.1s ease",
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className={s.slogan_container} ref={containerRef}>
      <p className={s.slogan}>{renderText()}</p>
    </div>
  );
}
