import React from "react";
import {
  FiEdit2,
  FiTrash2,
  FiArchive,
  FiEye,
  FiCalendar,
  FiStar,
} from "react-icons/fi";
import s from "./CaseCard.module.scss";

export default function CaseCard({ item, onArchive, onDelete }) {
  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        {item.featured && (
          <div className={s.featuredBadge}>
            <FiStar />
            <span>Featured</span>
          </div>
        )}
        <img src={item.image} alt={item.title} className={s.cardImage} />
        <div className={s.cardOverlay}>
          <div className={s.cardActions}>
            <button className={s.actionButton} title="Просмотреть">
              <FiEye />
            </button>
            <button className={s.actionButton} title="Редактировать">
              <FiEdit2 />
            </button>
            <button
              className={s.actionButton}
              title="Архивировать"
              onClick={() => onArchive(item.id)}
            >
              <FiArchive />
            </button>
            <button
              className={`${s.actionButton} ${s.deleteButton}`}
              title="Удалить"
              onClick={() => onDelete(item.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
      <div className={s.cardContent}>
        <div className={s.cardMeta}>
          <span className={s.category}>{item.category}</span>
          <span className={s.date}>
            <FiCalendar />
            {item.date}
          </span>
        </div>
        <h3 className={s.cardTitle}>{item.title}</h3>
        <p className={s.cardDescription}>{item.description}</p>
        <div className={s.tags}>
          {item.tags.map((tag, index) => (
            <span key={index} className={s.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={s.cardFooter}>
          <div className={s.views}>
            <FiEye />
            <span>{item.views}</span>
          </div>
          <div className={`${s.status} ${s[item.status]}`}>
            {item.status === "published" && "Опубликовано"}
            {item.status === "archived" && "В архиве"}
          </div>
        </div>
      </div>
    </div>
  );
}
