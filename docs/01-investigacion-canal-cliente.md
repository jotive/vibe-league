# Investigación de canal y tipo de negocio — Proyecto 1

> **Objetivo:** Elegir un tipo de negocio donde un asistente con chat web público tenga sentido real para clientes en Latam y para el demo del hackathon (link clickeable para votantes de Platzi).

---

## 1. Problema: WhatsApp-first vs web-first en Latam

En Latinoamérica, WhatsApp no es un canal complementario: es la infraestructura digital dominante para la relación comercial entre PyMEs y clientes.

### Datos clave

| Métrica | Valor | Fuente |
|---------|-------|--------|
| Usuarios de WhatsApp en Latam | ~420–480 millones | [Mazkara Studio](https://mazkara.studio/en/newsletter/whatsapp-penetration-latin-america-2026/), [Aurora Inbox](https://www.aurorainbox.com/en/2026/03/01/whatsapp-business-2025-statistics/) |
| Penetración en mercados grandes (BR, MX, CO) | 90%+ de usuarios de internet | [Mazkara Studio](https://mazkara.studio/en/newsletter/whatsapp-penetration-latin-america-2026/) |
| Usuarios que se comunican con empresas vía WhatsApp | 62–80% según país | [Aurora Inbox](https://www.aurorainbox.com/en/2026/03/01/whatsapp-business-2025-statistics/) |
| Volumen de comercio conversacional en Latam | ~USD 18.2B (2026) | [Aurora Inbox — eCommerce WhatsApp Latam](https://www.aurorainbox.com/en/2026/03/04/ecommerce-statistics-whatsapp-latam/) |
| Porcentaje de ese volumen vía WhatsApp | 72% | [Aurora Inbox — eCommerce WhatsApp Latam](https://www.aurorainbox.com/en/2026/03/04/ecommerce-statistics-whatsapp-latam/) |
| Crecimiento de transacciones in-WhatsApp en Latam (2024–2025) | +85% | [Mazkara Studio](https://mazkara.studio/en/newsletter/whatsapp-penetration-latin-america-2026/) |
| Adopción API WhatsApp Business en microempresas (2023→2025) | 12% → 28% (+133%) | [Mazkara Studio](https://mazkara.studio/en/newsletter/whatsapp-penetration-latin-america-2026/) |

### Insight de producto

Un chat embebido en sitio web **no compite** con WhatsApp en Latam: compite por ser el canal donde el cliente **ya está acostumbrado a resolver todo**. Para muchos negocios locales (barberías, peluquerías, talleres, domicilios), el flujo real es:

```
Instagram / referido → WhatsApp → agenda / precio / ubicación → visita
```

Un asistente web-only en esos nichos es un demo técnicamente correcto pero con **pobre product-market fit**: el cliente no llegaría naturalmente al chat de la web.

---

## 2. ¿Qué negocios usan WhatsApp vs web/chat web?

### Perfil WhatsApp-first (mal fit para chat web como canal principal)

| Tipo de negocio | Por qué WhatsApp domina |
|-----------------|-------------------------|
| Barberías / peluquerías / estética local | Agenda informal, confirmación de cita, fotos de referencia, ubicación en tiempo real |
| Restaurantes / domicilios de barrio | Pedido rápido, menú por mensaje, pago contra entrega |
| Talleres mecánicos / servicios a domicilio | Diagnóstico por foto/audio, cotización conversacional |
| Tiendas de barrio / retail informal | Catálogo por estado, negociación de precio, confianza personal |
| Servicios de belleza / uñas / spa local | Mismo patrón que barberías: reserva + referencias visuales |

Estos sectores aparecen entre los que más venden con WhatsApp automatizado en Latam ([ChatSell — sectores top](https://chatsell.net/sectores-top-ventas-whatsapp-automatizado-latam/)).

### Perfil híbrido web + WhatsApp (buen fit para chat web con fallback)

| Tipo de negocio | Rol del sitio web | Rol de WhatsApp |
|-----------------|-------------------|-----------------|
| Camping / glamping / turismo outdoor | Tarifas, actividades, mapa, temporadas, FAQ pre-reserva | Cierre de reserva, pagos, logística de llegada |
| Hoteles / hospedaje experiencial | Descubrimiento, comparación, contenido estructurado | Confirmación, check-in, soporte el día del viaje |
| Agencias de viajes / tours | Paquetes, itinerarios, requisitos | Cotización personalizada, seguimiento |
| Clínicas veterinarias / pet care | Servicios, horarios, preparación pre-cita | Urgencias, confirmación, seguimiento post-consulta |
| Academias de idiomas / edtech | Programas, niveles, precios, demo | Matrícula, recordatorios, dudas administrativas |

En turismo, la estrategia recomendada es **omnicanal**: web convierte e informa; WhatsApp cierra y fideliza ([Nantli Living — canales en turismo](https://wp.nantli.travel/2026/01/30/combinar-canales-de-venta-turismo/)).

### Perfil web-first (fit natural para chat web)

| Tipo de negocio | Por qué el chat web encaja |
|-----------------|----------------------------|
| SaaS / productos digitales | Usuario ya está en el sitio evaluando el producto |
| Marketplaces / comparadores | Decisión informada antes de contacto humano |
| Instituciones con mucha FAQ pública | Información densa que el usuario prefiere autoservicio |
| Negocios con audiencia internacional | Menor dependencia de WhatsApp como único canal |

---

## 3. Categorías con sentido para el hackathon (link público clickeable)

Criterios específicos del reto Platzi:

1. **Link público en Vercel/Workers** — el votante debe probar el chat sin instalar nada.
2. **Base de conocimiento rica** — tarifas, políticas, horarios, servicios (demuestra el valor del RAG/KB).
3. **Diferenciación** — evitar nichos ya saturados en otros envíos.
4. **Plausibilidad Latam** — negocio creíble con WhatsApp como fallback, no como único canal.
5. **Demo memorable** — preguntas interesantes que muestren anti-alucinación y tono de marca.

| Categoría | Fit hackathon | Saturación competidores | Notas |
|-----------|---------------|-------------------------|-------|
| Academia de idiomas | Alto (FAQ densa) | **Alta (2 proyectos)** | Evitar salvo ángulo muy diferente |
| Turismo / camping / outdoor | Alto | Media (2 proyectos, enfoques distintos) | Web + WhatsApp fallback es el patrón ganador |
| Cuidado animal / veterinaria | Alto | Baja (1 directorio) | Oportunidad si se enfoca en una clínica, no directorio |
| Barbería / estética local | Medio (demo fácil) | Baja | **Mal PMF real** — WhatsApp-first |
| Glamping vía bot WhatsApp | N/A para web | 1 competidor | Edwin ya cubrió el canal WhatsApp nativo |
| Negocio ficticio (academia) | Alto para demo | 1 competidor | Funciona para evaluar técnica, menos impacto “negocio real” |

---

## 4. TOP 3 tipos de negocio recomendados

### 🥇 1. Camping / glamping / turismo outdoor (GANADOR)

**Por qué gana**

- El cliente **investiga en web** antes de reservar: tarifas por temporada, actividades, qué llevar, clima, acceso.
- WhatsApp es el cierre natural, no el descubrimiento — el chat web complementa el embudo ([Nantli Living](https://wp.nantli.travel/2026/01/30/combinar-canales-de-venta-turismo/)).
- Kevin Gualteros ya validó el nicho con [Mr. Gaque / Camping El Higuerón](https://elhigueron.xyz/#Gaque) (tarifas + fallback WhatsApp), pero deja espacio para diferenciarse en profundidad de KB, UX o negocio distinto.
- Edwin Zarate fue por **bot WhatsApp** para [Glamperos](https://glamperos.com) — no compite directamente en chat web público.
- Contenido ideal para hackathon: tablas de precios, temporadas, actividades, políticas de cancelación, mapa de llegada.

**Boceto de base de conocimiento**

- Identidad: nombre, ubicación, altitud, clima, capacidad (camping vs cabañas).
- Tarifas: por persona/noche, temporada alta/baja, niños, grupos.
- Servicios: fogata, baños, electricidad, Wi‑Fi, restaurante, renta de equipo.
- Actividades: senderismo, rappel, observación de aves, horarios guiados.
- Logística: cómo llegar, estacionamiento, check-in/out, qué empacar.
- Políticas: mascotas, cancelación, clima adverso, depósito.
- Contacto: WhatsApp para reservas confirmadas, email, redes.

---

### 🥈 2. Clínica veterinaria / centro de cuidado animal (RUNNER-UP)

**Por qué**

- Mario Esperanza cubrió [Radar Peludo](https://radar-peludo.vercel.app) como **directorio + mapa** (20 clínicas/refugios en El Salvador) — no un asistente profundo de un solo negocio.
- Una clínica individual con KB rica (servicios, vacunas, urgencias, preparación pre-cita) se diferencia claramente.
- Padres de mascotas buscan info estructurada (precios orientativos, horarios, qué llevar) antes de escribir por WhatsApp.
- Menos saturado que academias de idiomas.

**Boceto de base de conocimiento**

- Servicios: consulta, vacunación, cirugía, grooming, hospitalización.
- Precios orientativos y duración por servicio.
- Horarios, urgencias 24h (sí/no), días sin cita previa.
- Preparación: ayuno, documentos, historial vacunas.
- Políticas: cancelación, mascotas agresivas, seguros.
- Ubicación, estacionamiento, WhatsApp para emergencias.

---

### 🥉 3. Agencia de experiencias / turismo local de nicho (SEGUNDO RUNNER-UP)

**Por qué**

- Mismo embudo que camping pero aplicable a city tours, ecoturismo, avistamiento, etc.
- FAQ extensa: itinerarios, inclusiones, requisitos físicos, seguros, punto de encuentro.
- Complementa sin copiar el demo de Kevin (camping) ni el de Edwin (glamping WhatsApp).
- Sector explícitamente citado como alto conversor en WhatsApp ([ChatSell — turismo](https://chatsell.net/sectores-top-ventas-whatsapp-automatizado-latam/)), con web como capa de descubrimiento.

**Boceto de base de conocimiento**

- Catálogo de tours (duración, dificultad, precio, mínimo de personas).
- Qué incluye / no incluye (transporte, comida, equipo).
- Calendario y temporadas, clima, restricciones de edad.
- Política de reembolso, seguro de viajero, recomendaciones de vestimenta.
- Punto de encuentro, contacto WhatsApp para grupos privados.

---

## 5. Panorama de competidores (comentarios Platzi — Proyecto 1)

| Participante | Proyecto | Tipo de negocio | Canal principal | Stack / link | Observaciones |
|--------------|----------|-----------------|-----------------|--------------|---------------|
| Edwin Zarate | Bot Glamperos | Glamping / hospedaje | **WhatsApp bot** | MongoDB (precios/disponibilidad), [glamperos.com](https://glamperos.com) | Valida turismo experiencial; compite en WhatsApp, no en chat web |
| Mario Esperanza | Radar Peludo | Cuidado animal (El Salvador) | Web + mapa | [radar-peludo.vercel.app](https://radar-peludo.vercel.app) | Directorio de 20 clínicas/refugios; ángulo geográfico, no asistente 1:1 |
| Kevin Gualteros | Mr. Gaque | Camping El Higuerón | Web chat + WhatsApp fallback | [elhigueron.xyz/#Gaque](https://elhigueron.xyz/#Gaque) | **Referencia directa** para nuestro ganador propuesto; tarifas + asistente |
| Roberto Zuñiga | Parla / Kiko | Academia de idiomas (ficticia) | Web chat | [parla.robertzu43.workers.dev](https://parla.robertzu43.workers.dev) | 24 facts + diagnóstico MCER adaptativo; demo técnico fuerte |
| Charles Castillo | FluentHub Academy | Academia de inglés | Web chat | [fluent-hub-academy.vercel.app](https://fluent-hub-academy.vercel.app) | KB desde `knowledge.md`; segundo envío en idiomas |

### Patrones detectados

1. **Academias de idiomas saturadas** — 2 de 5 proyectos (Roberto, Charles).
2. **Turismo/outdoor con negocios reales** — 3 de 5 (Edwin, Kevin; Mario tangencial con mapa).
3. **WhatsApp como canal o fallback** — común y alineado con comportamiento Latam (Edwin nativo; Kevin fallback).
4. **Links públicos Vercel/Workers** — estándar de entrega para votación.

---

## 6. Criterios de decisión para nuestro Proyecto 1

| # | Criterio | Peso | Descripción |
|---|----------|------|-------------|
| 1 | Product-market fit Latam | Alto | ¿El cliente usaría naturalmente este canal? |
| 2 | Fit hackathon (link público) | Alto | ¿El votante puede probar 3–5 preguntas útiles al instante? |
| 3 | Diferenciación vs competidores | Alto | ¿Evitamos clonar academia #3 o barbería WhatsApp-first? |
| 4 | Riqueza de KB demostrable | Medio | ¿Hay 10+ datos estructurados creíbles? |
| 5 | Fallback WhatsApp creíble | Medio | ¿El asistente puede redirigir cuando no sabe o para cerrar venta? |
| 6 | Esfuerzo de pivot desde código actual | Bajo | El scaffold (`knowledge-base.ts`, chat, prompt) es agnóstico al vertical |

### Matriz resumida

| Tipo | PMF Latam | Fit hackathon | Diferenciación | **Total** |
|------|-----------|---------------|----------------|-----------|
| Camping / outdoor | ★★★★☆ | ★★★★★ | ★★★☆☆ | **Ganador** |
| Veterinaria 1-clínica | ★★★★☆ | ★★★★☆ | ★★★★☆ | Runner-up |
| Agencia experiencias | ★★★★☆ | ★★★★☆ | ★★★☆☆ | 2.º runner-up |
| Barbería (actual) | ★★☆☆☆ | ★★★☆☆ | ★★★★★ | Descartar |
| Academia idiomas | ★★★☆☆ | ★★★★★ | ★☆☆☆☆ | Evitar |

---

## 7. Recomendación final

### Ganador: **Camping / turismo outdoor** (negocio distinto a El Higuerón o con KB mucho más profunda)

Implementar un asistente tipo “guía pre-reserva” para un camping o glamping ficticio pero plausible en Latam (p. ej. Colombia, México o Costa Rica). Mantener **WhatsApp como fallback** en la KB y en el system prompt cuando no haya dato o se requiera confirmar disponibilidad.

### Runners-up

1. **Clínica veterinaria** — si se prefiere diferenciarse de Radar Peludo (directorio → asistente 1:1).
2. **Agencia de experiencias locales** — si el equipo quiere más creatividad en itinerarios y menos overlap con Kevin.

### Descartado explícitamente

- **Barbería / estética local** — WhatsApp-first; chat web es demo, no producto.
- **Academia de idiomas** — saturación en la competencia; difícil destacar en votación.

---

## 8. Nota sobre el borrador actual: Barbería El Filo

El código en `proyecto-01-asistente-negocio/` usa hoy **Barbería El Filo** (Medellín) como negocio de ejemplo:

- `src/lib/knowledge-base.ts` — KB completa (servicios, precios COP, políticas).
- `src/components/ChatWidget.tsx` — saludo y branding “El Filo”.
- `README.md` del proyecto — documentación alineada a barbería.

Esto fue un **borrador inicial válido para arrancar el scaffold** (chat, API, anti-alucinación, despliegue Vercel). No refleja la conclusión de esta investigación.

| Aspecto | Borrador (Barbería) | Recomendación (Camping/outdoor) |
|---------|---------------------|-----------------------------------|
| Canal natural del cliente | WhatsApp | Web (investigación) + WhatsApp (cierre) |
| PMF Latam | Bajo para chat web | Alto |
| Riesgo vs competencia | Bajo (nadie más barbería) | Medio (Kevin en camping) — mitigar con diferenciación |
| Alineación con insight usuario | ❌ | ✅ |

**Próximo paso sugerido (fuera de este doc):** reemplazar `knowledge-base.ts`, textos de UI y README con el negocio ganador, conservando la arquitectura técnica intacta.

---

## Referencias

- [Mazkara Studio — WhatsApp Penetration in Latin America 2026](https://mazkara.studio/en/newsletter/whatsapp-penetration-latin-america-2026/)
- [Aurora Inbox — Estadísticas eCommerce WhatsApp Latam 2026](https://www.aurorainbox.com/en/2026/03/04/ecommerce-statistics-whatsapp-latam/)
- [Aurora Inbox — Estadísticas WhatsApp Business 2026](https://www.aurorainbox.com/en/2026/03/01/whatsapp-business-2025-statistics/)
- [Plusmo — WhatsApp Business API in LATAM](https://www.plusmo.com/blog/whatsapp-business-api-in-latam-whats-driving-adoption-and-how-to-capitalize-on-it)
- [Blip — 8 estadísticas WhatsApp Business LATAM 2026](https://www.blip.ai/blog/es/whatsapp/estadisticas-whatsapp-marketing-latam/)
- [ChatSell — Sectores que más venden con WhatsApp en LATAM](https://chatsell.net/sectores-top-ventas-whatsapp-automatizado-latam/)
- [Nantli Living — Combinar canales de venta en turismo](https://wp.nantli.travel/2026/01/30/combinar-canales-de-venta-turismo/)
- [FastStrat — WhatsApp Business PYMES LATAM Guía 2026](https://faststrat.ai/whatsapp-business-pymes-latam-guia-2026/)

---

*Documento generado para vibe-league — Proyecto 01, Asistente de Negocio.*
