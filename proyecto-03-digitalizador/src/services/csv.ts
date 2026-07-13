import { CatalogItem } from "@/schemas/catalog.schema";

const HEADERS = [
  "producto",
  "precio_unitario_cop",
  "categoria",
  "unidad_de_venta",
  "precio_por_cantidad",
  "en_promocion",
  "revisar",
];

function escape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export function toCsv(items: CatalogItem[]): string {
  const rows = items.map((item) =>
    [
      item.name,
      item.priceCop !== null ? String(item.priceCop) : "",
      item.category ?? "",
      item.unit ?? "",
      item.bundle ?? "",
      item.promo ? "si" : "no",
      item.issue ?? "",
    ]
      .map(escape)
      .join(",")
  );

  return [HEADERS.join(","), ...rows].join("\n");
}

export function downloadCsv(items: CatalogItem[], filename: string): void {
  const csv = `﻿${toCsv(items)}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
