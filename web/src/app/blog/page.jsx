"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header/Header";
import BlogHero from "@/app/blog/components/Hero/Hero";
import BlogGrid from "@/app/blog/components/Grid/Grid";
import FeaturedPosts from "@/app/blog/components/FeaturedPosts/FeaturedPosts";
import s from "@/styles/BlogPage.module.scss";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import { blogService } from "@/services/blogService";
import { notify } from "@/utils/toast";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsData, featuredData, categoriesData] = await Promise.all([
          blogService.getPosts(),
          blogService.getFeaturedPosts(),
          blogService.getCategories(),
        ]);

        setPosts(postsData.results);
        setFeaturedPosts(featuredData);
        setCategories(categoriesData.results);
        notify.success("Данные успешно загружены");
      } catch (error) {
        notify.error("Ошибка при загрузке данных: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = async (categorySlug) => {
    try {
      setLoading(true);
      const data = await blogService.getPostsByCategory(categorySlug);
      setPosts(data.results);
      notify.info(`Показаны посты категории "${categorySlug}"`);
    } catch (error) {
      notify.error("Ошибка при фильтрации по категории: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className={s.blogPage}>
        <BlogHero />
        <FeaturedPosts posts={featuredPosts} loading={loading} />
        <BlogGrid
          posts={posts}
          categories={categories}
          loading={loading}
          onCategoryChange={handleCategoryChange}
        />
      </main>
      <BannerCTA />
    </>
  );
}
