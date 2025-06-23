"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/services/useAdminAuth";
import styles from "./page.module.scss";
import { FaLock, FaUser } from "react-icons/fa";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login, isLoading, error: authError, checkAuth } = useAdminAuth();

  useEffect(() => {
    // Проверяем авторизацию при загрузке страницы
    const checkAuthentication = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        window.location.href = "/admin";
      }
    };
    checkAuthentication();
  }, [checkAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
    } catch (err) {
      // Ошибка уже обрабатывается в хуке useAdminAuth
      console.error("Login failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.highlight}>ADEX</span>SOFT
          </div>
          <h1>Вход в админ-панель</h1>
          <p>Введите свои учетные данные для входа в систему</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={credentials.username}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.icon} />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={credentials.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {authError && <div className={styles.error}>{authError}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.loadingSpinner} />
            ) : (
              "Войти в систему"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>© {new Date().getFullYear()} ADEXSOFT. Все права защищены</p>
        </div>
      </div>
    </div>
  );
}
