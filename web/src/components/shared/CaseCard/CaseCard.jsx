import React from "react";
import s from "./CaseCard.module.scss";
import Link from "next/link";

export default function CaseCard({ id, title, tags, image }) {
  return (
    <Link href={`/cases/${id}`} className={s.card}>
      <div className={s.imageWrapper}>
        <img src={image} alt={`${title} preview`} className={s.image} />
      </div>

      <div className={s.text_content}>
        <div className={s.tags}>
          {tags?.map((tag, idx) => (
            <span key={idx} className={s.tag}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className={s.title}>{title}</h3>
      </div>
    </Link>
  );
}
