"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { casesService } from "@/services/casesService";
import { toast } from "react-toastify";
import BasicInfo from "./components/BasicInfo";
import ProcessStages from "./components/ProcessStages";
import ImageUpload from "./components/ImageUpload";
import ReviewSection from "./components/ReviewSection";
import s from "./page.module.scss";

export default function CreateCasePage() {
  const router = useRouter();
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
    stages: [
      {
        title: "",
        duration: "",
        description: "",
      },
    ],
  });

  const [dragActive, setDragActive] = useState(false);

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
      stages: [
        ...prev.stages,
        {
          title: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const handleRemoveStage = (index) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index),
    }));
  };

  const handleStageChange = (index, field, value) => {
    console.log(`Changing stage ${index}, field: ${field}, value: ${value}`);
    setFormData((prev) => {
      const newStages = prev.stages.map((stage, i) =>
        i === index
          ? {
              ...stage,
              [field]: value,
            }
          : stage
      );
      console.log("Updated stages:", newStages);
      return {
        ...prev,
        stages: newStages,
      };
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
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
      console.log("Raw formData stages:", formData.stages);

      // Validate stages
      const validStages = formData.stages.filter(
        (stage) =>
          stage &&
          typeof stage === "object" &&
          stage.title?.trim() &&
          stage.duration?.trim() &&
          stage.description?.trim()
      );

      console.log("Valid stages after filter:", validStages);

      if (validStages.length === 0) {
        toast.error("Добавьте хотя бы один этап разработки");
        return;
      }

      // Create a copy of formData with validated stages
      const submitData = {
        ...formData,
        stages: validStages.map((stage, index) => ({
          title: stage.title.trim(),
          duration: stage.duration.trim(),
          description: stage.description.trim(),
          order: index,
        })),
      };

      console.log("Final submitData stages:", submitData.stages);

      await casesService.createCase(submitData);
      toast.success("Кейс успешно создан");
      router.push("/admin/cases");
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error(error.response?.data?.message || "Ошибка при создании кейса");
    }
  };

  return (
    <div className={s.createPage}>
      <div className={s.header}>
        <h1>Создание нового кейса</h1>
        <p>Заполните форму для создания нового кейса</p>
      </div>

      <form onSubmit={handleSubmit} className={s.form}>
        <ImageUpload
          formData={formData}
          dragActive={dragActive}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
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
            Создать кейс
          </button>
        </div>
      </form>
    </div>
  );
}
