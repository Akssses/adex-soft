import React from "react";
import { FiX } from "react-icons/fi";
import StackSelect from "./StackSelect";
import s from "../page.module.scss";

const AVAILABLE_SERVICES = [
  "Разработка и интеграция",
  "Токеномика",
  "Telegram Mini Apps",
  "Веб-разработка",
  "UX/UI дизайн",
  "DeFi-решения",
  "Тегеграм боты",
  "NFT и метаверс",
];

const AVAILABLE_TAGS = [
  "NFT",
  "DeFi",
  "GameFi",
  "Web3",
  "Blockchain",
  "Crypto",
  "Telegram",
  "Smart Contract",
  "Токены",
  "Метавселенная",
  "Кошелек",
  "dApp",
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
        <label htmlFor="projectUrl">URL проекта</label>
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
