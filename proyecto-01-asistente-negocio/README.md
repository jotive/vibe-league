# Proyecto 01 — Asistente de Negocio (Vibe Coders League)

Asistente virtual con IA para **Acuario Nébula**, una tienda especializada en acuariofilia y aquascaping en Laureles, Medellín. Responde preguntas de clientes usando una base de conocimiento estructurada, recomienda kits y productos según la necesidad, adapta la asesoría a la ciudad del cliente y **admite honestamente cuando no tiene la información**.

**Demo pública:** https://acuario-nebula.vercel.app

> Acuario Nébula es un negocio **ficticio**, construido con detalle para la demo. Los testimonios y la ubicación del mapa también lo son.

## Modelo replicable

**Acuario Nébula es la demo vertical** (peces, kits, equipos). **El patrón es un template para cualquier tienda de nicho:** café de especialidad, plantas, suplementos, mascotas exóticas u otro retail con catálogo especializado y asesoría.

Lo que se reutiliza al cambiar de rubro: estructura de KB, modelo de disponibilidad, pedidos por encargo, horarios, reglas anti-alucinación, recuperación por relevancia, telemetría de costos, chat embebido y despliegue. Solo cambian `src/data/*.json`, el prompt y la marca.

Documentación completa: [`../docs/05-modelo-replicable-tienda-nicho.md`](../docs/05-modelo-replicable-tienda-nicho.md).

## Negocio elegido

**Acuario Nébula** — "Tu mundo acuático, con asesoría experta". Fundada en 2016, a cargo de Daniela Ríos (14 años de experiencia). Carrera 70 #44-18, Laureles, Medellín.

## Qué sabe el asistente

Base de conocimiento en [`src/data/acuario-nebula.json`](src/data/acuario-nebula.json), validada con Zod:

| Bloque | Contenido |
|--------|-----------|
| Disponibilidad de especies | **13 especies** con precio en COP, estado (`disponible` / `agotado` / `por_encargo` / `temporada`), notas y venta mínima |
| Disponibilidad de productos | **14 productos** con precio y estado (filtros, calentadores, iluminación, tests, sustratos, alimento) |
| Kits de inicio | **3 kits** con su contenido **exacto**, litraje y para quién son ideales |
| Categorías de peces | **8 categorías** con rango de precio, nivel de cuidado y acuario mínimo |
| Equipos y accesorios | **11 ítems** con categoría y descripción |
| Horarios | Semana, sábado, domingo, festivos, **días cerrados** y mejor horario para retirar peces vivos |
| Políticas | Envío de equipos, envío de peces vivos, devoluciones, garantía de llegada viva 48h, aclimatación |
| Pedidos por encargo | Anticipo 40%, plazo 7–21 días hábiles, qué se puede encargar, cancelación |
| Clima y altitud | **5 ciudades** con altitud, temperatura ambiente y potencia de calentador requerida |
| FAQ | **8 preguntas frecuentes** |
| Tono | Cercano, didáctico, español colombiano, prioriza el bienestar animal |

## Qué lo hace único

### 1. Sabe *cómo* no saber

Distingue dos casos que la mayoría de bots mezclan:

- **Dentro del dominio, sin dato** (*"¿tienen pez disco?"*) → admite que no lo tiene y deriva al WhatsApp de la tienda.
- **Fuera del dominio** (*"¿conoces un contador?"*, *"¿cómo es Montería?"*) → declina con amabilidad y reencauza. **No le manda ruido al WhatsApp del dueño.**

### 2. Adapta la asesoría a la ciudad del cliente

Si el cliente dice que vive en Bogotá (2.600 m, ~14 °C), el asistente:

- Advierte que el calentador de **50 W** que trae el Kit Iniciación **se queda corto** a esa altitud.
- Recomienda el calentador de 100 W **con su precio real del stock**.
- **No lo cita a retirar en tienda** (que está en Medellín): le ofrece el envío de peces vivos con embalaje oxigenado y su tarifa.

### 3. Nunca inventa un precio

Regla dura: si el dato no está literalmente en la KB, no se escribe. Incluye salvaguardas contra errores reales observados durante el desarrollo (p. ej. confundir *vatios* con *pesos*, o inventar el contenido de un kit).

### 4. Resiliencia: cadena de candidatos (proveedor + modelo)

Los free tiers se agotan. La cadena prueba `(proveedor, modelo)` en orden y salta al siguiente ante cuota agotada (429/413) — el cliente no ve un error. Como el cupo de tokens por minuto de Groq es **independiente por modelo**, encadenar modelos **suma los cupos**.

Reintento con backoff solo en errores transitorios 5xx (ante 429 se salta de inmediato: reintentar el mismo modelo solo agrega latencia).

### 5. Costo bajo y medido

- **Recuperación por relevancia:** el catálogo compacto (nombre + estado + precio) viaja completo siempre, pero el detalle largo solo se incluye para lo que la pregunta menciona → prompt de **5.073 → ~3.100 tokens (−40%)**, sin perder exactitud.
- **Caché de respuestas** para preguntas repetidas (costo cero en los aciertos).
- **Telemetría en Postgres:** tokens, costo en USD, latencia, y qué preguntas el asistente **no supo responder** (cada una es candidata a entrar en la KB).

Medido: **~$0,00016 USD por consulta**, ~700 ms de latencia.

## Cómo ejecutar localmente

```bash
cd proyecto-01-asistente-negocio
npm install
cp .env.example .env.local
```

Edita `.env.local`. **Proveedor recomendado: Groq** — free tier amplio y muy rápido. La key se obtiene en [console.groq.com/keys](https://console.groq.com/keys):

```
LLM_PROVIDER=groq
GROQ_API_KEY=tu-api-key
GROQ_MODEL=llama-3.3-70b-versatile
```

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> **Ojo con Gemini:** su free tier es de **20 peticiones por día** en los modelos actuales, y el alias `gemini-flash-latest` **cambia de modelo sin aviso**. Sirve para probar, no para una demo pública.

## Variables de entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `LLM_PROVIDER` | No | `groq` (recomendado), `gemini` u `openai`. Default: `gemini` |
| `GROQ_API_KEY` | Sí si provider=groq | Clave de [Groq](https://console.groq.com/keys) |
| `GROQ_MODEL` | No | Default: `llama-3.1-8b-instant`. Recomendado: `llama-3.3-70b-versatile` |
| `GEMINI_API_KEY` | Sí si provider=gemini | Clave de Google AI Studio |
| `GEMINI_MODEL` | No | Default: `gemini-2.0-flash` |
| `OPENAI_API_KEY` | Sí si provider=openai | Clave de OpenAI |
| `OPENAI_MODEL` | No | Default: `gpt-4o-mini` |
| `DATABASE_URL` | No | Postgres (Neon) para telemetría. Sin ella, el chat funciona igual y no se registra nada |
| `ADMIN_USER` / `ADMIN_PASSWORD` | No | Protegen `/admin` con autenticación básica. Sin ellas, `/admin` responde 401 siempre |

Guía de proveedores: [docs/09-proveedores-llm.md](../docs/09-proveedores-llm.md).

## Telemetría (opcional)

Si defines `DATABASE_URL`, cada consulta se registra en la tabla `chat_events`: pregunta, respuesta, proveedor, modelo, tokens, costo estimado, latencia, si el bot no supo responder y errores.

La tabla incluye `project_slug`, así que **una sola base sirve a todos los proyectos** del monorepo.

`/admin` muestra ese panel (protegido con `ADMIN_USER` / `ADMIN_PASSWORD`, y excluido de buscadores en `robots.txt`).

```sql
create table chat_events (
  id bigserial primary key,
  project_slug text not null,
  business_slug text not null,
  session_id text not null,
  question text not null,
  answer text,
  provider text not null,
  model text not null,
  prompt_tokens integer not null default 0,
  completion_tokens integer not null default 0,
  total_tokens integer not null default 0,
  cost_usd numeric(12,8) not null default 0,
  latency_ms integer not null default 0,
  is_deflection boolean not null default false,
  error text,
  created_at timestamptz not null default now()
);
```

## Despliegue (Vercel)

Es un **monorepo**: hay que desplegar desde el subdirectorio, no desde la raíz.

1. Sube el repo a GitHub.
2. Importa el proyecto en [vercel.com](https://vercel.com) y configura **Root Directory** = `proyecto-01-asistente-negocio`.
3. Agrega las variables de entorno (mínimo `LLM_PROVIDER` y la API key).
4. Deploy.

> **Importante:** Vercel activa **Deployment Protection** por defecto, y el sitio queda **privado** (todo redirige a un login). Para una demo pública hay que desactivarlo en *Settings → Deployment Protection → Vercel Authentication → Disabled*. Verifícalo con `curl` sin sesión: un **302** significa que sigue privado.

Desde el CLI, desplegar **siempre desde el subdirectorio** (hacerlo desde la raíz crea un proyecto distinto):

```bash
cd proyecto-01-asistente-negocio
vercel deploy --prod
```

## Estructura del proyecto

```
proyecto-01-asistente-negocio/
├── src/
│   ├── app/
│   │   ├── admin/page.tsx           # Panel interno (protegido)
│   │   ├── api/chat/route.ts        # POST /api/chat
│   │   ├── globals.css              # Tema Tailwind
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Tienda + catálogo
│   │   └── robots.ts
│   ├── middleware.ts                # Basic auth para /admin
│   ├── components/
│   │   ├── ChatWidget.tsx           # Widget flotante (assistant-ui)
│   │   ├── Thread.tsx               # Hilo del chat
│   │   ├── Hero.tsx                 # Hero con parallax
│   │   ├── SpeciesCatalog.tsx       # Catálogo por categorías
│   │   ├── CatalogPanel.tsx
│   │   ├── Testimonials.tsx
│   │   ├── StoreMap.tsx
│   │   ├── Reveal.tsx
│   │   └── Icons.tsx
│   ├── config/
│   │   ├── env.ts
│   │   ├── llm.ts                   # Proveedores, modelos, reintentos, caché
│   │   └── telemetry.ts             # Precios por modelo, umbrales
│   ├── data/
│   │   └── acuario-nebula.json      # Base de conocimiento
│   ├── handlers/
│   ├── lang/es.ts                   # Todo el texto de UI
│   ├── schemas/
│   │   └── knowledge-base.schema.ts # Contrato Zod de la KB
│   ├── services/
│   │   ├── system-prompt.ts         # Reglas del asistente
│   │   ├── knowledge-base.retriever.ts  # Recuperación por relevancia
│   │   ├── knowledge-base.formatter.ts
│   │   ├── chat-service.ts          # Orquesta la cadena de candidatos
│   │   ├── chat-model-adapter.ts    # Puente assistant-ui → /api/chat
│   │   ├── reply-cache.ts
│   │   ├── telemetry.ts
│   │   ├── analytics.ts
│   │   ├── catalog.ts
│   │   └── llm/
│   │       ├── provider-chain.ts    # Cadena (proveedor, modelo)
│   │       ├── retry.ts
│   │       ├── groq-provider.ts
│   │       ├── gemini-provider.ts
│   │       └── openai-provider.ts
│   └── constants/
├── public/img/                      # Fotos de especies y kits
└── .env.example
```

## Stack

**Next.js 15** (App Router) · **assistant-ui** (widget de chat) · **Tailwind CSS v4** · **Zod** · **Groq / Gemini / OpenAI** · **Neon Postgres** (telemetría) · **TypeScript**

## Pruebas sugeridas

Todas verificadas contra la demo en producción:

| Pregunta | Respuesta esperada |
|----------|--------------------|
| *"¿Qué trae exactamente el Kit Iniciación Nébula 40L?"* | Los **7 artículos exactos** (incluye **filtro interno**, no externo, y **no** trae kit de test de agua). Precio: **$298.000** |
| *"¿Cuánto cuesta un betta?"* | Betta Halfmoon (macho), **$38.000**, disponible, un macho por pecera |
| *"¿Hay pez ángel disponible?"* | **Agotado**. Reabastecimiento el 18 de julio de 2026. Ofrece encargo (anticipo 40%, 7–21 días) |
| *"Vivo en Bogotá, quiero comprar 6 tetras neón"* | $5.500 c/u, mínimo 6 unidades. Ofrece **envío de peces vivos ($35.000, con oxígeno)** y advierte que el calentador de 50 W se queda corto a 2.600 m |
| *"¿Tienen peces marinos?"* | Admite que no tiene esa información y deriva al WhatsApp |
| *"¿Cómo es la ciudad de Montería?"* | **Declina**: está fuera de su dominio. No deriva al WhatsApp del negocio |
