"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import s from "./SimilarPost.module.scss";
import BlogCard from "../../BlogCard/BlogCard";

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

export default function SimilarPost() {
  return (
    <section className={s.featured}>
      <div className="container">
        <div className={s.header}>
          <h2 className={s.title}>Вам может быть интересно</h2>
          <Link href="/blog/featured" className={s.viewAll}>
            Все статьи <FiArrowRight />
          </Link>
        </div>

        <div className={s.grid}>
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
