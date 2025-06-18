"use client";

import React from "react";
import Link from "next/link";
import s from "./RelatedPosts.module.scss";

// Временные данные для демонстрации
const posts = [
  {
    id: 2,
    title: "Staking vs Farming: что выбрать для пассивного дохода",
    excerpt:
      "Сравнительный анализ двух популярных способов заработка в DeFi: стейкинга и фарминга. Преимущества, риски и рекомендации.",
    category: "DeFi",
    date: "12 марта 2024",
    readTime: "6 мин",
  },
  {
    id: 3,
    title: "Топ-5 DeFi протоколов для начинающих",
    excerpt:
      "Обзор самых удобных и безопасных DeFi протоколов для тех, кто только начинает свой путь в децентрализованных финансах.",
    category: "DeFi",
    date: "10 марта 2024",
    readTime: "7 мин",
  },
  {
    id: 4,
    title: "Риски и возможности в DeFi: полное руководство",
    excerpt:
      "Подробный анализ основных рисков в DeFi и способов их минимизации. Как безопасно использовать децентрализованные протоколы.",
    category: "DeFi",
    date: "8 марта 2024",
    readTime: "10 мин",
  },
];

export default function RelatedPosts({ category, currentPostId }) {
  const filteredPosts = posts.filter(
    (post) => post.category === category && post.id !== currentPostId
  );

  return (
    <section className={s.relatedPosts}>
      <div className={"container"}>
        <h2 className={s.title}>Читайте также</h2>
        <div className={s.grid}>
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className={s.card}>
              <div className={s.cardContent}>
                <span className={s.category}>{post.category}</span>
                <h3 className={s.postTitle}>{post.title}</h3>
                <p className={s.excerpt}>{post.excerpt}</p>
                <div className={s.meta}>
                  <span className={s.date}>{post.date}</span>
                  <span className={s.readTime}>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
