import React from "react";
import {
  FiEdit2,
  FiTrash2,
  FiArchive,
  FiEye,
  FiCalendar,
  FiStar,
} from "react-icons/fi";
import Link from "next/link";
import s from "./CaseCard.module.scss";

export default function CaseCard({ item, onArchive, onDelete }) {
  const mainImage = item.images?.[0]?.image || "/assets/images/placeholder.jpg";
  const formattedDate = new Date(item.created_at).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleDelete = () => {
    if (window.confirm("Вы действительно хотите удалить этот кейс?")) {
      onDelete(item.id);
    }
  };

  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <img src={mainImage} alt={item.title} className={s.cardImage} />
        <div className={s.cardOverlay}>
          <div className={s.cardActions}>
            <button className={s.actionButton} title="Просмотреть">
              <FiEye />
            </button>
            <Link
              href={`/admin/cases/edit/${item.id}`}
              className={s.actionButton}
              title="Редактировать"
            >
              <FiEdit2 />
            </Link>
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
              onClick={handleDelete}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
      <div className={s.cardContent}>
        <div className={s.cardMeta}>
          <span className={s.date}>
            <FiCalendar />
            {formattedDate}
          </span>
        </div>
        <h3 className={s.cardTitle}>{item.title}</h3>
        <p className={s.cardDescription}>{item.description}</p>
        <div className={s.tags}>
          {item.tags.map((tag) => (
            <span key={tag.id} className={s.tag}>
              {tag.name}
            </span>
          ))}
        </div>
        <div className={s.cardFooter}>
          <div className={`${s.status} ${s[item.status]}`}>
            {item.status === "published" && "Опубликовано"}
            {item.status === "archived" && "В архиве"}
          </div>
        </div>
      </div>
    </div>
  );
}
