import { z } from "zod";

export const NICHES = [
  "Acuariofilia",
  "Café de especialidad",
  "Plantas y jardinería",
  "Mascotas y exóticos",
  "Suplementos y nutrición",
  "Repuestos y ferretería",
  "Otro",
] as const;

const WHATSAPP_PATTERN = /^[\d\s+()-]{7,20}$/;

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Escribe tu nombre.").max(80),
  whatsapp: z
    .string()
    .trim()
    .regex(WHATSAPP_PATTERN, "Escribe un número de WhatsApp válido."),
  email: z.string().trim().email("Ese correo no parece válido.").max(120).optional().or(z.literal("")),
  businessName: z.string().trim().max(120).optional().or(z.literal("")),
  niche: z.enum(NICHES, { message: "Elige el nicho de tu tienda." }),
  parsedItems: z.number().int().min(0).max(1000),
  parsedIssues: z.number().int().min(0).max(1000),
});

export type LeadInput = z.infer<typeof leadSchema>;
