# Estrategia de despliegue — Vibe League

> **Objetivo:** Publicar cada proyecto del hackathon como una app independiente con su propio link público, usando un solo repositorio en GitHub y Vercel.

---

## Contexto

**vibe-league** es un monorepo para [Vibe Coders League](https://github.com/jotive/vibe-league): una serie de proyectos diarios del hackathon de Platzi. Cada entrega vive en su propia carpeta (`proyecto-01-asistente-negocio/`, `proyecto-02-...`, etc.) y se publica en **Vercel** para obtener un link clickeable que los votantes puedan probar.

| Elemento | Valor |
|----------|-------|
| Repositorio | [github.com/jotive/vibe-league](https://github.com/jotive/vibe-league) |
| Plataforma de despliegue | [Vercel](https://vercel.com) |
| Rama de producción | `master` |
| Stack por proyecto | Next.js (App Router) |

---

## 1. Estructura del monorepo

Cada proyecto es una aplicación Next.js autocontenida dentro de su carpeta. No hay paquetes compartidos ni orquestador de monorepo: solo carpetas hermanas en la raíz del repo.

```
vibe-league/
├── docs/                              # Documentación del hackathon
├── proyecto-01-asistente-negocio/       # Día 1 — Asistente de negocio
│   ├── src/
│   │   ├── app/                       # Páginas y API routes
│   │   ├── components/
│   │   └── lib/
│   │       ├── knowledge-base.ts      # Datos del negocio (en código)
│   │       └── system-prompt.ts
│   ├── package.json
│   └── tsconfig.json
├── proyecto-02-.../                   # Día 2 — (futuro)
│   └── ...
└── README.md
```

**Regla:** una carpeta = una app = un producto desplegable.

---

## 2. Un proyecto Vercel por producto (enfoque recomendado)

Conectar el **mismo repositorio de GitHub** varias veces en Vercel, creando un proyecto Vercel independiente por cada carpeta de producto.

| Concepto | Descripción |
|----------|-------------|
| **Repositorio** | Un solo repo: `jotive/vibe-league` |
| **Proyectos Vercel** | Uno por cada `proyecto-XX-.../` |
| **Root Directory** | Ruta de la carpeta del proyecto (ej. `proyecto-01-asistente-negocio`) |
| **Nombre del proyecto** | Identificador corto y memorable (ej. `vibe-peces`, `vibe-dia02`) |
| **Variables de entorno** | Configuradas por proyecto Vercel, no compartidas |

### Ventajas

- Cada entrega tiene su **URL pública propia** (`vibe-peces.vercel.app`, etc.).
- Los despliegues son **independientes**: un cambio en el día 3 no redeploya el día 1.
- Las **variables de entorno** (API keys) quedan aisladas por producto.
- No requiere configurar Turborepo, Nx ni workspaces: encaja con la velocidad de un hackathon.

---

## 3. Tabla ejemplo: carpeta → proyecto Vercel → URL

| Carpeta en el repo | Proyecto Vercel | URL pública (ejemplo) |
|--------------------|-----------------|------------------------|
| `proyecto-01-asistente-negocio/` | `vibe-peces` | `https://vibe-peces.vercel.app` |
| `proyecto-02-.../` | `vibe-dia02` | `https://vibe-dia02.vercel.app` |
| `proyecto-03-.../` | `vibe-dia03` | `https://vibe-dia03.vercel.app` |

> Los nombres de proyecto y dominios son ejemplos. Al crear cada proyecto en Vercel se puede elegir un alias personalizado en **Settings → Domains**.

---

## 4. Comportamiento en push

Vercel detecta cambios por **Root Directory**. Al hacer push a `master`:

| Escenario | Qué ocurre |
|-----------|------------|
| Solo cambia `proyecto-02-.../` | Solo el proyecto Vercel con Root Directory `proyecto-02-.../` se redeploya |
| Cambian `proyecto-01-.../` y `proyecto-02-.../` | Ambos proyectos Vercel se redeployan en paralelo |
| Solo cambia `docs/` o archivos en la raíz | Ningún proyecto de app se redeploya (a menos que Vercel esté configurado para ignorar esos paths) |

Esto evita builds innecesarios y mantiene cada demo aislada.

---

## 5. Configuración paso a paso en Vercel

Repetir estos pasos por cada nuevo proyecto del hackathon.

### 5.1 Importar el repositorio

1. Ir a [vercel.com/new](https://vercel.com/new).
2. Conectar la cuenta de GitHub si aún no está vinculada.
3. Seleccionar el repositorio `jotive/vibe-league`.
4. En **Project Name**, usar un nombre corto (ej. `vibe-peces`).

### 5.2 Root Directory

1. Expandir **Root Directory** → **Edit**.
2. Seleccionar la carpeta del proyecto (ej. `proyecto-01-asistente-negocio`).
3. Confirmar. Vercel usará el `package.json` de esa carpeta para detectar Next.js.

### 5.3 Production Branch

1. En **Settings → Git → Production Branch**, establecer `master`.
2. Cada push a `master` dispara un despliegue de producción para ese proyecto.

### 5.4 Environment Variables

1. Ir a **Settings → Environment Variables**.
2. Agregar las variables necesarias por proyecto. Ejemplo mínimo:

| Variable | Entornos | Descripción |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Production, Preview | Clave de OpenAI para el endpoint de chat |

3. **No** commitear claves en el repositorio. Solo configurarlas en Vercel.

### 5.5 vercel.json (opcional)

No es obligatorio para Next.js: Vercel lo detecta automáticamente. Usar `vercel.json` solo si hace falta personalizar algo (headers, rewrites, regiones). Ejemplo mínimo en la carpeta del proyecto:

```json
{
  "framework": "nextjs"
}
```

En la práctica, con Root Directory correcto y `package.json` con scripts `build`/`start`, no suele hacer falta.

### 5.6 Primer deploy

1. Hacer clic en **Deploy**.
2. Verificar que el build termina sin errores.
3. Abrir la URL de producción y probar el chat end-to-end.

---

## 6. Arquitectura por proyecto

Cada carpeta `proyecto-XX-.../` sigue el mismo patrón arquitectónico:

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel (serverless)                   │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js App (misma app)               │  │
│  │  ┌─────────────┐         ┌─────────────────────┐  │  │
│  │  │  Frontend   │  HTTP   │  API Routes         │  │  │
│  │  │  (React)    │ ──────► │  /api/chat          │  │  │
│  │  │  page.tsx   │         │  (serverless fn)    │  │  │
│  │  │  ChatWidget │         └──────────┬──────────┘  │  │
│  │  └─────────────┘                    │             │  │
│  └─────────────────────────────────────┼─────────────┘  │
│                                        │                 │
│  ┌─────────────────────────────────────▼─────────────┐  │
│  │  knowledge-base.ts  (datos en código, sin DB)    │  │
│  └───────────────────────────────────────────────────┘  │
│                                        │                 │
│  ┌─────────────────────────────────────▼─────────────┐  │
│  │  OPENAI_API_KEY  (env var de Vercel, no en repo)  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

| Capa | Implementación |
|------|----------------|
| **Datos** | `src/lib/knowledge-base.ts` — información del negocio versionada en código |
| **Backend** | API Routes de Next.js (`src/app/api/chat/route.ts`) — funciones serverless en Vercel |
| **Frontend** | Misma app Next.js — `page.tsx`, `ChatWidget.tsx` |
| **Secretos** | Solo variables de entorno en Vercel (`OPENAI_API_KEY`) |

No hay base de datos externa ni backend separado: todo vive en la misma app Next.js desplegada como funciones serverless.

---

## 7. Para entregas en Platzi

Cada día del hackathon produce:

1. Una carpeta nueva (`proyecto-XX-.../`) en el monorepo.
2. Un proyecto Vercel nuevo con Root Directory apuntando a esa carpeta.
3. Un **link público único** para compartir en la plataforma de Platzi.

| Entrega | Link a compartir |
|---------|------------------|
| Día 1 | `https://vibe-peces.vercel.app` |
| Día 2 | `https://vibe-dia02.vercel.app` |
| Día N | `https://vibe-diaNN.vercel.app` |

Los votantes abren el link, interactúan con el demo en vivo y no necesitan clonar el repositorio ni configurar variables de entorno.

---

## 8. Alternativas descartadas

| Alternativa | Por qué no |
|-------------|------------|
| **Un solo proyecto Vercel** para todo el monorepo | Un cambio en cualquier carpeta redeployaría todo; no hay URLs separadas por entrega sin lógica extra de routing |
| **Turborepo / Nx** | Overkill para un hackathon de proyectos diarios independientes; añade configuración y tiempo sin beneficio claro |
| **Monorepo con workspaces npm/pnpm** | Útil si hubiera paquetes compartidos; aquí cada proyecto es autocontenido |
| **Backend separado (Express, FastAPI, etc.)** | Más infraestructura y otro servicio que desplegar; las API Routes de Next.js cubren el caso |
| **Base de datos externa** | Los datos del negocio caben en `knowledge-base.ts`; evita costos y complejidad de conexión |

---

## Resumen

| Decisión | Elección |
|----------|----------|
| Estructura | Monorepo con una carpeta por proyecto |
| Despliegue | Un proyecto Vercel por carpeta, mismo repo GitHub |
| Root Directory | `proyecto-XX-nombre/` |
| Rama | `master` |
| Secretos | Variables de entorno en Vercel |
| URL | Una por entrega, para compartir en Platzi |
