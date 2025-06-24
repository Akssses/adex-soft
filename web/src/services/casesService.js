import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const casesApi = axios.create({
  baseURL: `${API_URL}/cases`,
  headers: {
    Accept: "application/json",
  },
});

// Добавляем интерцептор для автоматического добавления токена только для админских операций
casesApi.interceptors.request.use((config) => {
  // Список публичных эндпоинтов, которые не требуют авторизации
  const publicEndpoints = ["/published/", "/tags/", "/services/", "/stacks/"];

  // Проверяем метод запроса
  const isAdminAction = ["POST", "PATCH", "PUT", "DELETE"].includes(
    config.method.toUpperCase()
  );

  // Если это админское действие, добавляем токен
  if (isAdminAction) {
    const token = Cookies.get("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const casesService = {
  // Cases
  async getAllCases() {
    const response = await casesApi.get("/");
    return response.data;
  },

  async getPublishedCases(params = {}) {
    const response = await casesApi.get("/published/", { params });
    return response.data;
  },

  async getCaseById(id) {
    const response = await casesApi.get(`/${id}/`);
    return response.data;
  },

  async archiveCase(id) {
    const response = await casesApi.patch(`/${id}/`, {
      status: "archived",
    });
    return response.data;
  },

  async deleteCase(id) {
    const response = await casesApi.delete(`/${id}/`);
    return response.data;
  },

  async createCase(data) {
    console.log("Service received data:", data);
    console.log("Service received stages:", data.stages);

    // Create FormData for files
    const formData = new FormData();

    // Add non-file fields as JSON string
    const jsonData = {
      title: data.title,
      description: data.description,
      project_url: data.projectUrl || "",
      status: "published",
      review_text: data.reviewText || "",
      client_name: data.clientName || "",
      client_position: data.clientPosition || "",
      tags: data.tags || [],
      services: data.services || [],
      stacks: data.stacks || [],
      stages: data.stages.map((stage, index) => ({
        title: stage.title,
        duration: stage.duration,
        description: stage.description,
        order: index,
      })),
    };

    // Add the JSON data as a single field
    formData.append("data", JSON.stringify(jsonData));

    // Add files separately
    if (data.clientAvatar?.file) {
      formData.append("client_avatar", data.clientAvatar.file);
    }

    if (data.images?.length) {
      data.images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });
    }

    // Log FormData contents
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, ":", value);
    }

    const response = await casesApi.post("/", formData);
    console.log("API response:", response.data);
    return response.data;
  },

  async updateCase(id, data) {
    console.log("Service received update data:", data);
    console.log("Service received update stages:", data.stages);

    // Create FormData for files
    const formData = new FormData();

    // Add non-file fields as JSON string
    const jsonData = {
      title: data.title,
      description: data.description,
      project_url: data.projectUrl || "",
      status: data.status,
      review_text: data.reviewText || "",
      client_name: data.clientName || "",
      client_position: data.clientPosition || "",
      tags: data.tags || [],
      services: data.services || [],
      stacks: data.stacks || [],
      stages: data.stages.map((stage, index) => ({
        title: stage.title,
        duration: stage.duration,
        description: stage.description,
        order: index,
      })),
    };

    // Add the JSON data as a single field
    formData.append("data", JSON.stringify(jsonData));

    // Add files separately
    if (data.clientAvatar?.file) {
      formData.append("client_avatar", data.clientAvatar.file);
    }

    if (data.images?.length) {
      data.images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });
    }

    // Log FormData contents
    console.log("FormData entries for update:");
    for (let [key, value] of formData.entries()) {
      console.log(key, ":", value);
    }

    const response = await casesApi.patch(`/${id}/`, formData);
    console.log("API update response:", response.data);
    return response.data;
  },

  // Tags
  async getAllTags() {
    const response = await casesApi.get("/tags/");
    return response.data;
  },

  // Services
  async getAllServices() {
    const response = await casesApi.get("/services/");
    return response.data;
  },

  // Stacks
  async getAllStacks() {
    const response = await casesApi.get("/stacks/");
    return response.data;
  },
};
