# Arquitectura frontend — Proyecto 1

Convenciones de estructura, estado y estilos para `proyecto-01-asistente-negocio` y proyectos futuros del monorepo.

## Stack

| Tecnología | Uso |
|------------|-----|
| **Next.js 15** | App Router, rutas API, SSR |
| **Zustand** | Estado global de UI (chat, loading, errores) |
| **Tailwind CSS v4** | Estilos utilitarios; tema en `globals.css` con `@theme` |
| **TypeScript** | Tipado estricto en todo el código |

## Estructura de carpetas

```
proyecto-01-asistente-negocio/src/
├── app/                    # App Router: páginas, layout, rutas API
│   ├── api/chat/route.ts
│   ├── globals.css         # Tailwind + tokens de tema
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Componentes de presentación
│   └── ChatWidget.tsx
├── config/                 # Configuración de app e integraciones
│   ├── env.ts              # Nombres de variables de entorno
│   └── llm.ts              # Proveedor LLM, modelos y parámetros compartidos
├── constants/              # Literales sin números/cadenas mágicas
│   ├── api-paths.ts
│   ├── chat.ts
│   ├── chat-ui.ts          # Textos de UI y mensajes de error (español)
│   └── http-status.ts
├── data/                   # Base de conocimiento (JSON, fuente de verdad)
│   └── acuario-nebula.json
├── handlers/               # Manejo de requests/responses y errores
│   ├── client-error-handler.ts
│   ├── error-handler.ts
│   ├── parse-chat-messages.ts
│   └── response-handler.ts
├── schemas/                # Validación Zod y tipos inferidos
│   └── knowledge-base.schema.ts
├── services/               # Lógica de negocio e integraciones
│   ├── chat-client.ts
│   ├── chat-service.ts
│   ├── chat-types.ts
│   ├── knowledge-base.loader.ts
│   ├── knowledge-base.formatter.ts
│   ├── system-prompt.ts
│   └── llm/                # Abstracción de proveedores LLM
│       ├── llm-provider.ts
│       ├── openai-provider.ts
│       ├── gemini-provider.ts
│       ├── groq-provider.ts
│       └── resolve-llm-provider.ts
└── stores/                 # Stores Zustand
    └── chat-store.ts
```

## Responsabilidades por capa

| Capa | Responsabilidad |
|------|-----------------|
| `app/**/route.ts` | HTTP delgado: validar, delegar a services, responder con handlers |
| `handlers/` | Respuestas JSON estandarizadas, errores HTTP y parsing de errores en cliente |
| `services/` | LLM (proveedores), KB (loader + formatter), cliente fetch, tipos compartidos |
| `data/` | JSON de negocio por vertical demo |
| `schemas/` | Contrato Zod de la KB |
| `stores/` | Estado de UI compartido (mensajes, loading, error) |
| `constants/` | Rutas API, status codes, textos de UI en español |
| `config/` | Proveedor LLM, modelos, tokens, env keys |
| `components/` | Presentación; consumen stores y constants |

## Estado con Zustand

El chat usa `useChatStore` con:

- `messages` — historial visible en UI
- `isLoading` — indicador de escritura
- `error` — último error del cliente
- `sendMessage(text)` — envía mensaje y actualiza estado

Los componentes no gestionan fetch ni errores HTTP directamente.

## Estilos con Tailwind

- Directiva `@import "tailwindcss"` en `globals.css`
- Tokens de marca en bloque `@theme` (colores, fuente)
- Componentes usan clases utilitarias; no CSS custom salvo base global
- PostCSS con plugin `@tailwindcss/postcss`

## Handlers

### API (`error-handler.ts`, `response-handler.ts`)

- `createErrorResponse(message, status)` — respuesta de error JSON
- `createChatReplyResponse(reply)` — respuesta exitosa `{ reply }`
- `handleUnexpectedError()` — fallback 500

### Cliente (`client-error-handler.ts`)

- `parseApiErrorMessage(data)` — extrae `error` del JSON de respuesta
- `resolveClientError(error)` — normaliza excepciones a mensaje en español

## Constantes

Todo literal repetido va en `constants/`:

- Rutas: `API_PATHS.CHAT`
- HTTP: `HTTP_STATUS.BAD_REQUEST`, etc.
- UI: `CHAT_UI`, `SUGGESTED_QUESTIONS`, `API_ERROR_MESSAGES`

## Reglas de código

Las mismas que en [06-estandares-de-codigo.md](./06-estandares-de-codigo.md): sin comentarios, identificadores en inglés, textos de UI en español, SRP y alcance mínimo.

## Referencias

- [Estándares de código](./06-estandares-de-codigo.md)
- [Reglas de Cursor](../.cursor/rules/frontend-architecture.mdc)
- [Proyecto 01](../proyecto-01-asistente-negocio/)
- [Proveedores LLM](./09-proveedores-llm.md)
- [Base de conocimiento JSON](./10-knowledge-base-json.md)
