import OpenAI from "openai";

import { GROQ_BASE_URL, resolveGroqModel } from "@/config/llm";
import {
  LeadPayload,
  Qualification,
  qualificationSchema,
} from "@/schemas/lead.schema";

const SYSTEM_PROMPT = `Eres el jefe de ventas de Mostrador, un asistente de IA para tiendas de nicho en Colombia. Cuesta $149.000 COP al mes, más un setup de digitalización de catálogo desde $390.000 COP.

Te llega un lead que dejó sus datos. Tu trabajo es calificarlo y decidir qué hacer con él. Devuelve SOLO un JSON con esta forma:

{"score":0,"temperature":"caliente","reasoning":"","nextAction":"","whatsappMessage":""}

CÓMO CALIFICAR (score de 0 a 100):
- Volumen de mensajes al día es la señal más fuerte de dolor. "Más de 100" o "Entre 30 y 100" = mucho dolor, sube el score. "Menos de 10" = no tiene el problema todavía, baja el score fuerte (ese no compra).
- Dónde vive su catálogo define cuánto vale para nosotros. "En mi cabeza o en un cuaderno" o "Solo en Instagram" = NO tiene catálogo digital, así que necesita el setup pagado: es el cliente ideal, sube el score. "En una tienda online" o "En un sistema POS" = ya está digitalizado, necesita menos de nosotros.
- Cantidad de productos: más SKUs = setup más caro y más dolor. Menos de 100 productos = ticket pequeño.
- Si viene de la herramienta de digitalización (proyecto-03) y su lista traía errores detectados, es señal de que su inventario es un caos: eso confirma el dolor.
- La pregunta que más le repiten sus clientes revela su dolor concreto. Úsala.

temperature: "caliente" si score >= 70, "tibio" entre 40 y 69, "frio" si es menor a 40.

reasoning: una o dos frases, en español, explicando POR QUÉ ese score. Cita los datos concretos del lead, no generalidades. Escríbelo para que lo lea un vendedor apurado.

nextAction: qué debe hacer el vendedor, concreto. Ej: "Llamarlo hoy, ofrecer setup de 500+ SKUs" o "No priorizar: recibe menos de 10 mensajes al día".

whatsappMessage: el primer mensaje que le mandaríamos por WhatsApp. Reglas:
- Tuteo colombiano, cercano, sin ser meloso. Nada de "Estimado".
- Menciona algo ESPECÍFICO que él respondió (su tienda, su nicho, dónde vive su catálogo, o la pregunta que le repiten). Que se note que lo leímos.
- No prometas nada que no esté en el producto. No inventes precios distintos a $149.000/mes y setup desde $390.000.
- Máximo 4 frases. Termina con una pregunta abierta.
- Si el lead es frío, igual sé amable pero no le hagas perder el tiempo con una llamada.

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
    `Vino de: ${lead.projectSlug}`,
  ];

  if (lead.parsedItems != null) {
    lines.push(
      `Digitalizó una lista con ${lead.parsedItems} productos y ${lead.parsedIssues ?? 0} errores detectados.`
    );
  }

  return lines.join("\n");
}

function extractJson(text: string): unknown {
  const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start < 0 || end <= start) {
    throw new Error("El modelo no devolvió JSON.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function qualifyLead(lead: LeadPayload): Promise<Qualification> {
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

  const parsed = qualificationSchema.safeParse(extractJson(content));

  if (!parsed.success) {
    throw new Error("La calificación no tiene el formato esperado.");
  }

  return parsed.data;
}
