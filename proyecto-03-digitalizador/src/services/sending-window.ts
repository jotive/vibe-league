import { COLOMBIA_HOLIDAYS_2026, SENDING_WINDOW } from "@/config/legal";

export type WindowStatus = "allowed" | "blocked-hour" | "blocked-day";

export interface SendingWindow {
  status: WindowStatus;
  reason: string;
  nextWindow: string | null;
}

const BOGOTA_TIME_ZONE = "America/Bogota";

const DAY_NAMES = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

function bogotaParts(date: Date): { weekday: number; hour: number; iso: string } {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOGOTA_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    weekday: weekdayMap[get("weekday")] ?? 0,
    hour: Number(get("hour")) % 24,
    iso: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

export function evaluateSendingWindow(now: Date): SendingWindow {
  const { weekday, hour, iso } = bogotaParts(now);

  const isHoliday = (COLOMBIA_HOLIDAYS_2026 as readonly string[]).includes(iso);

  if (isHoliday) {
    return {
      status: "blocked-day",
      reason:
        "Hoy es festivo en Colombia. La Ley 2300 prohíbe enviar mensajes comerciales en festivos.",
      nextWindow: "El próximo día hábil, desde las 7:00 a. m.",
    };
  }

  if (weekday === 0) {
    return {
      status: "blocked-day",
      reason:
        "Hoy es domingo. La Ley 2300 prohíbe enviar mensajes comerciales los domingos.",
      nextWindow: "Mañana lunes, desde las 7:00 a. m.",
    };
  }

  if (weekday === 6) {
    const { from, to } = SENDING_WINDOW.saturday;

    if (hour >= from && hour < to) {
      return {
        status: "allowed",
        reason: "Sábado dentro de la ventana permitida (8:00 a. m. – 3:00 p. m.).",
        nextWindow: null,
      };
    }

    return {
      status: "blocked-hour",
      reason: `Son las ${hour}:00 en Bogotá. Los sábados solo se puede enviar entre las 8:00 a. m. y las 3:00 p. m.`,
      nextWindow:
        hour < from
          ? "Hoy a las 8:00 a. m."
          : "El lunes, desde las 7:00 a. m. (el domingo está prohibido).",
    };
  }

  const { from, to } = SENDING_WINDOW.weekdays;

  if (hour >= from && hour < to) {
    return {
      status: "allowed",
      reason: `Hoy es ${DAY_NAMES[weekday]} y estás dentro de la ventana permitida (7:00 a. m. – 7:00 p. m.).`,
      nextWindow: null,
    };
  }

  return {
    status: "blocked-hour",
    reason: `Son las ${hour}:00 en Bogotá. Entre semana solo se puede enviar entre las 7:00 a. m. y las 7:00 p. m.`,
    nextWindow:
      hour < from
        ? "Hoy a las 7:00 a. m."
        : "Mañana, desde las 7:00 a. m.",
  };
}
