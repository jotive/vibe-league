export const es = {
  metadata: {
    title: "Sala de máquinas — La automatización que califica tus leads sola",
    description:
      "Un lead deja sus datos y en segundos queda calificado con IA, guardado en el CRM y notificado al equipo por Telegram. Míralo correr en vivo.",
  },
  hero: {
    badge: "Proyecto 4 · Automatización en vivo",
    title: "Un lead sin respuesta se enfría.",
    titleAccent: "Este no alcanza.",
    subtitle:
      "Cuando alguien deja sus datos en Mostrador o en Catálogo Express, se dispara una cadena que lo califica con IA, lo guarda en el CRM y le avisa al equipo por Telegram. Sin que nadie toque nada.",
    tryIt: "Dispáralo tú mismo aquí abajo y míralo correr.",
  },
  flow: {
    title: "Qué pasa después del formulario",
    steps: [
      {
        title: "Lead recibido",
        body: "El formulario de Mostrador o Catálogo Express manda el lead al webhook.",
      },
      {
        title: "Calificado con IA",
        body: "Un modelo lee sus respuestas y le pone un puntaje de 0 a 100, decide si está caliente, tibio o frío, y explica por qué.",
      },
      {
        title: "Respondido al lead",
        body: "Le llega un correo escrito por la IA citando lo que él acaba de responder. Ya no espera: la respuesta sale en segundos.",
      },
      {
        title: "Guardado en el CRM",
        body: "El puntaje, el motivo y el siguiente paso quedan escritos en Postgres, junto al lead.",
      },
      {
        title: "Equipo notificado",
        body: "Llega un mensaje a Telegram con la ficha del lead y un borrador de WhatsApp personalizado, listo para copiar.",
      },
    ],
  },
  trigger: {
    title: "Dispara la automatización",
    subtitle:
      "Llena esto como si fueras un dueño de tienda. El flujo corre de verdad: la IA te va a calificar y vas a ver cada paso encendiéndose.",
    fullName: "Tu nombre",
    fullNamePlaceholder: "Andrés Gómez",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "300 123 4567",
    email: "Tu correo",
    emailPlaceholder: "tu@correo.com",
    emailHint:
      "Pon tu correo real: la automatización te va a responder de verdad, en segundos.",
    businessName: "Nombre de tu tienda",
    businessNamePlaceholder: "Acuarios del Norte",
    niche: "¿Qué vendes?",
    dailyMessages: "¿Cuántos mensajes recibes al día?",
    catalogLocation: "¿Dónde vive tu catálogo?",
    catalogSize: "¿Cuántos productos manejas?",
    topQuestion: "¿Qué te preguntan más?",
    topQuestionPlaceholder: "“¿Tienen tal cosa y cuánto vale?”",
    submit: "Disparar la automatización",
    submitting: "Corriendo el flujo...",
    hint: "Los datos de prueba se guardan en la misma base que los leads reales, marcados como demo.",
    tip: "Prueba a poner “Menos de 10” mensajes y verás que la IA lo califica frío. No todos los leads valen igual.",
  },
  runs: {
    title: "Últimas ejecuciones",
    empty: "Todavía no hay ejecuciones. Dispara una arriba.",
    scoreLabel: "puntaje",
    reasoningLabel: "Por qué",
    nextActionLabel: "Siguiente paso",
    messageLabel: "Borrador de WhatsApp que generó la IA",
    fromLabel: "Vino de",
    statusRunning: "corriendo",
    statusDone: "completado",
    statusPartial: "parcial",
    statusError: "falló",
  },
  summary: {
    total: "leads procesados",
    hot: "calificados calientes",
    avgScore: "puntaje promedio",
    avgTime: "segundos por lead",
  },
  errors: {
    network: "Sin conexión con el servidor.",
    failed: "La automatización falló. Intenta de nuevo.",
  },
  footer: {
    note: "Los tres proyectos anteriores alimentan esta automatización: el asistente, la landing y el digitalizador.",
    assistant: "Ver el asistente",
    landing: "Ver la landing",
    tool: "Ver el digitalizador",
  },
} as const;
