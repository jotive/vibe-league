import type {
  AvailabilityItem,
  KnowledgeBase,
} from "@/schemas/knowledge-base.schema";

import { RetrievedKnowledge } from "./knowledge-base.retriever";

function formatStockLine(item: AvailabilityItem): string {
  return `- ${item.name}: ${item.status.toUpperCase()} $${item.priceCop.toLocaleString("es-CO")}`;
}

function formatDetailLine(item: AvailabilityItem): string {
  return `- ${item.name}: ${item.status.toUpperCase()} — $${item.priceCop.toLocaleString("es-CO")} — ${item.notes}`;
}

function formatDetails(retrieved: RetrievedKnowledge): string {
  const items = [...retrieved.species, ...retrieved.products];

  if (items.length === 0 && retrieved.faq.length === 0) {
    return "";
  }

  const parts: string[] = [];

  if (items.length > 0) {
    parts.push(
      `DETALLE DE LO CONSULTADO (notas, mínimos de venta y fechas de reabastecimiento):\n${items
        .map(formatDetailLine)
        .join("\n")}`
    );
  }

  if (retrieved.faq.length > 0) {
    parts.push(
      `PREGUNTAS FRECUENTES RELACIONADAS:\n${retrieved.faq
        .map((entry) => `- ${entry.question} → ${entry.answer}`)
        .join("\n")}`
    );
  }

  return `\n\n${parts.join("\n\n")}`;
}

export function formatKnowledgeForPrompt(
  kb: KnowledgeBase,
  retrieved: RetrievedKnowledge
): string {
  const speciesStock = kb.speciesAvailability.map(formatStockLine).join("\n");
  const productStock = kb.productAvailability.map(formatStockLine).join("\n");

  const kitsText = kb.starterKits
    .map(
      (k) =>
        `- ${k.name}: $${k.priceCop.toLocaleString("es-CO")} (${k.tankLiters}L). Incluye EXACTAMENTE: ${k.includes.join("; ")}. Ideal: ${k.idealFor}`
    )
    .join("\n");

  const fishText = kb.fishCategories
    .map(
      (f) =>
        `- ${f.name} (${f.examples.join(", ")}): ${f.priceRangeCop}, ${f.careLevel}, mín ${f.minTankLiters}L`
    )
    .join("\n");

  const climate = kb.climateAdvice;

  const climateText = climate
    ? `

CLIMA Y ALTITUD (clave para recomendar calentador según la ciudad del cliente):
- Tienda: ${climate.storeCity}
- Regla: ${climate.rule}
${climate.cities
  .map(
    (c) =>
      `- ${c.city} (${c.altitudeM} m, ${c.ambientC} °C): ${c.note}`
  )
  .join("\n")}
- Alternativa en clima frío: ${climate.coldClimateAlternative}
- ${climate.outOfCityNote}`
    : "";

  const core = `
NEGOCIO: ${kb.business.name} — ${kb.business.tagline}. ${kb.business.type}, propietaria ${kb.business.owner} (${kb.business.ownerExperienceYears} años).
CONTACTO: ${kb.contact.address}, ${kb.contact.neighborhood}, ${kb.contact.city}. WhatsApp ${kb.contact.whatsapp} · ${kb.contact.email}

HORARIOS:
- ${kb.hours.weekdays}
- ${kb.hours.saturday}
- ${kb.hours.sunday}
- Retiro de peces vivos: ${kb.hours.liveFishPickupBestTimes}

STOCK DE ESPECIES (única fuente de verdad para disponibilidad y precio):
${speciesStock}

STOCK DE PRODUCTOS Y EQUIPOS (única fuente de verdad para disponibilidad y precio):
${productStock}

KITS DE INICIO:
${kitsText}

CATEGORÍAS DE PECES (referencia de cuidado; solo para especies que NO estén en el stock de arriba):
${fishText}

PEDIDOS POR ENCARGO: anticipo ${kb.specialOrdersPolicy.depositPercent}%, ${kb.specialOrdersPolicy.minDays}–${kb.specialOrdersPolicy.maxDays} días hábiles. Solicitar por WhatsApp ${kb.contact.whatsapp} o ${kb.specialOrdersPolicy.orderFormUrl}.

POLÍTICAS:
- Envío equipos: ${kb.policies.shipping}
- Envío peces vivos: ${kb.policies.liveFishShipping}
- Garantía peces vivos: ${kb.policies.liveFishGuarantee}
- Devoluciones: ${kb.policies.returns}
- Aclimatación: ${kb.policies.acclimation}

PAGOS: ${kb.payment.methods.join(", ")}. ${kb.payment.financing}${climateText}
`.trim();

  return core + formatDetails(retrieved);
}
