"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import s from "./Hero.module.scss";

export default function BlogHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const parallaxRef = useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <section className={s.hero}>
      <div className={s.heroBackground} ref={parallaxRef}>
        <div className={s.gridPattern} />
        <div className={s.glowEffect} />
      </div>

      <div className={s.heroContent}>
        <motion.span
          className={s.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Наш блог
        </motion.span>
        <motion.h1
          className={s.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Узнайте больше о{" "}
          <span className={s.highlight}>блокчейн технологиях</span>
          <br /> и криптовалютах
        </motion.h1>
        <motion.p
          className={s.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Последние новости, руководства и аналитика от наших экспертов
        </motion.p>

        <motion.form
          className={s.searchBar}
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={s.inputWrapper}>
            <FiSearch className={s.searchIcon} />
            <input
              type="text"
              placeholder="Поиск по статьям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className={s.searchButton}>
            Найти
          </button>
        </motion.form>
      </div>
    </section>
  );
}
