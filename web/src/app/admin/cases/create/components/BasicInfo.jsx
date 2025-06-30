import React from "react";
import { FiX } from "react-icons/fi";
import StackSelect from "./StackSelect";
import s from "../page.module.scss";

const AVAILABLE_SERVICES = [
  "Development & Integration",
  "Tokenomics",
  "Telegram Mini Apps",
  "Web Development",
  "UX/UI Design",
  "DeFi Solutions",
  "Telegram Bots",
  "Telegram Mini App",
  "NFT & Metaverse",
];

const AVAILABLE_TAGS = [
  // Development & Integration
  "API Integration",
  "Backend",
  "Frontend",
  "Full Stack",
  "Microservices",

  // Tokenomics
  "Token Design",
  "Token Economy",
  "Token Distribution",
  "Token Metrics",
  "Token Utility",

  // Telegram & Web
  "Telegram Mini Apps",
  "Telegram Bots",
  "Web3",
  "Web App",
  "Progressive Web App",

  // Design
  "UI Design",
  "UX Design",
  "Mobile Design",
  "Web Design",
  "Design System",

  // DeFi
  "DeFi",
  "DEX",
  "Yield Farming",
  "Liquidity Pool",
  "Smart Contract",

  // NFT & Metaverse
  "NFT",
  "NFT Marketplace",
  "Metaverse",
  "GameFi",
  "Play-to-Earn",

  // Blockchain
  "Blockchain",
  "Ethereum",
  "Solana",
  "Polygon",
  "BSC",

  // Additional
  "Crypto",
  "dApp",
  "Cross-chain",
  "DAO",
  "Wallet Integration",
];

export default function BasicInfo({
  formData,
  handleInputChange,
  handleTagChange,
  handleRemoveTag,
  handleServiceChange,
  handleRemoveService,
  handleStackChange,
  handleRemoveStack,
}) {
  return (
    <div className={s.formSection}>
      <h2>Основная информация</h2>

      <div className={s.formGroup}>
        <label htmlFor="title">Название проекта</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={s.formGroup}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
        />
      </div>

      <div className={s.formGroup}>
        <label>Теги</label>
        <div className={s.tagInput}>
          <select
            className={s.serviceSelect}
            onChange={handleTagChange}
            value=""
          >
            <option value="">Выберите тег</option>
            {AVAILABLE_TAGS.filter((tag) => !formData.tags.includes(tag)).map(
              (tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
        </div>
        <div className={s.tags}>
          {formData.tags.map((tag) => (
            <span key={tag} className={s.tag}>
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className={s.removeTag}
              >
                <FiX />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className={s.formGroup}>
        <label>Услуги</label>
        <div className={s.tagInput}>
          <select
            className={s.serviceSelect}
            onChange={handleServiceChange}
            value=""
          >
            <option value="">Выберите услугу</option>
            {AVAILABLE_SERVICES.filter(
              (service) => !formData.services.includes(service)
            ).map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div className={s.tags}>
          {formData.services.map((service) => (
            <span key={service} className={s.tag}>
              {service}
              <button
                type="button"
                onClick={() => handleRemoveService(service)}
                className={s.removeTag}
              >
                <FiX />
              </button>
            </span>
          ))}
        </div>
      </div>

      <StackSelect
        formData={formData}
        handleStackChange={handleStackChange}
        handleRemoveStack={handleRemoveStack}
      />

      <div className={s.formGroup}>
        <label htmlFor="projectUrl">URL проекта (необязательно)</label>
        <input
          type="url"
          id="projectUrl"
          name="projectUrl"
          value={formData.projectUrl}
          onChange={handleInputChange}
          placeholder="https://"
        />
      </div>
    </div>
  );
}
