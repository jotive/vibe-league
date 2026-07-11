# Decisión final de negocio — Proyecto 1

> **Objetivo:** Documentar la decisión definitiva del tipo de negocio para el Asistente de Negocio del hackathon **Vibe Coders League**, tras la investigación del canal (ver [01-investigacion-canal-cliente.md](./01-investigacion-canal-cliente.md)) y la preferencia final del equipo.

---

## 1. Decisión

**Negocio elegido:** **Acuario Nébula** — tienda especializada en acuariofilia y aquascaping (nicho e-commerce de peces), ubicada en Laureles, Medellín (Colombia).

Se descarta el borrador inicial de **Barbería El Filo** y también las opciones de turismo/camping y academias de idiomas exploradas en la investigación previa.

---

## 2. Por qué una tienda de peces de nicho (y no las otras opciones)

| Criterio | Barbería | Academia de idiomas | Camping / outdoor | **Tienda de peces (elegida)** |
|----------|----------|---------------------|-------------------|-------------------------------|
| Preferencia del equipo | Media | Baja | Media | **Alta** (decisión explícita) |
| Fit e-commerce / web-first | Bajo (WhatsApp-first) | Medio | Medio-alto | **Alto** (venta de productos y envíos) |
| Diferenciación vs competidores Platzi | Alta pero mal PMF | **Saturado (2 envíos)** | **Ocupado (Kevin + Edwin)** | **Alto — nicho no cubierto** |
| Riqueza de KB demostrable | Media | Alta | Alta | **Muy alta** (especies, params, kits, equipos, envío de vivos) |
| Demo memorable | Media | Media | Alta | **Alta** (recomendación de kits) |

### Razones concretas

1. **Preferencia del equipo:** se optó por un **e-commerce de nicho** frente a barbería o camping. La acuariofilia es un hobby con comunidad activa y decisión de compra informada.
2. **Web-first real:** a diferencia de la barbería (WhatsApp-first, mal product-market fit para chat web), una tienda de peces vende **productos y equipos con envío**, donde el cliente **investiga en la web** antes de comprar (especies, tamaños de acuario, parámetros de agua, kits). WhatsApp queda como fallback para disponibilidad puntual.
3. **Diferenciación frente a la competencia Platzi:**
   - **Academias de idiomas:** ya hay 2 envíos (Roberto/Parla, Charles/FluentHub). Difícil destacar.
   - **Barbería:** WhatsApp-first; el chat web es demo, no producto.
   - **Camping / glamping:** Kevin (Mr. Gaque / El Higuerón) y Edwin (bot Glamperos) ya ocupan el nicho outdoor.
   - **Tienda de peces:** nicho **no cubierto** por ningún competidor identificado.
4. **KB rica y demostrable:** la acuariofilia permite una base de conocimiento profunda y creíble — categorías de especies, nivel de cuidado, tamaño mínimo de acuario, kits de inicio, filtros, iluminación, tests de agua, alimento, políticas de envío de animales vivos y garantía. Ideal para lucir anti-alucinación y valor del KB.
5. **Contexto Latam plausible:** tienda física + envíos en Colombia, precios en COP, pagos locales (Nequi, Daviplata, PSE), envío de peces vivos dentro del Valle de Aburrá.

---

## 3. Diferenciador: recomendación de productos

Además de responder FAQ, el asistente **recomienda productos y kits según la pregunta del cliente**, un giro que ninguno de los competidores de FAQ pura ofrece:

- "Quiero empezar un acuario" → sugiere el **Kit Iniciación Nébula 40L** y peces para principiantes.
- "Un pez para mi escritorio" → sugiere **betta** + **Kit Betta Compacto 20L**.
- "Quiero un acuario plantado" → sugiere el **Kit Aquascaping Plantado 60L**.

La lógica vive en el **system prompt** (no requiere ML): reglas para detectar intención, justificar la recomendación (nivel de cuidado, tamaño de acuario, compatibilidad) y recomendar **solo** productos que existan en la KB. Mantiene el enfoque de **bienestar animal** (compatibilidad, ciclado, volumen mínimo).

---

## 4. Impacto en el código

Se conserva intacta la arquitectura técnica (Next.js, API `/api/chat`, chat embebido, anti-alucinación, temperatura 0.3). Cambian solo los datos y textos:

| Archivo | Cambio |
|---------|--------|
| `src/lib/knowledge-base.ts` | Reescritura completa: peces, kits, equipos, políticas de envío/garantía, FAQ |
| `src/lib/system-prompt.ts` | Tono acuarista + reglas de recomendación de productos |
| `src/app/page.tsx` | Landing de la tienda de peces (español) |
| `src/app/layout.tsx` | Metadata (título/descripción) |
| `src/components/ChatWidget.tsx` | Branding y preguntas sugeridas |
| `src/app/globals.css` | Paleta acuática (azules profundos + acento turquesa) |
| `README.md` | Descripción del negocio, resumen de KB y diferenciador |

---

## 5. Resultado esperado en el demo

- Link público en Vercel con chat funcional.
- 3–5 preguntas que muestran: precios en COP, recomendación de kit, política de envío de peces vivos, y una pregunta fuera de KB que el asistente admite no saber.
- Nicho único frente a los demás envíos de Platzi.

---

*Documento generado para vibe-league — Proyecto 01, Asistente de Negocio.*
