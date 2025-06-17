import React from "react";
import { FaArrowRight } from "react-icons/fa";
import s from "./ServicesCard.module.scss";

export default function ServicesCard({ title, items }) {
  return (
    <div className={s.card}>
      <h3 className={s.title}>{title}</h3>

      {items.length > 0 && (
        <ul className={s.list}>
          {items.map((item, i) => (
            <li key={i} className={s.listItem}>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className={s.arrow}>
        <FaArrowRight />
      </div>
    </div>
  );
}
