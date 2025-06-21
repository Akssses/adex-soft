"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaRocket, FaTelegram } from "react-icons/fa";
import s from "@/styles/NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={s.container}>
      <motion.div
        className={s.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className={s.title}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          4
          <span className={s.rocket}>
            <FaRocket />
          </span>
          4
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={s.message}
        >
          Упс! Кажется, мы улетели не туда
        </motion.p>

        <motion.div
          className={s.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/" className={s.button}>
            <FaHome />
            <span>На главную</span>
          </Link>
          <a
            href="https://t.me/adex_soft_manager"
            target="_blank"
            rel="noopener noreferrer"
            className={s.button}
          >
            <FaTelegram />
            <span>Telegram</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
