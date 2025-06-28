"use client";

import React, { useState } from "react";
import s from "./BannerCTA.module.scss";
import RequesForm from "@/components/shared/RequesForm/RequesForm";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import Portal from "@/components/shared/RequesForm/Portal";

export default function BannerCTA() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
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
              Have a project in mind? <br />
              <span className={s.highlight}>Let's get to work</span>
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={s.button}
              onClick={handleOpenModal}
            >
              <span>Start Project</span>
              <FaRocket className={s.icon} />
            </motion.button>
          </div>
        </motion.section>
      </div>
      <AnimatePresence>
        <Portal>
          {showModal && <RequesForm onClose={handleCloseModal} />}
        </Portal>
      </AnimatePresence>
    </>
  );
}
