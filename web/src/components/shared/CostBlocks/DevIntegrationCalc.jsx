// DevIntegrationCalc.jsx
"use client";

import React, { useState, useEffect } from "react";
import s from "@/styles/CostBlocks.module.scss";

const integrationTypes = [
  { key: "backend", label: "Backend-сервисы" },
  { key: "frontend", label: "Frontend-разработка" },
  { key: "fullstack", label: "Fullstack-решение" },
  { key: "api", label: "API-интеграции" },
  { key: "devops", label: "DevOps & CI/CD" },
  { key: "microservices", label: "Микросервисы" },
  { key: "admin", label: "Админ-панель" },
  { key: "support", label: "Поддержка & SLA" },
];

const questionsMap = {
  backend: [
    {
      key: "servicesCount",
      multi: false,
      question: "Сколько сервисов нужно разработать?",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–7", price: 500 },
        { label: "8+", price: 1000 },
      ],
    },
    {
      key: "complexity",
      multi: false,
      question: "Сложность логики",
      options: [
        { label: "Простая CRUD", price: 0 },
        { label: "Бизнес-логика", price: 400 },
        { label: "Высоконагруженные", price: 800 },
      ],
    },
    {
      key: "database",
      multi: false,
      question: "Проектирование БД",
      options: [
        { label: "Нет", price: 0 },
        { label: "Реляционная", price: 300 },
        { label: "NoSQL/микс", price: 400 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Интеграции",
      options: [
        { label: "REST API", price: 200 },
        { label: "GraphQL", price: 300 },
        { label: "Message Queue", price: 250 },
        { label: "Платёжный шлюз", price: 300 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Тестирование",
      options: [
        { label: "Нет", price: 0 },
        { label: "Unit-тесты", price: 200 },
        { label: "Integration-тесты", price: 400 },
      ],
    },
    {
      key: "docs",
      multi: false,
      question: "Документация API",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (Swagger)", price: 200 },
        { label: "Full (OpenAPI + примеры)", price: 400 },
      ],
    },
  ],

  frontend: [
    {
      key: "screensCount",
      multi: false,
      question: "Сколько экранов/страниц?",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–7", price: 300 },
        { label: "8+", price: 600 },
      ],
    },
    {
      key: "framework",
      multi: false,
      question: "Выберите фреймворк",
      options: [
        { label: "React/Vue", price: 0 },
        { label: "Angular", price: 200 },
        { label: "Svelte", price: 200 },
      ],
    },
    {
      key: "responsive",
      multi: false,
      question: "Адаптивная верстка",
      options: [
        { label: "Только desktop", price: 0 },
        { label: "Desktop+tablet", price: 200 },
        { label: "Все устройства", price: 400 },
      ],
    },
    {
      key: "interactive",
      multi: false,
      question: "Интерактивность & анимации",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic CSS", price: 150 },
        { label: "JS-анимации", price: 300 },
      ],
    },
    {
      key: "stateMgmt",
      multi: false,
      question: "Управление состоянием",
      options: [
        { label: "Локально", price: 0 },
        { label: "Redux/MobX", price: 200 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Тестирование UI",
      options: [
        { label: "Нет", price: 0 },
        { label: "Unit+Snapshot", price: 200 },
        { label: "E2E-тесты", price: 400 },
      ],
    },
  ],

  fullstack: [
    {
      key: "modules",
      multi: false,
      question: "Сколько модулей полный стэк",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–6", price: 600 },
        { label: "7+", price: 1200 },
      ],
    },
    {
      key: "backendStack",
      multi: false,
      question: "Backend-стек",
      options: [
        { label: "Node.js/Python", price: 0 },
        { label: "Java/.NET", price: 200 },
      ],
    },
    {
      key: "frontendStack",
      multi: false,
      question: "Frontend-стек",
      options: [
        { label: "React/Vue", price: 0 },
        { label: "Angular", price: 200 },
      ],
    },
    {
      key: "integrations",
      multi: true,
      question: "Интеграции",
      options: [
        { label: "REST API", price: 200 },
        { label: "GraphQL", price: 300 },
        { label: "Auth Service", price: 250 },
      ],
    },
    {
      key: "deployment",
      multi: false,
      question: "Деплоймент",
      options: [
        { label: "Manual", price: 0 },
        { label: "CI/CD pipeline", price: 300 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Тесты",
      options: [
        { label: "Unit", price: 200 },
        { label: "Integration", price: 400 },
        { label: "E2E", price: 600 },
      ],
    },
  ],

  api: [
    {
      key: "endpoints",
      multi: false,
      question: "Сколько API-эндпоинтов?",
      options: [
        { label: "1–10", price: 0 },
        { label: "11–30", price: 300 },
        { label: "31+", price: 600 },
      ],
    },
    {
      key: "auth",
      multi: false,
      question: "Методы аутентификации",
      options: [
        { label: "None", price: 0 },
        { label: "Token (JWT)", price: 200 },
        { label: "OAuth2", price: 300 },
      ],
    },
    {
      key: "rateLimit",
      multi: false,
      question: "Rate-limiting",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 150 },
        { label: "Advanced", price: 300 },
      ],
    },
    {
      key: "docs",
      multi: false,
      question: "Документация",
      options: [
        { label: "Swagger", price: 200 },
        { label: "OpenAPI + примеры", price: 400 },
      ],
    },
    {
      key: "testing",
      multi: false,
      question: "Тесты API",
      options: [
        { label: "Нет", price: 0 },
        { label: "Unit", price: 200 },
        { label: "Integration", price: 400 },
      ],
    },
  ],

  devops: [
    {
      key: "pipelines",
      multi: false,
      question: "CI/CD-конвейеры",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (GitHub Actions)", price: 300 },
        { label: "Advanced (Jenkins/GitLab)", price: 600 },
      ],
    },
    {
      key: "infra",
      multi: false,
      question: "Инфраструктура",
      options: [
        { label: "Shared", price: 0 },
        { label: "VPS/Cloud", price: 400 },
        { label: "Kubernetes", price: 800 },
      ],
    },
    {
      key: "monitoring",
      multi: false,
      question: "Мониторинг",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (Prometheus)", price: 300 },
        { label: "Full (Grafana+Alerts)", price: 600 },
      ],
    },
    {
      key: "security",
      multi: false,
      question: "DevSecOps",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic scans", price: 200 },
        { label: "Full pipeline", price: 500 },
      ],
    },
  ],

  microservices: [
    {
      key: "count",
      multi: false,
      question: "Сколько микросервисов?",
      options: [
        { label: "1–3", price: 0 },
        { label: "4–7", price: 500 },
        { label: "8+", price: 1000 },
      ],
    },
    {
      key: "orchestration",
      multi: false,
      question: "Оркестрация",
      options: [
        { label: "Нет", price: 0 },
        { label: "Docker Compose", price: 200 },
        { label: "Kubernetes", price: 600 },
      ],
    },
    {
      key: "communication",
      multi: false,
      question: "Взаимодействие сервисов",
      options: [
        { label: "REST", price: 0 },
        { label: "gRPC", price: 300 },
        { label: "Message Queue", price: 300 },
      ],
    },
    {
      key: "monitoring",
      multi: false,
      question: "Мониторинг",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 300 },
        { label: "Advanced", price: 600 },
      ],
    },
  ],

  admin: [
    {
      key: "pages",
      multi: false,
      question: "Сколько страниц админ-панели?",
      options: [
        { label: "1–5", price: 0 },
        { label: "6–10", price: 300 },
        { label: "11+", price: 600 },
      ],
    },
    {
      key: "roles",
      multi: false,
      question: "Роли пользователей",
      options: [
        { label: "1", price: 0 },
        { label: "2–3", price: 200 },
        { label: "4+", price: 400 },
      ],
    },
    {
      key: "analytics",
      multi: false,
      question: "Визуализация данных",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic (charts)", price: 300 },
        { label: "Advanced (dashboards)", price: 600 },
      ],
    },
    {
      key: "security",
      multi: false,
      question: "Уровень безопасности",
      options: [
        { label: "Basic", price: 0 },
        { label: "2FA", price: 200 },
        { label: "RBAC", price: 400 },
      ],
    },
  ],

  support: [
    {
      key: "sla",
      multi: false,
      question: "Уровень SLA",
      options: [
        { label: "24/7", price: 0 },
        { label: "8x5", price: 200 },
        { label: "Business hours", price: 300 },
      ],
    },
    {
      key: "response",
      multi: false,
      question: "Время реакции",
      options: [
        { label: "1 час", price: 0 },
        { label: "4 часа", price: 100 },
        { label: "24 часа", price: 200 },
      ],
    },
    {
      key: "bugFixes",
      multi: false,
      question: "Исправление багов",
      options: [
        { label: "Нет", price: 0 },
        { label: "Basic", price: 200 },
        { label: "Priority", price: 400 },
      ],
    },
    {
      key: "updates",
      multi: false,
      question: "Обновления и патчи",
      options: [
        { label: "Monthly", price: 0 },
        { label: "Weekly", price: 200 },
        { label: "Daily", price: 400 },
      ],
    },
  ],
};

export default function DevIntegrationCalc() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = type ? questionsMap[type] : [];
  const totalSteps = questions.length;

  // Итоговая сумма
  const total = questions.reduce((sum, q) => {
    const ans = answers[q.key];
    if (!ans) return sum;
    return sum + (q.multi ? ans.reduce((s, o) => s + o.price, 0) : ans.price);
  }, 0);

  const percent = type ? Math.round((step / totalSteps) * 100) : 0;

  // Оповещаем родителя о сумме
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("calc:update", { detail: total }));
  }, [total]);

  const handleNext = () => {
    if (step === totalSteps) {
      setIsComplete(true);
      window.dispatchEvent(
        new CustomEvent("calc:complete", {
          detail: { service: `devint:${type}`, answers, total },
        })
      );
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (step <= 1) {
      setType(null);
      setStep(0);
    } else {
      setStep((s) => s - 1);
    }
  };

  const toggleAnswer = (key, opt, multi) => {
    setAnswers((prev) => {
      const curr = prev[key] || (multi ? [] : null);
      if (multi) {
        const exists = curr.find((o) => o.label === opt.label);
        return {
          ...prev,
          [key]: exists
            ? curr.filter((o) => o.label !== opt.label)
            : [...curr, opt],
        };
      }
      return { ...prev, [key]: opt };
    });
  };

  // Выбор поднаправления
  if (!type) {
    return (
      <div className={s.chooseType}>
        <h2>Разработка & интеграции</h2>
        <div className={s.types}>
          {integrationTypes.map((t) => (
            <button
              key={t.key}
              className={type === t.key ? s.active : ""}
              onClick={() => {
                setType(t.key);
                setStep(1);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Итоговая сводка
  if (isComplete) {
    const label = integrationTypes.find((t) => t.key === type)?.label;
    return (
      <div className={s.summary}>
        <h2>Сводка по разработке & интеграции</h2>
        <p>
          <strong>Направление:</strong> {label}
        </p>
        <ul>
          {questions.map((q) => {
            const ans = answers[q.key];
            if (!ans) return null;
            return (
              <li key={q.key}>
                <strong>{q.question}:</strong>{" "}
                {q.multi ? ans.map((o) => o.label).join(", ") : ans.label}
              </li>
            );
          })}
        </ul>
        <p>
          <strong>Итоговая стоимость:</strong> ${total}
        </p>
      </div>
    );
  }

  // Шаги вопросов
  return (
    <div className={s.calc}>
      <div className={s.header}>
        <div className={s.progressBar}>
          <div className={s.fill} style={{ width: `${percent}%` }} />
        </div>
        <span className={s.progressText}>{percent}%</span>
      </div>

      <div className={s.body}>
        {step > 0 && step <= totalSteps && (
          <div className={s.question}>
            <h2>{questions[step - 1].question}</h2>
            <div className={s.options}>
              {questions[step - 1].options.map((opt) => {
                const sel = answers[questions[step - 1].key] || [];
                const selected = questions[step - 1].multi
                  ? sel.some((o) => o.label === opt.label)
                  : sel.label === opt.label;
                return (
                  <div
                    key={opt.label}
                    className={`${s.card} ${selected ? s.selected : ""}`}
                    onClick={() =>
                      toggleAnswer(
                        questions[step - 1].key,
                        opt,
                        questions[step - 1].multi
                      )
                    }
                  >
                    <p>{opt.label}</p>
                    <span>${opt.price}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className={s.controls}>
        <button onClick={handlePrev}>
          {step <= 1 ? "← Выбрать поднаправление" : "Назад"}
        </button>
        <button
          onClick={handleNext}
          disabled={
            !answers[questions[step - 1].key] &&
            !(
              questions[step - 1].multi &&
              answers[questions[step - 1].key]?.length
            )
          }
        >
          {step === totalSteps ? "Завершить" : "Далее"}
        </button>
      </div>
    </div>
  );
}
