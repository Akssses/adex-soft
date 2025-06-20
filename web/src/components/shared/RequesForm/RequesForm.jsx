"use client";

import React, { useState, useEffect } from "react";
import s from "./RequesForm.module.scss";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheck } from "react-icons/fa";

export default function RequesForm({ onClose }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
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
      // Здесь будет отправка формы
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Имитация запроса
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
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
            <h2 className={s.title}>
              {isSubmitted ? "Спасибо за заявку!" : "Начать проект"}
            </h2>
            <p className={s.subtitle}>
              {isSubmitted
                ? "Мы свяжемся с вами в ближайшее время"
                : "Расскажите немного о своей идее, и мы свяжемся с вами в ближайшее время"}
            </p>

            {!isSubmitted && (
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
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
