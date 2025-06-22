"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import { FaLock, FaUser } from "react-icons/fa";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError("Неверный логин или пароль");
    } finally {
      setIsLoading(false);
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

          {error && <div className={styles.error}>{error}</div>}

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
