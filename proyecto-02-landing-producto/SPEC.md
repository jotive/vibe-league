# Spec — Proyecto 02: landing de producto con captura de leads

> Documento corto previo al código (estilo OpenSpec `proposal`, sin la ceremonia completa).
> Fecha: 2026-07-12 · Rama: `feat/proyecto-02-landing`

## 1. Producto

**Mostrador** — asistente de IA para tiendas de nicho, que responde con el catálogo **real** del negocio (precio, stock, compatibilidad) y **admite cuando no sabe**.

El Proyecto 01 (Acuario Nébula) **es el demo vivo del producto**: el visitante puede probarlo antes de dejar sus datos.

## 2. Posicionamiento (decidido tras investigación de mercado)

### El hallazgo que define el producto

Meta lanzó **Meta Business Agent** (3 jun 2026, global, gratis): responde desde el catálogo dentro de WhatsApp. **"IA que contesta por WhatsApp con tu catálogo" ya NO es un diferenciador.**

Huecos que Meta **no** cubre y que sí son foso:

1. **El catálogo tiene que existir.** Solo 21–34% de las microempresas colombianas tiene página web; el catálogo del comprador vive en un Excel, en Instagram o en su cabeza. Meta no se lo digitaliza ni se lo mantiene.
2. **Criterio de nicho.** Un catálogo plano no sabe que un filtro de 60 L/h no sirve para 200 litros.
3. **Solo vive en WhatsApp.** No responde en la web del negocio.

### Propuesta de valor (jerarquía)

| Bloque | Mensaje | Rol |
|---|---|---|
| **H1** | *"Tus clientes preguntan a las 10 de la noche. Tu tienda responde."* | Gancho. Vende **venta perdida** (plata), no ahorro de tiempo |
| **Bloque 2** | *"Prefiere decir 'no sé' antes que inventarle un precio a tu cliente."* | **Neutraliza la objeción #1** (miedo a alucinar) |
| **Bloque 3** | *"¿No tienes catálogo digital? Te lo armamos nosotros."* | **El foso real** frente a Meta |
| **Bloque 4** | *"Contesta lo aburrido. Tú contestas lo importante."* | Neutraliza la objeción más peligrosa: 87,2% prefiere humano |

### Comprador

Dueño de tienda especializada (acuarios, café, plantas, mascotas, repuestos). 2–6 empleados. 200–900 SKUs. Usa la **app** de WhatsApp Business (no la API). Recibe 20–60 mensajes/día. Ya paga Alegra o Siigo ($70k–$150k COP/mes).

Su dolor #1 **no es el tiempo, es la venta perdida**. Su miedo #1 es que el bot invente y lo haga quedar mal.

### Precio mostrado

- **$149.000 COP/mes** (calca el plan Pyme de Alegra = precio ya normalizado; por debajo de Cliengo/Wati/Whaticket).
- **Setup de digitalización del catálogo: desde $390.000 COP** (una vez). Es el trabajo que nadie quiere hacer = el foso.

## 3. Honestidad de datos (regla dura)

**No usar en la landing** el dato "40–70% de las consultas son repetitivas": solo aparece en blogs de vendors de chatbots, sin estudio primario. Un producto cuya bandera es "no inventamos datos" no puede abrir con un dato inventado.

Solo se citan cifras con fuente verificable (79% prefiere WhatsApp; 85,2% abandona por mala atención; 87,2% prefiere humano; caso Air Canada).

## 4. Captura de datos (requisito central del reto)

Formulario de lista de espera → tabla `leads` en **Neon Postgres** (la misma base del Proyecto 01, con `project_slug` → una sola BD para todo el monorepo).

**8 campos máximo.** Cada uno debe servir para contactar, calificar o escribir mejor copy:

| Campo | Tipo | Para qué |
|---|---|---|
| WhatsApp | tel, **obligatorio** | Es el canal real. Un email en Colombia no se contesta |
| Nombre | texto, **obligatorio** | Contacto |
| Nombre de la tienda | texto | Permite googlear su Instagram |
| Nicho | select | **Decide en qué vertical se construye primero** |
| Mensajes/día | rango | Proxy de dolor y tamaño. <10 = no compra |
| Dónde vive su catálogo | select | **Define si el negocio es viable**: costo de onboarding y si hay que cobrar setup |
| Nº de productos | rango | Base para pricing por SKUs |
| Pregunta que más le repiten | texto libre | **Oro**: da el copy real y valida la hipótesis con datos propios |

Email queda **opcional** (se pide WhatsApp, que es el canal que sí se contesta).

## 5. Criterios de aceptación

- [ ] El formulario **persiste de verdad** en Postgres (verificado con `SELECT` contra la BD, no con un toast de éxito).
- [ ] Validación en **servidor** con Zod (no confiar en el navegador).
- [ ] Email/WhatsApp duplicado no crea fila doble (índice único por `project_slug` + email).
- [ ] Errores de BD no rompen la UI: mensaje claro al usuario y log en servidor.
- [ ] **Responsive** verificado en móvil (375px) y escritorio (1280px), con navegador real.
- [ ] Enlace al demo vivo (Acuario Nébula) funcionando.
- [ ] Sin secretos en el repo (`.env.local` ignorado; verificado antes del commit).
- [ ] Accesible: labels asociados, foco visible, errores anunciados.

## 6. Fuera de alcance

- Autenticación / panel de administración (el Proyecto 01 ya lo tiene).
- Pagos.
- El asistente en sí (ya existe: es el Proyecto 01).

## 7. Stack

Next.js 15 (App Router) · Tailwind v4 · Zod · Neon Postgres · TypeScript.
Mismas reglas de código del monorepo: sin comentarios, identificadores en inglés, textos de UI en español, SRP por capas.
