"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { FiSave, FiEye, FiX } from "react-icons/fi";
import s from "./page.module.scss";

// Динамический импорт редактора, чтобы избежать ошибок SSR
const Editor = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});

export default function BlogPostEditor() {
  const { action } = useParams();
  const isEdit = action === "edit";

  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: null,
    status: "draft",
  });

  const [preview, setPreview] = useState(false);

  const handleSave = (status) => {
    const updatedPost = { ...post, status };
    console.log("Saving post:", updatedPost);
    // TODO: Implement save logic
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={s.editor}>
      <div className={s.header}>
        <h1 className={s.title}>
          {isEdit ? "Редактирование поста" : "Создание поста"}
        </h1>
        <div className={s.actions}>
          <button
            className={s.previewButton}
            onClick={() => setPreview(!preview)}
          >
            {preview ? <FiX /> : <FiEye />}
            <span>{preview ? "Закрыть" : "Предпросмотр"}</span>
          </button>
          <button className={s.draftButton} onClick={() => handleSave("draft")}>
            <FiSave />
            <span>Сохранить черновик</span>
          </button>
          <button
            className={s.publishButton}
            onClick={() => handleSave("published")}
          >
            <span>Опубликовать</span>
          </button>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.main}>
          <div className={s.field}>
            <label>Заголовок</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Введите заголовок поста..."
            />
          </div>

          <div className={s.field}>
            <label>Краткое описание</label>
            <textarea
              value={post.excerpt}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              placeholder="Введите краткое описание поста..."
              rows={3}
            />
          </div>

          <div className={s.field}>
            <label>Содержание</label>
            <Editor
              value={post.content}
              onChange={(content) => setPost((prev) => ({ ...prev, content }))}
            />
          </div>
        </div>

        <div className={s.sidebar}>
          <div className={s.card}>
            <h3>Настройки публикации</h3>
            <div className={s.field}>
              <label>Категория</label>
              <select
                value={post.category}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="">Выберите категорию</option>
                <option value="blockchain">Blockchain</option>
                <option value="defi">DeFi</option>
                <option value="nft">NFT</option>
                <option value="web3">Web3</option>
                <option value="crypto">Криптовалюты</option>
              </select>
            </div>
          </div>

          <div className={s.card}>
            <h3>Обложка поста</h3>
            <div className={s.coverImage}>
              {post.coverImage ? (
                <div className={s.preview}>
                  <img src={post.coverImage} alt="Preview" />
                  <button
                    className={s.removeImage}
                    onClick={() =>
                      setPost((prev) => ({ ...prev, coverImage: null }))
                    }
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className={s.upload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="coverImage"
                  />
                  <label htmlFor="coverImage">Выберите изображение</label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
