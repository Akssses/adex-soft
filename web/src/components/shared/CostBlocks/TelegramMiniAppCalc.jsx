// TelegramMiniAppCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const appTypes = [
  { key: "game", label: "Game" },
  { key: "basic", label: "Basic Telegram App" },
  { key: "clicker", label: "Clicker" },
  { key: "smart", label: "Telegram App + Smart Contract" },
];

const questionsMap = {
  // === Game ===
  game: [
    {
      key: "prototype",
      multi: false,
      question: "Do you have a prototype?",
      options: [
        { label: "Yes", price: 0 },
        { label: "Need wireframe", price: 150 },
        { label: "Want visual prototype", price: 300 },
      ],
    },
    {
      key: "genre",
      multi: false,
      question: "Game genre",
      options: [
        { label: "Arcade", price: 200 },
        { label: "Puzzle", price: 200 },
        { label: "Strategy", price: 400 },
        { label: "Casual", price: 150 },
        { label: "Other", price: 300 },
      ],
    },
    {
      key: "levels",
      multi: false,
      question: "Number of levels / screens",
      options: [
        { label: "1–5", price: 0 },
        { label: "6–10", price: 300 },
        { label: "10+", price: 600 },
      ],
    },
    {
      key: "graphics",
      multi: false,
      question: "Graphics style",
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
      question: "Animations",
      options: [
        { label: "None", price: 0 },
        { label: "Sprite animations", price: 200 },
        { label: "Tween/JS animations", price: 400 },
        { label: "WebGL animations", price: 800 },
      ],
    },
    {
      key: "multiplayer",
      multi: false,
      question: "Multiplayer",
      options: [
        { label: "None", price: 0 },
        { label: "Turn-based", price: 300 },
        { label: "Real-time", price: 600 },
      ],
    },
    {
      key: "inApp",
      multi: false,
      question: "In-app purchases",
      options: [
        { label: "None", price: 0 },
        { label: "Internal currency", price: 300 },
        { label: "Token purchases", price: 500 },
      ],
    },
    {
      key: "leaderboard",
      multi: false,
      question: "Leaderboard",
      options: [
        { label: "None", price: 0 },
        { label: "Local", price: 200 },
        { label: "Global", price: 400 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Integrations",
      options: [
        { label: "Telegram Bot API", price: 150 },
        { label: "Webhooks and server", price: 200 },
        { label: "Payment system", price: 250 },
        { label: "Push notifications", price: 100 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Analytics and reports",
      options: [
        { label: "None", price: 0 },
        { label: "Basic (Google)", price: 100 },
        { label: "Advanced (Custom)", price: 200 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Testing",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Full (auto+manual)", price: 300 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Hosting",
      options: [
        { label: "Shared", price: 100 },
        { label: "VPS", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
    {
      key: "design",
      multi: false,
      question: "UI/UX design",
      options: [
        { label: "Template", price: 0 },
        { label: "Custom UI", price: 500 },
        { label: "Brand design", price: 1000 },
      ],
    },
  ],

  // === Basic Telegram App (Bot) ===
  basic: [
    {
      key: "prototype",
      multi: false,
      question: "Do you have a prototype?",
      options: [
        { label: "Yes", price: 0 },
        { label: "Need wireframe", price: 100 },
        { label: "Need UI design", price: 200 },
      ],
    },
    {
      key: "commands",
      multi: false,
      question: "Number of bot commands",
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
      question: "Inline mode",
      options: [
        { label: "No", price: 0 },
        { label: "Yes", price: 200 },
      ],
    },
    {
      key: "callback",
      multi: false,
      question: "Callback buttons",
      options: [
        { label: "No", price: 0 },
        { label: "Yes", price: 200 },
      ],
    },
    {
      key: "db",
      multi: false,
      question: "Data storage",
      options: [
        { label: "None", price: 0 },
        { label: "JSON file", price: 100 },
        { label: "PostgreSQL/MySQL", price: 300 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Integrations",
      options: [
        { label: "Webhook", price: 150 },
        { label: "Payments", price: 250 },
        { label: "Authorization (OAuth)", price: 150 },
      ],
    },
    {
      key: "design",
      multi: false,
      question: "Buttons and UI design",
      options: [
        { label: "Standard", price: 0 },
        { label: "Simple styles", price: 100 },
        { label: "Custom buttons", price: 300 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Analytics",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Advanced", price: 200 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Testing",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Automated", price: 200 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Hosting",
      options: [
        { label: "Shared", price: 100 },
        { label: "VPS", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
  ],

  // === Clicker ===
  clicker: [
    {
      key: "prototype",
      multi: false,
      question: "Do you have a prototype / design?",
      options: [
        { label: "Yes", price: 0 },
        { label: "Need wireframe", price: 100 },
        { label: "Need visual design", price: 200 },
      ],
    },
    {
      key: "mechanics",
      multi: false,
      question: "Number of interactive elements",
      options: [
        { label: "1 button", price: 0 },
        { label: "2–3 buttons", price: 100 },
        { label: "4+ buttons", price: 200 },
      ],
    },
    {
      key: "graphics",
      multi: false,
      question: "Graphics style",
      options: [
        { label: "Flat", price: 100 },
        { label: "Cartoon", price: 300 },
        { label: "Pixel-art", price: 200 },
      ],
    },
    {
      key: "animations",
      multi: false,
      question: "Animations",
      options: [
        { label: "None", price: 0 },
        { label: "Basic sprite", price: 200 },
        { label: "Advanced tween", price: 400 },
      ],
    },
    {
      key: "rewards",
      multi: false,
      question: "Reward system",
      options: [
        { label: "None", price: 0 },
        { label: "Points", price: 100 },
        { label: "Tokens", price: 300 },
      ],
    },
    {
      key: "ads",
      multi: false,
      question: "Advertising",
      options: [
        { label: "None", price: 0 },
        { label: "Banners", price: 200 },
        { label: "Rewarded video", price: 400 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Integrations",
      options: [
        { label: "Telegram Bot API", price: 150 },
        { label: "Payments", price: 250 },
        { label: "Webhooks", price: 200 },
      ],
    },
    {
      key: "design",
      multi: false,
      question: "UI design",
      options: [
        { label: "Template", price: 0 },
        { label: "Custom", price: 300 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Analytics",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Advanced", price: 200 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Testing",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Automated", price: 200 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Hosting",
      options: [
        { label: "Shared", price: 100 },
        { label: "VPS", price: 300 },
        { label: "Dedicated", price: 500 },
      ],
    },
  ],

  // === Telegram App + Smart Contract ===
  smart: [
    {
      key: "prototype",
      multi: false,
      question: "Do you have a prototype?",
      options: [
        { label: "Yes", price: 0 },
        { label: "Need wireframe", price: 150 },
        { label: "Need UI design", price: 300 },
      ],
    },
    {
      key: "blockchain",
      multi: false,
      question: "Choose blockchain",
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
      question: "Smart contract complexity",
      options: [
        { label: "Payments", price: 200 },
        { label: "Staking", price: 400 },
        { label: "NFT", price: 600 },
        { label: "DAO", price: 800 },
      ],
    },
    {
      key: "walletIntegration",
      multi: false,
      question: "Wallet integration",
      options: [
        { label: "None", price: 0 },
        { label: "TON Connect", price: 200 },
        { label: "WalletConnect", price: 200 },
        { label: "MetaMask", price: 200 },
      ],
    },
    {
      key: "screens",
      multi: false,
      question: "Number of Mini App screens",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–6", price: 300 },
        { label: "7+", price: 600 },
      ],
    },
    {
      key: "design",
      multi: false,
      question: "UI/UX design",
      options: [
        { label: "Template", price: 0 },
        { label: "Custom UI", price: 500 },
        { label: "Brand design", price: 1000 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Integrations",
      options: [
        { label: "Telegram Bot API", price: 150 },
        { label: "Blockchain API", price: 300 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Testing",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 100 },
        { label: "Automated", price: 200 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Security Audit",
      options: [
        { label: "None", price: 0 },
        { label: "Yes", price: 500 },
      ],
    },
    {
      key: "hosting",
      multi: false,
      question: "Hosting",
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
        <h2>Type Telegram Mini App</h2>
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
        <h2>Summary of Mini App</h2>
        <p>
          <strong>Type:</strong> {typeLabel}
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
          <strong>Total cost:</strong> ${total}
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
          {step <= 1 ? "← Select type" : "Back"}
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
          {step === totalSteps ? "Complete" : "Next"}
        </button>
      </div>
    </div>
  );
}
