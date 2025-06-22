"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/services/useAdminAuth";
import { FaLock, FaUser } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./page.module.scss";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login, isLoading, error: authError, checkAuth } = useAdminAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        router.push("/admin");
      }
    };
    checkAuthentication();
  }, [checkAuth, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={s.container}>
      <div className={s.loginBox}>
        <div className={s.header}>
          <div className={s.logo}>
            <span className={s.highlight}>ADEX</span>SOFT
          </div>
          <h1>Вход в админ-панель</h1>
          <p>Введите свои учетные данные для входа в систему</p>
        </div>

        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.inputGroup}>
            <div className={s.inputWrapper}>
              <FaUser className={s.icon} />
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

          <div className={s.inputGroup}>
            <div className={s.inputWrapper}>
              <FaLock className={s.icon} />
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

          {authError && <div className={s.error}>{authError}</div>}

          <button type="submit" className={s.submitButton} disabled={isLoading}>
            {isLoading ? (
              <div className={s.loadingSpinner} />
            ) : (
              "Войти в систему"
            )}
          </button>
        </form>

        <div className={s.footer}>
          <p>© {new Date().getFullYear()} ADEXSOFT. Все права защищены</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
