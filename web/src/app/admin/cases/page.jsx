"use client";

import React, { useState, useEffect } from "react";
import s from "./page.module.scss";
import CaseCard from "./components/CaseCard/CaseCard";
import CaseFilters from "./components/CaseFilters/CaseFilters";
import { casesService } from "@/services/casesService";
import { notify } from "@/utils/toast";

export default function CasesAdminPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      const response = await casesService.getAllCases();
      setCases(response.results || []);
    } catch (error) {
      notify.error("Ошибка при загрузке кейсов");
      console.error("Error loading cases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id) => {
    try {
      await casesService.updateCase(id, { status: "archived" });
      notify.success("Кейс успешно архивирован");
      loadCases();
    } catch (error) {
      notify.error("Ошибка при архивации кейса");
      console.error("Error archiving case:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот кейс?")) {
      return;
    }

    try {
      await casesService.deleteCase(id);
      notify.success("Кейс успешно удален");
      loadCases();
    } catch (error) {
      notify.error("Ошибка при удалении кейса");
      console.error("Error deleting case:", error);
    }
  };

  const filteredCases = cases.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      item.tags.some((tag) => tag.name === selectedCategory);
    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return <div className={s.loading}>Loading...</div>;
  }

  return (
    <div className={s.casesAdmin}>
      <CaseFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
      />

      <div className={s.content}>
        <div className={s.grid}>
          {filteredCases.map((item) => (
            <CaseCard
              key={item.id}
              item={item}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
