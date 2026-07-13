export const SENDING_WINDOW = {
  weekdays: { from: 7, to: 19 },
  saturday: { from: 8, to: 15 },
} as const;

export const TEMPLATE_BODY_LIMIT = 1024;

export const FREE_TEXT_LIMIT = 4096;

export const BROADCAST_CONTACT_LIMIT = 256;

export const LEGAL_SOURCES = {
  ley2300:
    "Ley 2300 de 2023, art. 3 y 5 (horarios, periodicidad y canales de mensajes comerciales)",
  ley1581:
    "Ley 1581 de 2012 y Decreto 1377 de 2013, art. 5 (autorización previa, expresa e informada)",
  sic: "SIC, Resolución 78138 del 2 de octubre de 2025: multa de $670 millones a Movistar por prospección comercial vía WhatsApp sin autorización",
  meta: "WhatsApp Business Messaging Policy y documentación de plantillas de Meta",
} as const;

export const COLOMBIA_HOLIDAYS_2026 = [
  "2026-01-01",
  "2026-01-12",
  "2026-03-23",
  "2026-04-02",
  "2026-04-03",
  "2026-05-01",
  "2026-05-18",
  "2026-06-08",
  "2026-06-15",
  "2026-06-29",
  "2026-07-20",
  "2026-08-07",
  "2026-08-17",
  "2026-10-12",
  "2026-11-02",
  "2026-11-16",
  "2026-12-08",
  "2026-12-25",
] as const;
