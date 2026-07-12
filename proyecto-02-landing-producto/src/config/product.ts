export const PROJECT_SLUG = "proyecto-02-landing-producto";

export const PRODUCT = {
  name: "Mostrador",
  tagline: "El asistente que atiende tu tienda cuando tú no puedes",
  demoUrl: "https://acuario-nebula.vercel.app",
  monthlyPriceCop: 149000,
  setupFromCop: 390000,
} as const;

export const NICHES = [
  "Acuariofilia",
  "Café de especialidad",
  "Plantas y jardinería",
  "Mascotas y exóticos",
  "Suplementos y nutrición",
  "Repuestos y ferretería",
  "Otro",
] as const;

export const DAILY_MESSAGES = [
  "Menos de 10",
  "Entre 10 y 30",
  "Entre 30 y 100",
  "Más de 100",
] as const;

export const CATALOG_LOCATIONS = [
  "En un Excel o Google Sheets",
  "En un sistema POS o de inventario",
  "Solo en Instagram o Facebook",
  "En una tienda online (Shopify, WooCommerce…)",
  "En mi cabeza o en un cuaderno",
] as const;

export const CATALOG_SIZES = [
  "Menos de 100 productos",
  "Entre 100 y 500",
  "Entre 500 y 2.000",
  "Más de 2.000",
] as const;
