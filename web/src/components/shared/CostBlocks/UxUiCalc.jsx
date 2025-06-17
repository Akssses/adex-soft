"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const designTypes = [
  { key: "landing", label: "Дизайн лендинга" },
  { key: "mobile", label: "Дизайн мобильного приложения" },
  { key: "dashboard", label: "Дизайн дашборда" },
  { key: "system", label: "Design System" },
];

const questionsMap = {
  landing: [
    {
      key: "fidelity",
      multi: false,
      question: "Уровень детализации",
      options: [
        { label: "Wireframe", price: 0 },
        { label: "Визуальный макет", price: 300 },
        { label: "Интерактивный прототип", price: 600 },
      ],
    },
    {
      key: "sections",
      multi: false,
      question: "Количество секций",
      options: [
        { label: "1–3 секции", price: 0 },
        { label: "4–6 секций", price: 200 },
        { label: "7+ секций", price: 400 },
      ],
    },
    {
      key: "responsive",
      multi: false,
      question: "Адаптивная верстка",
      options: [
        { label: "Только десктоп", price: 0 },
        { label: "Десктоп + планшет", price: 100 },
        { label: "Все устройства", price: 300 },
      ],
    },
    {
      key: "interactive",
      multi: false,
      question: "Интерактивный прототип",
      options: [
        { label: "Нет", price: 0 },
        { label: "Кликабельный", price: 200 },
        { label: "С анимациями переходов", price: 400 },
      ],
    },
    {
      key: "animations",
      multi: false,
      question: "Micro-анимации",
      options: [
        { label: "Нет", price: 0 },
        { label: "Базовые", price: 100 },
        { label: "Сложные", price: 300 },
      ],
    },
    {
      key: "brand",
      multi: false,
      question: "Brand identity",
      options: [
        { label: "Нет", price: 0 },
        { label: "Частичное", price: 200 },
        { label: "Полное", price: 500 },
      ],
    },
    {
      key: "handoff",
      multi: false,
      question: "Передача разработчикам",
      options: [
        { label: "Figma-файл", price: 0 },
        { label: "Figma + спецификации", price: 100 },
        { label: "Figma + Dev Kit", price: 200 },
      ],
    },
  ],
  mobile: [
    {
      key: "screens",
      multi: false,
      question: "Количество экранов",
      options: [
        { label: "1–5", price: 0 },
        { label: "6–15", price: 300 },
        { label: "16+", price: 600 },
      ],
    },
    {
      key: "platforms",
      multi: false,
      question: "Платформы",
      options: [
        { label: "iOS", price: 0 },
        { label: "Android", price: 0 },
        { label: "iOS + Android", price: 200 },
      ],
    },
    {
      key: "fidelity",
      multi: false,
      question: "Уровень детализации",
      options: [
        { label: "Wireframe", price: 0 },
        { label: "Mockup", price: 400 },
        { label: "Prototype", price: 800 },
      ],
    },
    {
      key: "interactive",
      multi: false,
      question: "Интерактивность",
      options: [
        { label: "Нет", price: 0 },
        { label: "Кликабельный", price: 300 },
        { label: "С анимациями", price: 600 },
      ],
    },
    {
      key: "system",
      multi: false,
      question: "Design System",
      options: [
        { label: "Нет", price: 0 },
        { label: "Базовый", price: 300 },
        { label: "Полный", price: 600 },
      ],
    },
    {
      key: "animations",
      multi: false,
      question: "Анимации",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 150 },
        { label: "Advanced", price: 400 },
      ],
    },
    {
      key: "handoff",
      multi: false,
      question: "Передача",
      options: [
        { label: "Figma", price: 0 },
        { label: "Zeplin", price: 100 },
        { label: "Dev Kit", price: 200 },
      ],
    },
  ],
  dashboard: [
    {
      key: "pages",
      multi: false,
      question: "Количество страниц",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–7", price: 300 },
        { label: "8+", price: 600 },
      ],
    },
    {
      key: "charts",
      multi: false,
      question: "Data-визуализации",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (графики)", price: 200 },
        { label: "Advanced (панели)", price: 400 },
      ],
    },
    {
      key: "roles",
      multi: false,
      question: "Роли пользователей",
      options: [
        { label: "Одна", price: 0 },
        { label: "Несколько", price: 300 },
      ],
    },
    {
      key: "fidelity",
      multi: false,
      question: "Уровень детализации",
      options: [
        { label: "Mockup", price: 0 },
        { label: "Prototype", price: 500 },
      ],
    },
    {
      key: "interactive",
      multi: false,
      question: "Интерактивность",
      options: [
        { label: "Нет", price: 0 },
        { label: "Да", price: 300 },
      ],
    },
    {
      key: "styleguide",
      multi: false,
      question: "Style Guide",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Полный", price: 500 },
      ],
    },
    {
      key: "handoff",
      multi: false,
      question: "Передача",
      options: [
        { label: "Figma", price: 0 },
        { label: "Zeplin", price: 100 },
        { label: "Dev Kit", price: 200 },
      ],
    },
  ],
  system: [
    {
      key: "components",
      multi: false,
      question: "Компонентов",
      options: [
        { label: "до 10", price: 0 },
        { label: "11–30", price: 500 },
        { label: "30+", price: 1000 },
      ],
    },
    {
      key: "variants",
      multi: false,
      question: "Варианты темы",
      options: [
        { label: "Только light", price: 0 },
        { label: "Light + dark", price: 300 },
        { label: "Custom themes", price: 600 },
      ],
    },
    {
      key: "tokens",
      multi: false,
      question: "Design Tokens",
      options: [
        { label: "Нет", price: 0 },
        { label: "Стили", price: 200 },
        { label: "Полный набор", price: 400 },
      ],
    },
    {
      key: "documentation",
      multi: false,
      question: "Документация",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Полная", price: 500 },
      ],
    },
    {
      key: "handoff",
      multi: false,
      question: "Передача",
      options: [
        { label: "Figma", price: 0 },
        { label: "Storybook", price: 200 },
        { label: "Dev Kit", price: 400 },
      ],
    },
  ],
};

export default function UxUiCalc() {
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
          detail: {
            service: `uxui:${type}`,
            answers,
            total,
          },
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
        <h2>Выберите тип дизайна</h2>
        <div className={s.types}>
          {designTypes.map((t) => (
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
    const label = designTypes.find((t) => t.key === type)?.label;
    return (
      <div className={s.summary}>
        <h2>Сводка по UX/UI дизайну</h2>
        <p>
          <strong>Тип:</strong> {label}
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
