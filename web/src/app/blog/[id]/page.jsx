"use client";

import React from "react";
import Header from "@/components/layout/Header/Header";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import BlogPostHeader from "@/components/partials/Blog/BlogPost/Header/Header";
import BlogPostContent from "@/components/partials/Blog/BlogPost/Content/Content";
import BlogPostSidebar from "@/components/partials/Blog/BlogPost/Sidebar/Sidebar";
import s from "./page.module.scss";
import SimilarPost from "@/components/partials/Blog/BlogPost/SimilarPost/SimilarPost";

// Временные данные для демонстрации
const post = {
  id: 1,
  title:
    "Будущее DeFi: тренды и перспективы развития децентрализованных финансов",
  excerpt:
    "Анализ текущих трендов в децентрализованных финансах и прогнозы развития индустрии на ближайшие годы",
  category: "DeFi",
  date: "15 марта 2024",
  readTime: "8 мин",
  author: {
    name: "Александр Петров",
    role: "DeFi Аналитик",
    avatar: "/images/team/alex.jpg",
  },
  content: [
    {
      type: "paragraph",
      content:
        "Децентрализованные финансы (DeFi) продолжают революционизировать финансовый сектор, предлагая инновационные решения для традиционных финансовых услуг. В этой статье мы рассмотрим ключевые тренды и перспективы развития DeFi экосистемы.",
    },
    {
      type: "heading",
      content: "Текущее состояние рынка DeFi",
    },
    {
      type: "paragraph",
      content:
        "На сегодняшний день общая стоимость заблокированных средств (TVL) в DeFi протоколах превышает $100 миллиардов. Это демонстрирует растущее доверие пользователей к децентрализованным финансовым инструментам.",
    },
    {
      type: "quote",
      content:
        "DeFi - это не просто технологический тренд, это фундаментальное изменение в том, как мы думаем о финансах и взаимодействуем с ними.",
    },
    {
      type: "heading",
      content: "Ключевые тренды развития",
    },
    {
      type: "list",
      items: [
        "Рост популярности Layer 2 решений для масштабирования",
        "Интеграция с традиционными финансовыми институтами",
        "Развитие децентрализованных деривативов",
        "Улучшение пользовательского опыта и безопасности",
      ],
    },
    {
      type: "paragraph",
      content:
        "Layer 2 решения становятся все более важными для экосистемы DeFi, позволяя снизить стоимость транзакций и увеличить скорость их обработки. Это открывает новые возможности для массового adoption децентрализованных финансовых сервисов.",
    },
  ],
};

export default function BlogPostPage({ params }) {
  return (
    <>
      <Header />
      <main className={s.blogPost}>
        <BlogPostHeader post={post} />
        <div className={s.container}>
          <div className={s.content}>
            <BlogPostContent content={post.content} />
          </div>
          <BlogPostSidebar post={post} />
        </div>
        <SimilarPost />
        <BannerCTA />
      </main>
    </>
  );
}
