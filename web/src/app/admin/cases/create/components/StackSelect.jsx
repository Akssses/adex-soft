import React, { useState, useRef, useEffect } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import stackData from "@/lib/stackData";
import s from "../page.module.scss";

export default function StackSelect({
  formData,
  handleStackChange,
  handleRemoveStack,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закрываем дропдаун при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Фильтруем стеки по поисковому запросу
  const filteredStacks = stackData.filter(
    (stack) =>
      stack.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.stacks?.includes(stack.name)
  );

  const handleSelect = (stackName) => {
    handleStackChange({ target: { value: stackName } });
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className={s.formGroup}>
      <label>Технологический стек</label>
      <div className={s.searchSelect} ref={dropdownRef}>
        <div className={s.searchInput}>
          <FiSearch className={s.searchIcon} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Поиск технологий..."
            className={s.stackSearchInput}
          />
        </div>
        {isOpen && filteredStacks.length > 0 && (
          <div className={s.dropdown}>
            {filteredStacks.map((stack) => (
              <div
                key={stack.name}
                className={s.dropdownItem}
                onClick={() => handleSelect(stack.name)}
              >
                <img
                  src={stack.logo}
                  alt={stack.name}
                  className={s.stackLogo}
                />
                <span>{stack.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={s.tags}>
        {formData.stacks?.map((stack) => (
          <span key={stack} className={s.tag}>
            {stack}
            <button
              type="button"
              onClick={() => handleRemoveStack(stack)}
              className={s.removeTag}
            >
              <FiX />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
