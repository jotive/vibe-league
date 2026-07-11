import type {
  AvailabilityItem,
  FaqItem,
  KnowledgeBase,
} from "@/schemas/knowledge-base.schema";

const STOP_WORDS = new Set([
  "para",
  "como",
  "cual",
  "cuales",
  "cuanto",
  "cuanta",
  "donde",
  "tienen",
  "tiene",
  "hacen",
  "quiero",
  "puedo",
  "necesito",
  "sobre",
  "esta",
  "este",
  "esto",
  "unos",
  "unas",
  "hola",
  "pero",
  "porque",
  "acuario",
  "pez",
  "peces",
]);

const DIACRITICS = /[̀-ͯ]/g;
const NON_ALPHANUMERIC = /[^a-z0-9\s]/g;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .replace(NON_ALPHANUMERIC, " ");
}

function extractKeywords(question: string): string[] {
  return normalize(question)
    .split(/\s+/)
    .filter((word) => word.length >= 4 && !STOP_WORDS.has(word));
}

function matches(haystack: string, keywords: string[]): boolean {
  const normalized = normalize(haystack);

  return keywords.some((keyword) => normalized.includes(keyword));
}

export function selectRelevantItems(
  items: AvailabilityItem[],
  keywords: string[],
  limit: number
): AvailabilityItem[] {
  if (keywords.length === 0) return [];

  return items
    .filter((item) => matches(`${item.name} ${item.notes}`, keywords))
    .slice(0, limit);
}

export function selectRelevantFaq(
  faq: FaqItem[],
  keywords: string[],
  limit: number
): FaqItem[] {
  if (keywords.length === 0) return [];

  return faq
    .filter((item) => matches(`${item.question} ${item.answer}`, keywords))
    .slice(0, limit);
}

export interface RetrievedKnowledge {
  species: AvailabilityItem[];
  products: AvailabilityItem[];
  faq: FaqItem[];
}

export function retrieveForQuestion(
  kb: KnowledgeBase,
  question: string
): RetrievedKnowledge {
  const keywords = extractKeywords(question);

  return {
    species: selectRelevantItems(kb.speciesAvailability, keywords, 6),
    products: selectRelevantItems(kb.productAvailability, keywords, 6),
    faq: selectRelevantFaq(kb.faq, keywords, 3),
  };
}
