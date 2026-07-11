# Documentación — Vibe League

Investigación y decisiones de diseño para los proyectos del hackathon **Vibe Coders League** (Platzi).

## Índice

| Documento | Descripción |
|-----------|-------------|
| [01-investigacion-canal-cliente.md](./01-investigacion-canal-cliente.md) | Investigación de canal (WhatsApp vs web), análisis de competidores del Proyecto 1 y recomendación de tipo de negocio |
| [02-decision-negocio-final.md](./02-decision-negocio-final.md) | Decisión final: **Acuario Nébula** (tienda de peces de nicho), por qué se eligió sobre barbería/camping/academias y el diferenciador de recomendación de productos |
| [03-estrategia-despliegue.md](./03-estrategia-despliegue.md) | Estrategia de despliegue en Vercel: monorepo, un proyecto por producto, configuración paso a paso y arquitectura por app |
| [04-identidad-de-marca.md](./04-identidad-de-marca.md) | Marca ganadora **Acuario Nébula**, tono, identidad visual, microcopy y persona del asistente (**Nebu**) |
| [05-modelo-replicable-tienda-nicho.md](./05-modelo-replicable-tienda-nicho.md) | **Patrón replicable:** acuariofilia como demo vertical; arquitectura aplicable a cualquier tienda de nicho (café, plantas, suplementos, mascotas, etc.) |
| [06-estandares-de-codigo.md](./06-estandares-de-codigo.md) | Estándares de código del monorepo: sin comentarios, SRP, nombres en inglés, UI/docs en español; referencia a reglas de Cursor |
| [07-caveman.md](./07-caveman.md) | Plugin Caveman para Cursor: comunicación comprimida del agente; no afecta UI de Acuario Nébula |
| [08-arquitectura-frontend.md](./08-arquitectura-frontend.md) | Arquitectura frontend del Proyecto 1: Zustand, Tailwind CSS, estructura de carpetas (`config/`, `constants/`, `services/`, `handlers/`, `stores/`) |
| [08-investigacion-tiendas-reales.md](./08-investigacion-tiendas-reales.md) | Investigación de tiendas reales de acuariofilia en Colombia/LatAm; taxonomía de catálogo y calibración de la KB de Acuario Nébula |
| [09-proveedores-llm.md](./09-proveedores-llm.md) | Cambio de proveedor LLM en Proyecto 1: OpenAI, Gemini, Groq vía `LLM_PROVIDER` |
| [10-knowledge-base-json.md](./10-knowledge-base-json.md) | Contrato JSON de la base de conocimiento: schema Zod, loader, formatter y pasos para replicar en otro nicho |

## Proyectos relacionados

- **Proyecto 01 — Asistente de Negocio:** [`../proyecto-01-asistente-negocio/`](../proyecto-01-asistente-negocio/)
  - **Demo vertical:** **Acuario Nébula** (Laureles, Medellín). Ver `04-identidad-de-marca.md`.
  - **Patrón template:** asistente para tiendas de nicho — ver `05-modelo-replicable-tienda-nicho.md`. El borrador **Barbería El Filo** quedó obsoleto.

## Cómo usar esta documentación

1. Leer `05-modelo-replicable-tienda-nicho.md` para entender que Acuario Nébula es el demo y el patrón aplica a cualquier tienda de nicho.
2. Leer `01-investigacion-canal-cliente.md` y `04-identidad-de-marca.md` antes de cambiar la base de conocimiento o el branding del asistente.
3. Usar los criterios de decisión y el TOP 3 para alinear el demo con product-market fit y diferenciación frente a otros envíos de Platzi.
4. Leer `03-estrategia-despliegue.md` antes de publicar un proyecto nuevo en Vercel o compartir el link en Platzi.
5. Leer `06-estandares-de-codigo.md` y `08-arquitectura-frontend.md` antes de contribuir código o abrir un PR.
6. Leer `07-caveman.md` si se quiere desactivar o ajustar el estilo caveman del agente.
7. Leer `08-investigacion-tiendas-reales.md` antes de ajustar precios, categorías o políticas de la KB del demo acuariofilia.
8. Leer `10-knowledge-base-json.md` antes de editar la KB o pivotar a otro nicho.
9. Actualizar este índice si se agregan nuevos documentos.
