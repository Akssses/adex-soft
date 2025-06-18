"use client";
import React from "react";
import { motion } from "framer-motion";
import s from "./Team.module.scss";

const teamMembers = [
  {
    name: "Александр Ким",
    position: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
    role: "Leadership",
  },
  {
    name: "Мария Ли",
    position: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    role: "Design",
  },
  {
    name: "Дмитрий Пак",
    position: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=800&q=80",
    role: "Engineering",
  },
  {
    name: "Анна Чен",
    position: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    role: "Product",
  },
  {
    name: "Игорь Ли",
    position: "Innovation Lead",
    image:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80",
    role: "Research",
  },
  {
    name: "Елена Ким",
    position: "Backend Lead",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80",
    role: "Engineering",
  },
  {
    name: "Михаил Цой",
    position: "DevOps Engineer",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=800&q=80",
    role: "Engineering",
  },
  {
    name: "София Пак",
    position: "Security Lead",
    image:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80",
    role: "Security",
  },
];

export default function Team() {
  return (
    <section className={s.team}>
      <div className={"container"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={s.header}
        >
          <div className={s.headerContent}>
            <h2>Наша команда</h2>
            <p>Профессионалы, создающие будущее технологий</p>
          </div>
        </motion.div>

        <div className={s.grid}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={s.member}
            >
              <div className={s.imageContainer}>
                <img src={member.image} alt={member.name} />
              </div>
              <div className={s.info}>
                <h3>{member.name}</h3>
                <span className={s.position}>{member.position}</span>
                <span className={s.role}>{member.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
