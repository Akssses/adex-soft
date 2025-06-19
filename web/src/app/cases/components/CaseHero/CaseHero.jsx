"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";
import s from "./CaseHero.module.scss";

export default function CaseHero({
  title,
  subtitle,
  industry,
  platform,
  services,
  projectUrl = "#",
  stages,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const projectImages = [
    {
      src: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?w=800&auto=format",
      alt: "Web3 Dashboard",
      caption: "Главная страница платформы",
    },
    {
      src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format",
      alt: "NFT Gallery",
      caption: "Галерея NFT токенов",
    },
    {
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format",
      alt: "Trading Interface",
      caption: "Интерфейс торговли",
    },
    {
      src: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format",
      alt: "Wallet Connect",
      caption: "Подключение кошелька",
    },
  ];

  const slides = projectImages.reduce((acc, _, index) => {
    if (index % 2 === 0) {
      acc.push(projectImages.slice(index, index + 2));
    }
    return acc;
  }, []);

  useEffect(() => {
    const calculateSizes = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const firstSlide = trackRef.current.children[0];
        if (firstSlide) {
          const slideRect = firstSlide.getBoundingClientRect();
          const style = window.getComputedStyle(firstSlide);
          const marginRight = parseFloat(style.marginRight);
          const totalSlide = slideRect.width + marginRight;
          setSlideWidth(totalSlide);

          const totalTrackWidth = slides.length * totalSlide;
          setMaxOffset(Math.max(totalTrackWidth - containerWidth, 0));
        }
      }
    };

    calculateSizes();
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, [slides.length]);

  const handlePrev = () => setOffset((prev) => Math.max(prev - slideWidth, 0));
  const handleNext = () =>
    setOffset((prev) => Math.min(prev + slideWidth, maxOffset));

  return (
    <section className={s.hero}>
      <div className={s.slider}>
        <div ref={containerRef} className={s.sliderWrapper}>
          <div
            ref={trackRef}
            className={s.sliderTrack}
            style={{
              transform: `translateX(-${offset}px)`,
              transition: "transform 0.5s ease",
            }}
          >
            {slides.map((slideGroup, slideIndex) => (
              <div key={slideIndex} className={s.slide}>
                {slideGroup.map((image, imageIndex) => (
                  <div key={imageIndex} className={s.card}>
                    <div className={s.cardImage}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={s.slideImage}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={s.sliderControls}>
          <button onClick={handlePrev} className={s.sliderButton}>
            <IoIosArrowBack />
          </button>
          <button onClick={handleNext} className={s.sliderButton}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <div className="container">
        <div className={s.content}>
          <div className={s.mainInfo}>
            <div className={s.tags}>
              <span className={s.tag}>{industry}</span>
              <span className={s.tag}>{platform}</span>
            </div>

            <div className={s.titleBlock}>
              <h1 className={s.title}>{title}</h1>
              <p className={s.subtitle}>{subtitle}</p>
            </div>

            <div className={s.meta}>
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

              <div className={s.actions}>
                {projectUrl && projectUrl !== "#" && (
                  <Link href={projectUrl} className={s.projectLink}>
                    <span>Посмотреть проект</span>
                    <FiArrowUpRight />
                  </Link>
                )}
                <button className={s.cta}>
                  www.site.com{" "}
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
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
}
