"use client";

import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import s from "./page.module.scss";

const posts = [
  {
    id: 1,
    title: "Как работает блокчейн: простое объяснение сложной технологии",
    status: "published",
    category: "Blockchain",
    date: "15 марта 2024",
    views: 1234,
  },
  {
    id: 2,
    title: "Staking vs Farming: что выбрать?",
    status: "draft",
    category: "DeFi",
    date: "12 марта 2024",
    views: 856,
  },
];

export default function BlogAdminPage() {
  const [selectedPosts, setSelectedPosts] = useState([]);

  const handleSelectPost = (postId) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === posts.length ? [] : posts.map((post) => post.id)
    );
  };

  return (
    <div className={s.blogAdmin}>
      <div className={s.header}>
        <h1 className={s.title}>Управление блогом</h1>
        <button className={s.createButton}>
          <FiPlus />
          <span>Создать пост</span>
        </button>
      </div>

      <div className={s.filters}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск по заголовку..." />
        </div>
        <div className={s.filterGroup}>
          <select defaultValue="">
            <option value="">Все категории</option>
            <option value="blockchain">Blockchain</option>
            <option value="defi">DeFi</option>
            <option value="nft">NFT</option>
            <option value="web3">Web3</option>
            <option value="crypto">Криптовалюты</option>
          </select>
          <select defaultValue="">
            <option value="">Все статусы</option>
            <option value="published">Опубликовано</option>
            <option value="draft">Черновик</option>
          </select>
        </div>
      </div>

      <div className={s.table}>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedPosts.length === posts.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Заголовок</th>
              <th>Категория</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Просмотры</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleSelectPost(post.id)}
                  />
                </td>
                <td>{post.title}</td>
                <td>
                  <span className={s.category}>{post.category}</span>
                </td>
                <td>
                  <span
                    className={`${s.status} ${
                      post.status === "published" ? s.published : s.draft
                    }`}
                  >
                    {post.status === "published" ? "Опубликовано" : "Черновик"}
                  </span>
                </td>
                <td>{post.date}</td>
                <td>{post.views}</td>
                <td>
                  <div className={s.actions}>
                    <button className={s.actionButton} title="Просмотреть">
                      <FiEye />
                    </button>
                    <button className={s.actionButton} title="Редактировать">
                      <FiEdit2 />
                    </button>
                    <button
                      className={`${s.actionButton} ${s.delete}`}
                      title="Удалить"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={s.pagination}>
        <button disabled>Назад</button>
        <span className={s.pageInfo}>
          Страница 1 из 1 (всего постов: {posts.length})
        </span>
        <button disabled>Вперед</button>
      </div>
    </div>
  );
}
