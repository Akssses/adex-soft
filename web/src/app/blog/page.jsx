"use client";

import React from "react";
import Header from "@/components/layout/Header/Header";
import BlogHero from "@/components/partials/Blog/Hero/Hero";
import BlogGrid from "@/components/partials/Blog/Grid/Grid";
import FeaturedPosts from "@/components/partials/Blog/FeaturedPosts/FeaturedPosts";
import s from "./blog.module.scss";
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
