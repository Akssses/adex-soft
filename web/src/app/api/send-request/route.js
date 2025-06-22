import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req) {
  try {
    const { name, email, telegram, service, budget, message } =
      await req.json();

    // Формируем сообщение для Telegram
    const text =
      `🚀 Новая заявка с сайта!\n\n` +
      `- Имя: ${name}\n` +
      `- Email: ${email}\n` +
      `${telegram ? `- Telegram: ${telegram}\n` : ""}` +
      `- Услуга: ${service}\n` +
      `- Бюджет: ${budget || "Не указан"}\n\n` +
      `- Сообщение:\n${message}`;

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
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
