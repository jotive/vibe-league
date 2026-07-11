import { z } from "zod";

export const availabilityStatusSchema = z.enum([
  "disponible",
  "agotado",
  "por_encargo",
  "temporada",
]);

export const availabilityItemSchema = z.object({
  name: z.string(),
  status: availabilityStatusSchema,
  priceCop: z.number(),
  notes: z.string(),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  originalPriceCop: z.number().optional(),
});

export const testimonialSchema = z.object({
  author: z.string(),
  location: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
});

export const fishCategorySchema = z.object({
  name: z.string(),
  examples: z.array(z.string()),
  priceRangeCop: z.string(),
  careLevel: z.string(),
  minTankLiters: z.number(),
  notes: z.string(),
});

export const starterKitSchema = z.object({
  name: z.string(),
  priceCop: z.number(),
  tankLiters: z.number(),
  includes: z.array(z.string()),
  idealFor: z.string(),
  imageUrl: z.string().optional(),
});

export const supplyItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  priceCop: z.number(),
  description: z.string(),
});

export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const knowledgeBaseSchema = z.object({
  business: z.object({
    name: z.string(),
    tagline: z.string(),
    type: z.string(),
    foundedYear: z.number(),
    owner: z.string(),
    ownerExperienceYears: z.number(),
    specialty: z.string(),
  }),
  contact: z.object({
    address: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    email: z.string(),
    instagram: z.string(),
    website: z.string(),
  }),
  hours: z.object({
    weekdays: z.string(),
    saturday: z.string(),
    sunday: z.string(),
    holidays: z.string(),
    liveFishPickupBestTimes: z.string(),
    closedDates: z.array(z.string()),
  }),
  speciesAvailability: z.array(availabilityItemSchema),
  productAvailability: z.array(availabilityItemSchema),
  specialOrdersPolicy: z.object({
    depositPercent: z.number(),
    minDays: z.number(),
    maxDays: z.number(),
    requestVia: z.array(z.string()),
    orderFormUrl: z.string(),
    whatCanBeOrdered: z.array(z.string()),
    cancellationPolicy: z.string(),
    pickupPolicy: z.string(),
  }),
  fishCategories: z.array(fishCategorySchema),
  starterKits: z.array(starterKitSchema),
  supplies: z.array(supplyItemSchema),
  policies: z.object({
    shipping: z.string(),
    liveFishShipping: z.string(),
    returns: z.string(),
    liveFishGuarantee: z.string(),
    waterAdvice: z.string(),
    acclimation: z.string(),
  }),
  payment: z.object({
    methods: z.array(z.string()),
    currency: z.string(),
    financing: z.string(),
  }),
  faq: z.array(faqItemSchema),
  testimonials: z.array(testimonialSchema).optional(),
  tone: z.object({
    style: z.string(),
    language: z.string(),
    personality: z.array(z.string()),
  }),
});

export type AvailabilityStatus = z.infer<typeof availabilityStatusSchema>;
export type AvailabilityItem = z.infer<typeof availabilityItemSchema>;
export type FishCategory = z.infer<typeof fishCategorySchema>;
export type StarterKit = z.infer<typeof starterKitSchema>;
export type SupplyItem = z.infer<typeof supplyItemSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type KnowledgeBase = z.infer<typeof knowledgeBaseSchema>;
