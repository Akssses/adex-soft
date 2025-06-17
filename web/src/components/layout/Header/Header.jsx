"use client";

import React, { useEffect, useState, useRef } from "react";
import s from "./Header.module.scss";
import {
  FaCode,
  FaChartPie,
  FaTelegramPlane,
  FaLaptopCode,
  FaPaintBrush,
  FaCoins,
  FaRobot,
  FaCube,
  FaGlobe,
} from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import RequesForm from "@/components/shared/RequesForm/RequesForm";
import Link from "next/link";

const SERVICES = [
  {
    title: "Разработка и интеграция",
    icon: FaCode,
    items: ["Смарт-контракты", "dApp", "Интеграция кошельков"],
  },
  {
    title: "Токеномика",
    icon: FaChartPie,
    items: ["Проектирование токеномики", "Запуск токенов (ICO/IDO/IEO)"],
  },
  {
    title: "Telegram Mini Apps",
    icon: FaTelegramPlane,
    items: ["Mini App разработка", "Blockchain-интеграция"],
  },
  {
    title: "Веб-разработка",
    icon: FaLaptopCode,
    items: ["dApp frontend", "Smart-contract API"],
  },
  {
    title: "UX/UI дизайн",
    icon: FaPaintBrush,
    items: ["Web3 интерфейсы", "Креативные прототипы"],
  },
  {
    title: "DeFi-решения",
    icon: FaCoins,
    items: ["DEX и AMM-протоколы", "Лендинговые платформы"],
  },
  {
    title: "Тегеграм боты",
    icon: FaRobot,
    items: ["Mobile dApp", "Wallet SDK"],
  },
  {
    title: "NFT и метаверс",
    icon: FaCube,
    items: ["Платформы для NFT", "Интерактивные NFT"],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentLang, setCurrentLang] = useState("RU");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const wrapperRef = useRef(null);
  const langRef = useRef(null);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
        <div className={`${s.header_block} container`}>
          <ul className={s.nav}>
            <li
              className={s.dropdown}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              ref={wrapperRef}
            >
              Что мы делаем?
              {dropdownOpen && (
                <div className={s.dropdownMenu}>
                  {SERVICES.map((service, i) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={i}
                        className={s.serviceRow}
                        onMouseEnter={() => setHoveredIndex(i)}
                      >
                        <div
                          className={`${s.menuItem} ${
                            i === hoveredIndex ? s.active : ""
                          }`}
                        >
                          <div className={s.iconWrapper}>
                            <Icon size={20} />
                          </div>
                          <span>{service.title}</span>
                        </div>
                        {i === hoveredIndex && (
                          <div className={s.menuRight}>
                            {service.items.map((item, j) => (
                              <a key={j} href="#">
                                <span className={s.arrow}>→</span> {item}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
            <li>
              <Link href={"/calc"}>Калькулятор</Link>
            </li>
          </ul>

          <Link href={"/"} className={s.logoLink}>
            <h2 className={s.title}>
              <img src="./assets/images/logo.png" alt="Logo" />
            </h2>
          </Link>

          <div className={s.nav_right}>
            <ul className={s.nav}>
              <li>Блог</li>
              <li>О нас</li>
            </ul>

            <div className={s.langSwitcher} ref={langRef}>
              <button
                className={s.langButton}
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              >
                <FaGlobe className={s.globeIcon} />
                <span>{currentLang}</span>
              </button>
              {langDropdownOpen && (
                <div className={s.langDropdown}>
                  <button
                    className={`${s.langOption} ${
                      currentLang === "RU" ? s.active : ""
                    }`}
                    onClick={() => switchLanguage("RU")}
                  >
                    RU
                  </button>
                  <button
                    className={`${s.langOption} ${
                      currentLang === "EN" ? s.active : ""
                    }`}
                    onClick={() => switchLanguage("EN")}
                  >
                    EN
                  </button>
                </div>
              )}
            </div>

            <button className={s.ctaButton} onClick={() => setShowModal(true)}>
              <span>Начать проект</span>
              <div className={s.ctaGlow}></div>
            </button>

            <button className={s.mobileMenuButton} onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={s.mobileMenu}>
            <nav>
              <Link href="/calc">Калькулятор</Link>
              <a href="#">Блог</a>
              <a href="#">О нас</a>
            </nav>
          </div>
        )}
      </header>
      {showModal && <RequesForm onClose={() => setShowModal(false)} />}
    </>
  );
}
