import React from "react";
import s from "./ReviewCard.module.scss";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({
  text,
  author,
  role,
  metricValue,
  metricLabel,
}) {
  return (
    <div className={s.card}>
      <div className={s.header}>
        {/* <h4 className={s.source}>Clutch</h4> */}
        <div className={s.stars}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>

      <p className={s.text}>{text}</p>

      <div className={s.footer}>
        <div className={s.authorInfo}>
          <div>
            <div className={s.authorName}>{author}</div>
            <div className={s.authorRole}>{role}</div>
          </div>
        </div>
        {/* <div className={s.metricBox}>
          <div className={s.metricValue}>{metricValue}</div>
          <div className={s.metricLabel}>{metricLabel}</div>
        </div> */}
      </div>
    </div>
  );
}
