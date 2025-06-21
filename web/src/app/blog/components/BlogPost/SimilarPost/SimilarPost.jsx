"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import s from "./SimilarPost.module.scss";
import BlogCard from "../../BlogCard/BlogCard";
import { getSimilarPosts } from "@/app/api/blog";

export default function SimilarPost({ categorySlug, postId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSimilarPosts = async () => {
      if (!categorySlug || !postId) return;

      try {
        setLoading(true);
        const data = await getSimilarPosts(categorySlug, postId);
        setPosts(data.results || []);
      } catch (err) {
        setError(err.message);
        console.error("Error loading similar posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSimilarPosts();
  }, [categorySlug, postId]);

  if (loading) {
    return (
      <section className={s.featured}>
        <div className="container">
          <div className={s.header}>
            <h2 className={s.title}>Вам может быть интересно</h2>
          </div>
          <div className={s.loading}>Загрузка похожих статей...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className={s.featured}>
      <div className="container">
        <div className={s.header}>
          <h2 className={s.title}>Вам может быть интересно</h2>
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
