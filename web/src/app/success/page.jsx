import React from "react";
import s from "@/styles/SuccessPage.module.scss";
import { FaCheckCircle } from "react-icons/fa";

export default function SuccessPage() {
  return (
    <div className={s.successWrapper}>
      <div className={s.successCard}>
        <FaCheckCircle className={s.icon} />
        <h1 className={s.title}>Заявка принята</h1>
        <p className={s.message}>
          Спасибо за вашу заявку! Наша команда получила ваше сообщение и
          свяжется с вами в течение часа.
        </p>
        <a href="/" className={s.button}>
          Вернуться на главную
        </a>
      </div>
    </div>
  );
}
