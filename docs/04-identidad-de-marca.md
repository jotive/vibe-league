# 04 — Identidad de marca — Proyecto 01 (Acuario Nébula)

> **Decisión:** Marca ganadora **Acuario Nébula** para la tienda ficticia y su asistente virtual.  
> **Contexto:** Pivot desde Barbería El Filo → tienda de acuariofilia en Laureles, Medellín. UI en español, despliegue web-first en Vercel, audiencia Latam/Colombia.  
> **Estado en código:** El pivot ya usa este nombre en `knowledge-base.ts`, `layout.tsx`, `README.md` y estilos base. Este documento formaliza la decisión para que otros agentes no rebrandeen sin criterio.

### Doble encuadre: marca demo + posicionamiento template

Este documento define la **capa de marca del demo vertical** (Acuario Nébula, Nebu, paleta, microcopy). No define el alcance del producto.

| Capa | Alcance | Documento |
|------|---------|-----------|
| **Marca demo** | Nombre, tono, colores, persona Nebu, copy de acuariofilia | Este doc (`04-identidad-de-marca.md`) |
| **Posicionamiento template** | Patrón replicable para cualquier tienda de nicho | [`05-modelo-replicable-tienda-nicho.md`](./05-modelo-replicable-tienda-nicho.md) |

Al comunicar el proyecto: **Acuario Nébula = caso de uso demostrado**; **asistente para tiendas de nicho = producto replicable**. Un pivot a café o plantas reemplaza esta capa de marca sin tocar la arquitectura.

---

## 1. Propuestas evaluadas

| # | Nombre | Idea central | Pros | Contras |
|---|--------|--------------|------|---------|
| 1 | **Acuario Nébula** | Mini-universo acuático; profundidad + misterio | Distintivo, memorable, ya integrado en el pivot, funciona para persona “Nebu” | “Acuario” es genérico como categoría (mitigado por el modificador) |
| 2 | Marea Viva | Marea, vida, ritmo natural | Corto, cálido, muy colombiano | Suena a tour/experiencia, no a tienda especializada |
| 3 | Reino Acuático | Reino bajo el agua, variedad de especies | Juguetón, bueno para familias | Genérico; poco diferenciador en votación |
| 4 | Bioma Azul | Ecosistema, enfoque técnico/educativo | Alineado con aquascaping y asesoría | Frío; suena a laboratorio más que a comercio local |
| 5 | Corriente Nómada | Corriente de agua + exploración | Poético, buen storytelling | Difícil de asociar a horarios/stock/pedidos |
| 6 | Laguna Laureles | Ancla geográfica fuerte | Local, confianza de barrio | Muy atado a Medellín; menos escalable como demo |
| 7 | Oxígeno Azul | Parámetro clave del acuario sano | Técnico, credibilidad para hobbyistas | Abstracto para principiantes |
| 8 | Profundidad | Calma, contemplación del hobby | Elegante, premium | Vago; no comunica peces ni productos |

---

## 2. Marca ganadora: Acuario Nébula

### Por qué gana

1. **No es genérico:** “Peces Medellín” o “Acuario Tropical” se pierden en Google y en la competencia del hackathon. *Nébula* añade capa narrativa: cada acuario es un pequeño cosmos vivo.
2. **Metáfora doble:** evoca el fondo del océano (bioluminiscencia, profundidad) y un universo en miniatura — ideal para aquascaping y la idea de “crear tu mundo”.
3. **Persona del asistente:** el nombre acorta naturalmente a **Nebu**, un alias corto y amigable sin sonar corporativo.
4. **Coherencia con el producto:** el asistente responde disponibilidad, horarios y pedidos por encargo; “explorar la nébula” encaja con “¿qué peces hay hoy?” o “quiero armar mi primer acuario”.
5. **Ya alineado con el pivot en curso:** evita conflictos entre subagentes; la KB, tagline y paleta oscura ya apuntan aquí.

### Identificadores de proyecto

| Uso | Valor recomendado |
|-----|-------------------|
| Nombre comercial | Acuario Nébula |
| Tagline | Tu mundo acuático, con asesoría experta |
| Código / carpeta repo | `proyecto-01-asistente-negocio` (sin cambio) |
| Proyecto Vercel | `vibe-nebula` o `vibe-peces` (ver `03-estrategia-despliegue.md`) |
| Dominio demo | `https://vibe-nebula.vercel.app` (preferido sobre `vibe-peces` por coherencia de marca) |

### Ficha del negocio ficticio (canon)

- **Tipo:** Tienda de acuariofilia y aquascaping  
- **Ubicación:** Carrera 70 #44-18, Laureles, Medellín  
- **Fundación:** 2016  
- **Propietaria:** Daniela Ríos (14 años de experiencia)  
- **Especialidad:** Peces de agua dulce, plantas naturales, kits de inicio, equipos, pedidos por encargo  

---

## 3. Dirección de marca

### Tono de voz

- **Experto cercano:** sabe de parámetros y especies, pero no abruma al principiante.  
- **Honesto:** si no hay dato en la KB, lo dice y ofrece WhatsApp o pedido por encargo.  
- **Colombiano natural:** tuteo, precios en COP, referencias a Laureles/Medellín sin forzar slang.  
- **Paciente:** el hobby tiene curva de aprendizaje; el tono celebra la primera pregunta (“tu acuario empieza con una buena duda”).  
- **Sin hype:** evitar “¡oferta increíble!”; priorizar utilidad (horario de retiro de peces vivos, depósito en encargos, litraje mínimo).

**Evitar:** tono de call center, inglés innecesario, promesas de envío de vivos sin verificar KB, jerga de barbería (residuo del borrador).

### Identidad visual

| Elemento | Dirección |
|----------|-----------|
| **Paleta base** | Fondo abismo `#0a1420`, superficies `#10202f` / `#17293b` (ya en `globals.css`) |
| **Acento principal** | Cian bioluminiscente `#4db8c4` → hover `#6ecfd9` — CTAs, badges, links |
| **Acento secundario** | Coral suave `#e8a87c` — alertas cálidas, peces tropicales, badges “por encargo” |
| **Texto** | Principal `#eaf4f6`, secundario `#8fa6b3` |
| **Layout** | Split hero + chat (desktop); stack vertical en móvil. Mucho aire, cards con borde sutil `#223546`, radius 12px |
| **Vibe** | Acuario nocturno iluminado: profundo, calmado, premium-accessible — no infantil, no clínico |
| **Tipografía** | Display: **Fraunces** o **Playfair Display** (solo títulos). Cuerpo/UI: **DM Sans** o **Outfit**. Fallback actual: system-ui aceptable para MVP |
| **Iconografía** | Ondas, burbujas minimalistas, siluetas de peces geométricas — sin clipart colorido |
| **Motion** | Micro-animación de burbujas o gradiente lento en hero (opcional, bajo costo) |

### Persona del asistente

| Campo | Valor |
|-------|-------|
| **Nombre** | Nebu |
| **Rol** | Asistente virtual de Acuario Nébula |
| **Personalidad** | Curiosa, precisa, honesta; como una compañera de mostrador que lleva años en el hobby |
| **Presentación** | “Soy Nebu, del equipo de Acuario Nébula.” |
| **Límite explícito** | No inventa stock ni precios; escala a WhatsApp cuando hace falta confirmar |

---

## 4. Microcopy de referencia

### Landing (hero)

- **Badge:** `Laureles · Medellín`
- **H1:** `Acuario Nébula` (desde KB)
- **Tagline:** `Tu mundo acuático, con asesoría experta`
- **Descripción:** `Peces de agua dulce, plantas, kits y equipos. Pregúntale a Nebu qué necesitas para tu acuario.`
- **Detalle horario:** `Lun–Vie 9am–7pm · Sáb 9am–6pm`
- **Detalle retiro:** `Peces vivos: Mar–Sáb 10am–4pm`
- **CTA implícito:** el panel de chat a la derecha / debajo del hero

### Chat

- **Título del widget:** `Nebu · Acuario Nébula`
- **Mensaje de bienvenida:** `¡Hola! Soy Nebu. Pregúntame por especies, productos, horarios o pedidos por encargo. Si no tengo el dato, te digo cómo contactarnos por WhatsApp.`
- **Placeholder input:** `Ej: ¿Tienen bettas disponibles?`
- **Preguntas sugeridas:** mantener las actuales del widget (primer acuario, betta, envíos, principiantes)
- **Estado cargando:** `Nebu está buceando en el inventario…`
- **Error API:** `Algo salió mal. Intenta de nuevo o escríbenos al WhatsApp.`
- **Fallback honesto (prompt):** `Eso no lo tengo confirmado en este momento. Escríbenos al +57 300 555 0142 y te respondemos con gusto.`

### WhatsApp / cierre

- `Hola, vengo del asistente de Acuario Nébula. Quiero consultar disponibilidad de ___`

---

## 5. Checklist de alineación (para el siguiente agente de UI)

- [ ] Renombrar título del chat a **Nebu · Acuario Nébula** (hoy: “Asistente Acuario Nébula”)
- [ ] Actualizar mensaje de bienvenida con persona Nebu
- [ ] Ajustar `system-prompt.ts` para que el modelo se identifique como Nebu
- [ ] Evaluar acento coral `#e8a87c` para estados `por_encargo` / alertas
- [ ] Cargar fuente display (Fraunces/DM Sans) en `layout.tsx` si hay tiempo
- [ ] Actualizar `docs/README.md` — quitar referencia a Barbería El Filo como estado actual
- [ ] Proyecto Vercel: preferir alias `vibe-nebula`

---

## 6. Qué no cambiar sin revisar este doc

- Nombre comercial **Acuario Nébula**
- Tagline principal
- Ubicación ficticia en Laureles (coherencia con investigación Latam)
- Estructura de KB (especies, productos, encargos, horarios)
- Arquitectura técnica del asistente

---

*Decisión registrada para vibe-league — Proyecto 01. Sin commit automático; aplicar en UI cuando el pivot de código esté estable.*
