// TokenomicsCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const tokenTypes = [
  { key: "meme", label: "Мем-токен" },
  { key: "nft", label: "NFT токен" },
  { key: "utility", label: "Утилитарный токен" },
  { key: "security", label: "Ценный (Security) токен" },
  { key: "governance", label: "Governance токен" },
];

const questionsMap = {
  utility: [
    {
      key: "supplyModel",
      multi: false,
      question: "Модель эмиссии токена",
      options: [
        { label: "Фиксированный запас", price: 0 },
        { label: "Инфляционный", price: 200 },
        { label: "Дефляционный (сжигание)", price: 300 },
      ],
    },
    {
      key: "totalSupply",
      multi: false,
      question: "Общий объём токенов",
      options: [
        { label: "до 1 M", price: 0 },
        { label: "1M–100M", price: 100 },
        { label: "100M+", price: 200 },
      ],
    },
    {
      key: "distribution",
      multi: true,
      question: "Распределение токенов",
      options: [
        { label: "Команда", price: 100 },
        { label: "Инвесторы", price: 100 },
        { label: "Экосистема", price: 100 },
        { label: "Ликвидность", price: 100 },
        { label: "Вознаграждения", price: 100 },
      ],
    },
    {
      key: "vesting",
      multi: false,
      question: "Вестинг для команды",
      options: [
        { label: "Нет", price: 0 },
        { label: "6 мес cliff + 1 год", price: 150 },
        { label: "1 год cliff + 2 года", price: 300 },
      ],
    },
    {
      key: "staking",
      multi: false,
      question: "Стейкинг и начисления",
      options: [
        { label: "Нет", price: 0 },
        { label: "Ежедневные 0.1%", price: 200 },
        { label: "Ежемесячные 3%", price: 150 },
      ],
    },
    {
      key: "referral",
      multi: false,
      question: "Реферальная программа",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (5%)", price: 100 },
        { label: "Advanced (10%)", price: 200 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Аудит смарт-контракта",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Full security audit", price: 500 },
      ],
    },
    {
      key: "listing",
      multi: false,
      question: "Листинг на DEX/CEX",
      options: [
        { label: "Нет", price: 0 },
        { label: "DEX (Uniswap, Pancake)", price: 200 },
        { label: "CEX (Binance, Coinbase)", price: 500 },
      ],
    },
  ],

  security: [
    {
      key: "compliance",
      multi: false,
      question: "KYC/AML верификация",
      options: [
        { label: "Нет", price: 0 },
        { label: "Упрощённая", price: 200 },
        { label: "Полная (VASP)", price: 500 },
      ],
    },
    {
      key: "supplyModel",
      multi: false,
      question: "Модель эмиссии",
      options: [
        { label: "Фиксированный запас", price: 0 },
        { label: "Инфляционный", price: 200 },
      ],
    },
    {
      key: "distribution",
      multi: true,
      question: "Распределение токенов",
      options: [
        { label: "Команда", price: 100 },
        { label: "Инвесторы", price: 100 },
        { label: "Регуляторы", price: 150 },
        { label: "Резерв", price: 100 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Аудит и юридическая проверка",
      options: [
        { label: "Только контракт", price: 200 },
        { label: "Контракт + юридика", price: 700 },
      ],
    },
    {
      key: "kycIntegration",
      multi: false,
      question: "Интеграция KYC-провайдера",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic API", price: 300 },
        { label: "Полная интеграция", price: 600 },
      ],
    },
    {
      key: "listing",
      multi: false,
      question: "Листинг",
      options: [
        { label: "Только DEX", price: 300 },
        { label: "DEX + CEX", price: 800 },
      ],
    },
  ],

  governance: [
    {
      key: "votingModel",
      multi: false,
      question: "Модель голосования",
      options: [
        { label: "По доле токенов", price: 0 },
        { label: "Quadratic Voting", price: 200 },
        { label: "DAO Framework", price: 400 },
      ],
    },
    {
      key: "treasury",
      multi: false,
      question: "Управление казной",
      options: [
        { label: "Нет", price: 0 },
        { label: "Мультисиг", price: 200 },
        { label: "DAO казна", price: 400 },
      ],
    },
    {
      key: "governanceToken",
      multi: false,
      question: "Тип токена",
      options: [
        { label: "Utility + Governance", price: 0 },
        { label: "Pure Governance", price: 200 },
      ],
    },
    {
      key: "proposalSystem",
      multi: false,
      question: "Система предложений",
      options: [
        { label: "Basic Issue Tracker", price: 100 },
        { label: "Full DAO Module", price: 300 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Аудит DAO-смартконтрактов",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да, security audit", price: 500 },
      ],
    },
  ],

  nft: [
    {
      key: "count",
      multi: false,
      question: "Количество NFT в коллекции",
      options: [
        { label: "до 100", price: 0 },
        { label: "100–1000", price: 200 },
        { label: "1000+", price: 400 },
      ],
    },
    {
      key: "metadata",
      multi: false,
      question: "Хостинг метаданных",
      options: [
        { label: "IPFS", price: 100 },
        { label: "Cloud Storage", price: 200 },
      ],
    },
    {
      key: "royalties",
      multi: false,
      question: "Настройка роялти",
      options: [
        { label: "Нет", price: 0 },
        { label: "5%", price: 50 },
        { label: "10%", price: 100 },
      ],
    },
    {
      key: "marketplace",
      multi: true,
      question: "Интеграции с маркетплейсами",
      options: [
        { label: "OpenSea", price: 100 },
        { label: "Rarible", price: 100 },
        { label: "Custom Frontend", price: 300 },
      ],
    },
    {
      key: "minting",
      multi: false,
      question: "Механизм чеканки",
      options: [
        { label: "Клиентская mint", price: 0 },
        { label: "Смарт-контракт mint", price: 200 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Аудит смарт-контрактов",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 500 },
      ],
    },
  ],

  meme: [
    {
      key: "prototype",
      multi: false,
      question: "Есть ли у вас прототип или дизайн?",
      options: [
        { label: "Да", price: 0 },
        { label: "Нужен wireframe", price: 100 },
        { label: "Хочу визуальный прототип", price: 200 },
      ],
    },
    {
      key: "totalSupply",
      multi: false,
      question: "Общий объём токенов",
      options: [
        { label: "1 000 000 000 (1B)", price: 0 },
        { label: "10 000 000 000 (10B)", price: 100 },
        { label: "100 000 000 000 (100B)", price: 200 },
      ],
    },
    {
      key: "transferTax",
      multi: false,
      question: "Налог при каждой транзакции",
      options: [
        { label: "Нет", price: 0 },
        { label: "1%", price: 100 },
        { label: "2%", price: 200 },
        { label: "5%", price: 500 },
      ],
    },
    {
      key: "autoLiquidity",
      multi: false,
      question: "Авто-ликвидность",
      options: [
        { label: "Нет", price: 0 },
        { label: "1% кажд. транзакции", price: 150 },
        { label: "2% кажд. транзакции", price: 300 },
      ],
    },
    {
      key: "marketingWallet",
      multi: false,
      question: "Маркетинговый кошелёк",
      options: [
        { label: "Нет", price: 0 },
        { label: "1% каждой транзакции", price: 150 },
        { label: "2% каждой транзакции", price: 300 },
      ],
    },
    {
      key: "reflection",
      multi: false,
      question: "Рефлективные вознаграждения",
      options: [
        { label: "Нет", price: 0 },
        { label: "1% держателям", price: 100 },
        { label: "2% держателям", price: 200 },
      ],
    },
    {
      key: "antiWhale",
      multi: false,
      question: "Anti-Whale механика (лимиты)",
      options: [
        { label: "Нет", price: 0 },
        { label: "Лимит 0.5% за транзакцию", price: 150 },
        { label: "Лимит 1%", price: 300 },
        { label: "Лимит 2%", price: 500 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Аудит смарт-контракта",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic security audit", price: 200 },
        { label: "Full security audit", price: 500 },
      ],
    },
    {
      key: "listing",
      multi: false,
      question: "Листинг токена",
      options: [
        { label: "DEX (Uniswap, Pancake)", price: 200 },
        { label: "DEX + CEX (Binance, Coinbase)", price: 500 },
      ],
    },
  ],
};

export default function TokenomicsCalc() {
  const [step, setStep] = useState(0);
  const [tokenType, setTokenType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = tokenType ? questionsMap[tokenType] : [];
  const totalSteps = questions.length;

  // считаем сумму
  const total = questions.reduce((sum, q) => {
    const ans = answers[q.key];
    if (!ans) return sum;
    return sum + (q.multi ? ans.reduce((s, o) => s + o.price, 0) : ans.price);
  }, 0);

  const percent = tokenType ? Math.round((step / totalSteps) * 100) : 0;

  // оповещаем родителя о новой сумме
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("calc:update", { detail: total }));
  }, [total]);

  // шаг вперёд
  const handleNext = () => {
    if (step === totalSteps) {
      setIsComplete(true);
      window.dispatchEvent(
        new CustomEvent("calc:complete", {
          detail: {
            service: `tokenomics:${tokenType}`,
            answers,
            total,
          },
        })
      );
    } else {
      setStep((s) => s + 1);
    }
  };

  // шаг назад
  const handlePrev = () => {
    if (step <= 1) {
      setTokenType(null);
      setStep(0);
    } else {
      setStep((s) => s - 1);
    }
  };

  // переключаем ответ
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

  // выбор типа токена
  if (!tokenType) {
    return (
      <div className={s.chooseType}>
        <h2>Тип токена</h2>
        <div className={s.types}>
          {tokenTypes.map((t) => (
            <button
              key={t.key}
              className={tokenType === t.key ? s.active : ""}
              onClick={() => {
                setTokenType(t.key);
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
    const label = tokenTypes.find((t) => t.key === tokenType)?.label;
    return (
      <div className={s.summary}>
        <h2>Сводка по токеномике</h2>
        <p>
          <strong>Тип токена:</strong> {label}
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
