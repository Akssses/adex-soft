"use client";

import React, { useState } from "react";
import s from "./Footer.module.scss";
import {
  FaLinkedin,
  FaTwitter,
  FaTelegram,
  FaYoutube,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
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
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setSubscribeStatus("pending");
      // Здесь будет логика подписки на рассылку
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация запроса
      setSubscribeStatus("success");
      setEmail("");
    } catch (error) {
      setSubscribeStatus("error");
    }
  };

  return (
    <footer className={s.footer}>
      <div className={s.footerGlow} />

      <div className={`${s.top} container`}>
        <div className={s.brand}>
          <Link href="/" className={s.logoLink}>
            <img
              src="./assets/images/logo.png"
              alt="ADEX Logo"
              className={s.logo}
            />
          </Link>
          <p className={s.tagline}>
            Full-Cycle Growth Partner for web3 App Development
          </p>
          <div className={s.social}>
            <Link href="#" aria-label="LinkedIn" className={s.socialLink}>
              <FaLinkedin />
            </Link>
            <Link href="#" aria-label="X.COM" className={s.socialLink}>
              <FaTwitter />
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

      {/* <div className={`${s.newsletter} container`}>
        <div className={s.newsletterContent}>
          <h2>Stay Updated with ADEX</h2>
          <p>
            Subscribe to our newsletter for the latest updates on Web3
            development, blockchain innovations, and industry insights.
          </p>
          <form className={s.form} onSubmit={handleSubscribe}>
            <div className={s.inputWrapper}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                disabled={subscribeStatus === "pending"}
                className={`${s.subscribeButton} ${
                  subscribeStatus === "success" ? s.success : ""
                }`}
              >
                {subscribeStatus === "pending"
                  ? "Subscribing..."
                  : subscribeStatus === "success"
                  ? "Subscribed!"
                  : "Subscribe"}
              </button>
            </div>
            {subscribeStatus === "error" && (
              <p className={s.error}>
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div> */}

      <div className={`${s.bottom} container`}>
        <p>© {new Date().getFullYear()} ADEX. All rights reserved.</p>
        <div className={s.bottomLinks}>
          <Link href="/sitemap">Sitemap</Link>
          <span className={s.dot}>•</span>
          <Link href="/contact">Contact</Link>
          <span className={s.dot}>•</span>
          <span className={s.credit}>Made with ❤️ in Kyrgyzstan</span>
        </div>
      </div>
    </footer>
  );
}
