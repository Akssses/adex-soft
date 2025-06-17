// TelegramBotsCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const botTypes = [
  { key: "command", label: "Командный бот" },
  { key: "inline", label: "Inline-бот" },
  { key: "webhook", label: "Webhook-бот" },
  { key: "payment", label: "Платёжный бот" },
];

const questionsMap = {
  command: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли у вас прототип / дизайн?",
      options: [
        { label: "Да", price: 0 },
        { label: "Требуется wireframe", price: 100 },
        { label: "Требуется визуальный макет", price: 200 },
      ],
    },
    {
      key: "commands",
      multi: false,
      question: "Сколько команд?",
      options: [
        { label: "1–5", price: 0 },
        { label: "6–15", price: 200 },
        { label: "16–30", price: 400 },
        { label: "30+", price: 600 },
      ],
    },
    {
      key: "callbacks",
      multi: false,
      question: "Callback-кнопки",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 200 },
      ],
    },
    {
      key: "keyboard",
      multi: false,
      question: "Тип клавиатуры",
      options: [
        { label: "Стандартная", price: 0 },
        { label: "Inline", price: 200 },
        { label: "Кастомная", price: 400 },
      ],
    },
    {
      key: "db",
      multi: false,
      question: "Хранение данных",
      options: [
        { label: "Без БД", price: 0 },
        { label: "Файл JSON", price: 100 },
        { label: "SQL (Postgres/MySQL)", price: 300 },
      ],
    },
    {
      key: "logging",
      multi: false,
      question: "Логирование",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Advanced", price: 200 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Аналитика",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (Google)", price: 100 },
        { label: "Custom", price: 200 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Хостинг",
      options: [
        { label: "Shared", price: 100 },
        { label: "VPS", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
  ],

  inline: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли у вас прототип / дизайн?",
      options: [
        { label: "Да", price: 0 },
        { label: "Требуется wireframe", price: 100 },
        { label: "Требуется визуальный макет", price: 200 },
      ],
    },
    {
      key: "inlineQueries",
      multi: false,
      question: "Inline-запросы",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 200 },
      ],
    },
    {
      key: "resultTypes",
      multi: true,
      question: "Типы ответов",
      options: [
        { label: "Article", price: 0 },
        { label: "Photo", price: 100 },
        { label: "Video", price: 200 },
        { label: "Audio", price: 200 },
      ],
    },
    {
      key: "handlers",
      multi: false,
      question: "Кол-во обработчиков",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–7", price: 200 },
        { label: "8+", price: 400 },
      ],
    },
    {
      key: "db",
      multi: false,
      question: "Хранение данных",
      options: [
        { label: "Без БД", price: 0 },
        { label: "Файл JSON", price: 100 },
        { label: "SQL", price: 300 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Аналитика",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Advanced", price: 200 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Хостинг",
      options: [
        { label: "Shared", price: 100 },
        { label: "VPS", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
  ],

  webhook: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли дизайн / макет?",
      options: [
        { label: "Да", price: 0 },
        { label: "Wireframe", price: 100 },
        { label: "Mockup", price: 200 },
      ],
    },
    {
      key: "events",
      multi: true,
      question: "Webhook-события",
      options: [
        { label: "message", price: 0 },
        { label: "edited_message", price: 0 },
        { label: "callback_query", price: 100 },
        { label: "channel_post", price: 100 },
      ],
    },
    {
      key: "retry",
      multi: false,
      question: "Механизм retry",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Advanced", price: 200 },
      ],
    },
    {
      key: "security",
      multi: false,
      question: "SSL-сертификат",
      options: [
        { label: "Нет", price: 0 },
        { label: "Standard", price: 100 },
        { label: "Wildcard", price: 200 },
      ],
    },
    {
      key: "db",
      multi: false,
      question: "База данных",
      options: [
        { label: "Без БД", price: 0 },
        { label: "SQL", price: 300 },
      ],
    },
    {
      key: "logging",
      multi: false,
      question: "Логирование",
      options: [
        { label: "Basic", price: 100 },
        { label: "Advanced", price: 200 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Хостинг",
      options: [
        { label: "Shared", price: 100 },
        { label: "VPS", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
  ],

  payment: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли макет?",
      options: [
        { label: "Да", price: 0 },
        { label: "Wireframe", price: 100 },
        { label: "Mockup", price: 200 },
      ],
    },
    {
      key: "providers",
      multi: true,
      question: "Платёжные провайдеры",
      options: [
        { label: "Stripe", price: 200 },
        { label: "Qiwi", price: 100 },
        { label: "TON Pay", price: 150 },
        { label: "PayPal", price: 200 },
      ],
    },
    {
      key: "invoices",
      multi: false,
      question: "Создание счетов",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 200 },
      ],
    },
    {
      key: "payouts",
      multi: false,
      question: "Выплаты",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 300 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Аудит платёжных контрактов",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Full", price: 400 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Хостинг",
      options: [
        { label: "Shared", price: 100 },
        { label: "VPS", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
  ],
};

export default function TelegramBotsCalc() {
  const [step, setStep] = useState(0);
  const [botType, setBotType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = botType ? questionsMap[botType] : [];
  const totalSteps = questions.length;

  // вычисляем итог
  const total = questions.reduce((sum, q) => {
    const ans = answers[q.key];
    if (!ans) return sum;
    return sum + (q.multi ? ans.reduce((s, o) => s + o.price, 0) : ans.price);
  }, 0);

  const percent = botType ? Math.round((step / totalSteps) * 100) : 0;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("calc:update", { detail: total }));
  }, [total]);

  const handleNext = () => {
    if (step === totalSteps) {
      setIsComplete(true);
      window.dispatchEvent(
        new CustomEvent("calc:complete", {
          detail: { service: `bots:${botType}`, answers, total },
        })
      );
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (step <= 1) {
      setBotType(null);
      setStep(0);
    } else {
      setStep((s) => s - 1);
    }
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

  // выбор типа бота
  if (!botType) {
    return (
      <div className={s.chooseType}>
        <h2>Выберите тип бота</h2>
        <div className={s.types}>
          {botTypes.map((t) => (
            <button
              key={t.key}
              className={botType === t.key ? s.active : ""}
              onClick={() => {
                setBotType(t.key);
                setStep(1);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // итоговая сводка
  if (isComplete) {
    const label = botTypes.find((t) => t.key === botType)?.label;
    return (
      <div className={s.summary}>
        <h2>Сводка по Telegram-боту</h2>
        <p>
          <strong>Тип бота:</strong> {label}
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

  // шаги вопросов
  return (
    <div className={s.calc}>
      <div className={s.header}>
        <div className={s.progressBar}>
          <div className={s.fill} style={{ width: `${percent}%` }} />
        </div>
        <span className={s.progressText}>{percent}%</span>
      </div>

      <div className={s.body}>
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
        <button onClick={handlePrev}>
          {step <= 1 ? "← Выбрать тип" : "Назад"}
        </button>
        <button
          onClick={handleNext}
          disabled={
            !answers[questions[step - 1].key] &&
            !(
              questions[step - 1].multi &&
              answers[questions[step - 1].key]?.length
            )
          }
        >
          {step === totalSteps ? "Завершить" : "Далее"}
        </button>
      </div>
    </div>
  );
}
