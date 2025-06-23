import React from "react";
import { FiX } from "react-icons/fi";
import stackData from "@/lib/stackData";
import s from "../page.module.scss";

export default function StackSelect({
  formData,
  handleStackChange,
  handleRemoveStack,
}) {
  return (
    <div className={s.formGroup}>
      <label>Технологический стек</label>
      <div className={s.tagInput}>
        <select
          className={s.serviceSelect}
          onChange={handleStackChange}
          value=""
        >
          <option value="">Выберите технологию</option>
          {stackData
            .filter((stack) => !formData.stacks?.includes(stack.name))
            .map((stack) => (
              <option key={stack.name} value={stack.name}>
                {stack.name}
              </option>
            ))}
        </select>
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
