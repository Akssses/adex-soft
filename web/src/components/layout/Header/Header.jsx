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
  FaTelegram,
} from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import RequesForm from "@/components/shared/RequesForm/RequesForm";
import Link from "next/link";

const SERVICES = [
  {
    title: "Development & Integration",
    icon: FaCode,
    items: ["Smart Contracts", "dApp", "Wallet Integration"],
  },
  {
    title: "Tokenomics",
    icon: FaChartPie,
    items: ["Tokenomics Design", "Token Launch (ICO/IDO/IEO)"],
  },
  {
    title: "Telegram Mini Apps",
    icon: FaTelegramPlane,
    items: ["Mini App Development", "Blockchain Integration"],
  },
  {
    title: "Web Development",
    icon: FaLaptopCode,
    items: ["dApp Frontend", "Smart Contract API"],
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
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
              What We Do?
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
                        {/* {i === hoveredIndex && (
                          <div className={s.menuRight}>
                            {service.items.map((item, j) => (
                              <a key={j} href="#">
                                <span className={s.arrow}>→</span> {item}
                              </a>
                            ))}
                          </div>
                        )} */}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
            <li>
              <Link href={"/calc"}>Calculator</Link>
            </li>
          </ul>

          <Link href={"/"} className={s.logoLink}>
            <h2 className={s.title}>
              <img src="/assets/images/logo.png" alt="Logo" />
            </h2>
          </Link>

          <div className={s.nav_right}>
            <ul className={s.nav}>
              <li>
                <Link href="/about">About Us</Link>
              </li>
            </ul>

            <a
              href="https://t.me/adex_soft_manager"
              target="_blank"
              rel="noopener noreferrer"
              className={s.telegramLink}
            >
              <FaTelegram size={24} />
            </a>

            <button className={s.ctaButton} onClick={() => setShowModal(true)}>
              <span>Start Project</span>
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
              <Link href="/calc">Calculator</Link>
              <Link href="/about">About Us</Link>
            </nav>
          </div>
        )}
      </header>
      {showModal && <RequesForm onClose={() => setShowModal(false)} />}
    </>
  );
}
