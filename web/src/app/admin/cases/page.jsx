"use client";

import React, { useState } from "react";
import s from "./page.module.scss";
import CaseCard from "./components/CaseCard/CaseCard";
import CaseFilters from "./components/CaseFilters/CaseFilters";

// Демо данные
const cases = [
  {
    id: 1,
    title: "Разработка NFT Маркетплейса",
    description:
      "Создание современной платформы для торговли NFT с поддержкой мультичейн и инновационной системой рейтинга.",
    category: "Blockchain",
    status: "published",
    date: "15 марта 2024",
    views: 1234,
    featured: true,
    image: "/assets/images/cases/nft.jpg",
    tags: ["NFT", "Web3", "React"],
  },
  {
    id: 2,
    title: "DeFi Протокол Lending",
    description:
      "Разработка децентрализованной платформы кредитования с уникальным механизмом обеспечения и смарт-контрактами.",
    category: "DeFi",
    status: "archived",
    date: "12 марта 2024",
    views: 856,
    featured: false,
    image: "/assets/images/cases/defi.jpg",
    tags: ["DeFi", "Solidity", "TypeScript"],
  },
];

export default function CasesAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleArchive = (id) => {
    // Логика архивации
    console.log("Archive case:", id);
  };

  const handleDelete = (id) => {
    // Логика удаления
    console.log("Delete case:", id);
  };

  const filteredCases = cases.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Дополнительная статистика
  const totalViews = cases.reduce((sum, item) => sum + (item.views || 0), 0);
  const publishedCasesCount = cases.filter(
    (item) => item.status === "published"
  ).length;
  const averageViews =
    publishedCasesCount > 0 ? Math.round(totalViews / publishedCasesCount) : 0;

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
