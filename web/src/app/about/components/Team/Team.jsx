"use client";
import React from "react";
import { motion } from "framer-motion";
import s from "./Team.module.scss";

const teamMembers = [
  {
    name: "Aktan J.",
    position: "Fullstack Developer",
    image: "/assets/images/team/aktan.jpg",
    role: "Engineering",
  },
  {
    name: "Damir M.",
    position: "DevOps Engineer",
    image: "/assets/images/team/damir.png",
    role: "Engineering",
  },
  {
    name: "Akbar K.",
    position: "Project Manager & Team Lead",
    image: "/assets/images/team/akbar.jpeg",
    role: "Management",
  },
  {
    name: "Aibek A.",
    position: "Fullstack Developer",
    image: "/assets/images/team/aibek.jpg",
    role: "Web2/Web3",
  },
  {
    name: "Meimuna D.",
    position: "Marketing Lead",
    image: "/assets/images/team/meka.jpeg",
    role: "Marketing",
  },
  {
    name: "Nurbek D.",
    position: "Backend Developer",
    image: "/assets/images/team/mirba.jpeg",
    role: "Backend",
  },
  {
    name: "Rosie H.",
    position: "Design Lead",
    image: "/assets/images/team/rosy.jpeg",
    role: "Design",
  },
  {
    name: "Roma F.",
    position: "Security Lead",
    image: "/assets/images/team/roma.png",
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
            <h2>Our Team</h2>
            <p>Professionals Shaping the Future of Technology</p>
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
