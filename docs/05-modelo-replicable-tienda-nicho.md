# 05 — Modelo replicable: asistente para tiendas de nicho

> **Idea central:** Acuario Nébula es el **caso de uso concreto** (vertical acuariofilia). El **patrón** que implementa el Proyecto 01 es un **template de asistente virtual para cualquier tienda de nicho** con catálogo especializado, asesoría y pedidos por encargo.

---

## 1. Demo vs patrón

| Capa | Qué es | Ejemplo en este repo |
|------|--------|----------------------|
| **Vertical demo** | Nicho elegido para demostrar el producto con una KB rica y memorable | Acuario Nébula — peces, kits, equipos, aquascaping |
| **Patrón replicable** | Arquitectura y flujo que se adaptan cambiando la base de conocimiento y la marca | Asistente web + KB estructurada + anti-alucinación + fallback WhatsApp |

**Acuario Nébula no define el límite del producto.** Define el **escenario de demostración** elegido para el hackathon. La misma estructura sirve para café de especialidad, plantas, suplementos, mascotas exóticas u otro retail de nicho.

---

## 2. Qué se transfiere sin reescribir la arquitectura

Al cambiar de vertical, se sustituye el contenido de `src/data/*.json`, el `system-prompt.ts` y el branding visual. **No** hace falta rediseñar la app.

| Componente | Qué hace | Cómo se adapta a otro nicho |
|------------|----------|-----------------------------|
| **Estructura de KB** | Negocio, contacto, horarios, categorías de producto, kits/bundles, políticas, FAQ | Mismas secciones; cambian nombres, precios y reglas del rubro |
| **Modelo de disponibilidad** | Rangos de precio, niveles de cuidado/dificultad, stock implícito en KB | Café: origen y molienda; plantas: luz y riego; suplementos: dosis y contraindicaciones |
| **Pedidos por encargo** | Productos no listados que requieren confirmación humana | Especies raras, granos de temporada, tallas especiales, importaciones |
| **Horarios y restricciones** | Ventanas de retiro, días sin envío de perecederos/vivos | Plantas: retiro en fin de semana; café: tostado bajo pedido los martes |
| **Anti-alucinación** | El asistente no inventa stock, precios ni políticas | Mismas reglas en el prompt; solo cambia el dominio de conocimiento |
| **Chat web embebido** | Autoservicio en la landing antes de escalar a humano | Idéntico: el visitante pregunta desde el sitio |
| **Despliegue en Vercel** | Un proyecto por app, variables de entorno, link público | Misma pipeline; otro alias (`vibe-cafe`, `vibe-plantas`, etc.) |

---

## 3. Otros nichos que encajan en el mismo patrón

Tiendas donde el cliente **investiga antes de comprar**, el catálogo tiene **variaciones técnicas** y el dueño **asesora** — no solo transacciona.

| Nicho | Preguntas típicas del chat | Paralelo con acuariofilia |
|-------|---------------------------|---------------------------|
| **Café de especialidad** | Origen, molienda, método, perfil de taza | Como elegir especie según acuario y experiencia |
| **Plantas y jardinería urbana** | Luz, riego, maceta, compatibilidad con mascotas | Como elegir planta acuática según litraje |
| **Suplementos / nutrición** | Dosis, objetivo, interacciones, stock | Como elegir kit según nivel del cliente |
| **Mascotas exóticas / reptiles** | Terrario, temperatura, alimento vivo, encargos | Mismo patrón de bienestar y restricciones de envío |
| **Cerveza artesanal / homebrew** | Estilos, equipos de inicio, fermentación | Kits de inicio y equipos con rangos de precio |
| **Instrumentos musicales de nicho** | Nivel, mantenimiento, accesorios | Asesoría técnica + políticas de garantía |
| **Fermentados / kombucha** | Starter kits, temperatura, tiempos | Políticas de producto perecedero y retiro |

**Criterio de encaje:** catálogo especializado + FAQ repetitiva + necesidad de honestidad cuando no hay dato confirmado + WhatsApp como cierre.

---

## 4. Por qué acuariofilia como demo (y por qué el patrón es universal)

### Por qué se eligió la tienda de peces

1. **KB rica y diferenciada** — especies, compatibilidad, kits, equipos, políticas de vivos: demuestra profundidad del asistente en pocas preguntas.
2. **Poco saturado en la competencia del hackathon** — barberías, restaurantes y retail genérico abundan; acuariofilia destaca en votación.
3. **Preguntas memorables** — “¿cuántos peces en 40L?”, “¿betta con otros?”, “¿envían vivos?” muestran anti-alucinación y tono experto.
4. **Híbrido web + WhatsApp creíble** — el cliente investiga en web; confirma stock sensible por WhatsApp (igual que otros nichos con producto delicado).

### Por qué el patrón es universal

1. **Misma forma de datos** — `src/data/*.json` + schema Zod es un contrato de negocio, no un contrato de peces.
2. **Mismo system prompt** — reglas de no inventar, recomendar desde KB, escalar a contacto humano.
3. **Misma UI** — hero + chat; solo cambian textos, colores y microcopy (ver `04-identidad-de-marca.md` para la capa de marca del demo).
4. **Mismo despliegue** — Next.js en Vercel, una carpeta = un producto (`03-estrategia-despliegue.md`).

---

## 5. Cómo replicar en otro nicho (checklist)

1. Definir ficha del negocio: nombre, ubicación, propietario, especialidad, tagline.
2. Copiar `src/data/acuario-nebula.json` y rellenar secciones para el nuevo rubro (ver [10-knowledge-base-json.md](./10-knowledge-base-json.md)).
3. Mapear categorías de producto con rangos de precio y atributos relevantes (nivel, tamaño, restricciones).
4. Crear 2–4 kits o bundles de inicio si el rubro lo permite.
5. Documentar políticas: envío, devoluciones, garantías, restricciones de producto delicado.
6. Redactar 5–8 FAQ que el mostrador ya responde cada día.
7. Ajustar `system-prompt.ts`: persona del asistente, tono, límites explícitos.
8. Actualizar landing y `04-identidad-de-marca.md` (o equivalente) con la nueva marca.
9. Desplegar en Vercel con nuevo alias; compartir link en Platzi.

**Tiempo estimado de pivot de vertical:** horas, no semanas — si se mantiene la arquitectura del Proyecto 01.

---

## 6. Mensaje para votantes y evaluadores

> *“Lo que ves es Acuario Nébula: nuestra demo en acuariofilia. Lo que entregamos es un patrón listo para cualquier tienda de nicho — cambias la base de conocimiento y la marca, y tienes un asistente que no alucina, asesora y escala a WhatsApp.”*

---

## Documentos relacionados

- [01-investigacion-canal-cliente.md](./01-investigacion-canal-cliente.md) — por qué tiendas de nicho híbridas (web + WhatsApp) encajan mejor que barberías WhatsApp-first
- [04-identidad-de-marca.md](./04-identidad-de-marca.md) — marca y tono del demo Acuario Nébula (capa vertical, no capa template)
- [03-estrategia-despliegue.md](./03-estrategia-despliegue.md) — publicación del asistente en Vercel
- [../proyecto-01-asistente-negocio/README.md](../proyecto-01-asistente-negocio/README.md) — implementación técnica del template
- [10-knowledge-base-json.md](./10-knowledge-base-json.md) — contrato JSON y pasos para otro nicho

---

*Documento para vibe-league — Proyecto 01. El demo es acuariofilia; el producto es asistente para tiendas de nicho.*
