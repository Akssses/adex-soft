// WebDevCalcUpdated.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const siteTypes = [
  { label: "Landing page", key: "landing" },
  { label: "Multi-page website", key: "multi" },
  { label: "E-commerce", key: "ecommerce" },
  { label: "SaaS platform", key: "saas" },
];

/** Questions for Landing */
const landingQuestions = [
  {
    key: "prototype",
    multi: false,
    question: "Do you have a website prototype?",
    options: [
      { label: "Yes", price: 0 },
      { label: "Need wireframe", price: 50 },
      { label: "Want visual prototype", price: 100 },
    ],
  },
  {
    key: "blocks",
    multi: false,
    question: "How many blocks on the page?",
    options: [
      { label: "1–3 blocks", price: 100 },
      { label: "4–6 blocks", price: 200 },
      { label: "7+ blocks", price: 300 },
    ],
  },
  {
    key: "responsive",
    multi: false,
    question: "Do you need responsive design?",
    options: [
      { label: "Desktop only", price: 0 },
      { label: "Desktop + mobile", price: 0 },
      { label: "All devices", price: 100 },
    ],
  },
  {
    key: "design",
    multi: false,
    question: "Choose design style",
    options: [
      { label: "Template", price: 0 },
      { label: "Custom UX/UI", price: 400 },
      { label: "Brand-UI kit", price: 800 },
    ],
  },
  {
    key: "animation",
    multi: false,
    question: "Do you need animations and interactivity?",
    options: [
      { label: "None", price: 0 },
      { label: "CSS animations", price: 50 },
      { label: "JS animations", price: 100 },
    ],
  },
  {
    key: "integrations",
    multi: true,
    question: "External service integrations",
    options: [
      { label: "Contact form", price: 100 },
      { label: "Chat (Telegram/WhatsApp)", price: 50 },
      { label: "CRM / API", price: 200 },
      { label: "AI assistant", price: 200 },
      { label: "Payment system", price: 300 },
    ],
  },
  {
    key: "i18n",
    multi: false,
    question: "Multi-language support",
    options: [
      { label: "None", price: 0 },
      { label: "2 languages", price: 200 },
      { label: "3+ languages", price: 300 },
      { label: "5+ languages", price: 450 },
    ],
  },
  {
    key: "cms",
    multi: false,
    question: "CMS / admin panel",
    options: [
      { label: "No CMS", price: 0 },
      { label: "WordPress / Tilda", price: 200 },
      { label: "Custom CMS", price: 400 },
    ],
  },
  {
    key: "seo",
    multi: false,
    question: "SEO optimization",
    options: [
      { label: "No SEO", price: 0 },
      { label: "Basic (meta tags)", price: 50 },
      { label: "Advanced (keywords+content)", price: 300 },
    ],
  },
  {
    key: "hosting",
    multi: false,
    question: "Domain and hosting",
    options: [
      { label: "Not needed", price: 0 },
      { label: "Help with selection", price: 0 },
      { label: "Setup and configuration", price: 100 },
    ],
  },
];

/** Questions for Multi-page website */
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
    question: "How many pages on the website?",
    options: [
      { label: "1–3 pages", price: 0 },
      { label: "4–7 pages", price: 800 },
      { label: "8+ pages", price: 1500 },
    ],
  },
  // reuse adaptiveness, design etc. from landing
  ...landingQuestions.slice(2),
];

/** Questions for E-commerce */
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
    question: "How many products in catalog?",
    options: [
      { label: "up to 50", price: 0 },
      { label: "50–200", price: 500 },
      { label: "200+", price: 1000 },
    ],
  },
  // adaptiveness, design, animation and basic integrations from landing
  ...landingQuestions.slice(2),
  {
    key: "ecomIntegrations",
    multi: true,
    question: "E-commerce integrations",
    options: [
      { label: "Payment gateway", price: 300 },
      { label: "Inventory management", price: 200 },
      { label: "Order shipping (API)", price: 150 },
      { label: "Reviews and ratings", price: 100 },
    ],
  },
];

/** Questions for SaaS platform with increased prices */
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
    question: "How many modules / sections?",
    options: [
      { label: "1–3 modules", price: 0 },
      { label: "4–6 modules", price: 600 },
      { label: "7+ modules", price: 1200 },
    ],
  },
  {
    key: "users",
    multi: false,
    question: "User role complexity",
    options: [
      { label: "1 level", price: 0 },
      { label: "2–3 levels", price: 300 },
      { label: "3+ levels", price: 600 },
    ],
  },
  // redefine adaptiveness: higher cost
  {
    key: "responsive",
    multi: false,
    question: "Do you need responsive design?",
    options: [
      { label: "Desktop only", price: 0 },
      { label: "Desktop + mobile", price: 0 },
      { label: "All devices", price: 200 }, // instead of 100
    ],
  },
  // redefine design: higher cost
  {
    key: "design",
    multi: false,
    question: "Choose design style",
    options: [
      { label: "Template", price: 0 },
      { label: "Custom UX/UI", price: 800 }, // instead of 400
      { label: "Premium Brand-UI Kit", price: 1600 }, // instead of 800
    ],
  },
  // redefine animation: higher cost
  {
    key: "animation",
    multi: false,
    question: "Do you need animations and interactivity?",
    options: [
      { label: "None", price: 0 },
      { label: "CSS animations", price: 100 }, // instead of 50
      { label: "JS animations", price: 200 }, // instead of 100
    ],
  },
  {
    key: "saasIntegrations",
    multi: true,
    question: "SaaS integrations",
    options: [
      { label: "Payments and billing", price: 300 },
      { label: "Notifications (email/Push)", price: 200 },
      { label: "Developer API", price: 400 },
      { label: "CRM / ERP", price: 250 },
    ],
  },
  // other options (i18n, hosting) can be taken from landing or set custom ones:
  {
    key: "i18n",
    multi: false,
    question: landingQuestions[6].question,
    options: landingQuestions[6].options,
  },
  {
    key: "hosting",
    multi: false,
    question: "Hosting for SaaS",
    options: [
      { label: "Shared hosting", price: 100 },
      { label: "Cloud (AWS/GCP)", price: 300 },
      { label: "Dedicated server", price: 500 },
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
        <h2>Summary</h2>
        <p>
          <strong>Service:</strong> {label}
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
            <h2>Website type</h2>
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
          Back
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
          {step === totalSteps ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
