"use client";

import React, { useRef, useState, useEffect } from "react";
import s from "./RelatedCases.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CaseCard from "@/components/shared/CaseCard/CaseCard";
import { casesService } from "@/services/casesService";

export default function RelatedCases() {
  const [currentPage, setCurrentPage] = useState(0);
  const [layout, setLayout] = useState({ cardsPerPage: 3, isMobile: false });
  const resizeTimeoutRef = useRef(null);
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await casesService.getPublishedCases();
        setCases(response || []);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  useEffect(() => {
    // Set initial layout
    setLayout(getLayoutConfig(window.innerWidth));

    function handleResize() {
      if (resizeTimeoutRef.current) {
        window.cancelAnimationFrame(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.requestAnimationFrame(() => {
        const newLayout = getLayoutConfig(window.innerWidth);
        setLayout(newLayout);
        setCurrentPage(0);
      });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        window.cancelAnimationFrame(resizeTimeoutRef.current);
      }
    };
  }, []);

  const getLayoutConfig = (width) => {
    if (width <= 768) {
      return { cardsPerPage: 1, isMobile: true };
    } else if (width <= 1024) {
      return { cardsPerPage: 2, isMobile: true };
    }
    return { cardsPerPage: 3, isMobile: false };
  };

  const totalPages = Math.ceil(cases.length / layout.cardsPerPage);
  const startIndex = currentPage * layout.cardsPerPage;
  const visibleCases = cases.slice(
    startIndex,
    startIndex + layout.cardsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const content = (
    <div className={s.case_section}>
      <header className={s.header}>
        <h1 className={s.title}>Похожие проекты</h1>
      </header>

      <div className={s.sliderWrapper}>
        {isLoading ? (
          <div className={s.loading}>Загрузка проектов...</div>
        ) : cases.length === 0 ? (
          <div className={s.empty}>Нет доступных проектов</div>
        ) : (
          <div className={s.case_slider_container}>
            {visibleCases.map((project) => (
              <CaseCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags.map((tag) => tag.name)}
                link={project.project_url}
                image={
                  project.images[0]?.image || "/assets/images/placeholder.png"
                }
              />
            ))}
          </div>
        )}
      </div>

      {!isLoading && cases.length > layout.cardsPerPage && (
        <div className={s.slider_buttons}>
          <button onClick={handlePrev} disabled={currentPage === 0}>
            <IoIosArrowBack />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );

  return layout.isMobile ? content : <div className="container">{content}</div>;
}
