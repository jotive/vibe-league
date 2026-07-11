# Proveedores LLM — Proyecto 1

Guía para cambiar el proveedor de IA en `proyecto-01-asistente-negocio` sin tocar código.

## Recomendado: Gemini

**Gemini** es el proveedor por defecto y el más económico para este proyecto: cuota gratuita generosa en [Google AI Studio](https://aistudio.google.com/apikey), buena calidad en español y modelo `gemini-flash-latest` (alias estable al último Flash).

El SDK `@google/generative-ai` usa el mismo endpoint REST que la API (`generateContent` con `contents[].parts[].text`); el ID de modelo es compatible con el curl de la API.

## Cambio rápido

1. Copia `.env.example` a `.env.local` si aún no lo tienes.
2. Define `LLM_PROVIDER` con uno de: `gemini` (default), `openai`, `groq`.
3. Agrega la API key del proveedor activo.
4. Reinicia el servidor (`npm run dev`).

Ejemplo con Gemini (recomendado):

```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-flash-latest
```

Ejemplo con OpenAI:

```env
LLM_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini
```

Ejemplo con Groq:

```env
LLM_PROVIDER=groq
GROQ_API_KEY=your-groq-api-key-here
GROQ_MODEL=llama-3.1-8b-instant
```

## Variables de entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `LLM_PROVIDER` | No | Proveedor activo: `gemini` (default, recomendado), `openai`, `groq` |
| `GEMINI_API_KEY` | Sí si `LLM_PROVIDER=gemini` | Clave de Google AI Studio |
| `GEMINI_MODEL` | No | Modelo Gemini (default: `gemini-flash-latest`) |
| `OPENAI_API_KEY` | Sí si `LLM_PROVIDER=openai` | Clave de OpenAI |
| `OPENAI_MODEL` | No | Modelo OpenAI (default: `gpt-4o-mini`) |
| `GROQ_API_KEY` | Sí si `LLM_PROVIDER=groq` | Clave de Groq |
| `GROQ_MODEL` | No | Modelo Groq (default: `llama-3.1-8b-instant`) |

Solo necesitas la key del proveedor que uses. Las demás pueden quedar vacías o con placeholder.

## Arquitectura

```
src/services/llm/
├── llm-provider.ts          # Interfaz LlmProvider
├── openai-provider.ts       # OpenAI (SDK openai)
├── gemini-provider.ts       # Google Gemini (@google/generative-ai)
├── groq-provider.ts         # Groq (SDK openai + baseURL compatible)
└── resolve-llm-provider.ts  # Factory según LLM_PROVIDER

src/config/
├── llm.ts                   # IDs, defaults por proveedor, temperatura/tokens
└── env.ts                   # Nombres de variables de entorno
```

`chat-service.ts` delega en `resolveLlmProvider()`; la ruta API valida que exista la key del proveedor activo antes de procesar mensajes.

## Comportamiento compartido

Todos los proveedores usan:

- System prompt desde `system-prompt.ts`
- Historial de mensajes user/assistant
- Temperatura `0.3`
- Máximo ~500 tokens de salida

## Errores

Si falta la API key del proveedor activo, la API responde 500 con mensaje en español indicando qué variable falta (por ejemplo: `Servicio no configurado. Falta GEMINI_API_KEY.`).

## Despliegue (Vercel)

En **Environment Variables** del proyecto:

1. `LLM_PROVIDER` = proveedor deseado (recomendado: `gemini`)
2. La API key correspondiente (`GEMINI_API_KEY`, `OPENAI_API_KEY` o `GROQ_API_KEY`)
3. Opcional: variable de modelo si quieres override del default

Redeploy tras cambiar variables.

## Referencias

- [Arquitectura frontend](./08-arquitectura-frontend.md)
- [README del Proyecto 1](../proyecto-01-asistente-negocio/README.md)
