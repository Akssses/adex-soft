"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import s from "./Grid.module.scss";

const categories = ["Все", "Blockchain", "DeFi", "NFT", "Web3", "Криптовалюты"];

const posts = [
  {
    id: 1,
    title: "Как работает блокчейн: простое объяснение сложной технологии",
    excerpt: "Разбираем основные принципы работы блокчейна на простых примерах",
    category: "Blockchain",
    date: "15 марта 2024",
    image: "blockchain-banner",
  },
  {
    id: 2,
    title: "Staking vs Farming: что выбрать?",
    excerpt:
      "Сравнение двух популярных способов пассивного дохода в криптовалюте",
    category: "DeFi",
    date: "12 марта 2024",
    image: "defi-banner-2",
  },
  {
    id: 3,
    title: "Топ-5 NFT маркетплейсов 2024 года",
    excerpt: "Обзор лучших площадок для покупки и продажи NFT",
    category: "NFT",
    date: "10 марта 2024",
    image: "nft-banner-2",
  },
  {
    id: 4,
    title: "Безопасность в Web3: основные правила",
    excerpt: "Как защитить свои активы в децентрализованном интернете",
    category: "Web3",
    date: "8 марта 2024",
    image: "web3-banner-2",
  },
  {
    id: 5,
    title: "Анализ криптовалютного рынка",
    excerpt: "Текущие тренды и прогнозы развития крипторынка",
    category: "Криптовалюты",
    date: "5 марта 2024",
    image: "crypto-banner",
  },
  {
    id: 6,
    title: "Smart-контракты: руководство для начинающих",
    excerpt: "Что такое смарт-контракты и как они работают",
    category: "Blockchain",
    date: "3 марта 2024",
    image: "smart-contracts-banner",
  },
];

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts =
    activeCategory === "Все"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section className={s.blogGrid}>
      <div className="container">
        <div className={s.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${s.categoryButton} ${
                activeCategory === category ? s.active : ""
              }`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={s.grid}>
          {currentPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className={s.card}>
              <div className={`${s.imageWrapper} ${s[post.image]}`}>
                <span className={s.category}>{post.category}</span>
              </div>
              <div className={s.content}>
                <h3 className={s.postTitle}>{post.title}</h3>
                <p className={s.excerpt}>{post.excerpt}</p>
                <div className={s.meta}>
                  <span className={s.date}>
                    <FiCalendar />
                    {post.date}
                  </span>
                  <span className={s.readMore}>
                    Читать <FiArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={s.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${s.pageButton} ${
                  currentPage === page ? s.active : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
