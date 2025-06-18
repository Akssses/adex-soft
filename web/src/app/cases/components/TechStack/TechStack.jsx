"use client";

import React from "react";
import s from "./TechStack.module.scss";
import techStack from "./techStack";

export default function CaseTechStack() {
  return (
    <section className={s.techStack}>
      <div className={s.content}>
        <h2 className={s.title}>Технологии</h2>

        <div className={s.grid}>
          {techStack.map((tech, index) => (
            <div key={index} className={s.tech}>
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
