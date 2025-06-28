// DeFiCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const defiTypes = [
  { key: "lending", label: "Lending/Borrowing" },
  { key: "dex", label: "Decentralized Exchange (DEX)" },
  { key: "yield", label: "Yield Farming" },
  { key: "staking", label: "Staking Platform" },
  { key: "aggregator", label: "Aggregator/Router" },
];

const questionsMap = {
  lending: [
    {
      key: "collateral",
      multi: false,
      question: "Collateral type",
      options: [
        { label: "Single-asset", price: 0 },
        { label: "Multi-asset", price: 300 },
      ],
    },
    {
      key: "interestModel",
      multi: false,
      question: "Interest rate model",
      options: [
        { label: "Fixed", price: 0 },
        { label: "Variable", price: 200 },
        { label: "Hybrid", price: 400 },
      ],
    },
    {
      key: "oracle",
      multi: false,
      question: "Price oracles",
      options: [
        { label: "Chainlink", price: 200 },
        { label: "Band Protocol", price: 200 },
        { label: "Custom Oracle", price: 400 },
      ],
    },
    {
      key: "liquidation",
      multi: false,
      question: "Liquidation mechanism",
      options: [
        { label: "Simple", price: 0 },
        { label: "Dutch auction", price: 300 },
      ],
    },
    {
      key: "fees",
      multi: false,
      question: "Fees",
      options: [
        { label: "None", price: 0 },
        { label: "Basic (0.1%)", price: 100 },
        { label: "Custom", price: 200 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Smart contract audit",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Full", price: 600 },
      ],
    },
  ],

  dex: [
    {
      key: "pairs",
      multi: false,
      question: "Number of trading pairs",
      options: [
        { label: "1–5", price: 0 },
        { label: "6–20", price: 400 },
        { label: "21+", price: 800 },
      ],
    },
    {
      key: "amm",
      multi: false,
      question: "AMM type",
      options: [
        { label: "Constant product", price: 0 },
        { label: "Stable swap", price: 300 },
        { label: "Hybrid", price: 500 },
      ],
    },
    {
      key: "ui",
      multi: false,
      question: "Exchange UI/UX design",
      options: [
        { label: "Basic", price: 0 },
        { label: "Advanced", price: 300 },
        { label: "Custom theme", price: 600 },
      ],
    },
    {
      key: "slippage",
      multi: false,
      question: "Slippage settings",
      options: [
        { label: "None", price: 0 },
        { label: "Manual", price: 100 },
        { label: "Auto-adjust", price: 300 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Built-in analytics",
      options: [
        { label: "None", price: 0 },
        { label: "Basic charts", price: 200 },
        { label: "Full dashboard", price: 500 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Audit and testing",
      options: [
        { label: "Basic", price: 300 },
        { label: "Security audit", price: 700 },
      ],
    },
  ],

  yield: [
    {
      key: "strategies",
      multi: false,
      question: "Number of strategies",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–7", price: 500 },
        { label: "8+", price: 1000 },
      ],
    },
    {
      key: "compounding",
      multi: false,
      question: "Auto-compounding",
      options: [
        { label: "No", price: 0 },
        { label: "Yes", price: 300 },
      ],
    },
    {
      key: "rewardToken",
      multi: false,
      question: "Reward token",
      options: [
        { label: "Use existing", price: 0 },
        { label: "Create new", price: 400 },
      ],
    },
    {
      key: "feeModel",
      multi: false,
      question: "Fee model",
      options: [
        { label: "No fees", price: 0 },
        { label: "Performance fee", price: 200 },
        { label: "Withdrawal fee", price: 100 },
      ],
    },
    {
      key: "ui",
      multi: false,
      question: "UI Dashboard",
      options: [
        { label: "Basic", price: 0 },
        { label: "Advanced", price: 300 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Smart contract audit",
      options: [
        { label: "Basic", price: 300 },
        { label: "Full", price: 600 },
      ],
    },
  ],

  staking: [
    {
      key: "tokenType",
      multi: false,
      question: "Staking token type",
      options: [
        { label: "Existing", price: 0 },
        { label: "New token", price: 300 },
      ],
    },
    {
      key: "rewardSchedule",
      multi: false,
      question: "Reward schedule",
      options: [
        { label: "Fixed APR", price: 0 },
        { label: "Variable APY", price: 200 },
        { label: "Hybrid", price: 400 },
      ],
    },
    {
      key: "lockup",
      multi: false,
      question: "Lock-up period",
      options: [
        { label: "None", price: 0 },
        { label: "30 days", price: 100 },
        { label: "90 days", price: 200 },
      ],
    },
    {
      key: "slashing",
      multi: false,
      question: "Slashing mechanism",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Advanced", price: 400 },
      ],
    },
    {
      key: "ui",
      multi: false,
      question: "Staking UI",
      options: [
        { label: "Basic", price: 0 },
        { label: "Detailed dashboard", price: 300 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Audit",
      options: [
        { label: "Basic", price: 300 },
        { label: "Security audit", price: 600 },
      ],
    },
  ],

  aggregator: [
    {
      key: "sources",
      multi: false,
      question: "Number of DEX sources",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–7", price: 500 },
        { label: "8+", price: 1000 },
      ],
    },
    {
      key: "routingAlgo",
      multi: false,
      question: "Routing algorithm",
      options: [
        { label: "Simple", price: 0 },
        { label: "Best price", price: 300 },
        { label: "Custom logic", price: 600 },
      ],
    },
    {
      key: "slippageControl",
      multi: false,
      question: "Slippage control",
      options: [
        { label: "None", price: 0 },
        { label: "Manual", price: 100 },
        { label: "Auto-adjust", price: 300 },
      ],
    },
    {
      key: "gasOptimization",
      multi: false,
      question: "Gas optimization",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Advanced", price: 400 },
      ],
    },
    {
      key: "ui",
      multi: false,
      question: "UI interface",
      options: [
        { label: "Basic", price: 0 },
        { label: "Advanced", price: 300 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Audit",
      options: [
        { label: "Basic", price: 300 },
        { label: "Security audit", price: 700 },
      ],
    },
  ],
};

export default function DeFiCalc() {
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
          detail: { service: `defi:${type}`, answers, total },
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
        <h2>DeFi: select subdirection</h2>
        <div className={s.types}>
          {defiTypes.map((t) => (
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
    const label = defiTypes.find((t) => t.key === type)?.label;
    return (
      <div className={s.summary}>
        <h2>Summary of DeFi</h2>
        <p>
          <strong>Subdirection:</strong> {label}
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
