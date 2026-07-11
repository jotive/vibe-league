# Caveman — comunicación comprimida del agente

[Caveman](https://github.com/JuliusBrussee/caveman) instalado en este repo para reducir tokens en la comunicación del agente de Cursor durante desarrollo. No modifica la app ni el contenido que ve el usuario final.

## Qué se instaló

| Artefacto | Ruta | Función |
|-----------|------|---------|
| Skills (7) | `.agents/skills/` | Modo caveman, commits, reviews, compresión, stats, help, cavecrew |
| Lock de skills | `skills-lock.json` | Versionado de skills instalados vía `npx skills` |
| Regla always-on | `.cursor/rules/caveman.mdc` | Activa estilo caveman en cada sesión del agente |

Skills instalados:

- `caveman` — modo de comunicación comprimida
- `caveman-commit` — mensajes de commit concisos
- `caveman-review` — revisiones de código breves
- `caveman-compress` — compresión de contexto
- `caveman-stats` — estimación de tokens ahorrados
- `caveman-help` — ayuda del ecosistema caveman
- `cavecrew` — utilidades del paquete

## Alcance

**Sí aplica a:**

- Respuestas del agente de Cursor en este repo (explicaciones, diagnósticos, resúmenes de trabajo)
- Comunicación interna de desarrollo

**No aplica a:**

- UI de **Acuario Nébula** (etiquetas, mensajes, microcopy en español)
- `knowledge-base.ts`, `system-prompt.ts` ni prompts del asistente **Nebu**
- Código fuente, commits ni PRs (caveman los escribe en formato normal)
- Documentación en `docs/` (sigue en español completo)

## Conflicto con reglas de usuario

El proyecto tiene regla de usuario **«Always respond in Spanish»** con prosa técnica completa. Caveman comprime el estilo (frases cortas, sin relleno), no el idioma: si el usuario escribe en español, el agente responde en **español caveman** (terso pero en español).

Si el tono terse choca con la expectativa de prosa fluida:

1. En el chat: `stop caveman` o `normal mode`
2. Desactivar la regla always-on (ver abajo)
3. Usar solo skills puntuales (`caveman-commit`, `caveman-review`) sin regla global

Prioridad práctica: **UI y contenido de producto en español completo** > estilo caveman del agente.

## Uso

- Activación automática vía `.cursor/rules/caveman.mdc`
- Por sesión: decir `caveman mode` o `talk like caveman`
- Niveles: `/caveman lite`, `/caveman full`, `/caveman ultra`
- Desactivar en sesión: `stop caveman` o `normal mode`

## Cómo desactivar

### Solo esta sesión

```
stop caveman
```

### Quitar regla always-on del repo

Eliminar o renombrar:

```
.cursor/rules/caveman.mdc
```

### Desinstalar skills

```bash
npx skills remove caveman
```

O eliminar manualmente `.agents/skills/caveman*` y `skills-lock.json`.

### Desinstalación completa (ecosistema caveman)

```bash
npx -y github:JuliusBrussee/caveman -- --uninstall
```

Nota: `--uninstall` no borra reglas de repo ni skills de `npx skills`; hay que quitarlos a mano.

## Referencias

- [Repositorio oficial](https://github.com/JuliusBrussee/caveman)
- [INSTALL.md](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md)
- [Estándares de código](./06-estandares-de-codigo.md)
