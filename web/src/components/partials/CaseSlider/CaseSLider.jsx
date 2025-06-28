"use client";

import React, { useState, useEffect } from "react";
import s from "./CaseSlider.module.scss";
import CaseCard from "@/components/shared/CaseCard/CaseCard";
import { casesService } from "@/services/casesService";
import Link from "next/link";

export default function CaseSlider() {
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
    setIsLoading;

    fetchCases();
  }, []);

  // Take only first 9 cases
  const visibleCases = cases.slice(0, 9);

  return (
    <div className="container">
      <div className={s.case_section}>
        <header className={s.header}>
          <h1 className={s.title}>Our Cases</h1>
        </header>

        <div className={s.cases_grid}>
          {isLoading ? (
            <div className={s.loading}>Loading cases...</div>
          ) : cases.length === 0 ? (
            <div className={s.empty}>No cases available</div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {!isLoading && cases.length > 9 && (
          <div className={s.view_more}>
            <Link href="/cases" className={s.view_more_button}>
              View More Cases
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
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
