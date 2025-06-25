import React from "react";
import { FiUpload, FiX } from "react-icons/fi";
import s from "../page.module.scss";

export default function ReviewSection({
  formData,
  handleInputChange,
  handleReviewImageChange,
  handleRemoveReviewImage,
}) {
  return (
    <div className={s.formSection}>
      <h2>Отзыв клиента</h2>

      <div className={s.formGroup}>
        <label htmlFor="reviewText">Текст отзыва</label>
        <textarea
          id="reviewText"
          name="reviewText"
          value={formData.reviewText}
          onChange={handleInputChange}
          rows={4}
          placeholder="Введите текст отзыва клиента"
        />
      </div>

      <div className={s.formGroup}>
        <label htmlFor="clientName">Имя клиента</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleInputChange}
          placeholder="Введите имя клиента"
        />
      </div>

      <div className={s.formGroup}>
        <label htmlFor="clientPosition">Должность</label>
        <input
          type="text"
          id="clientPosition"
          name="clientPosition"
          value={formData.clientPosition}
          onChange={handleInputChange}
          placeholder="Введите должность клиента"
        />
      </div>

      <div className={s.formGroup}>
        <label>Фото клиента (необязательно)</label>
        <div className={s.avatarUpload}>
          <input
            type="file"
            id="clientAvatar"
            accept="image/*"
            onChange={handleReviewImageChange}
            className={s.fileInput}
          />
          <label htmlFor="clientAvatar" className={s.avatarLabel}>
            <FiUpload />
            <span>
              {formData.clientAvatar
                ? "Изменить фото"
                : "Загрузить фото клиента"}
            </span>
          </label>
          {formData.clientAvatar && (
            <div className={s.avatarPreview}>
              <img
                src={formData.clientAvatar.preview}
                alt="Client avatar preview"
              />
              <button
                type="button"
                onClick={handleRemoveReviewImage}
                className={s.removeImage}
              >
                <FiX />
              </button>
            </div>
          )}
        </div>
        <small className={s.helperText}>
          Фотография клиента не обязательна для заполнения
        </small>
      </div>
    </div>
  );
}
