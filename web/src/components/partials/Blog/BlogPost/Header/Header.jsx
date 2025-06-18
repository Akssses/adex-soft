"use client";

import React from "react";
import Image from "next/image";
import { FiClock, FiCalendar } from "react-icons/fi";
import s from "./Header.module.scss";

export default function BlogPostHeader({ post }) {
  return (
    <header className={s.header}>
      <div className={"container"}>
        <span className={s.category}>{post.category}</span>
        <h1 className={s.title}>{post.title}</h1>
        <p className={s.excerpt}>{post.excerpt}</p>

        <div className={s.meta}>
          <div className={s.details}>
            <span className={s.date}>
              <FiCalendar />
              {post.date}
            </span>
            <span className={s.readTime}>
              <FiClock />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
