import React from "react";
import { FiSearch, FiFilter, FiTag } from "react-icons/fi";
import s from "./CaseFilters.module.scss";

export default function CaseFilters({
  searchQuery,
  selectedCategory,
  selectedStatus,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}) {
  return (
    <div className={s.filters}>
      <div className={s.searchBar}>
        <FiSearch className={s.searchIcon} />
        <input
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className={s.filterGroup}>
        <div className={s.filterItem}>
          <FiFilter className={s.filterIcon} />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">Все категории</option>
            <option value="Blockchain">Blockchain</option>
            <option value="DeFi">DeFi</option>
            <option value="NFT">NFT</option>
            <option value="Web3">Web3</option>
          </select>
        </div>
        <div className={s.filterItem}>
          <FiTag className={s.filterIcon} />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">Все статусы</option>
            <option value="published">Опубликовано</option>
            <option value="archived">В архиве</option>
          </select>
        </div>
      </div>
    </div>
  );
}
