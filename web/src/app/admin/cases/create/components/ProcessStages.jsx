import React from "react";
import { FiPlus, FiX } from "react-icons/fi";
import s from "../page.module.scss";

export default function ProcessStages({
  formData,
  handleStageChange,
  handleAddStage,
  handleRemoveStage,
}) {
  const stages = formData.stages || [];

  return (
    <div className={s.formSection}>
      <h2>Процесс разработки</h2>
      <div className={s.stages}>
        {stages.map((stage, index) => (
          <div key={index} className={s.stage}>
            <div className={s.stageHeader}>
              <span>Этап {index + 1}</span>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveStage(index)}
                  className={s.removeStage}
                >
                  <FiX />
                </button>
              )}
            </div>
            <div className={s.stageContent}>
              <div className={s.formRow}>
                <div className={s.formGroup}>
                  <input
                    type="text"
                    placeholder="Название этапа"
                    value={stage.title || ""}
                    onChange={(e) =>
                      handleStageChange(index, "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div className={s.formGroup}>
                  <input
                    type="text"
                    placeholder="Длительность"
                    value={stage.duration || ""}
                    onChange={(e) =>
                      handleStageChange(index, "duration", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className={s.formGroup}>
                <textarea
                  placeholder="Описание этапа"
                  value={stage.description || ""}
                  onChange={(e) =>
                    handleStageChange(index, "description", e.target.value)
                  }
                  required
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddStage()}
          className={s.addStageButton}
        >
          <FiPlus />
          <span>Добавить этап</span>
        </button>
      </div>
    </div>
  );
}
