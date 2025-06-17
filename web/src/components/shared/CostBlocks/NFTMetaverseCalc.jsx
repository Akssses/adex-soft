// NFTMetaverseCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const nftMetaTypes = [
  { key: "nftCollection", label: "NFT-коллекция" },
  { key: "metaverseWorld", label: "Метаверс: виртуальный мир" },
  { key: "metaverseAvatar", label: "Метаверс: аватар" },
  { key: "economy", label: "Метаверс: экономика" },
  { key: "arvr", label: "AR/VR-опыт" },
];

const questionsMap = {
  nftCollection: [
    {
      key: "count",
      multi: false,
      question: "Размер коллекции",
      options: [
        { label: "до 100", price: 0 },
        { label: "100–1000", price: 200 },
        { label: "1000+", price: 400 },
      ],
    },
    {
      key: "traits",
      multi: false,
      question: "Кол-во атрибутов (traits)",
      options: [
        { label: "до 5", price: 0 },
        { label: "6–15", price: 150 },
        { label: "16+", price: 300 },
      ],
    },
    {
      key: "traitDesign",
      multi: false,
      question: "Дизайн атрибутов",
      options: [
        { label: "Стандартный", price: 0 },
        { label: "Кастомный", price: 300 },
      ],
    },
    {
      key: "metadata",
      multi: false,
      question: "Хостинг метаданных",
      options: [
        { label: "IPFS", price: 100 },
        { label: "Архитектура Cloud", price: 200 },
      ],
    },
    {
      key: "minting",
      multi: false,
      question: "Механизм minting",
      options: [
        { label: "Клиентский", price: 0 },
        { label: "Смарт-контракт", price: 300 },
      ],
    },
    {
      key: "royalties",
      multi: false,
      question: "Роялти",
      options: [
        { label: "Нет", price: 0 },
        { label: "5%", price: 100 },
        { label: "10%", price: 200 },
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
      key: "audit",
      multi: false,
      question: "Аудит смарт-контрактов",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Full", price: 500 },
      ],
    },
  ],

  metaverseWorld: [
    {
      key: "scale",
      multi: false,
      question: "Масштаб мира",
      options: [
        { label: "Маленький", price: 0 },
        { label: "Средний", price: 500 },
        { label: "Большой", price: 1000 },
      ],
    },
    {
      key: "interactivity",
      multi: false,
      question: "Уровень интерактивности",
      options: [
        { label: "Статичный", price: 0 },
        { label: "Объекты и NPC", price: 600 },
        { label: "Полный VR-интерактив", price: 1200 },
      ],
    },
    {
      key: "multiplayer",
      multi: false,
      question: "Мультиплеер",
      options: [
        { label: "Нет", price: 0 },
        { label: "Peer-to-peer", price: 400 },
        { label: "Серверный", price: 800 },
      ],
    },
    {
      key: "physics",
      multi: false,
      question: "Физический движок",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Advanced", price: 600 },
      ],
    },
    {
      key: "assets",
      multi: false,
      question: "Импорт 3D-ассетов",
      options: [
        { label: "до 50", price: 0 },
        { label: "51–200", price: 400 },
        { label: "200+", price: 800 },
      ],
    },
    {
      key: "vrSupport",
      multi: false,
      question: "Поддержка VR-устройств",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 500 },
      ],
    },
  ],

  metaverseAvatar: [
    {
      key: "avatarCount",
      multi: false,
      question: "Кол-во аватаров",
      options: [
        { label: "до 10", price: 0 },
        { label: "11–50", price: 300 },
        { label: "51+", price: 600 },
      ],
    },
    {
      key: "customization",
      multi: false,
      question: "Уровень кастомизации",
      options: [
        { label: "Простая", price: 0 },
        { label: "Средняя", price: 400 },
        { label: "Полная", price: 800 },
      ],
    },
    {
      key: "rigging",
      multi: false,
      question: "Скелетная анимация",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Full Body", price: 600 },
      ],
    },
    {
      key: "expressions",
      multi: false,
      question: "Морф-таргеты и эмоции",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Advanced", price: 400 },
      ],
    },
    {
      key: "blockchainId",
      multi: false,
      question: "Blockchain ID",
      options: [
        { label: "Нет", price: 0 },
        { label: "Integrate NFT", price: 300 },
      ],
    },
  ],

  economy: [
    {
      key: "tokenIntegration",
      multi: false,
      question: "Интеграция токена",
      options: [
        { label: "Нет", price: 0 },
        { label: "ERC-20/BEP-20", price: 300 },
        { label: "Custom Token", price: 600 },
      ],
    },
    {
      key: "marketplace",
      multi: false,
      question: "Встроенный маркетплейс",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 400 },
        { label: "Advanced", price: 800 },
      ],
    },
    {
      key: "governance",
      multi: false,
      question: "DAO-управление",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic voting", price: 300 },
        { label: "Full DAO", price: 600 },
      ],
    },
    {
      key: "rewards",
      multi: false,
      question: "Механизмы вознаграждений",
      options: [
        { label: "Нет", price: 0 },
        { label: "Daily rewards", price: 200 },
        { label: "Staking rewards", price: 400 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Аналитика экономики",
      options: [
        { label: "Basic", price: 0 },
        { label: "Advanced dashboard", price: 300 },
      ],
    },
  ],

  arvr: [
    {
      key: "platform",
      multi: false,
      question: "Платформа",
      options: [
        { label: "Web-AR", price: 0 },
        { label: "Mobile AR", price: 300 },
        { label: "VR headset", price: 600 },
      ],
    },
    {
      key: "interaction",
      multi: false,
      question: "Уровень взаимодействия",
      options: [
        { label: "Touch only", price: 0 },
        { label: "Gesture controls", price: 400 },
      ],
    },
    {
      key: "spatialAudio",
      multi: false,
      question: "Пространственный звук",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
      ],
    },
    {
      key: "tracking",
      multi: false,
      question: "Трекинг устройства",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Advanced", price: 600 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Аналитика опыта",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Full", price: 500 },
      ],
    },
  ],
};

export default function NFTMetaverseCalc() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = type ? questionsMap[type] : [];
  const totalSteps = questions.length;

  const total = questions.reduce((sum, q) => {
    const ans = answers[q.key];
    if (!ans) return sum;
    return sum + (q.multi ? ans.reduce((s, o) => s + o.price, 0) : ans.price);
  }, 0);

  const percent = type ? Math.round((step / totalSteps) * 100) : 0;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("calc:update", { detail: total }));
  }, [total]);

  const handleNext = () => {
    if (step === totalSteps) {
      setIsComplete(true);
      window.dispatchEvent(
        new CustomEvent("calc:complete", {
          detail: { service: `nftmeta:${type}`, answers, total },
        })
      );
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (step <= 1) {
      setType(null);
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

  if (!type) {
    return (
      <div className={s.chooseType}>
        <h2>NFT & Метаверс</h2>
        <div className={s.types}>
          {nftMetaTypes.map((t) => (
            <button
              key={t.key}
              className={type === t.key ? s.active : ""}
              onClick={() => {
                setType(t.key);
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

  if (isComplete) {
    const label = nftMetaTypes.find((t) => t.key === type)?.label;
    return (
      <div className={s.summary}>
        <h2>Сводка по NFT & Метаверс</h2>
        <p>
          <strong>Поднаправление:</strong> {label}
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
          {step <= 1 ? "← Выбрать поднаправление" : "Назад"}
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
