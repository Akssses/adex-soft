import React, { useMemo } from "react";
import s from "./BlogCard.module.scss";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";

// Массив доступных стилей баннеров
const bannerStyles = ["defi-banner", "nft-banner", "web3-banner"];

// Базовый URL для изображений
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function BlogCard({ post }) {
  if (!post) return null;

  const {
    slug = "",
    id = "",
    title = "",
    excerpt = "",
    image = "",
    category = {},
    created = new Date(),
  } = post;

  // Используем useMemo чтобы стиль баннера не менялся при каждом рендере
  const randomBannerStyle = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * bannerStyles.length);
    return bannerStyles[randomIndex];
  }, [id]); // Зависимость от id, чтобы для одного поста всегда был один и тот же баннер

  // Форматируем URL изображения
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${API_URL}${image}`
    : null;

  return (
    <Link href={`/blog/${slug}`} className={s.card}>
      <div className={`${s.imageWrapper} ${image ? "" : s[randomBannerStyle]}`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : null}
        <span className={s.category}>{category.name || ""}</span>
      </div>
      <div className={s.content}>
        <h3 className={s.postTitle}>{title}</h3>
        <p className={s.excerpt}>{excerpt}</p>
        <div className={s.meta}>
          <span className={s.readTime}>
            {new Date(created).toLocaleDateString()}
          </span>
          <span className={s.readMore}>
            Читать <FiArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
