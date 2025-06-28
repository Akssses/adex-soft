// TokenomicsCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const tokenTypes = [
  { key: "meme", label: "Meme Token" },
  { key: "nft", label: "NFT Token" },
  { key: "utility", label: "Utility Token" },
  { key: "security", label: "Security Token" },
  { key: "governance", label: "Governance Token" },
];

const questionsMap = {
  utility: [
    {
      key: "supplyModel",
      multi: false,
      question: "Token emission model",
      options: [
        { label: "Fixed supply", price: 0 },
        { label: "Inflationary", price: 200 },
        { label: "Deflationary (burn)", price: 300 },
      ],
    },
    {
      key: "totalSupply",
      multi: false,
      question: "Total token supply",
      options: [
        { label: "up to 1M", price: 0 },
        { label: "1M–100M", price: 100 },
        { label: "100M+", price: 200 },
      ],
    },
    {
      key: "distribution",
      multi: true,
      question: "Token distribution",
      options: [
        { label: "Team", price: 100 },
        { label: "Investors", price: 100 },
        { label: "Ecosystem", price: 100 },
        { label: "Liquidity", price: 100 },
        { label: "Rewards", price: 100 },
      ],
    },
    {
      key: "vesting",
      multi: false,
      question: "Team vesting",
      options: [
        { label: "None", price: 0 },
        { label: "6 months cliff + 1 year", price: 150 },
        { label: "1 year cliff + 2 years", price: 300 },
      ],
    },
    {
      key: "staking",
      multi: false,
      question: "Staking and rewards",
      options: [
        { label: "None", price: 0 },
        { label: "Daily 0.1%", price: 200 },
        { label: "Monthly 3%", price: 150 },
      ],
    },
    {
      key: "referral",
      multi: false,
      question: "Referral program",
      options: [
        { label: "None", price: 0 },
        { label: "Basic (5%)", price: 100 },
        { label: "Advanced (10%)", price: 200 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Smart contract audit",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Full security audit", price: 500 },
      ],
    },
    {
      key: "listing",
      multi: false,
      question: "DEX/CEX listing",
      options: [
        { label: "None", price: 0 },
        { label: "DEX (Uniswap, Pancake)", price: 200 },
        { label: "CEX (Binance, Coinbase)", price: 500 },
      ],
    },
  ],

  security: [
    {
      key: "compliance",
      multi: false,
      question: "KYC/AML verification",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Full (VASP)", price: 500 },
      ],
    },
    {
      key: "supplyModel",
      multi: false,
      question: "Emission model",
      options: [
        { label: "Fixed supply", price: 0 },
        { label: "Inflationary", price: 200 },
      ],
    },
    {
      key: "distribution",
      multi: true,
      question: "Token distribution",
      options: [
        { label: "Team", price: 100 },
        { label: "Investors", price: 100 },
        { label: "Regulators", price: 150 },
        { label: "Reserve", price: 100 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Audit and legal review",
      options: [
        { label: "Contract only", price: 200 },
        { label: "Contract + legal", price: 700 },
      ],
    },
    {
      key: "kycIntegration",
      multi: false,
      question: "KYC provider integration",
      options: [
        { label: "None", price: 0 },
        { label: "Basic API", price: 300 },
        { label: "Full integration", price: 600 },
      ],
    },
    {
      key: "listing",
      multi: false,
      question: "Listing",
      options: [
        { label: "DEX only", price: 300 },
        { label: "DEX + CEX", price: 800 },
      ],
    },
  ],

  governance: [
    {
      key: "votingModel",
      multi: false,
      question: "Voting model",
      options: [
        { label: "Token share based", price: 0 },
        { label: "Quadratic Voting", price: 200 },
        { label: "DAO Framework", price: 400 },
      ],
    },
    {
      key: "treasury",
      multi: false,
      question: "Treasury management",
      options: [
        { label: "None", price: 0 },
        { label: "Multisig", price: 200 },
        { label: "DAO treasury", price: 400 },
      ],
    },
    {
      key: "governanceToken",
      multi: false,
      question: "Token type",
      options: [
        { label: "Utility + Governance", price: 0 },
        { label: "Pure Governance", price: 200 },
      ],
    },
    {
      key: "proposalSystem",
      multi: false,
      question: "Proposal system",
      options: [
        { label: "Basic Issue Tracker", price: 100 },
        { label: "Full DAO Module", price: 300 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "DAO smart contract audit",
      options: [
        { label: "None", price: 0 },
        { label: "Yes, security audit", price: 500 },
      ],
    },
  ],

  nft: [
    {
      key: "count",
      multi: false,
      question: "Number of NFTs in collection",
      options: [
        { label: "up to 100", price: 0 },
        { label: "100–1000", price: 200 },
        { label: "1000+", price: 400 },
      ],
    },
    {
      key: "metadata",
      multi: false,
      question: "Metadata hosting",
      options: [
        { label: "IPFS", price: 100 },
        { label: "Cloud Storage", price: 200 },
      ],
    },
    {
      key: "royalties",
      multi: false,
      question: "Royalties setup",
      options: [
        { label: "None", price: 0 },
        { label: "5%", price: 50 },
        { label: "10%", price: 100 },
      ],
    },
    {
      key: "marketplace",
      multi: true,
      question: "Marketplace integrations",
      options: [
        { label: "OpenSea", price: 100 },
        { label: "Rarible", price: 100 },
        { label: "Custom Frontend", price: 300 },
      ],
    },
    {
      key: "minting",
      multi: false,
      question: "Minting mechanism",
      options: [
        { label: "Client mint", price: 0 },
        { label: "Smart contract mint", price: 200 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Smart contract audit",
      options: [
        { label: "None", price: 0 },
        { label: "Yes", price: 500 },
      ],
    },
  ],

  meme: [
    {
      key: "prototype",
      multi: false,
      question: "Do you have a prototype or design?",
      options: [
        { label: "Yes", price: 0 },
        { label: "Need wireframe", price: 100 },
        { label: "Want visual prototype", price: 200 },
      ],
    },
    {
      key: "totalSupply",
      multi: false,
      question: "Total token supply",
      options: [
        { label: "1,000,000,000 (1B)", price: 0 },
        { label: "10,000,000,000 (10B)", price: 100 },
        { label: "100,000,000,000 (100B)", price: 200 },
      ],
    },
    {
      key: "transferTax",
      multi: false,
      question: "Tax on each transaction",
      options: [
        { label: "None", price: 0 },
        { label: "1%", price: 100 },
        { label: "2%", price: 200 },
        { label: "5%", price: 500 },
      ],
    },
    {
      key: "autoLiquidity",
      multi: false,
      question: "Auto-liquidity",
      options: [
        { label: "None", price: 0 },
        { label: "1% per transaction", price: 150 },
        { label: "2% per transaction", price: 300 },
      ],
    },
    {
      key: "marketingWallet",
      multi: false,
      question: "Marketing wallet",
      options: [
        { label: "None", price: 0 },
        { label: "1% per transaction", price: 150 },
        { label: "2% per transaction", price: 300 },
      ],
    },
    {
      key: "reflection",
      multi: false,
      question: "Reflection rewards",
      options: [
        { label: "None", price: 0 },
        { label: "1% holders", price: 100 },
        { label: "2% holders", price: 200 },
      ],
    },
    {
      key: "antiWhale",
      multi: false,
      question: "Anti-Whale mechanics (limits)",
      options: [
        { label: "None", price: 0 },
        { label: "0.5% limit per transaction", price: 150 },
        { label: "1% limit", price: 300 },
        { label: "2% limit", price: 500 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Smart contract audit",
      options: [
        { label: "None", price: 0 },
        { label: "Basic security audit", price: 200 },
        { label: "Full security audit", price: 500 },
      ],
    },
    {
      key: "listing",
      multi: false,
      question: "Token listing",
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
        <h2>Token type</h2>
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
        <h2>Tokenomics summary</h2>
        <p>
          <strong>Token type:</strong> {label}
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
          {step <= 1 ? "← Choose type" : "Back"}
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
          {step === totalSteps ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
