"use client";

import React, { useState } from "react";
import s from "./BannerCTA.module.scss";
import RequesForm from "@/components/shared/RequesForm/RequesForm";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import Footer from "@/components/layout/Footer/Footer";

export default function BannerCTA() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="container">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={s.banner}
        >
          <div className={s.glowEffect} />
          <div className={s.content}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={s.title}
            >
              У вас есть проект на примете? <br />
              <span className={s.highlight}>Давайте приступим к работе</span>
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={s.button}
              onClick={() => setShowModal(true)}
            >
              <span>Начать проект</span>
              <FaRocket className={s.icon} />
            </motion.button>
          </div>
        </motion.section>
        {showModal && <RequesForm onClose={() => setShowModal(false)} />}
      </div>
      <Footer />
    </div>
  );
}
