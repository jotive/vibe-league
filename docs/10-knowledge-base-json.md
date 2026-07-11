# 10 — Base de conocimiento en JSON

Contrato de datos para la KB del Proyecto 01. El JSON es la **fuente de verdad**; TypeScript valida y tipa en tiempo de build.

---

## Arquitectura

```
proyecto-01-asistente-negocio/src/
├── data/
│   └── acuario-nebula.json           ← datos del negocio (editar aquí)
├── schemas/
│   └── knowledge-base.schema.ts      ← Zod + tipos inferidos
└── services/
    ├── knowledge-base.loader.ts      ← import JSON + validación
    ├── knowledge-base.formatter.ts   ← texto para system prompt
    └── system-prompt.ts              ← consume loader + formatter
```

| Archivo | Responsabilidad |
|---------|-----------------|
| `data/*.json` | Contenido del negocio en español |
| `schemas/` | Contrato estructural; falla el build si el JSON no cumple |
| `loader` | Exporta `knowledgeBase` tipado |
| `formatter` | Convierte KB a texto plano para el LLM |

---

## Secciones del JSON

| Clave | Contenido |
|-------|-----------|
| `business` | Nombre, tagline, tipo, propietario, especialidad |
| `contact` | Dirección, teléfono, WhatsApp, email, redes |
| `hours` | Horarios, festivos, fechas cerradas, retiro de vivos |
| `speciesAvailability` | Stock de especies: nombre, status, precio COP, notas |
| `productAvailability` | Stock de productos/equipos con el mismo modelo |
| `specialOrdersPolicy` | Anticipo, plazos, canales, cancelación, retiro |
| `fishCategories` | Categorías de referencia (rango precio, cuidado, litraje) |
| `starterKits` | Kits de inicio con includes e idealFor |
| `supplies` | Catálogo de accesorios por categoría |
| `policies` | Envío, devoluciones, garantías, aclimatación |
| `payment` | Métodos, moneda, financiación |
| `faq` | Preguntas frecuentes |
| `tone` | Estilo, idioma y rasgos del asistente |

### Status de disponibilidad

Valores permitidos en `speciesAvailability` y `productAvailability`:

- `disponible`
- `agotado`
- `por_encargo`
- `temporada`

---

## Cómo replicar en otro nicho

1. **Copiar** `src/data/acuario-nebula.json` → `src/data/mi-negocio.json` (o renombrar).
2. **Editar** todas las secciones con datos del nuevo rubro (textos en español, claves en inglés).
3. **Actualizar** el import en `knowledge-base.loader.ts` para apuntar al nuevo JSON.
4. **Ajustar** `system-prompt.ts` y `src/lang/es.ts` si cambian reglas de negocio o microcopy.
5. **Validar** con `npm run build` — Zod rechaza campos faltantes o tipos incorrectos.

No hace falta tocar UI ni rutas API. El schema es genérico para tiendas de nicho; solo cambia el contenido del JSON.

---

## Ejemplo mínimo de ítem de stock

```json
{
  "name": "Guppy de velo (Poecilia reticulata)",
  "status": "disponible",
  "priceCop": 9500,
  "notes": "Machos y hembras surtidos; venta mínima 3 unidades"
}
```

---

## Documentos relacionados

- [05-modelo-replicable-tienda-nicho.md](./05-modelo-replicable-tienda-nicho.md) — patrón de negocio
- [08-arquitectura-frontend.md](./08-arquitectura-frontend.md) — capas del frontend
- [../proyecto-01-asistente-negocio/README.md](../proyecto-01-asistente-negocio/README.md) — implementación

---

*Documento para vibe-league — contrato JSON de la base de conocimiento.*
