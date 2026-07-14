import { z } from "zod";

export const leadPayloadSchema = z.object({
  leadId: z.number().int().positive(),
  projectSlug: z.string().min(1),
  fullName: z.string().min(1),
  whatsapp: z.string().min(1),
  email: z.string().email().nullable().optional(),
  businessName: z.string().nullable().optional(),
  niche: z.string().nullable().optional(),
  dailyMessages: z.string().nullable().optional(),
  catalogLocation: z.string().nullable().optional(),
  catalogSize: z.string().nullable().optional(),
  topQuestion: z.string().nullable().optional(),
  parsedItems: z.number().nullable().optional(),
  parsedIssues: z.number().nullable().optional(),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export const TEMPERATURES = ["caliente", "tibio", "frio"] as const;

export const qualificationSchema = z.object({
  score: z.number().int().min(0).max(100),
  temperature: z.enum(TEMPERATURES),
  reasoning: z.string().min(5).max(400),
  nextAction: z.string().min(5).max(200),
  whatsappMessage: z.string().min(20).max(700),
});

export type Qualification = z.infer<typeof qualificationSchema>;
