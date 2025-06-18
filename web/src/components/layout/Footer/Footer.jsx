"use client";

import React, { useState } from "react";
import s from "./Footer.module.scss";
import {
  FaLinkedin,
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import Link from "next/link";

const SERVICES = [
  "Разработка и интеграция",
  "Токеномика",
  "Telegram Mini Apps",
  "Веб-разработка",
  "UX/UI дизайн",
  "DeFi-решения",
  "Telegram боты",
  "NFT и метаверс",
];

const COMPANY = [
  { label: "О нас", href: "/about" },
  { label: "Блог", href: "/blog" },
  { label: "Карьера", href: "/careers" },
  { label: "Контакты", href: "/contact" },
];

const LEGAL = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Условия использования", href: "/terms" },
  { label: "Политика cookies", href: "/cookies" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className={s.footer}>
      <div className={s.footerGlow} />

      <div className={`${s.top} container`}>
        <div className={s.brand}>
          <Link href="/" className={s.logoLink}>
            <img
              src="/assets/images/logo.png"
              alt="ADEX Логотип"
              className={s.logo}
            />
          </Link>
          <p className={s.tagline}>
            Ваш партнер в развитии web3-приложений полного цикла
          </p>
          <div className={s.social}>
            <Link href="#" aria-label="Instagram" className={s.socialLink}>
              <FaInstagram />
            </Link>
            <Link href="#" aria-label="Telegram" className={s.socialLink}>
              <FaTelegram />
            </Link>
            <Link href="#" aria-label="YouTube" className={s.socialLink}>
              <FaYoutube />
            </Link>
          </div>
        </div>

        <div className={s.column}>
          <h3>Услуги</h3>
          <ul>
            {SERVICES.map((service, index) => (
              <li key={index}>
                <Link
                  href={`/services/${service
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.column}>
          <h3>Компания</h3>
          <ul>
            {COMPANY.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.column}>
          <h3>Документы</h3>
          <ul>
            {LEGAL.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${s.bottom} container`}>
        <p>© {new Date().getFullYear()} ADEX. Все права защищены.</p>
        <div className={s.bottomLinks}>
          <Link href="/sitemap">Карта сайта</Link>
          <span className={s.dot}>•</span>
          <Link href="/contact">Контакты</Link>
          <span className={s.dot}>•</span>
          <span className={s.credit}>Сделано с любовью в Кыргызстане 🇰🇬</span>
        </div>
      </div>
    </footer>
  );
}
