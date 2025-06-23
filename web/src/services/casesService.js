import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const casesApi = axios.create({
  baseURL: `${API_URL}/cases`,
  headers: {
    Accept: "application/json",
  },
});

// Добавляем интерцептор для автоматического добавления токена
casesApi.interceptors.request.use((config) => {
  const token = Cookies.get("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
    const formData = new FormData();

    // Add basic fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("project_url", data.projectUrl || "");
    formData.append("status", "published"); // Default to published

    // Add review fields
    formData.append("review_text", data.reviewText || "");
    formData.append("client_name", data.clientName || "");
    formData.append("client_position", data.clientPosition || "");
    if (data.clientAvatar?.file) {
      formData.append("client_avatar", data.clientAvatar.file);
    }

    // Add arrays
    if (data.tags?.length) {
      data.tags.forEach((tag) => formData.append("tags", tag));
    }
    if (data.services?.length) {
      data.services.forEach((service) => formData.append("services", service));
    }
    if (data.stacks?.length) {
      data.stacks.forEach((stack) => formData.append("stacks", stack));
    }

    // Add images
    if (data.images?.length) {
      data.images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });
    }

    // Add stages if they exist
    if (data.stages?.length) {
      formData.append("stages", JSON.stringify(data.stages));
    }

    const response = await casesApi.post("/", formData);
    return response.data;
  },

  async updateCase(id, data) {
    const formData = new FormData();

    // Add basic fields if they exist
    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.projectUrl) formData.append("project_url", data.projectUrl);
    if (data.status) formData.append("status", data.status);

    // Add review fields if they exist
    if (data.reviewText) formData.append("review_text", data.reviewText);
    if (data.clientName) formData.append("client_name", data.clientName);
    if (data.clientPosition)
      formData.append("client_position", data.clientPosition);
    if (data.clientAvatar?.file) {
      formData.append("client_avatar", data.clientAvatar.file);
    }

    // Add arrays if they exist
    if (data.tags?.length) {
      data.tags.forEach((tag) => formData.append("tags", tag));
    }
    if (data.services?.length) {
      data.services.forEach((service) => formData.append("services", service));
    }
    if (data.stacks?.length) {
      data.stacks.forEach((stack) => formData.append("stacks", stack));
    }

    // Add images if they exist
    if (data.images?.length) {
      data.images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });
    }

    // Add stages if they exist
    if (data.stages?.length) {
      formData.append("stages", JSON.stringify(data.stages));
    }

    const response = await casesApi.patch(`/${id}/`, formData);
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
