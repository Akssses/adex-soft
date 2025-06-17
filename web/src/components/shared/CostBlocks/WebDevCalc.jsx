// WebDevCalcUpdated.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const siteTypes = [
  { label: "Landing page", key: "landing" },
  { label: "Многостраничный сайт", key: "multi" },
  { label: "Интернет-магазин", key: "ecommerce" },
  { label: "SaaS-платформа", key: "saas" },
];

/** Вопросы для Landing */
const landingQuestions = [
  // прототип, блоки, адаптивка, дизайн, анимация, интеграции, i18n, CMS, SEO, хостинг
  {
    key: "prototype",
    multi: false,
    question: "Есть ли у вас готовый прототип сайта?",
    options: [
      { label: "Да", price: 0 },
      { label: "Нужен wireframe", price: 50 },
      { label: "Хочу визуальный прототип", price: 100 },
    ],
  },
  {
    key: "blocks",
    multi: false,
    question: "Сколько блоков на странице?",
    options: [
      { label: "1–3 блока", price: 100 },
      { label: "4–6 блоков", price: 200 },
      { label: "7+ блоков", price: 300 },
    ],
  },
  {
    key: "responsive",
    multi: false,
    question: "Нужна ли адаптивная верстка?",
    options: [
      { label: "Только десктоп", price: 0 },
      { label: "Десктоп + мобилка", price: 0 },
      { label: "Все устройства", price: 100 },
    ],
  },
  {
    key: "design",
    multi: false,
    question: "Выберите стиль дизайна",
    options: [
      { label: "Шаблонный", price: 0 },
      { label: "Индивидуальный UX/UI", price: 400 },
      { label: "Brand-UI kit", price: 800 },
    ],
  },
  {
    key: "animation",
    multi: false,
    question: "Нужна ли анимация и интерактив?",
    options: [
      { label: "Нет", price: 0 },
      { label: "CSS-анимации", price: 50 },
      { label: "JS-анимации", price: 100 },
    ],
  },
  {
    key: "integrations",
    multi: true,
    question: "Интеграции с внешними сервисами",
    options: [
      { label: "Форма (заявки)", price: 100 },
      { label: "Чаты (Telegram/WhatsApp)", price: 50 },
      { label: "CRM / API", price: 200 },
      { label: "AI-ассистент", price: 200 },
      { label: "Платежная система", price: 300 },
    ],
  },
  {
    key: "i18n",
    multi: false,
    question: "Многоязычность сайта",
    options: [
      { label: "Нет", price: 0 },
      { label: "2 языка", price: 200 },
      { label: "3+ языка", price: 300 },
      { label: "5+ языков", price: 450 },
    ],
  },
  {
    key: "cms",
    multi: false,
    question: "Выбор CMS / админки",
    options: [
      { label: "Без CMS", price: 0 },
      { label: "WordPress / Tilda", price: 200 },
      { label: "Кастомная CMS", price: 400 },
    ],
  },
  {
    key: "seo",
    multi: false,
    question: "SEO-оптимизация",
    options: [
      { label: "Без SEO", price: 0 },
      { label: "Базовое (метатеги)", price: 50 },
      { label: "Продвинутое (ключи+тексты)", price: 300 },
    ],
  },
  {
    key: "hosting",
    multi: false,
    question: "Домен и хостинг",
    options: [
      { label: "Не нужен", price: 0 },
      { label: "Помощь с выбором", price: 0 },
      { label: "Подключение и настройка", price: 100 },
    ],
  },
];

/** Вопросы для Многостраничного сайта */
const multiQuestions = [
  {
    key: "prototype",
    multi: false,
    question: landingQuestions[0].question,
    options: landingQuestions[0].options,
  },
  {
    key: "pages",
    multi: false,
    question: "Сколько страниц в сайте?",
    options: [
      { label: "1–3 страницы", price: 0 },
      { label: "4–7 страниц", price: 800 },
      { label: "8+ страниц", price: 1500 },
    ],
  },
  // далее переиспользуем адаптивку, дизайн и т.д. из landing
  ...landingQuestions.slice(2),
];

/** Вопросы для Интернет-магазина */
const ecommerceQuestions = [
  {
    key: "prototype",
    multi: false,
    question: landingQuestions[0].question,
    options: landingQuestions[0].options,
  },
  {
    key: "products",
    multi: false,
    question: "Сколько товаров в каталоге?",
    options: [
      { label: "до 50", price: 0 },
      { label: "50–200", price: 500 },
      { label: "200+", price: 1000 },
    ],
  },
  // адаптивка, дизайн, анимация и базовые интеграции берём из landing
  ...landingQuestions.slice(2),
  {
    key: "ecomIntegrations",
    multi: true,
    question: "E-commerce интеграции",
    options: [
      { label: "Платежный шлюз", price: 300 },
      { label: "Управление складом", price: 200 },
      { label: "Отправка заказов (API)", price: 150 },
      { label: "Отзывы и рейтинг", price: 100 },
    ],
  },
];

/** Вопросы для SaaS-платформы с увеличенными ценами */
const saasQuestions = [
  {
    key: "prototype",
    multi: false,
    question: landingQuestions[0].question,
    options: landingQuestions[0].options,
  },
  {
    key: "modules",
    multi: false,
    question: "Сколько модулей / разделов?",
    options: [
      { label: "1–3 модуля", price: 0 },
      { label: "4–6 модулей", price: 600 },
      { label: "7+ модулей", price: 1200 },
    ],
  },
  {
    key: "users",
    multi: false,
    question: "Сложность ролей пользователей",
    options: [
      { label: "1 уровень", price: 0 },
      { label: "2–3 уровня", price: 300 },
      { label: "3+ уровней", price: 600 },
    ],
  },
  // переопределяем адаптивку: сто́имость выше
  {
    key: "responsive",
    multi: false,
    question: "Нужна ли адаптивная верстка?",
    options: [
      { label: "Только десктоп", price: 0 },
      { label: "Десктоп + мобилка", price: 0 },
      { label: "Все устройства", price: 200 }, // вместо 100
    ],
  },
  // переопределяем дизайн: сто́имость выше
  {
    key: "design",
    multi: false,
    question: "Выберите стиль дизайна",
    options: [
      { label: "Шаблонный", price: 0 },
      { label: "Индивидуальный UX/UI", price: 800 }, // вместо 400
      { label: "Premium Brand-UI Kit", price: 1600 }, // вместо 800
    ],
  },
  // переопределяем анимацию: сто́имость выше
  {
    key: "animation",
    multi: false,
    question: "Нужна ли анимация и интерактив?",
    options: [
      { label: "Нет", price: 0 },
      { label: "CSS-анимации", price: 100 }, // вместо 50
      { label: "JS-анимации", price: 200 }, // вместо 100
    ],
  },
  {
    key: "saasIntegrations",
    multi: true,
    question: "Интеграции для SaaS",
    options: [
      { label: "Платежи и биллинг", price: 300 },
      { label: "Уведомления (email/Push)", price: 200 },
      { label: "API для разработчиков", price: 400 },
      { label: "CRM / ERP", price: 250 },
    ],
  },
  // остальные опции (i18n, хостинг) можно взять из landing или задать свои:
  {
    key: "i18n",
    multi: false,
    question: landingQuestions[6].question,
    options: landingQuestions[6].options,
  },
  {
    key: "hosting",
    multi: false,
    question: "Выбор хостинга для SaaS",
    options: [
      { label: "Простой shared-хостинг", price: 100 },
      { label: "Облачное (AWS/GCP)", price: 300 },
      { label: "Выделенный сервер", price: 500 },
    ],
  },
];

export default function WebDevCalc() {
  const [step, setStep] = useState(0);
  const [siteType, setSiteType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  // выбираем нужный массив вопросов
  const questions =
    siteType === "landing"
      ? landingQuestions
      : siteType === "multi"
      ? multiQuestions
      : siteType === "ecommerce"
      ? ecommerceQuestions
      : siteType === "saas"
      ? saasQuestions
      : [];

  const totalSteps = questions.length;

  // считаем итоговую сумму
  const total = questions.reduce((sum, q) => {
    const ans = answers[q.key];
    if (!ans) return sum;
    return sum + (q.multi ? ans.reduce((s, o) => s + o.price, 0) : ans.price);
  }, 0);

  const percent = siteType ? Math.round((step / totalSteps) * 100) : 0;

  // отправляем обновлённую сумму родителю
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("calc:update", { detail: total }));
  }, [total]);

  const handleNext = () => {
    if (step === totalSteps) {
      setIsComplete(true);
      window.dispatchEvent(
        new CustomEvent("calc:complete", {
          detail: { service: siteType, answers, total },
        })
      );
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const selectType = (type) => {
    setSiteType(type);
    setAnswers({});
    setStep(1);
  };
  const toggleAnswer = (key, opt, multi) => {
    setAnswers((prev) => {
      const curr = prev[key] || (multi ? [] : null);
      if (multi) {
        const exists = curr.find((o) => o.label === opt.label);
        return {
          ...prev,
          [key]: exists
            ? curr.filter((o) => o.label !== opt.label)
            : [...curr, opt],
        };
      }
      return { ...prev, [key]: opt };
    });
  };

  // рендер

  if (isComplete) {
    const label = siteTypes.find((t) => t.key === siteType)?.label;
    return (
      <div className={s.summary}>
        <h2>Сводка по услуге</h2>
        <p>
          <strong>Услуга:</strong> {label}
        </p>
        <ul>
          {questions.map((q) => {
            const ans = answers[q.key];
            if (!ans) return null;
            return (
              <li key={q.key}>
                <strong>{q.question}:</strong>{" "}
                {q.multi ? ans.map((o) => o.label).join(", ") : ans.label}
              </li>
            );
          })}
        </ul>
        <p>
          <strong>Итоговая стоимость:</strong> ${total}
        </p>
      </div>
    );
  }

  return (
    <div className={s.calc}>
      <div className={s.header}>
        <div className={s.progressBar}>
          <div className={s.fill} style={{ width: `${percent}%` }} />
        </div>
        <span className={s.progressText}>{percent}%</span>
      </div>

      <div className={s.body}>
        {step === 0 && (
          <div className={s.chooseType}>
            <h2>Тип сайта</h2>
            <div className={s.types}>
              {siteTypes.map((t) => (
                <button
                  key={t.key}
                  className={siteType === t.key ? s.active : ""}
                  onClick={() => selectType(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step > 0 && step <= totalSteps && (
          <div className={s.question}>
            <h2>{questions[step - 1].question}</h2>
            <div className={s.options}>
              {questions[step - 1].options.map((opt) => {
                const sel = answers[questions[step - 1].key] || [];
                const selected = questions[step - 1].multi
                  ? sel.some((o) => o.label === opt.label)
                  : sel.label === opt.label;
                return (
                  <div
                    key={opt.label}
                    className={`${s.card} ${selected ? s.selected : ""}`}
                    onClick={() =>
                      toggleAnswer(
                        questions[step - 1].key,
                        opt,
                        questions[step - 1].multi
                      )
                    }
                  >
                    <p>{opt.label}</p>
                    <span>${opt.price}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className={s.controls}>
        <button onClick={handlePrev} disabled={step === 0}>
          Назад
        </button>
        <button
          onClick={handleNext}
          disabled={
            (step === 0 && !siteType) ||
            (step > 0 &&
              step <= totalSteps &&
              !answers[questions[step - 1].key])
          }
        >
          {step === totalSteps ? "Завершить" : "Далее"}
        </button>
      </div>
    </div>
  );
}
