"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { casesService } from "@/services/casesService";
import { notify } from "@/utils/toast";
import BasicInfo from "../../create/components/BasicInfo";
import ProcessStages from "../../create/components/ProcessStages";
import ImageUpload from "../../create/components/ImageUpload";
import ReviewSection from "../../create/components/ReviewSection";
import s from "../../create/page.module.scss";

export default function EditCasePage({ params }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    services: [],
    projectUrl: "",
    tags: [],
    status: "published",
    images: [],
    stacks: [],
    reviewText: "",
    clientName: "",
    clientPosition: "",
    clientAvatar: null,
    stages: [],
  });

  useEffect(() => {
    loadCase();
  }, [id]);

  const loadCase = async () => {
    try {
      setLoading(true);
      const caseData = await casesService.getCaseById(id);

      // Преобразуем данные в формат формы
      setFormData({
        title: caseData.title,
        description: caseData.description,
        services: caseData.services.map((service) => service.name),
        projectUrl: caseData.project_url,
        tags: caseData.tags.map((tag) => tag.name),
        status: caseData.status,
        images: caseData.images.map((img) => ({
          file: null,
          preview: img.image,
          id: img.id,
        })),
        stacks: caseData.stacks.map((stack) => stack.name),
        reviewText: caseData.review_text,
        clientName: caseData.client_name,
        clientPosition: caseData.client_position,
        clientAvatar: caseData.client_avatar
          ? {
              file: null,
              preview: caseData.client_avatar,
              id: "existing",
            }
          : null,
        stages: caseData.stages || [],
      });
    } catch (error) {
      notify.error("Ошибка при загрузке кейса");
      console.error("Error loading case:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleServiceChange = (e) => {
    const service = e.target.value;
    if (service && !formData.services.includes(service)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }));
    }
  };

  const handleRemoveService = (serviceToRemove) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service !== serviceToRemove),
    }));
  };

  const handleAddStage = () => {
    setFormData((prev) => ({
      ...prev,
      stages: [...prev.stages, { title: "", duration: "", description: "" }],
    }));
  };

  const handleRemoveStage = (index) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index),
    }));
  };

  const handleStageChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.map((stage, i) =>
        i === index ? { ...stage, [field]: value } : stage
      ),
    }));
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleStackChange = (e) => {
    const stack = e.target.value;
    if (stack && !formData.stacks.includes(stack)) {
      setFormData((prev) => ({
        ...prev,
        stacks: [...prev.stacks, stack],
      }));
    }
  };

  const handleRemoveStack = (stackToRemove) => {
    setFormData((prev) => ({
      ...prev,
      stacks: prev.stacks.filter((stack) => stack !== stackToRemove),
    }));
  };

  const handleReviewImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        clientAvatar: {
          file,
          preview: URL.createObjectURL(file),
        },
      }));
    }
  };

  const handleRemoveReviewImage = () => {
    if (formData.clientAvatar?.preview) {
      URL.revokeObjectURL(formData.clientAvatar.preview);
    }
    setFormData((prev) => ({
      ...prev,
      clientAvatar: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await casesService.updateCase(id, formData);
      notify.success("Кейс успешно обновлен");
      router.push("/admin/cases");
    } catch (error) {
      console.error("Error updating case:", error);
      notify.error(
        error.response?.data?.message || "Ошибка при обновлении кейса"
      );
    }
  };

  if (loading) {
    return <div className={s.loading}>Загрузка...</div>;
  }

  return (
    <div className={s.createPage}>
      <div className={s.header}>
        <h1>Редактирование кейса</h1>
        <p>Измените информацию о кейсе</p>
      </div>

      <form onSubmit={handleSubmit} className={s.form}>
        <ImageUpload
          formData={formData}
          handleFiles={handleFiles}
          setFormData={setFormData}
        />

        <BasicInfo
          formData={formData}
          handleInputChange={handleInputChange}
          handleTagChange={handleTagChange}
          handleRemoveTag={handleRemoveTag}
          handleServiceChange={handleServiceChange}
          handleRemoveService={handleRemoveService}
          handleStackChange={handleStackChange}
          handleRemoveStack={handleRemoveStack}
        />

        <ProcessStages
          formData={formData}
          handleStageChange={handleStageChange}
          handleAddStage={handleAddStage}
          handleRemoveStage={handleRemoveStage}
        />

        <ReviewSection
          formData={formData}
          handleInputChange={handleInputChange}
          handleReviewImageChange={handleReviewImageChange}
          handleRemoveReviewImage={handleRemoveReviewImage}
        />

        <div className={s.formActions}>
          <button
            type="button"
            onClick={() => router.back()}
            className={s.cancelButton}
          >
            Отмена
          </button>
          <button type="submit" className={s.submitButton}>
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}
