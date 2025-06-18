"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./RelatedCases.module.scss";
import CaseCard from "@/components/shared/CaseCard/CaseCard";

const projects = [
  {
    title: "Seneca",
    description: "Seneca — бренд премиальной мужской одежды из Нью-Йорка",
    tags: ["eCommerce", "Fashion", "UI/UX"],
    link: "https://thinkseneca.com/",
    image:
      "https://adchitects.co/_next/image?url=https%3A%2F%2Fadchitects-www-strapi.s3.us-west-1.wasabisys.com%2Fcase_study-SENECA-miniature-0%25402x_case_study_SENECA_miniature_0_2x_6f33213f29.png&w=1080&q=70",
  },
  {
    title: "Sequins",
    description: "Биотехнологический стартап: будущее качества геномных данных",
    tags: ["Biotech", "AI", "SaaS"],
    link: "https://sequins.bio/",
    image:
      "https://adchitects.co/_next/image?url=https%3A%2F%2Fadchitects-www-strapi.s3.us-west-1.wasabisys.com%2Fcase-study-sequins-horizontal-miniature-2%25402x_case_study_sequins_horizontal_miniature_2_2x_b9d7b4cbb9.jpg&w=1080&q=70",
  },
  {
    title: "Chesscoin",
    description:
      "Играй в шахматы с друзьями, участвуй в турнирах и зарабатывай chesscoin!",
    tags: ["Telegram Mini App", "Web3", "Crypto"],
    link: "https://t.me/ChesscoinRobot",
    image: "/assets/images/chesscoin.png",
  },
];

export default function RelatedCases({ cases }) {
  return (
    <section className={s.relatedCases}>
      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.title}>Похожие проекты</h2>
          <Link href="/cases" className={s.viewAll}>
            Посмотреть все
          </Link>
        </div>

        <div className={s.grid}>
          {projects.map((project) => (
            <CaseCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
