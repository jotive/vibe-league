import { WHATSAPP } from "@/config/whatsapp";
import { CatalogItem } from "@/schemas/catalog.schema";

export interface BroadcastMessage {
  title: string;
  body: string;
  charCount: number;
  itemCount: number;
}

export interface BroadcastPlan {
  messages: BroadcastMessage[];
  singleMessageChars: number;
  exceedsLimit: boolean;
}

function formatPrice(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

function formatItem(item: CatalogItem): string {
  const price =
    item.priceCop !== null
      ? formatPrice(item.priceCop)
      : "consultar precio";

  const extras: string[] = [];

  if (item.bundle) extras.push(item.bundle);
  if (item.unit) extras.push(item.unit);

  const suffix = extras.length > 0 ? ` (${extras.join(" · ")})` : "";
  const tag = item.promo ? " 🔥" : "";

  return `• ${item.name}: ${price}${suffix}${tag}`;
}

function groupByCategory(items: CatalogItem[]): Map<string, CatalogItem[]> {
  const groups = new Map<string, CatalogItem[]>();

  for (const item of items) {
    const key = item.category?.trim() || WHATSAPP.DEFAULT_CATEGORY;
    const current = groups.get(key) ?? [];

    current.push(item);
    groups.set(key, current);
  }

  return groups;
}

function chunk(items: CatalogItem[], size: number): CatalogItem[][] {
  const chunks: CatalogItem[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function buildMessage(title: string, items: CatalogItem[]): BroadcastMessage {
  const body = `*${title}*\n\n${items.map(formatItem).join("\n")}`;

  return {
    title,
    body,
    charCount: body.length,
    itemCount: items.length,
  };
}

export function planBroadcast(items: CatalogItem[]): BroadcastPlan {
  const sellable = items.filter((item) => item.priceCop !== null);
  const singleBody = sellable.map(formatItem).join("\n");
  const groups = groupByCategory(sellable);

  const messages: BroadcastMessage[] = [];

  for (const [category, groupItems] of groups) {
    const parts = chunk(groupItems, WHATSAPP.MAX_ITEMS_PER_MESSAGE);

    parts.forEach((part, index) => {
      const title =
        parts.length > 1
          ? `${category} (${index + 1}/${parts.length})`
          : category;

      messages.push(buildMessage(title, part));
    });
  }

  return {
    messages,
    singleMessageChars: singleBody.length,
    exceedsLimit: singleBody.length > WHATSAPP.MAX_CHARS,
  };
}
