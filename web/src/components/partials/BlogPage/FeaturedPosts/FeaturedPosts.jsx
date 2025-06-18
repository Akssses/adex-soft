"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import s from "./FeaturedPosts.module.scss";

const featuredPosts = [
  {
    id: 1,
    title: "Будущее DeFi: тренды и перспективы",
    excerpt:
      "Анализ текущих трендов в децентрализованных финансах и прогнозы развития индустрии",
    category: "DeFi",
    readTime: "8 мин",
    image: "defi-banner",
  },
  {
    id: 2,
    title: "NFT: Революция в цифровом искусстве",
    excerpt:
      "Как невзаимозаменяемые токены меняют арт-индустрию и открывают новые возможности",
    category: "NFT",
    readTime: "6 мин",
    image: "nft-banner",
  },
  {
    id: 3,
    title: "Web3: Новая эра интернета",
    excerpt:
      "Обзор технологий и проектов, формирующих децентрализованный интернет будущего",
    category: "Web3",
    readTime: "10 мин",
    image: "web3-banner",
  },
];

export default function FeaturedPosts() {
  return (
    <section className={s.featured}>
      <div className="container">
        <div className={s.header}>
          <h2 className={s.title}>Популярные статьи</h2>
          <Link href="/blog/featured" className={s.viewAll}>
            Все статьи <FiArrowRight />
          </Link>
        </div>

        <div className={s.grid}>
          {featuredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className={s.card}>
              <div className={`${s.imageWrapper} ${s[post.image]}`}>
                <span className={s.category}>{post.category}</span>
              </div>
              <div className={s.content}>
                <h3 className={s.postTitle}>{post.title}</h3>
                <p className={s.excerpt}>{post.excerpt}</p>
                <div className={s.meta}>
                  <span className={s.readTime}>{post.readTime}</span>
                  <span className={s.readMore}>
                    Читать <FiArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
