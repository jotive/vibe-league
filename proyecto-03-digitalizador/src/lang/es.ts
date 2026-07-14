export const es = {
  metadata: {
    title: "Catálogo Express — Convierte la lista de tu proveedor en un catálogo",
    description:
      "Pega la lista de precios que te manda tu proveedor por WhatsApp y te la devolvemos ordenada, con los errores detectados y lista para enviar a tus clientes. Gratis.",
  },
  hero: {
    badge: "Herramienta gratis · Sin registro",
    title: "Tu proveedor te manda esto.",
    titleAccent: "Nosotros te lo devolvemos así.",
    subtitle:
      "Pega la lista de precios tal como te llega por WhatsApp —con sus typos, sus promos a mano y sus ceros de más— y te la convertimos en un catálogo ordenado. Sin pedirte nada.",
  },
  input: {
    label: "Pega aquí la lista de tu proveedor",
    placeholder:
      "Bailarina roja: 8.000 (en promoción)\nMonjitas color: 5.000 o 6 unidades x 25.000\nBettas machos: 15.0000\n...",
    sample: "Usar una lista de ejemplo",
    submit: "Digitalizar mi lista",
    submitting: "Leyendo tu lista...",
    hint: "No guardamos tu lista para nada distinto a mostrarte el resultado.",
    steps: [
      "Leyendo tu lista",
      "Separando productos de saludos y horas",
      "Normalizando precios a pesos",
      "Buscando errores y precios raros",
      "Armando tus mensajes",
    ],
  },
  results: {
    title: "Tu catálogo, ordenado",
    itemsLabel: "productos detectados",
    issuesLabel: "cosas para revisar",
    promoLabel: "en promoción",
    tableProduct: "Producto",
    tablePrice: "Precio",
    tableCategory: "Categoría",
    tableNote: "Nota",
    noPrice: "sin precio",
    issuesTitle: "Encontramos cosas que conviene revisar",
    issuesBody:
      "No las corregimos solos: tu proveedor es quien manda. Te mostramos el arreglo y tú decides si lo aplicas.",
    onlyIssues: "Ver solo estas",
    showAll: "Ver todo el catálogo",
    allClear: "Todo en orden",
    fixIt: "Corregir",
    keepIt: "Está bien así",
    suggested(value: string): string {
      return `¿Querías decir ${value}?`;
    },
  },
  broadcast: {
    title: "Cómo mandárselo a tus clientes",
    body: "Tu lista completa ocuparía {chars} caracteres en un solo mensaje. WhatsApp permite hasta 4.096, pero eso no es lo importante: nadie lee un muro de texto en el celular. La partimos por categorías.",
    bodyShort:
      "Tu lista cabe en un solo mensaje, pero igual la organizamos por categorías para que se lea fácil.",
    messagesLabel: "mensajes sugeridos",
    copyOne: "Copiar",
    copied: "¡Copiado!",
    charsLabel: "caracteres",
    itemsInMessage: "productos",
    honestNote: "Sobre a qué hora enviarlo",
  },
  legal: {
    title: "Antes de mandárselo a tus clientes, lee esto",
    intro:
      "Nosotros no enviamos nada: el mensaje lo mandas tú desde tu WhatsApp. Pero hay reglas que casi nadie conoce y que te pueden costar caro. Estas no son opiniones nuestras: son la ley y la política de Meta, con la norma citada.",
    canSendNow: "Ahora sí puedes enviar",
    cannotSendNow: "Ahora NO puedes enviar",
    nextWindow: "Próxima ventana permitida:",
    scheduleTitle: "Horarios permitidos por ley en Colombia",
    scheduleRules: [
      "Lunes a viernes: 7:00 a. m. – 7:00 p. m.",
      "Sábados: 8:00 a. m. – 3:00 p. m.",
      "Domingos y festivos: prohibido",
      "Máximo un contacto por día, y no por varios canales en la misma semana",
      "Cada mensaje debe permitir darse de baja de forma fácil",
    ],
    consentTitle: "Necesitas autorización previa",
    consentBody:
      "El número que tu cliente te dio para coordinar una entrega NO está autorizado para mandarle publicidad. Si cambia la finalidad, se requiere una nueva autorización. Y ojo: el silencio y las casillas premarcadas no valen como consentimiento.",
    savedNumberTitle: "El error que hace que tu difusión no llegue",
    savedNumberBody:
      "En una lista de difusión de WhatsApp, el mensaje solo le llega a quien tenga TU número guardado en su celular. Si no te tiene agregado, el mensaje se descarta en silencio: sin error, sin aviso. Puedes creer que enviaste a 200 clientes y haberle llegado a 30. Además, la lista tiene un tope de 256 contactos.",
    sanctionTitle: "Y no es teoría",
    sanctionBody:
      "En octubre de 2025 la Superintendencia de Industria y Comercio multó a Movistar con $670 millones de pesos por hacer prospección comercial por WhatsApp, SMS y llamadas sin autorización previa. Para un comerciante, las sanciones pueden llegar a 2.000 salarios mínimos.",
    noFakeAdviceTitle: "Lo que NO te vamos a decir",
    noFakeAdviceBody:
      "No te vamos a decir “envía los jueves a las 7 p. m. porque convierte 27% más”. Buscamos ese dato y no existe: todo lo que circula sale de blogs de empresas que venden chatbots, sin un solo estudio detrás. Ni siquiera hay evidencia de que una tienda de acuarios deba enviar a distinta hora que una cafetería. Preferimos decirte la verdad: dentro de la ventana legal, la mejor hora es la que tú midas con tus propios clientes.",
  },
  gate: {
    title: "Ahora chatea con tu propio catálogo",
    body: "Ya viste tu lista ordenada, y es tuya: cópiala y úsala. Si quieres ir un paso más allá, montamos un asistente con TU catálogo para que le preguntes precios y disponibilidad como lo haría tu cliente.",
    fair: "Trato justo: el catálogo de arriba ya es tuyo, sin dar nada. Los datos son solo si quieres probar el asistente.",
    fullName: "Tu nombre",
    fullNamePlaceholder: "Andrés Gómez",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "300 123 4567",
    email: "Tu correo",
    emailPlaceholder: "tu@correo.com",
    emailHint: "Te respondemos por correo en segundos, apenas envíes.",
    businessName: "Nombre de tu tienda",
    businessNamePlaceholder: "Acuarios del Norte",
    niche: "¿Qué vendes?",
    nichePlaceholder: "Elige tu nicho",
    submit: "Probar el asistente con mi catálogo",
    submitting: "Preparando tu asistente...",
    downloadCsv: "Descargar mi catálogo en CSV",
  },
  chat: {
    title: "Tu asistente, con tu catálogo",
    subtitle:
      "Pregúntale como lo haría tu cliente. Solo sabe lo que está en la lista que pegaste.",
    placeholder: "¿Cuánto cuesta el oscar albino?",
    send: "Preguntar",
    thinking: "Pensando...",
    suggestions: [
      "¿Qué tienes en promoción?",
      "¿Cuál es el más barato?",
      "¿Tienes peces importados?",
    ],
    disclaimer:
      "Este asistente solo lee la lista que pegaste. Si le preguntas por algo que no está, te lo dirá.",
  },
  errors: {
    invalidInput: "Revisa lo que pegaste.",
    noItemsFound:
      "No encontramos productos con precio en ese texto. ¿Seguro que pegaste una lista de precios?",
    parseFailed:
      "No pudimos leer tu lista en este momento. Intenta de nuevo en unos segundos.",
    networkError: "Sin conexión con el servidor. Revisa tu red.",
    leadFailed: "No pudimos guardar tus datos. Intenta de nuevo.",
    chatFailed: "No pude responder ahora mismo. Intenta de nuevo.",
    validation: "Revisa los campos marcados.",
  },
  footer: {
    note: "Catálogo Express es una herramienta de Mostrador, asistente de IA para tiendas de nicho.",
    landing: "Conocer Mostrador",
    demo: "Ver un asistente funcionando",
  },
} as const;
