"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import s from "./Hero.module.scss";

export default function AboutHero() {
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

  return (
    <section className={s.hero}>
      <div className={s.heroContent}>
        <motion.span
          className={s.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Web3 Development Company
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={s.title}
        >
          Creating the Future <br />
          <span className={s.highlight}>of Web3 Technology</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={s.subtitle}
        >
          We are a team of experts in blockchain technology and Web3
          development. We create innovative solutions that shape the future of
          the digital world.
        </motion.p>
        <motion.div
          className={s.heroCta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className={s.primaryButton}>Start Project</button>
        </motion.div>
      </div>
      <div className={s.heroBackground} ref={parallaxRef}>
        <div className={s.gridPattern} />
        <div className={s.glowEffect} />
      </div>
    </section>
  );
}
