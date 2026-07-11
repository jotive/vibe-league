import rawKnowledgeBase from "@/data/acuario-nebula.json";
import {
  knowledgeBaseSchema,
  type KnowledgeBase,
} from "@/schemas/knowledge-base.schema";

export const knowledgeBase: KnowledgeBase =
  knowledgeBaseSchema.parse(rawKnowledgeBase);

export type {
  AvailabilityItem,
  AvailabilityStatus,
  FaqItem,
  FishCategory,
  KnowledgeBase,
  StarterKit,
  SupplyItem,
} from "@/schemas/knowledge-base.schema";
