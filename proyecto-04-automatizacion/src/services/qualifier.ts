import OpenAI from "openai";

import { GROQ_BASE_URL, resolveGroqModel } from "@/config/llm";
import {
  LeadPayload,
  Qualification,
  qualificationSchema,
} from "@/schemas/lead.schema";

import { scoreByRules } from "./rule-scorer";

const SYSTEM_PROMPT = `Eres el jefe de ventas de Mostrador, un asistente de IA para tiendas de nicho en Colombia. Cuesta $149.000 COP al mes, más un setup de digitalización de catálogo desde $390.000 COP.

Te llega un lead que dejó sus datos. Tu trabajo es calificarlo y decidir qué hacer con él. Devuelve SOLO un JSON con esta forma:

{"score":0,"temperature":"caliente","reasoning":"","nextAction":"","whatsappMessage":""}

CÓMO CALIFICAR (score de 0 a 100, número entero):
- Volumen de mensajes al día es la señal más fuerte de dolor. "Más de 100" o "Entre 30 y 100" = mucho dolor, sube el score. "Menos de 10" = no tiene el problema todavía, baja el score fuerte (ese no compra).
- Dónde vive su catálogo define cuánto vale para nosotros. "En mi cabeza o en un cuaderno" o "Solo en Instagram" = NO tiene catálogo digital, así que necesita el setup pagado: es el cliente ideal, sube el score. "En una tienda online" o "En un sistema POS" = ya está digitalizado, necesita menos de nosotros.
- Cantidad de productos: más SKUs = setup más caro y más dolor. Menos de 100 productos = ticket pequeño.
- Si su lista traía errores detectados, es señal de que su inventario es un caos: eso confirma el dolor.
- La pregunta que más le repiten sus clientes revela su dolor concreto. Úsala.

temperature: EXACTAMENTE una de estas tres palabras, en minúscula y SIN TILDE: caliente, tibio, frio.
  "caliente" si score >= 70, "tibio" entre 40 y 69, "frio" si es menor a 40.

reasoning: máximo 300 caracteres. Una o dos frases explicando POR QUÉ ese score, citando los datos concretos del lead. Para que lo lea un vendedor apurado.

nextAction: máximo 150 caracteres. Qué debe hacer el vendedor, concreto.

whatsappMessage: máximo 500 caracteres. El primer mensaje que le mandaríamos por WhatsApp:
- Tuteo colombiano, cercano. Nada de "Estimado".
- Menciona algo ESPECÍFICO que él respondió. Que se note que lo leímos.
- No inventes precios distintos a $149.000/mes y setup desde $390.000.
- Máximo 4 frases. Termina con una pregunta abierta.
- Si el lead es frío, sé amable pero no le hagas perder el tiempo.

Devuelve únicamente el JSON, sin markdown ni explicaciones.`;

function describeLead(lead: LeadPayload): string {
  const lines = [
    `Nombre: ${lead.fullName}`,
    `Tienda: ${lead.businessName ?? "no la dijo"}`,
    `Nicho: ${lead.niche ?? "no lo dijo"}`,
    `Mensajes de clientes al día: ${lead.dailyMessages ?? "no lo dijo"}`,
    `Dónde vive su catálogo: ${lead.catalogLocation ?? "no lo dijo"}`,
    `Cantidad de productos: ${lead.catalogSize ?? "no lo dijo"}`,
    `Pregunta que más le repiten: ${lead.topQuestion ?? "no la dijo"}`,
  ];

  if (lead.parsedItems != null) {
    lines.push(
      `Digitalizó una lista con ${lead.parsedItems} productos y ${lead.parsedIssues ?? 0} errores detectados.`
    );
  }

  return lines.join("\n");
}

function extractJson(text: string): Record<string, unknown> {
  const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start < 0 || end <= start) {
    throw new Error("El modelo no devolvió JSON.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

function stripAccents(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function clamp(value: string, max: number): string {
  const trimmed = value.trim();

  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max - 1)}…`;
}

function coerce(raw: Record<string, unknown>): unknown {
  const score = Math.max(0, Math.min(100, Math.round(Number(raw.score) || 0)));
  const temperature = stripAccents(String(raw.temperature ?? ""));

  const normalizedTemperature = ["caliente", "tibio", "frio"].includes(
    temperature
  )
    ? temperature
    : score >= 70
      ? "caliente"
      : score >= 40
        ? "tibio"
        : "frio";

  return {
    score,
    temperature: normalizedTemperature,
    reasoning: clamp(String(raw.reasoning ?? "Sin motivo."), 400),
    nextAction: clamp(String(raw.nextAction ?? "Revisar manualmente."), 200),
    whatsappMessage: clamp(
      String(raw.whatsappMessage ?? "Hola, gracias por dejarnos tus datos."),
      700
    ),
  };
}

async function askModel(lead: LeadPayload): Promise<Qualification> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Falta GROQ_API_KEY.");
  }

  const client = new OpenAI({ apiKey, baseURL: GROQ_BASE_URL });

  const completion = await client.chat.completions.create({
    model: resolveGroqModel(),
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: describeLead(lead) },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("El modelo no devolvió contenido.");
  }

  const parsed = qualificationSchema.safeParse(coerce(extractJson(content)));

  if (!parsed.success) {
    throw new Error("La calificación no tiene el formato esperado.");
  }

  return parsed.data;
}

export interface QualificationResult {
  qualification: Qualification;
  usedFallback: boolean;
}

export async function qualifyLead(
  lead: LeadPayload
): Promise<QualificationResult> {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      return { qualification: await askModel(lead), usedFallback: false };
    } catch (error) {
      console.warn(
        `[qualifier] Intento ${attempt} falló:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.warn("[qualifier] La IA no respondió bien. Uso las reglas fijas.");

  return { qualification: scoreByRules(lead), usedFallback: true };
}
