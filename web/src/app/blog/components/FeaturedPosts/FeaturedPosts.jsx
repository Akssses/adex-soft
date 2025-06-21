"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import s from "./FeaturedPosts.module.scss";
import BlogCard from "../BlogCard/BlogCard";
import { getFeaturedPosts } from "@/app/api/blog";

export default function FeaturedPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const data = await getFeaturedPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);

  if (loading) {
    return (
      <section className={s.featured}>
        <div className="container">
          <div className={s.header}>
            <h2 className={s.title}>Популярные статьи</h2>
          </div>
          <div className={s.loading}>Загрузка популярных статей...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={s.featured}>
        <div className="container">
          <div className={s.header}>
            <h2 className={s.title}>Популярные статьи</h2>
          </div>
          <div className={s.error}>Ошибка: {error}</div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className={s.featured}>
      <div className="container">
        <div className={s.header}>
          <h2 className={s.title}>Популярные статьи</h2>
          <Link href="/blog" className={s.viewAll}>
            Все статьи <FiArrowRight />
          </Link>
        </div>

        <div className={s.grid}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
