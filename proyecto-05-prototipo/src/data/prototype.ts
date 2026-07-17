export interface TeachOption {
  id: string;
  label: string;
  needsPrice?: boolean;
  needsDays?: boolean;
  botReply: (price?: string, days?: string) => string;
}

export interface UnknownQuestion {
  id: string;
  question: string;
  askedBy: string;
  askedAt: string;
  times: number;
  whatBotSaid: string;
  answers: TeachOption[];
}

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  status: "disponible" | "agotado";
  note?: string;
}

export const YESTERDAY = {
  answered: 21,
  total: 23,
  minutesSaved: 38,
  afterHours: 9,
};

export const TOP_QUESTIONS = [
  { question: "¿Cuánto cuesta el tetra neón?", times: 5 },
  { question: "¿A qué hora abren el sábado?", times: 4 },
  { question: "¿Hacen envíos de peces vivos?", times: 3 },
];

export const UNKNOWN_QUESTIONS: UnknownQuestion[] = [
  {
    id: "disco",
    question: "¿Tienen pez disco?",
    askedBy: "Camila",
    askedAt: "ayer, 8:40 p. m.",
    times: 3,
    whatBotSaid:
      "No tengo esa información en este momento. Te recomiendo escribirnos al WhatsApp y con gusto te ayudamos.",
    answers: [
      {
        id: "encargo",
        label: "Solo por encargo",
        needsPrice: true,
        needsDays: true,
        botReply: (price = "90.000", days = "15") =>
          `El pez disco lo traemos por encargo: $${price} por ejemplar, con anticipo del 40% y unos ${days} días de espera. ¿Te lo encargo?`,
      },
      {
        id: "si",
        label: "Sí, lo tengo",
        needsPrice: true,
        botReply: (price = "90.000") =>
          `Sí, tenemos pez disco a $${price} por ejemplar. Ojo: necesita acuario de 200 L o más y agua muy estable. ¿Te asesoro?`,
      },
      {
        id: "no",
        label: "No lo manejo",
        botReply: () =>
          "El pez disco no lo manejamos. Si buscas un cíclido llamativo, tenemos el Ramirezi por encargo. ¿Te cuento?",
      },
    ],
  },
  {
    id: "envigado",
    question: "¿Hacen domicilio a Envigado?",
    askedBy: "Julián",
    askedAt: "ayer, 6:12 p. m.",
    times: 1,
    whatBotSaid:
      "No tengo esa información en este momento. Te recomiendo escribirnos al WhatsApp y con gusto te ayudamos.",
    answers: [
      {
        id: "si-mismo-dia",
        label: "Sí, el mismo día",
        needsPrice: true,
        botReply: (price = "12.000") =>
          `Sí, llegamos a Envigado el mismo día por $${price}. Los peces van con empaque oxigenado. ¿Te lo despacho hoy?`,
      },
      {
        id: "no",
        label: "No llegamos allá",
        botReply: () =>
          "A Envigado no tenemos domicilio propio, pero te lo enviamos por transportadora con empaque oxigenado. ¿Te cuento cómo?",
      },
    ],
  },
];

export const CATALOG: CatalogItem[] = [
  {
    id: "alimento",
    name: "Alimento en gránulos tropical 100g",
    price: 24000,
    status: "agotado",
    note: "Te lo preguntaron 3 veces esta semana",
  },
  {
    id: "tetra",
    name: "Tetra neón",
    price: 5500,
    status: "disponible",
    note: "Venta mínima 6 unidades",
  },
  {
    id: "betta",
    name: "Betta Halfmoon (macho)",
    price: 38000,
    status: "disponible",
    note: "Un macho por pecera",
  },
  {
    id: "guppy",
    name: "Guppy de velo",
    price: 9500,
    status: "disponible",
    note: "Venta mínima 3 unidades",
  },
  {
    id: "kit",
    name: "Kit Iniciación Nébula 40L",
    price: 298000,
    status: "disponible",
    note: "7 artículos incluidos",
  },
];
