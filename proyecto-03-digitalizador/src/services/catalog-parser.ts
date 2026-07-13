import OpenAI from "openai";

import { GROQ_BASE_URL, resolveGroqModel } from "@/config/llm";
import { CatalogItem, parsedCatalogSchema } from "@/schemas/catalog.schema";

const SYSTEM_PROMPT = `Eres un digitalizador de catálogos. Recibes una lista de precios cruda, tal como un proveedor la manda por WhatsApp: desordenada, con errores de digitación, promociones escritas a mano y encabezados sueltos.

Tu trabajo es convertirla en datos estructurados. Devuelve SOLO un JSON válido con esta forma:

{"items":[{"name":"","priceCop":0,"rawPrice":null,"category":null,"unit":null,"bundle":null,"promo":false,"issue":null,"suggestedPriceCop":null}]}

REGLAS:
1. "name": el nombre del producto, limpio. Escríbelo como en español normal: mayúscula SOLO en la primera letra y en nombres propios. NO pongas cada palabra en mayúscula. Correcto: "Goldfish calico de velo", "Betta halfmoon macho". Incorrecto: "Goldfish Calico De Velo". Corrige errores obvios de ortografía del producto (ej. "Golfish" → "Goldfish", "Coridoras" → "Corydoras"), pero NUNCA cambies el producto por otro.
2. "priceCop": el precio de UNA unidad, en pesos colombianos, número entero, sin puntos ni símbolos. "8.000" → 8000.
   CUIDADO, esto es lo más importante de todo: si la línea SOLO da un precio por cantidad (ej. "15 neones x 20.000", "6 unidades x 25.000" sin decir cuánto vale una), entonces NO conoces el precio unitario. En ese caso "priceCop" DEBE ser null, el precio por cantidad va en "bundle", y "issue" debe decir "Solo hay precio por paquete, no por unidad". NUNCA pongas el precio del paquete como si fuera el de una unidad: eso haría que la tienda le cobre de más a su cliente.
   Si la línea da AMBOS (ej. "Monjitas: 5.000 o 6 unidades x 25.000"), entonces "priceCop" es el unitario (5000) y "bundle" es "6 unidades x 25.000".
3. "category": si la lista trae encabezados (ej. "PECES IMPORTADOS Y EXÓTICOS"), asigna ese encabezado como categoría a los productos que van debajo. Si no hay encabezados, infiere una categoría corta y sensata. Nunca inventes una categoría que contradiga la lista.
4. "unit": la unidad de venta si se menciona ("la unidad", "por pareja", "x 1"). Si no se menciona, null.
5. "bundle": si hay precio por cantidad ("6 unidades x 25.000", "4 unidades en 10.000"), escríbelo tal cual. Si no, null.
6. "promo": true SOLO si la línea dice explícitamente que está en promoción, oferta o descuento.
7. "rawPrice": el precio EXACTAMENTE como lo escribió el proveedor, tal cual, sin corregir nada (ej. "15.0000", "8.000", "20.000"). Es el texto literal. Si la línea no trae precio, null. Esto sirve para mostrarle al dueño qué escribió su proveedor de verdad.
8. "issue": si detectas un problema, descríbelo en español, corto y en tono de ayuda. Casos:
   - Precio mal digitado (ej. "15.0000" cuando todo lo demás en la lista está en miles): NO lo corrijas por tu cuenta. En "priceCop" pon el número TAL COMO QUEDA LEÍDO literalmente, quitando solo los separadores de miles: "15.0000" se lee como 150000. En "rawPrice" pon el texto original "15.0000". En "issue" pon "Parece un cero de más". En "suggestedPriceCop" pon lo que creas que quiso decir (15000). El dueño verá el precio disparatado en rojo y decidirá él si lo corrige. Esto es intencional: no le escondemos lo que su proveedor escribió de verdad.
   - Línea sin precio → issue: "No trae precio".
   - Producto ambiguo o nombre incompleto → issue: "Nombre incompleto".
   Si no hay problema, "issue": null y "suggestedPriceCop": null.
8. NUNCA inventes productos ni precios que no estén en la lista. Si una línea es un encabezado o un saludo, NO la conviertas en producto: omítela.
9. Ignora marcas de tiempo, nombres de contacto y texto que no sea producto.

Devuelve únicamente el JSON. Sin explicaciones, sin markdown, sin bloques de código.`;

function extractJson(text: string): unknown {
  const cleaned = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start < 0 || end <= start) {
    throw new Error("El modelo no devolvió JSON.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function parseCatalog(rawText: string): Promise<CatalogItem[]> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Falta GROQ_API_KEY.");
  }

  const client = new OpenAI({ apiKey, baseURL: GROQ_BASE_URL });

  const completion = await client.chat.completions.create({
    model: resolveGroqModel(),
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: rawText },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("El modelo no devolvió contenido.");
  }

  const parsed = parsedCatalogSchema.safeParse(extractJson(content));

  if (!parsed.success) {
    throw new Error("El modelo devolvió un formato inesperado.");
  }

  return parsed.data.items.filter((item) => item.name.trim().length > 0);
}
