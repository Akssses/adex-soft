"use client";

import React, { useState, useEffect } from "react";
import s from "./HeroSection.module.scss";
import Button from "@/components/shared/Button/Button";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";

const stats = [
  { number: "50+", label: "Successful Projects" },
  { number: "100%", label: "Satisfied Clients" },
  { number: "24/7", label: "Support" },
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
        <div className={s.gridPattern} />
        <div className={s.glowEffect} />
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
              Your Partner in <TypeWriter words={words} />
              <br />
              from Idea to Launch
            </h1>
            <p className={s.subtitle}>
              We create innovative Web3 solutions, helping businesses thrive in
              the decentralized space
            </p>

            <div className={s.cta}>
              <Link href="https://t.me/adex_soft_manager" target="_blank">
                <Button variant="primary" className={s.mainButton}>
                  Contact Us
                  <HiOutlineArrowNarrowRight className={s.arrow} />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary">Learn More</Button>
              </Link>
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

      {/* <div className={s.stackBarSection}>
        <StackBar />
      </div> */}
    </section>
  );
}
