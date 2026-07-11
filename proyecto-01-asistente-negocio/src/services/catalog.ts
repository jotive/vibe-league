import {
  AvailabilityItem,
  AvailabilityStatus,
} from "@/schemas/knowledge-base.schema";

import { knowledgeBase } from "./knowledge-base.loader";

const PRICE_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPriceCop(value: number): string {
  return PRICE_FORMATTER.format(value);
}

export function getAllSpecies(): AvailabilityItem[] {
  return [...knowledgeBase.speciesAvailability].sort(
    (a, b) => statusWeight(a.status) - statusWeight(b.status)
  );
}

export function getStarterKits() {
  return knowledgeBase.starterKits;
}

export function getSupplies() {
  return knowledgeBase.supplies;
}

export function getTestimonials() {
  return knowledgeBase.testimonials ?? [];
}

export function discountPercent(item: AvailabilityItem): number {
  if (!item.originalPriceCop || item.originalPriceCop <= item.priceCop) {
    return 0;
  }

  return Math.round(
    ((item.originalPriceCop - item.priceCop) / item.originalPriceCop) * 100
  );
}

export function countAvailableSpecies(): number {
  return knowledgeBase.speciesAvailability.filter(
    (item) => item.status === "disponible"
  ).length;
}

function statusWeight(status: AvailabilityStatus): number {
  if (status === "disponible") return 0;
  if (status === "temporada") return 1;
  if (status === "por_encargo") return 2;

  return 3;
}
