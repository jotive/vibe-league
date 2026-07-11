# Proyecto 01 — Asistente de Negocio (Vibe Coders League)

Asistente virtual con IA para **Acuario Nébula**, una tienda especializada en acuariofilia y aquascaping en Laureles, Medellín. Responde preguntas de clientes usando una base de conocimiento estructurada, recomienda kits y productos según la necesidad del cliente, y admite honestamente cuando no tiene la información.

## Modelo replicable

**Acuario Nébula es la demo vertical** (peces, kits, equipos). **El patrón es un template para cualquier tienda de nicho:** café de especialidad, plantas, suplementos, mascotas exóticas u otro retail con catálogo especializado y asesoría.

Lo que se reutiliza al cambiar de rubro: estructura de KB, modelo de disponibilidad, pedidos por encargo, horarios, reglas anti-alucinación, chat web embebido y despliegue en Vercel. Solo cambian `src/data/*.json`, el prompt y la marca.

Documentación completa: [`../docs/05-modelo-replicable-tienda-nicho.md`](../docs/05-modelo-replicable-tienda-nicho.md).

## Negocio elegido

**Acuario Nébula** — "Tu mundo acuático, con asesoría experta". Fundada en 2016, a cargo de Daniela Ríos (14 años de experiencia). Especializada en peces de agua dulce, plantas naturales, aquascaping y equipos para principiantes y expertos. Atiende en Carrera 70 #44-18, Laureles.

## Qué sabe el asistente

El asistente conoce la información oficial del negocio:

- Nombre, tipo, especialidad y propietaria del negocio
- Dirección, teléfono, WhatsApp, email e Instagram
- Horarios (lunes a domingo)
- 6 categorías de peces con especies de ejemplo, rango de precios en COP, nivel de cuidado y acuario mínimo
- 3 kits de inicio (iniciación 40L, betta 20L, aquascaping plantado 60L) con lo que incluyen y para quién son ideales
- 7 equipos y accesorios con precios en COP (filtros, calentadores, iluminación, tests de agua, sustrato, alimento)
- Políticas: envío de equipos, envío de peces vivos, devoluciones, garantía de peces vivos 48h, asesoría de calidad de agua, aclimatación
- Métodos de pago y financiación
- 6 preguntas frecuentes (tamaño de acuario, cantidad de peces, compatibilidad, ciclado, cambios de agua, plantas)

## Qué lo hace único

1. **Base de conocimiento estructurada** en JSON (`src/data/acuario-nebula.json`) validada con Zod — peces, kits, equipos, políticas y FAQ, fácil de actualizar sin tocar la UI.
2. **Recomendación de productos (diferenciador)** — cuando el cliente describe una necesidad ("quiero empezar un acuario", "un pez para escritorio"), el asistente sugiere el kit, especie o accesorio más adecuado de la KB y justifica por qué.
3. **System prompt con reglas anti-alucinación** — nunca inventa especies, precios ni disponibilidad; si no lo sabe, redirige al WhatsApp.
4. **Enfoque en bienestar animal** — advierte sobre compatibilidad, tamaño mínimo de acuario y ciclado cuando es relevante.
5. **Tono definido** — cercano, didáctico y apasionado por la acuariofilia, paciente con principiantes.
6. **Chat embebido público** — página web lista para compartir con clientes.
7. **Temperatura baja (0.3)** — respuestas más consistentes y fieles a la KB.

## Cómo ejecutar localmente

```bash
cd proyecto-01-asistente-negocio
npm install
cp .env.example .env.local
```

Edita `.env.local` y configura el proveedor LLM (recomendado: **Gemini**, económico y con cuota gratuita en Google AI Studio):

```
LLM_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-flash-latest
```

Alternativas: **OpenAI** o **Groq** — cambia `LLM_PROVIDER` y la API key correspondiente. Ver [docs/09-proveedores-llm.md](../docs/09-proveedores-llm.md).

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Variables de entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `LLM_PROVIDER` | No | Proveedor: `gemini` (default, recomendado), `openai`, `groq` |
| `GEMINI_API_KEY` | Sí si provider=gemini | Clave de Google AI Studio |
| `GEMINI_MODEL` | No | Modelo Gemini (default: `gemini-flash-latest`) |
| `OPENAI_API_KEY` | Sí si provider=openai | Clave de API de OpenAI |
| `OPENAI_MODEL` | No | Modelo OpenAI (default: `gpt-4o-mini`) |
| `GROQ_API_KEY` | Sí si provider=groq | Clave de Groq |
| `GROQ_MODEL` | No | Modelo Groq (default: `llama-3.1-8b-instant`) |

Guía completa: [docs/09-proveedores-llm.md](../docs/09-proveedores-llm.md).

## Despliegue (link público)

### Vercel (recomendado)

1. Sube el repo a GitHub (carpeta `proyecto-01-asistente-negocio/` o monorepo completo).
2. Conecta el repo en [vercel.com](https://vercel.com).
3. Configura **Root Directory** como `proyecto-01-asistente-negocio`.
4. Agrega `LLM_PROVIDER` y la API key del proveedor elegido en Environment Variables.
5. Deploy — obtienes un link público tipo `https://tu-proyecto.vercel.app`.

### Netlify

1. Conecta el repo en [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `.next` (usa el plugin de Next.js de Netlify).
4. Agrega `LLM_PROVIDER` y la API key del proveedor en variables de entorno.

### Alternativa rápida

```bash
npx vercel --cwd proyecto-01-asistente-negocio
```

## Estructura del proyecto

```
proyecto-01-asistente-negocio/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # API del asistente
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ChatWidget.tsx       # UI del chat
│   ├── config/
│   │   ├── env.ts
│   │   └── llm.ts
│   ├── data/
│   │   └── acuario-nebula.json
│   ├── schemas/
│   │   └── knowledge-base.schema.ts
│   ├── services/
│   │   ├── knowledge-base.loader.ts
│   │   ├── knowledge-base.formatter.ts
│   │   ├── system-prompt.ts
│   │   ├── chat-service.ts
│   │   └── llm/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Pruebas sugeridas

- "Quiero empezar mi primer acuario" → debe recomendar el Kit Iniciación Nébula 40L ($289.000 COP) y peces para principiantes
- "¿Cuánto cuesta un betta?" → rango $25.000 – $70.000 COP y advertir que van solos
- "¿Hacen envíos de peces a Bogotá?" → aclarar que peces vivos solo dentro del Valle de Aburrá
- "¿Tienen peces marinos?" → debe admitir que no tiene esa información
- "¿Cada cuánto cambio el agua?" → cambio parcial del 20–30% cada semana
