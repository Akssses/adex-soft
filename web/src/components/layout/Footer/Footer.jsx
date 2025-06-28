"use client";

import React, { useState } from "react";
import s from "./Footer.module.scss";
import { FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const SERVICES = [
  "Development & Integration",
  "Tokenomics",
  "Telegram Mini Apps",
  "Web Development",
  "UX/UI Design",
  "DeFi Solutions",
  "Telegram Bots",
  "NFT & Metaverse",
];

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Calculator", href: "/calc" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerGlow} />

      <div className={`${s.top} container`}>
        <div className={s.brand}>
          <Link href="/" className={s.logoLink}>
            <img
              src="/assets/images/logo.png"
              alt="ADEX Logo"
              className={s.logo}
            />
          </Link>
          <p className={s.tagline}>
            Your partner in full-cycle web3 application development
          </p>
          <div className={s.social}>
            <Link
              href="https://www.instagram.com/adex.soft.co/"
              aria-label="Instagram"
              className={s.socialLink}
              target="_blank"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://t.me/adex_soft_manager"
              aria-label="Telegram"
              className={s.socialLink}
              target="_blank"
            >
              <FaTelegram />
            </Link>
            <Link
              href="https://www.youtube.com/@adex.soft.co"
              aria-label="YouTube"
              className={s.socialLink}
              target="_blank"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>

        <div className={s.column}>
          <h3>Services</h3>
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
          <h3>Company</h3>
          <ul>
            {COMPANY.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.column}>
          <h3>Legal</h3>
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
        <p>© {new Date().getFullYear()} ADEX. All rights reserved.</p>
        <div className={s.bottomLinks}>
          <Link href="/contact">support@adex.soft</Link>
        </div>
      </div>
    </footer>
  );
}
