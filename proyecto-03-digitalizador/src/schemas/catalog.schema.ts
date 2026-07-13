import { z } from "zod";

export const catalogItemSchema = z.object({
  name: z.string(),
  priceCop: z.number().nullable(),
  rawPrice: z.string().nullable(),
  category: z.string().nullable(),
  unit: z.string().nullable(),
  bundle: z.string().nullable(),
  promo: z.boolean(),
  issue: z.string().nullable(),
  suggestedPriceCop: z.number().nullable(),
});

export const parsedCatalogSchema = z.object({
  items: z.array(catalogItemSchema),
});

export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type ParsedCatalog = z.infer<typeof parsedCatalogSchema>;

export const parseRequestSchema = z.object({
  rawText: z
    .string()
    .trim()
    .min(10, "Pega al menos una línea con productos y precios.")
    .max(12000, "La lista es muy larga. Pega máximo 12.000 caracteres."),
});
