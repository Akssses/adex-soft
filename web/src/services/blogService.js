import api from "./api";

export const blogService = {
  // Категории
  getCategories: async () => {
    const response = await api.get("/categories/");
    return response.data;
  },

  // Теги
  getTags: async () => {
    const response = await api.get("/tags/");
    return response.data;
  },

  // Посты
  getPosts: async (params = {}) => {
    const response = await api.get("/posts/", { params });
    return response.data;
  },

  getPostBySlug: async (slug) => {
    const response = await api.get(`/posts/${slug}/`);
    return response.data;
  },

  getFeaturedPosts: async () => {
    const response = await api.get("/posts/featured/");
    return response.data;
  },

  getPostsByCategory: async (categorySlug) => {
    const response = await api.get("/posts/by_category/", {
      params: { category: categorySlug },
    });
    return response.data;
  },

  incrementViews: async (slug) => {
    await api.post(`/posts/${slug}/increment_views/`);
  },

  // Админ методы
  createPost: async (data) => {
    const response = await api.post("/posts/", data);
    return response.data;
  },

  updatePost: async (slug, data) => {
    const response = await api.patch(`/posts/${slug}/`, data);
    return response.data;
  },

  deletePost: async (slug) => {
    await api.delete(`/posts/${slug}/`);
  },
};
