"use client";

import React, { useRef, useState, useEffect } from "react";
import s from "./CaseSlider.module.scss";
import CaseCard from "@/components/shared/CaseCard/CaseCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { casesService } from "@/services/casesService";

export default function CaseSlider() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
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
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1024);

      if (width <= 768) {
        setCardsPerPage(1);
      } else if (width <= 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }

      // Reset to first page when layout changes
      setCurrentPage(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(cases.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const visibleProjects = cases.slice(startIndex, startIndex + cardsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const content = (
    <div className={s.case_section}>
      <header className={s.header}>
        <h1 className={s.title}>
          Our Cases <br /> Speak for Themselves
        </h1>
      </header>

      <div className={s.sliderWrapper}>
        {isLoading ? (
          <div className={s.loading}>Loading cases...</div>
        ) : cases.length === 0 ? (
          <div className={s.empty}>No cases available</div>
        ) : (
          <div className={s.case_slider_container}>
            {visibleProjects.map((project) => (
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

      {!isLoading && cases.length > cardsPerPage && (
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

  return isMobile ? content : <div className="container">{content}</div>;
}
