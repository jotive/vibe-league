# Vibe Coders League — Mostrador

Cuatro proyectos que no son cuatro proyectos: son **un solo producto** contado en cuatro capítulos.

**Mostrador** es un asistente de IA para **tiendas de nicho** (acuarios, café de especialidad, plantas, repuestos). Responde precio, stock y envíos con el catálogo real del negocio, y **admite cuando no sabe**.

| # | Qué es | Pruébalo |
|---|--------|----------|
| **1** | **El asistente**, funcionando en una tienda de acuarios | 🔗 [acuario-nebula.vercel.app](https://acuario-nebula.vercel.app) |
| **2** | **La landing** que lo vende, con captura de leads | 🔗 [mostrador-ia.vercel.app](https://mostrador-ia.vercel.app) |
| **3** | **Catálogo Express**: pega la lista de tu proveedor y te la ordena | 🔗 [catalogo-express-ia.vercel.app](https://catalogo-express-ia.vercel.app) |
| **4** | **La sala de máquinas**: la automatización que atiende al lead sola | 🔗 [sala-de-maquinas-ia.vercel.app](https://sala-de-maquinas-ia.vercel.app) |

> Acuario Nébula es un negocio **ficticio**, construido con detalle para la demo. Los testimonios y la ubicación del mapa también lo son.

---

## Cómo encajan

```
   Proyecto 3                    Proyecto 2
   Catálogo Express              Landing de Mostrador
   (herramienta gratis)          (propuesta de valor)
          │                              │
          │     el visitante deja sus datos
          └──────────────┬───────────────┘
                         ▼
                  Proyecto 4 · webhook
          ┌──────────────────────────────┐
          │ 1. Recibe el lead            │
          │ 2. Lo califica con IA (0-100)│
          │ 3. LE RESPONDE por correo    │
          │ 4. Lo guarda en el CRM       │
          │ 5. Avisa al equipo (Telegram)│
          └──────────────────────────────┘
                         │
                   3,2 segundos
                         ▼
              Proyecto 1 · el asistente
              es la prueba de que funciona
```

Una sola base de datos (Neon Postgres) con una columna `project_slug` sirve a los cuatro.

---

## Lo que hace distinto a esto

### No inventa datos. Y eso incluye el marketing.

El asistente **prefiere decir "no sé"** antes que inventarle un precio a un cliente. Eso también aplicó al construirlo:

- La landing **no usa** el famoso *"40–70% de las consultas son repetitivas"*: la investigación mostró que ese dato **solo aparece en blogs de vendedores de chatbots**, sin un estudio primario detrás. Un producto cuya bandera es "no inventamos datos" no puede abrir con un dato sin respaldo.
- Catálogo Express **no te dice "la mejor hora para enviar"**: no existe evidencia de que una tienda de acuarios deba enviar a distinta hora que una cafetería. En su lugar te dice lo que **sí** tiene respaldo: la **Ley 2300 de 2023**, que fija por norma cuándo se pueden mandar mensajes comerciales en Colombia.
- Las cifras que sí se citan llevan fuente (79% prefiere WhatsApp · 85,2% abandona por mala atención · 87,2% prefiere que lo atienda un humano · *Moffatt v. Air Canada*).

### El foso no es la IA. Es el catálogo.

Meta lanzó su propio agente de WhatsApp en junio de 2026: responde desde el catálogo, gratis. Eso volvió commodity el pitch de "IA que contesta". **El hueco que Meta no llena** es que el comprador **no tiene catálogo digital** — solo 2 de cada 10 microempresas colombianas tiene siquiera página web. Su inventario llega así:

```
Bailarina roja : 8.000 (en promoción)
Monjitas color: 5.000 o 6 unidades x 25.000
Bettas machos: 15.0000          ← un cero de más
15 neones x 20.000              ← no hay precio unitario
```

Catálogo Express convierte eso en un catálogo estructurado, **señala el cero de más** y **detecta que los neones no tienen precio por unidad** — porque poner $20.000 por pez le haría cobrar **15 veces de más** a su cliente.

---

## Stack

**Next.js 15** · **Tailwind v4** · **TypeScript** · **Zod** · **Groq (Llama 3.3 70B)** · **Neon Postgres** · **assistant-ui** · **Vercel**

Sin n8n: la automatización del Proyecto 4 vive en código sobre Vercel. Corre 24/7, gratis, y **cualquiera puede dispararla desde un link público** — algo que un flujo de n8n no puede ofrecer.

---

## Los proyectos

| Carpeta | Detalle |
|---------|---------|
| [`proyecto-01-asistente-negocio/`](proyecto-01-asistente-negocio/) | El asistente. Base de conocimiento en JSON validada con Zod, recuperación por relevancia, caché, cadena de respaldo entre proveedores LLM y telemetría de costos. [README](proyecto-01-asistente-negocio/README.md) |
| [`proyecto-02-landing-producto/`](proyecto-02-landing-producto/) | La landing. Formulario que persiste en Postgres de verdad, con validación en servidor. [SPEC](proyecto-02-landing-producto/SPEC.md) |
| [`proyecto-03-digitalizador/`](proyecto-03-digitalizador/) | Catálogo Express. Da el valor **antes** de pedir datos: el catálogo ordenado es tuyo gratis; solo dejas el contacto si quieres chatear con él. |
| [`proyecto-04-automatizacion/`](proyecto-04-automatizacion/) | La automatización. Cinco acciones encadenadas, con calificador de reglas fijas como red de seguridad si la IA falla. |
| [`docs/`](docs/) | Investigación, decisiones de negocio y estándares de código. |

---

## Correr en local

Cada proyecto es independiente:

```bash
cd proyecto-01-asistente-negocio   # o 02, 03, 04
npm install
cp .env.example .env.local         # y llena las claves
npm run dev
```

**Proveedor LLM recomendado: Groq** ([console.groq.com/keys](https://console.groq.com/keys)) — free tier amplio y muy rápido.

> **Ojo con Gemini:** su free tier son **20 peticiones por día** en los modelos actuales, y el alias `gemini-flash-latest` **cambia de modelo sin avisar**. Sirve para probar, no para una demo pública.

---

## Convenciones

Sin comentarios en el código · identificadores en inglés · textos de UI en español · una capa por responsabilidad. Detalle en [`docs/06-estandares-de-codigo.md`](docs/06-estandares-de-codigo.md).

Ramas de feature → merge a `main`. Ningún secreto en el repo: todos los `.env.local` están ignorados.
