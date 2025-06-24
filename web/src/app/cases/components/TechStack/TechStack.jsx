"use client";

import React from "react";
import s from "./TechStack.module.scss";
import techStack from "@/lib/stackData";

export default function CaseTechStack({ stacks = [] }) {
  // Получаем имена стеков из props
  const stackNames = stacks.map((stack) => stack.name);

  // Фильтруем techStack, оставляя только те технологии, которые есть в кейсе
  const caseTechStack = techStack.filter((tech) =>
    stackNames.some(
      (stackName) =>
        stackName.toLowerCase().includes(tech.name.toLowerCase()) ||
        tech.name.toLowerCase().includes(stackName.toLowerCase())
    )
  );

  if (caseTechStack.length === 0) {
    return null;
  }

  return (
    <section className={s.techStack}>
      <div className={s.content}>
        <h2 className={s.title}>Технологии</h2>

        <div className={s.grid}>
          {caseTechStack.map((tech, index) => (
            <div key={tech.name} className={s.tech}>
              <div className={s.iconWrapper}>
                <img
                  src={tech.logo}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className={s.icon}
                />
              </div>
              <span className={s.name}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
