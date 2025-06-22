import { NextResponse } from "next/server";

// Временно хардкодим токены, потом перенесем в переменные окружения
const BOT_TOKEN = "7319307835:AAGvCPNsUCa0eMLc__0WsK83gCS0las2Ad4";
const CHAT_ID = "7892393746";

export async function POST(req) {
  try {
    // Проверяем токены
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing bot credentials");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    // Парсим данные формы
    const formData = await req.json();
    const { name, email, telegram, service, budget, message } = formData;

    // Валидация обязательных полей
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Формируем сообщение для Telegram
    const text =
      `🚀 *Новая заявка с сайта!*\n\n` +
      `👤 *Имя:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `${telegram ? `📱 *Telegram:* ${telegram}\n` : ""}` +
      `🛠 *Услуга:* ${service}\n` +
      `💰 *Бюджет:* ${budget || "Не указан"}\n\n` +
      `📝 *Сообщение:*\n${message}`;

    try {
      // Отправляем сообщение в Telegram
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: "Markdown",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Telegram API error:", result);
        throw new Error(
          result.description || "Failed to send message to Telegram"
        );
      }

      return NextResponse.json({ success: true });
    } catch (telegramError) {
      console.error("Telegram sending error:", telegramError);
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("General error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
