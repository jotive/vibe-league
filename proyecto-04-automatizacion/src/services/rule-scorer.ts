import { LeadPayload, Qualification } from "@/schemas/lead.schema";

const MESSAGE_POINTS: Record<string, number> = {
  "Más de 100": 40,
  "Entre 30 y 100": 32,
  "Entre 10 y 30": 18,
  "Menos de 10": 2,
};

const CATALOG_POINTS: Record<string, number> = {
  "En mi cabeza o en un cuaderno": 35,
  "Solo en Instagram o Facebook": 30,
  "En un Excel o Google Sheets": 20,
  "En un sistema POS o de inventario": 10,
  "En una tienda online (Shopify, WooCommerce…)": 8,
};

const SIZE_POINTS: Record<string, number> = {
  "Más de 2.000": 25,
  "Entre 500 y 2.000": 20,
  "Entre 100 y 500": 12,
  "Menos de 100 productos": 4,
};

function temperatureFor(score: number): Qualification["temperature"] {
  if (score >= 70) return "caliente";
  if (score >= 40) return "tibio";

  return "frio";
}

export function scoreByRules(lead: LeadPayload): Qualification {
  const messages = MESSAGE_POINTS[lead.dailyMessages ?? ""] ?? 12;
  const catalog = CATALOG_POINTS[lead.catalogLocation ?? ""] ?? 15;
  const size = SIZE_POINTS[lead.catalogSize ?? ""] ?? 10;
  const chaosBonus = (lead.parsedIssues ?? 0) > 0 ? 5 : 0;

  const score = Math.min(100, messages + catalog + size + chaosBonus);
  const temperature = temperatureFor(score);

  const reasons = [
    lead.dailyMessages ? `recibe ${lead.dailyMessages.toLowerCase()} mensajes al día` : null,
    lead.catalogLocation ? `su catálogo vive ${lead.catalogLocation.toLowerCase()}` : null,
    lead.catalogSize ? `maneja ${lead.catalogSize.toLowerCase()}` : null,
  ].filter(Boolean);

  const name = lead.fullName.split(" ")[0];

  return {
    score,
    temperature,
    reasoning: `Calificado con las reglas fijas (la IA no respondió): ${reasons.join(", ")}.`,
    nextAction:
      temperature === "frio"
        ? "No priorizar por ahora: la señal de dolor es baja."
        : "Contactarlo y confirmar el tamaño de su catálogo.",
    whatsappMessage: `Hola ${name}, gracias por dejarnos tus datos${
      lead.businessName ? ` de ${lead.businessName}` : ""
    }. Somos Mostrador: montamos un asistente que responde precios y disponibilidad con tu catálogo real. ¿Te cuento cómo funcionaría en tu caso?`,
  };
}
