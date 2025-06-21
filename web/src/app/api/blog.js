const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Получение списка постов с пагинацией и фильтрацией по категории
export async function getPosts(page = 1, category = null) {
  const categoryParam = category ? `&category=${category}` : "";
  const response = await fetch(
    `${API_URL}/posts/?page=${page}${categoryParam}`
  );
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

// Получение избранных постов
export async function getFeaturedPosts() {
  const response = await fetch(`${API_URL}/posts/featured/`);
  if (!response.ok) throw new Error("Failed to fetch featured posts");
  return response.json();
}

// Получение похожих постов
export async function getSimilarPosts(categorySlug, excludeId) {
  const response = await fetch(
    `${API_URL}/posts/?category=${categorySlug}&exclude=${excludeId}&limit=3`
  );
  if (!response.ok) throw new Error("Failed to fetch similar posts");
  return response.json();
}

// Получение списка категорий
export async function getCategories() {
  const response = await fetch(`${API_URL}/categories/`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}

// Получение деталей поста по slug
export async function getPost(slug) {
  const response = await fetch(`${API_URL}/posts/${slug}/`);
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
}
