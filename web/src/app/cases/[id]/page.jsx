"use client";

import React, { useEffect, useState } from "react";
import { use } from "react";
import BannerCTA from "@/components/layout/BannerCTA/BannerCTA";
import CaseHero from "@/app/cases/components/CaseHero/CaseHero";
import CaseTechStack from "@/app/cases/components/TechStack/TechStack";
import CaseTestimonial from "@/app/cases/components/Testimonial/Testimonial";
import RelatedCases from "@/app/cases/components/RelatedCases/RelatedCases";
import { casesService } from "@/services/casesService";
import s from "@/styles/CaseDetail.module.scss";
import CaseSlider from "@/components/partials/CaseSlider/CaseSLider";

export default function CaseDetailPage({ params }) {
  const resolvedParams = use(params);
  const [caseData, setCaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const data = await casesService.getCaseById(resolvedParams.id);
        setCaseData(data);
      } catch (err) {
        console.error("Error fetching case:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseData();
  }, [resolvedParams.id]);

  if (isLoading) {
    return <div className={`${s.loading} container`}>Loading...</div>;
  }

  if (error) {
    return <div className={`${s.error} container`}>Error: {error}</div>;
  }

  if (!caseData) {
    return <div className={`${s.notFound} container`}>Case not found</div>;
  }

  const heroData = {
    title: caseData.title,
    subtitle: caseData.description,
    tags: caseData.tags.map((tag) => tag.name),
    platform: caseData.stacks.map((stack) => stack.name).join(" + "),
    services: caseData.services.map((service) => service.name),
    projectUrl: caseData.project_url || "#",
    images: caseData.images.map((img) => ({
      src: img.image,
      alt: caseData.title,
      caption: img.description || caseData.title,
    })),
    stages: caseData.stages,
  };

  return (
    <>
      <main className={s.casePage}>
        <CaseHero {...heroData} />
        <div className={`${s.content} container`}>
          <CaseTechStack stacks={caseData.stacks} />
          {caseData.review_text && caseData.client_name && (
            <CaseTestimonial
              text={caseData.review_text}
              author={caseData.client_name}
              position={caseData.client_position}
              avatar={caseData.client_avatar}
            />
          )}
          {/* <RelatedCases currentCaseId={resolvedParams.id} /> */}
          <CaseSlider />
        </div>
        <BannerCTA />
      </main>
    </>
  );
}
