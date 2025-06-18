"use client";

import React from "react";
import Image from "next/image";
import s from "./Testimonial.module.scss";

export default function CaseTestimonial({ quote, author }) {
  return (
    <section className={s.testimonial}>
      <div className={s.content}>
        <div className={s.quote}>
          <svg
            className={s.quoteIcon}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4 24H8V17.6C8 13.4 11.4 10 15.6 10H16V14.8H15.6C14 14.8 12.8 16 12.8 17.6V24H14.4V32H8V24H14.4ZM30.4 24H24V17.6C24 13.4 27.4 10 31.6 10H32V14.8H31.6C30 14.8 28.8 16 28.8 17.6V24H30.4V32H24V24H30.4Z"
              fill="currentColor"
            />
          </svg>
          <p className={s.quoteText}>
            The ADEX team executed our vision perfectly. Fast, clear, and sharp!
          </p>
        </div>

        <div className={s.author}>
          <div className={s.avatar}>
            <img
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=800&q=80"
              alt=""
            />
          </div>
          <div className={s.authorInfo}>
            <div className={s.name}>Akbar Kudaibergenov</div>
            <div className={s.position}>ADEX Group Founder</div>
          </div>
        </div>
      </div>
    </section>
  );
}
