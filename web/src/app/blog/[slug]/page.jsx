"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header/Header";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import BlogPostHeader from "@/app/blog/components/BlogPost/Header/Header";
import BlogPostContent from "@/app/blog/components/BlogPost/Content/Content";
import BlogPostSidebar from "@/app/blog/components/BlogPost/Sidebar/Sidebar";
import s from "./page.module.scss";
import SimilarPost from "@/app/blog/components/BlogPost/SimilarPost/SimilarPost";
import { getPost } from "@/app/api/blog";

export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slug = React.use(params).slug;

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await getPost(slug);
        // Преобразуем данные из API в нужный формат
        const formattedPost = {
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          category: data.category.name,
          categorySlug: data.category.slug,
          date: new Date(data.created).toLocaleDateString(),
          readTime: "5 мин",
          content: [
            {
              type: "paragraph",
              content: data.content,
            },
          ],
        };
        setPost(formattedPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={s.blogPost}>
          <div className={s.container}>
            <div className={s.loading}>Загрузка статьи...</div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className={s.blogPost}>
          <div className={s.container}>
            <div className={s.error}>
              <h2>Ошибка при загрузке статьи</h2>
              <p>{error}</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className={s.blogPost}>
          <div className={s.container}>
            <div className={s.error}>
              <h2>Статья не найдена</h2>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={s.blogPost}>
        <BlogPostHeader post={post} />
        <div className={s.container}>
          <BlogPostContent content={post.content} />
          <BlogPostSidebar post={post} />
        </div>
        <SimilarPost categorySlug={post.categorySlug} postId={post.id} />
        <BannerCTA />
      </main>
    </>
  );
}
