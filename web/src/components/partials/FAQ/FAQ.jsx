"use client";
import { useState } from "react";
import styles from "./FAQ.module.scss";

const faqData = [
  {
    question: "Как начать работать с нашим сервисом?",
    answer:
      "Начать работу с нашим сервисом очень просто. Зарегистрируйтесь на платформе, заполните необходимую информацию и следуйте пошаговым инструкциям.",
  },
  {
    question: "Какие методы оплаты вы принимаете?",
    answer:
      "Мы принимаем различные методы оплаты, включая банковские карты, электронные кошельки и банковские переводы. Все транзакции защищены и безопасны.",
  },
  {
    question: "Как получить техническую поддержку?",
    answer:
      "Наша служба поддержки доступна 24/7. Вы можете связаться с нами через форму обратной связи, email или по телефону. Среднее время ответа - 15 минут.",
  },
  {
    question: "Есть ли у вас демо-версия?",
    answer:
      "Да, мы предоставляем бесплатную демо-версию на 14 дней, чтобы вы могли оценить все возможности нашего сервиса без каких-либо обязательств.",
  },
  {
    question: "Как обеспечивается безопасность данных?",
    answer:
      "Мы используем передовые технологии шифрования и следуем всем современным стандартам безопасности. Ваши данные хранятся на защищенных серверах и регулярно резервируются.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <div className="container">
        <h2 className={styles.title}>Часто задаваемые вопросы</h2>
        <div className={styles.faqGrid}>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                activeIndex === index ? styles.active : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className={styles.questionWrapper}>
                <h3 className={styles.question}>{item.question}</h3>
                <div className={styles.icon}>
                  <span className={styles.plusMinus}></span>
                </div>
              </div>
              <div className={styles.answerWrapper}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
