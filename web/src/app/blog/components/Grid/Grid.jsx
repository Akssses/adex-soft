"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import s from "./Grid.module.scss";
import BlogCard from "../BlogCard/BlogCard";
import { getPosts, getCategories } from "@/app/api/blog";

export default function BlogGrid() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка категорий
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        // Проверяем, является ли ответ объектом с пагинацией
        setCategories(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    };
    loadCategories();
  }, []);

  // Загрузка постов
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts(currentPage, activeCategory);
        setPosts(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / 10)); // 10 - размер страницы с бэкенда
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [currentPage, activeCategory]);

  if (loading && !posts.length) {
    return (
      <section className={s.blogGrid}>
        <div className="container">
          <div className={s.loading}>Загрузка статей...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={s.blogGrid}>
        <div className="container">
          <div className={s.error}>Ошибка: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={s.blogGrid}>
      <div className="container">
        <div className={s.categories}>
          <button
            className={`${s.categoryButton} ${!activeCategory ? s.active : ""}`}
            onClick={() => {
              setActiveCategory(null);
              setCurrentPage(1);
            }}
          >
            Все
          </button>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <button
                key={category.id}
                className={`${s.categoryButton} ${
                  activeCategory === category.slug ? s.active : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.slug);
                  setCurrentPage(1);
                }}
              >
                {category.name}
              </button>
            ))}
        </div>

        <div className={s.grid}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
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
