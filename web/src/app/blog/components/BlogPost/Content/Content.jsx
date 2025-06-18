"use client";

import React from "react";
import s from "./Content.module.scss";

export default function BlogPostContent({ content }) {
  const renderContent = (item, index) => {
    switch (item.type) {
      case "paragraph":
        return (
          <p key={index} className={s.paragraph}>
            {item.content}
          </p>
        );
      case "heading":
        return (
          <h2 key={index} className={s.heading}>
            {item.content}
          </h2>
        );
      case "quote":
        return (
          <blockquote key={index} className={s.quote}>
            {item.content}
          </blockquote>
        );
      case "list":
        return (
          <ul key={index} className={s.list}>
            {item.items.map((listItem, itemIndex) => (
              <li key={itemIndex} className={s.listItem}>
                {listItem}
              </li>
            ))}
          </ul>
        );
      case "image":
        return (
          <figure key={index} className={s.figure}>
            <img src={item.src} alt={item.alt} className={s.image} />
            {item.caption && (
              <figcaption className={s.caption}>{item.caption}</figcaption>
            )}
          </figure>
        );
      case "code":
        return (
          <pre key={index} className={s.codeBlock}>
            <code className={s.code}>{item.content}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <article className={s.content}>
      {content.map((item, index) => renderContent(item, index))}
    </article>
  );
}
