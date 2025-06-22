"use client";

import React, { useState, useEffect, useRef } from "react";
import s from "./RequesForm.module.scss";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaCheck,
  FaTelegram,
  FaChevronDown,
  FaRocket,
} from "react-icons/fa";

const SERVICES = [
  "Веб-разработка",
  "Telegram Mini App",
  "UI/UX Дизайн",
  "Токеномика",
  "NFT и метаверс",
  "Telegram боты",
  "DeFi-решения",
  "Разработка и интеграция",
  "Другая услуга",
];

const BUDGET_TAGS = [
  "$500 - $1 000",
  "$1 000 - $3 000",
  "$3 000 - $5 000",
  "$5 000 - $10 000",
  "$10 000+",
  "$50 000 - $100 000",
];

const CustomSelect = ({ value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={s.customSelect} ref={selectRef}>
      <div
        className={`${s.selectTrigger} ${isOpen ? s.open : ""} ${
          disabled ? s.disabled : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{value || "Выберите услугу"}</span>
        <FaChevronDown className={s.arrow} />
      </div>
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            className={s.options}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {SERVICES.map((service) => (
              <div
                key={service}
                className={`${s.option} ${value === service ? s.selected : ""}`}
                onClick={() => {
                  onChange(service);
                  setIsOpen(false);
                }}
              >
                {service}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function RequesForm({ onClose }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    telegram: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBudgetSelect = (budget) => {
    setFormState((prev) => ({
      ...prev,
      budget,
    }));
  };

  const handleServiceChange = (service) => {
    setFormState((prev) => ({ ...prev, service }));
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={s.overlay}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className={s.modal}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <button className={s.closeBtn} onClick={onClose}>
            <IoMdClose size={24} />
          </button>

          <div className={s.formContent}>
            {isSubmitted ? (
              <div className={s.successScreen}>
                <div className={s.successIcon}>
                  <FaRocket />
                </div>
                <h2 className={s.title}>Спасибо за заявку!</h2>
                <p className={s.successMessage}>
                  Мы уже получили вашу заявку и свяжемся с вами в ближайшее
                  время для обсуждения деталей проекта
                </p>
                <div className={s.successDetails}>
                  <div className={s.detailItem}>
                    <FaCheck className={s.checkIcon} />
                    <span>Заявка успешно отправлена</span>
                  </div>
                  <div className={s.detailItem}>
                    <FaTelegram className={s.telegramIcon} />
                    <span>Ожидайте сообщение в Telegram / Email</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className={s.title}>Начать проект</h2>
                <p className={s.subtitle}>
                  Расскажите немного о своей идее, и мы свяжемся с вами в
                  ближайшее время
                </p>
                <form onSubmit={handleSubmit} className={s.form}>
                  <div className={s.inputGroup}>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      required
                      disabled={isSubmitting}
                    />
                    <div className={s.inputFocus} />
                  </div>

                  <div className={s.inputGroup}>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Ваш e-mail"
                      required
                      disabled={isSubmitting}
                    />
                    <div className={s.inputFocus} />
                  </div>

                  <div className={s.inputGroup}>
                    <div className={s.inputWithIcon}>
                      <FaTelegram className={s.inputIcon} />
                      <input
                        type="text"
                        name="telegram"
                        value={formState.telegram}
                        onChange={handleChange}
                        placeholder="Ваш Telegram (опционально)"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className={s.inputFocus} />
                  </div>

                  <div className={s.inputGroup}>
                    <CustomSelect
                      value={formState.service}
                      onChange={handleServiceChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={s.budgetTags}>
                    <p className={s.budgetTitle}>Выберите бюджет проекта:</p>
                    <div className={s.tags}>
                      {BUDGET_TAGS.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          className={`${s.tag} ${
                            formState.budget === budget ? s.active : ""
                          }`}
                          onClick={() => handleBudgetSelect(budget)}
                          disabled={isSubmitting}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={s.inputGroup}>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Опишите ваш проект..."
                      required
                      disabled={isSubmitting}
                    />
                    <div className={s.inputFocus} />
                  </div>

                  <button
                    type="submit"
                    className={`${s.submitBtn} ${
                      isSubmitting ? s.submitting : ""
                    } ${isSubmitted ? s.submitted : ""}`}
                    disabled={isSubmitting}
                  >
                    <span className={s.buttonText}>
                      {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    </span>
                    {isSubmitting ? (
                      <div className={s.loadingSpinner} />
                    ) : isSubmitted ? (
                      <FaCheck className={s.icon} />
                    ) : (
                      <FaPaperPlane className={s.icon} />
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
