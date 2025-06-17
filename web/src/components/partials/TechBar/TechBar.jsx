"use client";

import React, { useEffect, useRef } from "react";
import stackData from "./stackData";
import s from "./TechBar.module.scss";

export default function TechBar() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const animationFrameRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastUpdateRef = useRef(Date.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardSize = { width: 80, height: 80 };

    const cards = cardsRef.current;
    cards.forEach((card, index) => {
      if (!card) return;
      card.dataset.x = Math.random() * (container.offsetWidth - cardSize.width);
      card.dataset.y =
        Math.random() * (container.offsetHeight - cardSize.height);
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.2;
      card.dataset.vx = Math.cos(angle) * speed;
      card.dataset.vy = Math.sin(angle) * speed;
      card.dataset.rotation = 0;
      card.dataset.targetRotation = 0;
      card.dataset.baseSpeed = speed;
    });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      const now = Date.now();
      const deltaTime = Math.min((now - lastUpdateRef.current) / 16, 2);
      lastUpdateRef.current = now;

      cards.forEach((card, i) => {
        if (!card) return;

        let x = parseFloat(card.dataset.x);
        let y = parseFloat(card.dataset.y);
        let vx = parseFloat(card.dataset.vx);
        let vy = parseFloat(card.dataset.vy);
        const baseSpeed = parseFloat(card.dataset.baseSpeed);
        let currentRotation = parseFloat(card.dataset.rotation) || 0;
        let targetRotation = parseFloat(card.dataset.targetRotation) || 0;

        // Сохраняем предыдущее направление для определения необходимости поворота
        const prevAngle = Math.atan2(vy, vx);

        // Отталкивание от курсора
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - (x + cardSize.width / 2), 2) +
            Math.pow(mouseRef.current.y - (y + cardSize.height / 2), 2)
        );

        if (mouseDistance < 250) {
          const angle = Math.atan2(
            y + cardSize.height / 2 - mouseRef.current.y,
            x + cardSize.width / 2 - mouseRef.current.x
          );
          // Экспоненциальное усиление эффекта при приближении к курсору
          const force = Math.pow((250 - mouseDistance) / 250, 2) * 4.0;
          vx += Math.cos(angle) * force * deltaTime * 2;
          vy += Math.sin(angle) * force * deltaTime * 2;
        }

        // Отталкивание от других карточек
        cards.forEach((otherCard, j) => {
          if (i !== j && otherCard) {
            const otherX = parseFloat(otherCard.dataset.x);
            const otherY = parseFloat(otherCard.dataset.y);

            const dx = x - otherX;
            const dy = y - otherY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = cardSize.width;

            if (distance < minDistance && distance > 0) {
              const angle = Math.atan2(dy, dx);
              const force = ((minDistance - distance) / minDistance) * 0.5;
              vx += Math.cos(angle) * force * deltaTime;
              vy += Math.sin(angle) * force * deltaTime;
            }
          }
        });

        // Поддерживаем базовую скорость движения только если нет влияния мыши
        const mouseInfluence = mouseDistance < 250;
        const currentSpeed = Math.sqrt(vx * vx + vy * vy);

        if (!mouseInfluence && currentSpeed < baseSpeed) {
          const speedFactor = baseSpeed / Math.max(currentSpeed, 0.1);
          vx *= speedFactor;
          vy *= speedFactor;
        }

        // Обновляем позиции с более медленной базовой скоростью
        x += vx * deltaTime * (mouseInfluence ? 1.5 : 0.8);
        y += vy * deltaTime * (mouseInfluence ? 1.5 : 0.8);

        // Ограничение максимальной скорости (зависит от влияния мыши)
        const maxSpeed = baseSpeed * (mouseInfluence ? 4 : 2);
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > maxSpeed) {
          const factor = maxSpeed / speed;
          vx *= factor;
          vy *= factor;
        }

        // Отражение от границ
        if (x <= 0) {
          x = 0;
          vx = Math.abs(vx);
        } else if (x >= container.offsetWidth - cardSize.width) {
          x = container.offsetWidth - cardSize.width;
          vx = -Math.abs(vx);
        }
        if (y <= 0) {
          y = 0;
          vy = Math.abs(vy);
        } else if (y >= container.offsetHeight - cardSize.height) {
          y = container.offsetHeight - cardSize.height;
          vy = -Math.abs(vy);
        }

        // Определяем необходимость поворота только при значительном изменении направления
        const newAngle = Math.atan2(vy, vx);
        const angleDiff = Math.abs(newAngle - prevAngle);
        if (angleDiff > 0.1) {
          // Порог для начала поворота
          targetRotation = (newAngle * 180) / Math.PI;
        }

        // Очень плавный поворот к целевому углу
        const rotationDiff = targetRotation - currentRotation;
        // Нормализуем разницу углов в диапазон [-180, 180]
        const normalizedDiff = ((rotationDiff + 180) % 360) - 180;
        currentRotation += normalizedDiff * 0.05 * deltaTime;

        // Сохраняем значения
        card.dataset.x = x;
        card.dataset.y = y;
        card.dataset.vx = vx;
        card.dataset.vy = vy;
        card.dataset.rotation = currentRotation;
        card.dataset.targetRotation = targetRotation;

        // Применяем трансформацию
        card.style.transform = `translate(${x}px, ${y}px) rotate(${currentRotation}deg)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className={s.techSection}>
      <div className={s.heading}>
        <h1>Технологии</h1>
        <div className={s.subtext}>которые мы используем</div>
      </div>
      <div className={s.container} ref={containerRef}>
        {stackData.map((tech, index) => (
          <div
            key={tech.name}
            ref={(el) => (cardsRef.current[index] = el)}
            className={s.tech_card}
          >
            <img src={tech.logo} alt={tech.name} />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
