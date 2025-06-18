"use client";

import React, { useEffect, useState } from "react";
import { FiShare2, FiTwitter, FiLinkedin, FiCopy } from "react-icons/fi";
import s from "./Sidebar.module.scss";

export default function BlogPostSidebar({ post }) {
  const [activeSection, setActiveSection] = useState("");
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Собираем все заголовки из контента
    const contentHeadings = post.content
      .filter((item) => item.type === "heading")
      .map((item, index) => ({
        id: `heading-${index}`,
        content: item.content,
      }));
    setHeadings(contentHeadings);

    // Добавляем ID к заголовкам в DOM
    const articleHeadings = document.querySelectorAll("h2");
    articleHeadings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
    });

    // Настраиваем Intersection Observer для отслеживания активного раздела
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    );

    articleHeadings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [post.content]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        // Здесь можно добавить уведомление о копировании
        break;
      default:
        break;
    }
  };

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Учитываем высоту header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className={s.sidebar}>
      <div className={s.share}>
        <h3 className={s.sidebarTitle}>
          <FiShare2 />
          Поделиться
        </h3>
        <div className={s.shareButtons}>
          <button
            onClick={() => handleShare("twitter")}
            className={s.shareButton}
            aria-label="Поделиться в Twitter"
          >
            <FiTwitter />
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className={s.shareButton}
            aria-label="Поделиться в LinkedIn"
          >
            <FiLinkedin />
          </button>
          <button
            onClick={() => handleShare("copy")}
            className={s.shareButton}
            aria-label="Копировать ссылку"
          >
            <FiCopy />
          </button>
        </div>
      </div>

      <nav className={s.navigation}>
        <h3 className={s.sidebarTitle}>Содержание</h3>
        <ul className={s.navList}>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${s.navItem} ${
                activeSection === heading.id ? s.active : ""
              }`}
            >
              <button onClick={() => scrollToHeading(heading.id)}>
                {heading.content}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
