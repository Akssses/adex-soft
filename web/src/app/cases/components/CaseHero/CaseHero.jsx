"use client";

import React from "react";
import s from "./CaseHero.module.scss";

export default function CaseHero({
  title,
  subtitle,
  tags = [],
  services = [],
  projectUrl = "#",
  images = [],
  stages = [],
}) {
  return (
    <section className={s.hero}>
      <div className="container">
        {images.length > 0 && (
          <div className={s.heroImage}>
            <img
              src={images[0].src}
              alt={images[0].alt}
              className={s.mainImage}
            />
          </div>
        )}
        <div className={s.content}>
          <div className={s.mainInfo}>
            <div className={s.tags}>
              {tags?.map((tag, index) => (
                <span key={index} className={s.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={s.titleBlock}>
              <h1 className={s.title}>{title}</h1>
              <p className={s.subtitle}>{subtitle}</p>
            </div>

            <div className={s.meta}>
              {services?.length > 0 && (
                <div className={s.metaGroup}>
                  <div className={s.metaItem}>
                    <span className={s.label}>Услуги</span>
                    <div className={s.services}>
                      {services.map((service, index) => (
                        <span key={index} className={s.service}>
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className={s.actions}>
                {projectUrl && projectUrl !== "#" && (
                  <button
                    className={s.cta}
                    onClick={() =>
                      window.open(projectUrl, "_blank", "noopener,noreferrer")
                    }
                  >
                    {projectUrl}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.16666 10H15.8333"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.8333 5L15.8333 10L10.8333 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {stages?.length > 0 && (
            <div className={s.timeline}>
              {stages.map((stage, index) => (
                <div key={index} className={s.stage}>
                  <div className={s.stageNumber}>{index + 1}</div>
                  <div className={s.stageContent}>
                    <div className={s.stageMeta}>
                      <h3 className={s.stageTitle}>{stage.title}</h3>
                      <span className={s.stageDuration}>{stage.duration}</span>
                    </div>
                    <p className={s.stageDescription}>{stage.description}</p>
                  </div>
                  {index < stages.length - 1 && <div className={s.connector} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
