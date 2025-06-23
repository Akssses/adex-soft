import React from "react";
import { FiUpload, FiX } from "react-icons/fi";
import s from "../page.module.scss";

export default function ImageUpload({
  formData,
  dragActive,
  handleDrag,
  handleDrop,
  handleFiles,
  setFormData,
}) {
  return (
    <div className={s.formSection}>
      <h2>Изображения</h2>
      <div
        className={`${s.dropzone} ${dragActive ? s.dragActive : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className={s.fileInput}
        />
        <label htmlFor="images" className={s.dropzoneLabel}>
          <FiUpload />
          <span>
            Перетащите изображения сюда или кликните для выбора файлов
          </span>
        </label>
      </div>
      <div className={s.imagePreview}>
        {formData.images.map((image, index) => (
          <div key={index} className={s.previewItem}>
            <img src={image.preview} alt={`Preview ${index + 1}`} />
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  images: prev.images.filter((_, i) => i !== index),
                }))
              }
              className={s.removeImage}
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
