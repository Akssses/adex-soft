import React from "react";
import s from "./BlogCard.module.scss";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.id}`} key={post.id} className={s.card}>
      <div className={`${s.imageWrapper} ${s[post.image]}`}>
        <span className={s.category}>{post.category}</span>
      </div>
      <div className={s.content}>
        <h3 className={s.postTitle}>{post.title}</h3>
        <p className={s.excerpt}>{post.excerpt}</p>
        <div className={s.meta}>
          <span className={s.readTime}>{post.readTime}</span>
          <span className={s.readMore}>
            Читать <FiArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
