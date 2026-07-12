import { z } from "zod";

import {
  CATALOG_LOCATIONS,
  CATALOG_SIZES,
  DAILY_MESSAGES,
  NICHES,
} from "@/config/product";

const WHATSAPP_PATTERN = /^[\d\s+()-]{7,20}$/;

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(80, "El nombre es demasiado largo."),
  whatsapp: z
    .string()
    .trim()
    .regex(WHATSAPP_PATTERN, "Escribe un número de WhatsApp válido."),
  email: z
    .string()
    .trim()
    .email("Ese correo no parece válido.")
    .max(120)
    .optional()
    .or(z.literal("")),
  businessName: z.string().trim().max(120).optional().or(z.literal("")),
  niche: z.enum(NICHES, { message: "Elige el nicho de tu tienda." }),
  dailyMessages: z.enum(DAILY_MESSAGES).optional().or(z.literal("")),
  catalogLocation: z.enum(CATALOG_LOCATIONS).optional().or(z.literal("")),
  catalogSize: z.enum(CATALOG_SIZES).optional().or(z.literal("")),
  topQuestion: z
    .string()
    .trim()
    .max(300, "Resúmela en menos de 300 caracteres.")
    .optional()
    .or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
