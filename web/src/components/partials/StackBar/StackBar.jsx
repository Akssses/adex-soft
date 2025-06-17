"use client";

import React from "react";
import s from "./StackBar.module.scss";
import { motion } from "framer-motion";

const stackItems = [
  { icon: "./assets/icons/solana.svg", name: "Solana" },
  { icon: "./assets/icons/eth.svg", name: "Ethereum" },
  { icon: "./assets/icons/bnb.svg", name: "Binance Smart Chain" },
  { icon: "./assets/icons/ton.svg", name: "TON" },
  { icon: "./assets/icons/pol.svg", name: "Polygon" },
  { icon: "./assets/icons/tron.svg", name: "TRX" },
];

export default function StackBar() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className={s.stackBarWrapper}>
      <motion.div
        className={`${s.stack_bar} container`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stackItems.map((item, index) => (
          <motion.div
            key={index}
            className={s.stack_card}
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.05,
              transition: { type: "spring", stiffness: 400 },
            }}
          >
            <div className={s.iconWrapper}>
              <img src={item.icon} alt={item.name} />
            </div>
            <h2>{item.name}</h2>
          </motion.div>
        ))}
      </motion.div>
      <div className={s.gradientOverlay} />
    </div>
  );
}
