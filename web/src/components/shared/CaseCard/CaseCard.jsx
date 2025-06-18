import React from "react";
import s from "./CaseCard.module.scss";
import { IoIosArrowForward } from "react-icons/io";

export default function CaseCard({ title, description, tags, link, image }) {
  return (
    <div className={s.card}>
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
        <p className={s.description}>{description}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={s.link}
        >
          <span>Смотреть проект</span>
          <IoIosArrowForward />
        </a>
      </div>
    </div>
  );
}
