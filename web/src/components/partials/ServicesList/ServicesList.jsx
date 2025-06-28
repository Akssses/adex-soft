"use client";

import React, { useRef, useEffect } from "react";
import {
  FaCode,
  FaChartPie,
  FaTelegramPlane,
  FaLaptopCode,
  FaPaintBrush,
  FaCoins,
  FaRobot,
  FaCube,
} from "react-icons/fa";
import s from "./ServicesList.module.scss";

const SERVICES = [
  {
    title: "Development & Integration",
    icon: FaCode,
    items: ["Smart Contracts", "dApp", "Wallet Integration", "Payment Systems"],
  },
  {
    title: "Tokenomics",
    icon: FaChartPie,
    items: ["Tokenomics Design", "Token Launch (ICO/IDO/IEO)"],
  },
  {
    title: "Telegram Mini App",
    icon: FaTelegramPlane,
    items: ["Mini App Development", "Blockchain Integration"],
  },
  {
    title: "Web Development",
    icon: FaLaptopCode,
    items: ["dApp Frontend", "Smart Contract API", "Landing Page"],
  },
  {
    title: "UX/UI Design",
    icon: FaPaintBrush,
    items: ["Web3 Interfaces", "Creative Prototypes"],
  },
  {
    title: "DeFi Solutions",
    icon: FaCoins,
    items: ["DEX & AMM Protocols", "Lending Platforms"],
  },
  {
    title: "Telegram Bots",
    icon: FaRobot,
    items: ["Mobile dApp", "Wallet SDK"],
  },
  {
    title: "NFT & Metaverse",
    icon: FaCube,
    items: ["NFT Platforms", "Interactive NFTs"],
  },
];

const MAGNETIC_EFFECT_RADIUS = 300;

function ServiceCard({ title, items, icon: Icon, onMouseMove, isHovered }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);

    onMouseMove({
      x: e.clientX,
      y: e.clientY,
      cardRect: rect,
      cardElement: ref.current,
    });
  };

  return (
    <div
      ref={ref}
      className={`${s.card} ${isHovered ? s.nearHover : ""}`}
      onMouseMove={handleMouseMove}
    >
      <div className={s.cardHeader}>
        <div className={s.iconWrapper}>
          <Icon className={s.icon} />
        </div>
        <h3 className={s.cardTitle}>{title}</h3>
      </div>
      {items.length > 0 && (
        <div className={s.subServices}>
          {items.map((i) => (
            <button key={i} className={s.subBtn}>
              {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServicesList() {
  const cardsContainerRef = useRef(null);
  const [hoveredCards, setHoveredCards] = React.useState(new Set());

  const handleCardMouseMove = ({ x, y, cardRect, cardElement }) => {
    if (!cardsContainerRef.current) return;

    const nearbyCards = new Set();
    const cards = cardsContainerRef.current.getElementsByClassName(s.card);

    Array.from(cards).forEach((card) => {
      if (card === cardElement) {
        nearbyCards.add(card);
        return;
      }

      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(x - cardCenterX, 2) + Math.pow(y - cardCenterY, 2)
      );

      if (distance < MAGNETIC_EFFECT_RADIUS) {
        nearbyCards.add(card);
      }
    });

    setHoveredCards(nearbyCards);
  };

  const handleContainerMouseLeave = () => {
    setHoveredCards(new Set());
  };

  return (
    <section className={`${s.servicesList} container`}>
      <header className={s.header}>
        <span className={s.subtitle}>Our Services</span>
        <h1 className={s.title}>
          Scale Your Business <br /> with Ease
        </h1>
      </header>

      <div
        ref={cardsContainerRef}
        className={s.services_cards}
        onMouseLeave={handleContainerMouseLeave}
      >
        <div className={s.row}>
          {SERVICES.slice(0, 2).map((svc) => (
            <ServiceCard
              {...svc}
              key={svc.title}
              onMouseMove={handleCardMouseMove}
              isHovered={Array.from(hoveredCards).some((card) =>
                card.textContent.includes(svc.title)
              )}
            />
          ))}
        </div>
        <div className={s.rowReverse}>
          {SERVICES.slice(2, 4).map((svc) => (
            <ServiceCard
              {...svc}
              key={svc.title}
              onMouseMove={handleCardMouseMove}
              isHovered={Array.from(hoveredCards).some((card) =>
                card.textContent.includes(svc.title)
              )}
            />
          ))}
        </div>
        <div className={s.grid4}>
          {SERVICES.slice(4).map((svc) => (
            <ServiceCard
              {...svc}
              key={svc.title}
              onMouseMove={handleCardMouseMove}
              isHovered={Array.from(hoveredCards).some((card) =>
                card.textContent.includes(svc.title)
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
