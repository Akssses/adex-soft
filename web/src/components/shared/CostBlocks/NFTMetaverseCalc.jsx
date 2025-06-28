// NFTMetaverseCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const nftTypes = [
  { key: "nftCollection", label: "NFT Collection" },
  { key: "metaverseWorld", label: "Metaverse: Virtual World" },
  { key: "metaverseAvatar", label: "Metaverse: Avatar" },
  { key: "economy", label: "Metaverse: Economy" },
  { key: "arvr", label: "AR/VR Experience" },
];

const questionsMap = {
  nftCollection: [
    {
      key: "size",
      multi: false,
      question: "Collection size",
      options: [
        { label: "up to 100", price: 0 },
        { label: "100–1000", price: 200 },
        { label: "1000+", price: 400 },
      ],
    },
    {
      key: "traits",
      multi: false,
      question: "Number of traits",
      options: [
        { label: "up to 5", price: 0 },
        { label: "6–15", price: 150 },
        { label: "16+", price: 300 },
      ],
    },
    {
      key: "generation",
      multi: false,
      question: "Generation algorithm",
      options: [
        { label: "Standard", price: 0 },
        { label: "Custom", price: 300 },
      ],
    },
    {
      key: "storage",
      multi: false,
      question: "Storage solution",
      options: [
        { label: "IPFS", price: 100 },
        { label: "Cloud Architecture", price: 200 },
      ],
    },
    {
      key: "minting",
      multi: false,
      question: "Minting type",
      options: [
        { label: "Client-side", price: 0 },
        { label: "Smart contract", price: 300 },
      ],
    },
    {
      key: "royalties",
      multi: false,
      question: "Royalties",
      options: [
        { label: "None", price: 0 },
        { label: "5%", price: 100 },
        { label: "10%", price: 200 },
      ],
    },
    {
      key: "marketplace",
      multi: true,
      question: "Marketplace integration",
      options: [
        { label: "OpenSea", price: 100 },
        { label: "Rarible", price: 100 },
        { label: "Custom Frontend", price: 300 },
      ],
    },
    {
      key: "audit",
      multi: false,
      question: "Smart contract audit",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Full", price: 500 },
      ],
    },
  ],

  metaverseWorld: [
    {
      key: "size",
      multi: false,
      question: "World size",
      options: [
        { label: "Small", price: 0 },
        { label: "Medium", price: 500 },
        { label: "Large", price: 1000 },
      ],
    },
    {
      key: "interaction",
      multi: false,
      question: "Interaction level",
      options: [
        { label: "Static", price: 0 },
        { label: "Objects and NPCs", price: 600 },
        { label: "Full VR interaction", price: 1200 },
      ],
    },
    {
      key: "multiplayer",
      multi: false,
      question: "Multiplayer",
      options: [
        { label: "None", price: 0 },
        { label: "Peer-to-peer", price: 400 },
        { label: "Server-based", price: 800 },
      ],
    },
    {
      key: "physics",
      multi: false,
      question: "Physics engine",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Advanced", price: 600 },
      ],
    },
    {
      key: "assets",
      multi: false,
      question: "3D assets",
      options: [
        { label: "up to 50", price: 0 },
        { label: "51–200", price: 400 },
        { label: "200+", price: 800 },
      ],
    },
    {
      key: "customization",
      multi: false,
      question: "World customization",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 500 },
      ],
    },
  ],

  metaverseAvatar: [
    {
      key: "models",
      multi: false,
      question: "Number of models",
      options: [
        { label: "up to 10", price: 0 },
        { label: "11–50", price: 300 },
        { label: "51+", price: 600 },
      ],
    },
    {
      key: "customization",
      multi: false,
      question: "Customization level",
      options: [
        { label: "Simple", price: 0 },
        { label: "Medium", price: 400 },
        { label: "Full", price: 800 },
      ],
    },
    {
      key: "animation",
      multi: false,
      question: "Animation",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Full Body", price: 600 },
      ],
    },
    {
      key: "physics",
      multi: false,
      question: "Physics",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Advanced", price: 400 },
      ],
    },
    {
      key: "nft",
      multi: false,
      question: "NFT integration",
      options: [
        { label: "None", price: 0 },
        { label: "Integrate NFT", price: 300 },
      ],
    },
  ],

  economy: [
    {
      key: "token",
      multi: false,
      question: "Token type",
      options: [
        { label: "None", price: 0 },
        { label: "ERC-20/BEP-20", price: 300 },
        { label: "Custom Token", price: 600 },
      ],
    },
    {
      key: "marketplace",
      multi: false,
      question: "Marketplace",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 400 },
        { label: "Advanced", price: 800 },
      ],
    },
    {
      key: "governance",
      multi: false,
      question: "Governance",
      options: [
        { label: "None", price: 0 },
        { label: "Basic voting", price: 300 },
        { label: "Full DAO", price: 600 },
      ],
    },
    {
      key: "rewards",
      multi: false,
      question: "Reward system",
      options: [
        { label: "None", price: 0 },
        { label: "Daily rewards", price: 200 },
        { label: "Staking rewards", price: 400 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Analytics",
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
      question: "Platform",
      options: [
        { label: "Web-AR", price: 0 },
        { label: "Mobile AR", price: 300 },
        { label: "VR headset", price: 600 },
      ],
    },
    {
      key: "controls",
      multi: false,
      question: "Controls",
      options: [
        { label: "Touch only", price: 0 },
        { label: "Gesture controls", price: 400 },
      ],
    },
    {
      key: "tracking",
      multi: false,
      question: "Object tracking",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 200 },
      ],
    },
    {
      key: "environment",
      multi: false,
      question: "Environment mapping",
      options: [
        { label: "None", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Advanced", price: 600 },
      ],
    },
    {
      key: "sharing",
      multi: false,
      question: "Social sharing",
      options: [
        { label: "None", price: 0 },
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
        <h2>NFT & Metaverse</h2>
        <div className={s.types}>
          {nftTypes.map((t) => (
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
    const label = nftTypes.find((t) => t.key === type)?.label;
    return (
      <div className={s.summary}>
        <h2>Summary of NFT & Metaverse</h2>
        <p>
          <strong>Direction:</strong> {label}
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
          {step <= 1 ? "← Choose direction" : "Back"}
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
