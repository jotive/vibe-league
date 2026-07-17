export const es = {
  metadata: {
    title: "Mostrador para el dueño — prototipo navegable",
    description:
      "El asistente responde el 90% de las preguntas. Este prototipo muestra qué pasa con el 10% que no sabe: la dueña se lo enseña una vez y el asistente ya no vuelve a fallar.",
  },
  header: {
    badge: "Prototipo navegable · Proyecto 5",
    kicker: "Mostrador",
  },
  hero: {
    title: "Tu asistente no sabe todo.",
    titleAccent: "Pero aprende de ti.",
    subtitle:
      "Mostrador responde por la tienda con el catálogo real, y cuando no sabe algo lo admite. Este prototipo muestra qué pasa con eso que no supo: llega como una tarea, la dueña la responde en un toque, y el asistente ya no vuelve a fallar.",
  },
  context: {
    title: "El contexto",
    problem: {
      label: "El problema",
      body: "El asistente responde bien el 90% de las preguntas. Pero ese 10% que no sabe hoy se pierde: nadie se entera de qué le preguntaron, y el cliente se queda esperando. El bot se queda igual de bruto mañana.",
    },
    who: {
      label: "A quién se lo presentaría",
      body: "A Daniela, dueña de Acuario Nébula: 14 años de experiencia, 2 empleados, contesta el WhatsApp entre cliente y cliente. También a un inversionista: es la pantalla que muestra por qué el cliente se queda.",
    },
    idea: {
      label: "La idea que comunica",
      body: "Que el “no sé” deje de ser un fracaso y pase a ser el motor del producto. Cada pregunta sin respuesta se convierte en una tarea de 10 segundos, y cada respuesta hace al asistente más difícil de reemplazar.",
    },
  },
  toggle: {
    label: "Verlo como",
    mobile: "Celular",
    desktop: "Escritorio",
    hint: "Daniela lo usa en el celular entre cliente y cliente. Su empleado, en el computador de la tienda.",
  },
  device: {
    url: "app.mostrador.co",
    reset: "Reiniciar el recorrido",
  },
  guide: {
    title: "Qué recorrer",
    steps: [
      {
        title: "Su mañana",
        body: "Abre en “Hoy”: cuántas preguntas respondió el asistente anoche y cuántas no supo.",
      },
      {
        title: "Lo que no supo",
        body: "Toca la alerta naranja. Ahí están las preguntas que dejaron a un cliente esperando.",
      },
      {
        title: "Enseñárselo",
        body: "Abre “¿Tienen pez disco?”, elige qué responder y ponle precio. Mira lo que el bot le dijo al cliente cuando no sabía.",
      },
      {
        title: "Ya lo sabe",
        body: "Verás exactamente cómo va a responder la próxima vez, y el contador de pendientes baja.",
      },
      {
        title: "El catálogo",
        body: "Marca el alimento agotado como disponible y mira cómo el asistente vuelve a ofrecerlo.",
      },
    ],
  },
  notes: {
    title: "Lo que es y lo que no",
    isNot:
      "Sin backend: los datos son de mentiras y el recorrido se reinicia al recargar. Es un prototipo para comunicar la idea, no para operarla.",
    is: "Lo demás sí existe y se puede probar: el asistente, la landing, el digitalizador y la automatización de leads son proyectos anteriores de esta liga, desplegados y funcionando.",
  },
  links: {
    assistant: "El asistente funcionando",
    landing: "La landing",
    tool: "El digitalizador",
    automation: "La automatización",
  },
} as const;
