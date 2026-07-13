import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

import { CHAT_CONFIG, GROQ_BASE_URL, resolveGroqModel } from "@/config/llm";
import { HTTP_STATUS } from "@/constants/http-status";
import { lang } from "@/lang";
import { catalogItemSchema } from "@/schemas/catalog.schema";

export const maxDuration = 60;

const chatRequestSchema = z.object({
  question: z.string().trim().min(1).max(400),
  items: z.array(catalogItemSchema).min(1).max(300),
});

function formatCatalog(items: z.infer<typeof catalogItemSchema>[]): string {
  return items
    .map((item) => {
      const price =
        item.priceCop !== null
          ? `$${item.priceCop.toLocaleString("es-CO")} por unidad`
          : "sin precio unitario";

      const extras = [
        item.bundle ? `precio por cantidad: ${item.bundle}` : null,
        item.unit ? `se vende ${item.unit}` : null,
        item.promo ? "en promoción" : null,
        item.category ? `categoría: ${item.category}` : null,
      ].filter(Boolean);

      return `- ${item.name}: ${price}${extras.length ? ` (${extras.join("; ")})` : ""}`;
    })
    .join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const parsed = chatRequestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: lang.errors.validation },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: lang.errors.chatFailed },
        { status: HTTP_STATUS.SERVICE_UNAVAILABLE }
      );
    }

    const systemPrompt = `Eres el asistente de una tienda. Respondes preguntas de clientes usando ÚNICAMENTE este catálogo:

${formatCatalog(parsed.data.items)}

REGLAS ESTRICTAS:
1. Responde solo con lo que está en el catálogo de arriba. NUNCA inventes productos, precios ni disponibilidad.
2. Si un producto NO tiene precio unitario y solo tiene precio por cantidad, dilo así: no afirmes un precio por unidad que no existe.
3. Si te preguntan por algo que no está en el catálogo, di con honestidad que no lo tienes en la lista y ofrece ayudar con lo que sí hay.
4. Cita los precios exactamente como aparecen. No redondees ni estimes.
5. Responde breve (2-4 oraciones), en español colombiano, con tono cercano de tendero que conoce su producto.`;

    const client = new OpenAI({ apiKey, baseURL: GROQ_BASE_URL });

    const completion = await client.chat.completions.create({
      model: resolveGroqModel(),
      temperature: CHAT_CONFIG.TEMPERATURE,
      max_tokens: CHAT_CONFIG.MAX_TOKENS,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: parsed.data.question },
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: lang.errors.chatFailed },
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[api/chat] Fallo el asistente del catálogo:", error);

    return NextResponse.json(
      { error: lang.errors.chatFailed },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
