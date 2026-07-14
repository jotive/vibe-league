import { LeadPayload, Qualification } from "@/schemas/lead.schema";

const REPLY_TO = "contacto@geosdata.com";

const DEMO_URL = "https://acuario-nebula.vercel.app";
const TOOL_URL = "https://catalogo-express-ia.vercel.app";

export interface SentEmail {
  emailId: string;
  to: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(lead: LeadPayload, qualification: Qualification): string {
  const firstName = escapeHtml(lead.fullName.split(" ")[0]);
  const body = escapeHtml(qualification.whatsappMessage).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#f5f1e8;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border:1px solid #e4dfd4;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#0e5e52;padding:20px 28px;">
                <span style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:-0.3px;">Mostrador</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#1a1917;">
                  Hola ${firstName}, ya te leímos.
                </p>

                <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#3c4a41;">
                  ${body}
                </p>

                <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#3c4a41;">
                  Mientras te escribimos por WhatsApp, puedes ir viendo el asistente funcionando de verdad:
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
                  <tr>
                    <td style="padding-right:8px;">
                      <a href="${DEMO_URL}" style="display:inline-block;background:#0e5e52;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:700;">
                        Probar el asistente
                      </a>
                    </td>
                    <td>
                      <a href="${TOOL_URL}" style="display:inline-block;background:#ffffff;color:#1a1917;text-decoration:none;padding:12px 18px;border:1px solid #cfc8b8;border-radius:10px;font-size:14px;font-weight:700;">
                        Ordenar mi catálogo
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0;font-size:13px;line-height:1.6;color:#73706d;">
                  Este correo salió solo, en segundos, apenas dejaste tus datos.
                  Es una demo de la Vibe Coders League: si no fuiste tú, ignóralo y no te volvemos a escribir.
                </p>
              </td>
            </tr>
          </table>

          <p style="margin:16px 0 0;font-size:12px;color:#9a9794;">
            Mostrador · Asistente de IA para tiendas de nicho
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText(lead: LeadPayload, qualification: Qualification): string {
  const firstName = lead.fullName.split(" ")[0];

  return [
    `Hola ${firstName}, ya te leímos.`,
    "",
    qualification.whatsappMessage,
    "",
    `Prueba el asistente: ${DEMO_URL}`,
    `Ordena tu catálogo: ${TOOL_URL}`,
    "",
    "Este correo salió solo, en segundos, apenas dejaste tus datos.",
  ].join("\n");
}

export async function sendWelcomeEmail(
  lead: LeadPayload,
  qualification: Qualification
): Promise<SentEmail> {
  const baseUrl = process.env.EMAIL_API_URL;
  const apiKey = process.env.EMAIL_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Falta EMAIL_API_URL o EMAIL_API_KEY.");
  }

  if (!lead.email) {
    throw new Error("El lead no dejó correo: no hay a quién responderle.");
  }

  const response = await fetch(`${baseUrl}/emails/send`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: lead.email,
      reply_to: REPLY_TO,
      subject: `${lead.fullName.split(" ")[0]}, ya te leímos — Mostrador`,
      html: buildHtml(lead, qualification),
      text: buildText(lead, qualification),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `La API de correo rechazó el envío: ${data.message ?? data.error ?? response.status}`
    );
  }

  return { emailId: data.email_id as string, to: lead.email };
}

export async function checkEmailStatus(emailId: string): Promise<string> {
  const baseUrl = process.env.EMAIL_API_URL;
  const apiKey = process.env.EMAIL_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Falta EMAIL_API_URL o EMAIL_API_KEY.");
  }

  const response = await fetch(`${baseUrl}/emails/${emailId}/status`, {
    headers: { "X-API-Key": apiKey },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`No se pudo consultar el estado: ${response.status}`);
  }

  return (data.status as string) ?? "desconocido";
}
