"use client";

import React, { useState, useEffect } from "react";
import s from "./HeroSection.module.scss";
import Button from "@/components/shared/Button/Button";
import StackBar from "../StackBar/StackBar";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const stats = [
  { number: "50+", label: "Успешных проектов" },
  { number: "100%", label: "Довольных клиентов" },
  { number: "24/7", label: "Поддержка" },
];

const TypeWriter = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  delayBetweenWords = 1000,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        timeout = setTimeout(() => {}, delayBetweenWords);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText === currentWord) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  return (
    <span className={s.highlight}>
      {displayText}
      <span className={s.cursor}>|</span>
    </span>
  );
};

export default function HeroSection() {
  const words = ["DeFi", "NFT", "DAO", "DApps", "Web3"];

  return (
    <section className={s.hero}>
      <div className={s.background}>
        <div className={s.gradient} />
        <div className={s.grid} />
      </div>

      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={s.content}>
          <motion.div
            className={s.titleWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className={s.weare}>ADEX SOFT</span>
            <h1 className={s.title}>
              Ваш партнёр по <TypeWriter words={words} />
              <br />
              от идеи до запуска
            </h1>
            <p className={s.subtitle}>
              Мы создаем инновационные решения в сфере Web3, помогая бизнесу
              развиваться в децентрализованном пространстве
            </p>

            <div className={s.cta}>
              <Button variant="primary" className={s.mainButton}>
                Начать проект
                <HiOutlineArrowNarrowRight className={s.arrow} />
              </Button>
              <Button variant="secondary">Узнать больше</Button>
            </div>
          </motion.div>

          <motion.div
            className={s.statsWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className={s.stats}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={s.statItem}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className={s.number}>{stat.number}</span>
                  <span className={s.label}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className={s.stackBarSection}>
        <StackBar />
      </div>
    </section>
  );
}
