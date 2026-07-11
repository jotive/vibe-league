export const es = {
  metadata: {
    title: "Acuario Nébula — Asistente Virtual",
    description:
      "Consulta disponibilidad de peces, productos, horarios y pedidos por encargo en Acuario Nébula, Medellín.",
  },
  landing: {
    badge: "Asistente para tiendas de nicho — demo: acuariofilia",
    location: "Laureles · Medellín",
    scheduleLabel: "Horario",
    scheduleValue: "Lun–Vie 9am–7pm · Sáb 9am–6pm · Dom accesorios",
    livePickupLabel: "Retiro peces vivos",
    livePickupValue: "Mar–Sáb 10am–4pm",
    whatsappLabel: "WhatsApp",
    whatsappCta: "Escribir por WhatsApp",
    heroKicker: "Acuariofilia y aquascaping · Laureles, Medellín",
    heroCta: "Preguntar al asistente",
    catalogTitle: "Peces disponibles",
    catalogSubtitle:
      "El asistente responde solo con este catálogo oficial. Nunca inventa precios ni stock.",
    kitsTitle: "Kits de inicio",
    speciesTitle: "Especies",
    suppliesTitle: "Equipos y accesorios",
    seeAllHint: "Pregúntale al asistente por cualquier especie o producto.",
    statYearsLabel: "años de experiencia",
    statSpeciesLabel: "especies en catálogo",
    statKitsLabel: "kits de inicio",
    unitLabel: "Unidad",
    trustShippingTitle: "Envíos a toda Colombia",
    trustShippingBody:
      "Equipos y accesorios por transportadora (2–5 días). Envío gratis desde $200.000 — no aplica para peces vivos.",
    trustLiveFishTitle: "Peces vivos con oxígeno",
    trustLiveFishBody:
      "Tarifa fija de $35.000 a ciudades principales, con embalaje oxigenado. En el Valle de Aburrá, mensajería el mismo día.",
    trustGuaranteeTitle: "Garantía de llegada viva 48h",
    trustGuaranteeBody:
      "Si un pez muere en las primeras 48 horas, envías fotos y tus parámetros de agua y lo reponemos sin costo.",
    promoBanner:
      "Promo de temporada · Envío gratis desde $200.000 en equipos — no aplica para peces vivos",
    testimonialsTitle: "Lo que dicen nuestros clientes",
    testimonialsDisclaimer:
      "Testimonios ficticios: Acuario Nébula es un negocio de demostración.",
    mapTitle: "Visítanos en la tienda",
    mapDisclaimer:
      "Ubicación aproximada de referencia; el negocio es ficticio para esta demo.",
    trustTitle: "Comprar peces vivos con confianza",
    buildDescription(ownerExperienceYears: number): string {
      return `Tienda especializada en acuariofilia y aquascaping con ${ownerExperienceYears} años de experiencia. Peces de agua dulce, plantas naturales, kits de inicio y equipos. Pregúntale a nuestro asistente qué necesitas para tu acuario.`;
    },
  },
  availability: {
    disponible: "Disponible",
    agotado: "Agotado",
    por_encargo: "Por encargo",
    temporada: "Por temporada",
  },
  chat: {
    openWidget: "Abrir asistente",
    headerSubtitle: "En línea · Asesoría y productos oficiales",
    typingIndicator: "Escribiendo",
    inputPlaceholder: "Pregunta por especies, productos u horarios...",
    sendButton: "Enviar",
    sendButtonAriaLabel: "Enviar mensaje",
    inputAriaLabel: "Mensaje",
    inputHint: "Enter para enviar · Shift+Enter para salto de línea",
    assistantHeaderPrefix: "Asistente",
    suggestionsLabel: "Preguntas frecuentes",
    messagesAriaLabel: "Conversación con el asistente",
    resetButton: "Reiniciar conversación",
    retryButton: "Reintentar",
    errorLabel: "No se pudo enviar",
    suggestedQuestions: [
      "Quiero empezar mi primer acuario",
      "¿Cuánto cuesta un betta?",
      "¿Hacen envíos de peces vivos?",
      "¿Qué peces son buenos para principiantes?",
    ],
    buildWelcomeMessage(businessName: string): string {
      return `¡Hola! Soy el asistente de ${businessName}. Pregúntame sobre disponibilidad de especies y productos, horarios, pedidos por encargo o políticas. Si no sé algo, te lo digo con honestidad.`;
    },
  },
  errors: {
    messagesRequired: "Se requiere al menos un mensaje.",
    replyGenerationFailed: "No se pudo generar una respuesta.",
    processingError: "Error al procesar tu mensaje. Intenta de nuevo.",
    unknownError: "Error desconocido",
    defaultClientError: "No pude responder en este momento.",
    networkError: "Sin conexión con el servidor. Revisa tu red.",
    noProviderConfigured:
      "Servicio no configurado. Falta una API key de un proveedor LLM (GROQ_API_KEY, GEMINI_API_KEY u OPENAI_API_KEY).",
    buildServiceNotConfigured(apiKeyEnvName: string): string {
      return `Servicio no configurado. Falta ${apiKeyEnvName}.`;
    },
  },
} as const;
