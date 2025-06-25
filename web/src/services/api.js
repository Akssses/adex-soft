import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://apiadexsoft.com/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Обработка ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Произошла ошибка";
    return Promise.reject({ message });
  }
);

export default api;
