"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaShieldAlt, FaHeart } from "react-icons/fa";
import s from "./Principles.module.scss";

const principles = [
  {
    icon: FaBrain,
    title: "Инновации",
    description:
      "Постоянно исследуем и внедряем передовые технологии в области Web3",
  },
  {
    icon: FaShieldAlt,
    title: "Безопасность",
    description:
      "Обеспечиваем максимальную защиту данных и активов наших клиентов",
  },
  {
    icon: FaHeart,
    title: "Качество",
    description: "Следуем высочайшим стандартам разработки и тестирования",
  },
];

export default function Principles() {
  return (
    <section className={s.principles}>
      <div className="container">
        <div className={s.sectionHeader}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={s.sectionTitle}
          >
            Наши принципы
          </motion.h2>
        </div>
        <div className={s.principlesGrid}>
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={s.principleCard}
              >
                <div className={s.iconWrapper}>
                  <Icon size={32} />
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
