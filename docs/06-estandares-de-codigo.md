# Estándares de código — Vibe League

Guía para contribuidores humanos. Las mismas reglas se aplican automáticamente en Cursor mediante archivos en [`.cursor/rules/`](../.cursor/rules/).

## Reglas de Cursor

| Archivo | Alcance | Descripción |
|---------|---------|-------------|
| [`vibe-league-core.mdc`](../.cursor/rules/vibe-league-core.mdc) | Siempre activa | Sin comentarios, idiomas, código semántico, alcance mínimo |
| [`typescript-nextjs.mdc`](../.cursor/rules/typescript-nextjs.mdc) | `**/*.{ts,tsx}` | SRP, capas, patrones Next.js |
| [`frontend-architecture.mdc`](../.cursor/rules/frontend-architecture.mdc) | `proyecto-01-asistente-negocio/**` | Zustand, Tailwind, estructura de carpetas |
| [`caveman.mdc`](../.cursor/rules/caveman.mdc) | Siempre activa | Comunicación comprimida del agente (ver [07-caveman.md](./07-caveman.md)) |

## Principios

### 1. Código sin comentarios

No se permiten docstrings, comentarios de línea ni bloques en el código fuente. Si algo necesita explicación, mejorar nombres y estructura. La documentación para humanos vive en `docs/` y README, no dentro del código.

**Excepción:** archivos generados por herramientas (p. ej. `next-env.d.ts` de Next.js).

### 2. Identificadores en inglés

Variables, funciones, clases, interfaces, tipos y nombres de archivo usan inglés:

- `buildSystemPrompt`, `formatKnowledgeForPrompt`, `ChatWidget`
- Archivos: `knowledge-base.ts`, `chat-service.ts`

### 3. Texto al usuario en español

Todo lo que ve o lee el usuario final va en español:

- Etiquetas, placeholders y mensajes de error en la UI
- Contenido de `knowledge-base.ts` (datos del negocio)
- Prompts del asistente en `system-prompt.ts`
- README y documentación en `docs/`

### 4. Separación de responsabilidades (SRP)

Cada módulo tiene un propósito claro:

| Ubicación | Qué va aquí |
|-----------|-------------|
| `src/app/**/route.ts` | Capa HTTP: validar entrada, delegar, responder con status |
| `src/handlers/` | Respuestas JSON estandarizadas y manejo de errores (API y cliente) |
| `src/services/` | Lógica reutilizable: OpenAI, validación, tipos, KB, chat-client |
| `src/stores/` | Estado global de UI con Zustand |
| `src/constants/` | Rutas API, status codes, textos de UI en español |
| `src/config/` | Configuración de app e integraciones |
| `src/components/` | Presentación; consumen stores |
| `src/app/page.tsx`, `layout.tsx` | Composición de páginas y metadata |

Evitar rutas API «gordas» con lógica de negocio mezclada. Extraer funciones puras a `services/` y respuestas a `handlers/` cuando el archivo crece o mezcla concerns.

### 5. Stack frontend (Proyecto 1)

- **Zustand** para estado de UI compartido (`stores/`).
- **Tailwind CSS** para estilos; tokens de marca en `app/globals.css`.
- Detalle completo en [08-arquitectura-frontend.md](./08-arquitectura-frontend.md).

### 6. Código semántico

- Nombres que describen intención, no implementación.
- Funciones cortas; early returns.
- Constantes con nombre en lugar de literales repetidos.
- Sin imports ni variables muertas.

### 7. Alcance mínimo

Cambios pequeños y focalizados. No refactorizar módulos enteros si el ticket pide un ajuste puntual. No añadir abstracciones para un solo uso.

## Estructura del Proyecto 1

```
proyecto-01-asistente-negocio/src/
├── app/
│   ├── api/chat/route.ts    # HTTP POST /api/chat
│   ├── globals.css          # Tailwind + tema
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ChatWidget.tsx       # UI del chat
├── config/
│   ├── env.ts
│   └── openai.ts
├── constants/
│   ├── api-paths.ts
│   ├── chat.ts
│   ├── chat-ui.ts
│   └── http-status.ts
├── handlers/
│   ├── client-error-handler.ts
│   ├── error-handler.ts
│   ├── parse-chat-messages.ts
│   └── response-handler.ts
├── services/
│   ├── chat-types.ts
│   ├── chat-service.ts
│   ├── chat-client.ts
│   ├── knowledge-base.ts
│   └── system-prompt.ts
└── stores/
    └── chat-store.ts
```

Ver [08-arquitectura-frontend.md](./08-arquitectura-frontend.md) para convenciones completas.

## Checklist antes de un PR

- [ ] Sin comentarios ni docstrings en código nuevo o modificado
- [ ] Nombres de código en inglés; UI y docs en español
- [ ] Lógica de negocio fuera de `route.ts` cuando aplique
- [ ] Sin imports o variables sin usar
- [ ] Diff acotado al cambio solicitado

## Referencias

- [Documentación general](./README.md)
- [Arquitectura frontend](./08-arquitectura-frontend.md)
- [Modelo replicable tienda nicho](./05-modelo-replicable-tienda-nicho.md)
- [Estrategia de despliegue](./03-estrategia-despliegue.md)
