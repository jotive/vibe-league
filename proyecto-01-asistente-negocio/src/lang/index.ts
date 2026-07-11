import { es } from "./es";

export type LocaleId = "es";

export const DEFAULT_LOCALE: LocaleId = "es";

const locales = {
  es,
} as const;

export type LocaleMessages = typeof es;

export function getLang(locale: LocaleId = DEFAULT_LOCALE): LocaleMessages {
  return locales[locale];
}

export const lang = getLang();
export const t = lang;

export { es };
