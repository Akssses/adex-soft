"use client";

import React from "react";
import Header from "@/components/layout/Header/Header";
import BlogHero from "@/app/blog/components/Hero/Hero";
import BlogGrid from "@/app/blog/components/Grid/Grid";
import FeaturedPosts from "@/app/blog/components/FeaturedPosts/FeaturedPosts";
import s from "@/styles/BlogPage.module.scss";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className={s.blogPage}>
        <BlogHero />
        <FeaturedPosts />
        <BlogGrid />
      </main>
      <BannerCTA />
    </>
  );
}
