import { PROJECT_SLUG } from "@/config/product";
import { LeadInput } from "@/schemas/lead.schema";

export function triggerAutomation(leadId: number, lead: LeadInput): void {
  const url = process.env.AUTOMATION_WEBHOOK_URL;

  if (!url) {
    return;
  }

  const secret = process.env.AUTOMATION_WEBHOOK_SECRET;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "x-webhook-secret": secret } : {}),
    },
    body: JSON.stringify({
      leadId,
      projectSlug: PROJECT_SLUG,
      fullName: lead.fullName,
      whatsapp: lead.whatsapp,
      email: lead.email || null,
      businessName: lead.businessName || null,
      niche: lead.niche,
      parsedItems: lead.parsedItems,
      parsedIssues: lead.parsedIssues,
    }),
  }).catch((error) => {
    console.error("[automation] No se pudo disparar el webhook:", error);
  });
}
