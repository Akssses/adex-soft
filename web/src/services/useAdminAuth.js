import { useState } from "react";
import { useRouter } from "next/navigation";
import { notify } from "@/utils/toast";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Ошибка авторизации");
      }

      // Сохраняем токены в localStorage и cookies
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      Cookies.set("adminToken", data.access, { expires: 1 }); // expires in 1 day

      notify.success("Успешный вход в систему");
      router.push("/admin");
      return data;
    } catch (err) {
      setError("Неверный логин или пароль");
      notify.error("Неверный логин или пароль");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    Cookies.remove("adminToken");
    notify.info("Вы вышли из системы");
    router.push("/login");
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return null;

    try {
      const response = await fetch(`${API_URL}/auth/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      localStorage.setItem("accessToken", data.access);
      Cookies.set("adminToken", data.access, { expires: 1 }); // Обновляем токен и в cookies
      return data.access;
    } catch (err) {
      logout();
      return null;
    }
  };

  const checkAuth = async () => {
    try {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        return false;
      }

      // Проверяем токен
      const response = await fetch(`${API_URL}/auth/token/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        // Пробуем обновить токен
        token = await refreshToken();
        if (!token) {
          return false;
        }
      }

      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    login,
    logout,
    checkAuth,
    isLoading,
    error,
  };
};
