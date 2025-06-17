// TelegramMiniAppCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const appTypes = [
  { key: "game", label: "Игра" },
  { key: "basic", label: "Обычный Telegram App" },
  { key: "clicker", label: "Кликер" },
  { key: "smart", label: "Telegram App + смарт-контракт" },
];

const questionsMap = {
  // === Игра ===
  game: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли у вас готовый прототип?",
      options: [
        { label: "Да", price: 0 },
        { label: "Нужен wireframe", price: 150 },
        { label: "Хочу визуальный прототип", price: 300 },
      ],
    },
    {
      key: "genre",
      multi: false,
      question: "Жанр игры",
      options: [
        { label: "Аркада", price: 200 },
        { label: "Пазл", price: 200 },
        { label: "Стратегия", price: 400 },
        { label: "Казуальная", price: 150 },
        { label: "Другой", price: 300 },
      ],
    },
    {
      key: "levels",
      multi: false,
      question: "Количество уровней / экранов",
      options: [
        { label: "1–5", price: 0 },
        { label: "6–10", price: 300 },
        { label: "10+", price: 600 },
      ],
    },
    {
      key: "graphics",
      multi: false,
      question: "Стиль графики",
      options: [
        { label: "Pixel-art", price: 200 },
        { label: "Cartoon/Vector", price: 400 },
        { label: "3D/Low-poly", price: 800 },
        { label: "Custom", price: 1200 },
      ],
    },
    {
      key: "animations",
      multi: false,
      question: "Анимации",
      options: [
        { label: "Нет", price: 0 },
        { label: "Sprite-анимации", price: 200 },
        { label: "Tween/JS-анимации", price: 400 },
        { label: "WebGL-анимации", price: 800 },
      ],
    },
    {
      key: "multiplayer",
      multi: false,
      question: "Мультиплеер",
      options: [
        { label: "Нет", price: 0 },
        { label: "Turn-based", price: 300 },
        { label: "Real-time", price: 600 },
      ],
    },
    {
      key: "inApp",
      multi: false,
      question: "Встроенные покупки",
      options: [
        { label: "Нет", price: 0 },
        { label: "Внутренняя валюта", price: 300 },
        { label: "Покупка токенов", price: 500 },
      ],
    },
    {
      key: "leaderboard",
      multi: false,
      question: "Таблица лидеров",
      options: [
        { label: "Нет", price: 0 },
        { label: "Локальная", price: 200 },
        { label: "Глобальная", price: 400 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Интеграции",
      options: [
        { label: "Telegram Bot API", price: 150 },
        { label: "Webhooks и сервер", price: 200 },
        { label: "Платежная система", price: 250 },
        { label: "Push-уведомления", price: 100 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Аналитика и отчёты",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (Google)", price: 100 },
        { label: "Advanced (Custom)", price: 200 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Тестирование",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Полное (авто+ручное)", price: 300 },
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
    {
      key: "design",
      multi: false,
      question: "UI/UX дизайн",
      options: [
        { label: "Шаблонный", price: 0 },
        { label: "Кастомный UI", price: 500 },
        { label: "Брендовый дизайн", price: 1000 },
      ],
    },
  ],

  // === Обычный Telegram App (Bot) ===
  basic: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли у вас прототип?",
      options: [
        { label: "Да", price: 0 },
        { label: "Нужен wireframe", price: 100 },
        { label: "Нужен UI-дизайн", price: 200 },
      ],
    },
    {
      key: "commands",
      multi: false,
      question: "Сколько команд бота?",
      options: [
        { label: "1–5", price: 0 },
        { label: "6–15", price: 200 },
        { label: "16–30", price: 400 },
        { label: "30+", price: 600 },
      ],
    },
    {
      key: "inlineMode",
      multi: false,
      question: "Inline режим",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 200 },
      ],
    },
    {
      key: "callback",
      multi: false,
      question: "Callback-кнопки",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 200 },
      ],
    },
    {
      key: "db",
      multi: false,
      question: "Хранение данных",
      options: [
        { label: "Нет", price: 0 },
        { label: "JSON-файл", price: 100 },
        { label: "PostgreSQL/MySQL", price: 300 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Интеграции",
      options: [
        { label: "Webhook", price: 150 },
        { label: "Платежи", price: 250 },
        { label: "Авторизация (OAuth)", price: 150 },
      ],
    },
    {
      key: "design",
      multi: false,
      question: "Кнопки и UI-дизайн",
      options: [
        { label: "Стандартные", price: 0 },
        { label: "Простые стили", price: 100 },
        { label: "Фирменные кнопки", price: 300 },
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
      key: "testing",
      multi: false,
      question: "Тестирование",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Автоматизированное", price: 200 },
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

  // === Кликер ===
  clicker: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли у вас прототип?",
      options: [
        { label: "Да", price: 0 },
        { label: "Нужен wireframe", price: 100 },
        { label: "Нужен UI-дизайн", price: 200 },
      ],
    },
    {
      key: "mechanics",
      multi: false,
      question: "Количество интерактивных элементов",
      options: [
        { label: "1 кнопка", price: 0 },
        { label: "2–3 кнопки", price: 100 },
        { label: "4+ кнопок", price: 200 },
      ],
    },
    {
      key: "graphics",
      multi: false,
      question: "Стиль графики",
      options: [
        { label: "Flat", price: 100 },
        { label: "Cartoon", price: 300 },
        { label: "Pixel-art", price: 200 },
      ],
    },
    {
      key: "animations",
      multi: false,
      question: "Анимации",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic sprite", price: 200 },
        { label: "Advanced tween", price: 400 },
      ],
    },
    {
      key: "rewards",
      multi: false,
      question: "Система наград",
      options: [
        { label: "Нет", price: 0 },
        { label: "Очки", price: 100 },
        { label: "Токены", price: 300 },
      ],
    },
    {
      key: "ads",
      multi: false,
      question: "Реклама",
      options: [
        { label: "Нет", price: 0 },
        { label: "Баннеры", price: 200 },
        { label: "Rewarded видео", price: 400 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Интеграции",
      options: [
        { label: "Telegram Bot API", price: 150 },
        { label: "Платежи", price: 250 },
        { label: "Webhooks", price: 200 },
      ],
    },
    {
      key: "design",
      multi: false,
      question: "UI-дизайн",
      options: [
        { label: "Шаблонный", price: 0 },
        { label: "Кастомный", price: 300 },
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
      key: "testing",
      multi: false,
      question: "Тестирование",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Automated", price: 200 },
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

  // === Telegram App + смарт-контракт ===
  smart: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли у вас прототип?",
      options: [
        { label: "Да", price: 0 },
        { label: "Нужен wireframe", price: 150 },
        { label: "Нужен UI-дизайн", price: 300 },
      ],
    },
    {
      key: "blockchain",
      multi: false,
      question: "Выберите блокчейн",
      options: [
        { label: "TON", price: 200 },
        { label: "Ethereum", price: 300 },
        { label: "BSC", price: 250 },
        { label: "Polygon", price: 250 },
      ],
    },
    {
      key: "smartContract",
      multi: false,
      question: "Сложность смарт-контрактов",
      options: [
        { label: "Платежи", price: 200 },
        { label: "Стейкинг", price: 400 },
        { label: "NFT", price: 600 },
        { label: "DAO", price: 800 },
      ],
    },
    {
      key: "walletIntegration",
      multi: false,
      question: "Интеграция кошельков",
      options: [
        { label: "Нет", price: 0 },
        { label: "TON Connect", price: 200 },
        { label: "WalletConnect", price: 200 },
        { label: "MetaMask", price: 200 },
      ],
    },
    {
      key: "screens",
      multi: false,
      question: "Количество экранов Mini App",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–6", price: 300 },
        { label: "7+", price: 600 },
      ],
    },
    {
      key: "design",
      multi: false,
      question: "UI/UX дизайн",
      options: [
        { label: "Шаблонный", price: 0 },
        { label: "Кастомный UI", price: 500 },
        { label: "Брендовый дизайн", price: 1000 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Интеграции",
      options: [
        { label: "Telegram Bot API", price: 150 },
        { label: "Blockchain API", price: 300 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Тестирование",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Automated", price: 200 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Security Audit",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 500 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Хостинг",
      options: [
        { label: "Shared", price: 100 },
        { label: "Cloud", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
  ],
};

export default function TelegramMiniAppCalc() {
  const [step, setStep] = useState(0);
  const [appType, setAppType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = appType ? questionsMap[appType] : [];
  const totalSteps = questions.length;

  // считаем итоговую сумму
  const total = questions.reduce((sum, q) => {
    const ans = answers[q.key];
    if (!ans) return sum;
    return sum + (q.multi ? ans.reduce((s, o) => s + o.price, 0) : ans.price);
  }, 0);

  // прогресс
  const percent = appType ? Math.round((step / totalSteps) * 100) : 0;

  // оповещаем родителя о новой сумме
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("calc:update", { detail: total }));
  }, [total]);

  // кнопка «Далее / Завершить»
  const handleNext = () => {
    if (step === totalSteps) {
      setIsComplete(true);
      window.dispatchEvent(
        new CustomEvent("calc:complete", {
          detail: {
            service: `telegram:${appType}`,
            answers,
            total,
          },
        })
      );
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  // кнопка «Назад»
  const handlePrev = () => {
    if (step <= 1) {
      setAppType(null);
      setStep(0);
    } else {
      setStep((s) => s - 1);
    }
  };

  // переключение ответов
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

  // === Рендер ===

  // шаг 0 — выбор типа Mini App
  if (!appType) {
    return (
      <div className={s.chooseType}>
        <h2>Тип Telegram Mini App</h2>
        <div className={s.types}>
          {appTypes.map((t) => (
            <button
              key={t.key}
              className={appType === t.key ? s.active : ""}
              onClick={() => {
                setAppType(t.key);
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

  // финальная сводка
  if (isComplete) {
    const typeLabel = appTypes.find((t) => t.key === appType)?.label || appType;
    return (
      <div className={s.summary}>
        <h2>Сводка по Mini App</h2>
        <p>
          <strong>Тип:</strong> {typeLabel}
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

  // сами вопросы
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
