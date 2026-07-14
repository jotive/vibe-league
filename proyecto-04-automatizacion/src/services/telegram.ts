import { LeadPayload, Qualification } from "@/schemas/lead.schema";

const TEMPERATURE_ICON: Record<string, string> = {
  caliente: "🔥",
  tibio: "🌤",
  frio: "🧊",
};

const COLOMBIA_CODE = "57";
const COLOMBIA_LOCAL_LENGTH = 10;
const MACHINE_ROOM_URL = "https://sala-de-maquinas-ia.vercel.app";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toWhatsappLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");

  const international =
    digits.length === COLOMBIA_LOCAL_LENGTH && digits.startsWith("3")
      ? `${COLOMBIA_CODE}${digits}`
      : digits;

  return `https://wa.me/${international}`;
}

export function buildTelegramMessage(
  lead: LeadPayload,
  qualification: Qualification
): string {
  const icon = TEMPERATURE_ICON[qualification.temperature] ?? "•";
  const whatsappLink = toWhatsappLink(lead.whatsapp);

  const facts = [
    lead.niche ? `Nicho: ${escapeHtml(lead.niche)}` : null,
    lead.dailyMessages
      ? `Mensajes/día: ${escapeHtml(lead.dailyMessages)}`
      : null,
    lead.catalogLocation
      ? `Catálogo: ${escapeHtml(lead.catalogLocation)}`
      : null,
    lead.catalogSize ? `Productos: ${escapeHtml(lead.catalogSize)}` : null,
  ]
    .filter(Boolean)
    .map((line) => `• ${line}`)
    .join("\n");

  return [
    `${icon} <b>Lead ${qualification.temperature.toUpperCase()} · ${qualification.score}/100</b>`,
    "",
    `<b>${escapeHtml(lead.fullName)}</b>${lead.businessName ? ` — ${escapeHtml(lead.businessName)}` : ""}`,
    facts,
    "",
    `<i>${escapeHtml(qualification.reasoning)}</i>`,
    "",
    `<b>Siguiente paso:</b> ${escapeHtml(qualification.nextAction)}`,
    "",
    `<b>Mensaje sugerido</b> (toca para copiarlo):`,
    `<code>${escapeHtml(qualification.whatsappMessage)}</code>`,
    "",
    `<a href="${whatsappLink}">📲 Escribirle por WhatsApp</a>  ·  <a href="${MACHINE_ROOM_URL}">Ver la ejecución</a>`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function sendTelegram(text: string): Promise<string> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Falta TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID.");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(
      `Telegram rechazó el mensaje: ${data.description ?? response.status}`
    );
  }

  return `Notificación entregada al chat ${chatId}`;
}
