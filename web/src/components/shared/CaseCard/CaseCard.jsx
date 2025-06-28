import React from "react";
import s from "./CaseCard.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

export default function CaseCard({ id, title, description, tags, image }) {
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
        {/* <p className={s.description}>{description}</p> */}

        <Link
          href={`/cases/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={s.link}
        >
          <span>View Project</span>
          <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
  s;
}
