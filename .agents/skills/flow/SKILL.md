---
name: flow
description: Use when the user asks to add, change, refactor, fix or build something in the Tracklinker Web frontend. Enforces a strict requirement → design → implement flow: clarify the requirement first, produce a written design that maps to the project architecture, then implement following every project convention. Triggered by keywords like "implementa", "agrega", "haz", "create a new", "add a new", "fix", "refactor", "cambia", "modifica", "haz que", "I want", "we need", "let's add".
---

# Flow: requirement → design → implement

Cualquier pedido del usuario (un fix, un cambio, una feature, un
refactor) sigue **obligatoriamente** tres fases en este orden:

1. **Requirement** — entender qué quiere el usuario y por qué.
2. **Design** — planificar la solución dentro de la arquitectura del
   proyecto.
3. **Implement** — ejecutar el plan siguiendo las convenciones.

> Si saltas una fase o las mezclas, el resultado suele tener retrabajo
> o romper convenciones del repo. **No** escribas código hasta que la
> fase de design esté aprobada.

---

## 1. Requirement

Objetivo: salir de esta fase con una definición precisa y sin
ambigüedades del problema.

Pasos:

1. **Reformula el pedido** con tus propias palabras y devuélveselo al
   usuario en una o dos frases. Pide confirmación si la reformulación
   no coincide con su intención.
2. **Identifica el alcance**:
   - ¿Es un fix, un refactor, una feature nueva o un cambio cosmético?
   - ¿A qué módulo(s) afecta? (ver skill `modules`).
   - ¿A qué rol(es) afecta? (`Admin`, `Almacén`, `Técnico`).
   - ¿Cambia la API pública (rutas, roles, endpoints)? Si sí,
     repasa la checklist del skill `conventions`.
3. **Detecta restricciones y casos borde**:
   - Tema claro/oscuro (ver skill `assets`).
   - Mobile / tablet / desktop.
   - Cookies httpOnly y refresh del token (ver skill `routing`).
   - `dark:` variants y Tailwind `safelist` (ver skill `assets`).
   - "¿Qué pasa si el usuario no tiene X?", "¿Y si la lista está
     vacía?", "¿Y si el backend responde 4xx/5xx?".
4. **Cierra la fase con criterios de aceptación**: una lista corta de
   condiciones verificables (manualmente o por inspección del código)
   que marcarán la tarea como hecha.

Si falta información, **pregunta** antes de continuar. Es preferible
una pregunta rápida a un refactor posterior.

---

## 2. Design

Objetivo: tener un plan escrito y revisable **antes** de tocar código.
En esta fase se documenta (en el chat, en un archivo, en un comentario
de PR, etc.) qué archivos se van a tocar y por qué.

Pasos:

1. **Mapea al arquitectura del repo**:
   - `Page → Hook → Service → API` (ver skill `architecture`).
   - Decidir si lo nuevo va en `globals/` (compartido entre módulos) o
     en `src/modules/<x>/` (un solo dominio).
   - Si la UI vive en un módulo pero la lógica es reusable, promueve
     después.
2. **Enumera los archivos a tocar**:
   - Página: `src/modules/<x>/<X>Page.jsx`.
   - Hook: `src/modules/<x>/hooks/use<Algo>.js`.
   - Service: `src/modules/<x>/services/<algo>Service.js`.
   - Modal: `src/modules/<x>/components/modals/<Algo>Modal.jsx`.
   - Constante nueva: `src/modules/<x>/constants/<x>StatusConfig.js`
     o `src/globals/constants/...` si es transversal.
3. **Elige los patrones**:
   - Mutación: `validate` → `service` → `invalidateQueries` →
     `openInnerModal(success|error)` (ver skill `architecture`).
   - Modal nuevo: define `type` + entrada en `modalStyles.js` + `z_index`
     + `growDirection` (ver skill `modals`).
   - Filtros server-side: `useFilter<Entity>s` + `FilterModal` que
     actualiza `setFilters` del hook principal.
   - Listado + búsqueda: `use<Entity>s` + `useSearch` (client-side).
4. **Revisa la propagación de roles** (ver skill `conventions`):
   - ¿Nueva ruta en `routesConfig.js`? → ¿entrada nueva en
     `asideMenuItems.js` (desktop + mobile) y, si aplica, en
     `homeSections.js` y `reportSections.js`?
   - ¿Estado nuevo en `<m>StatusConfig.js`? → ¿hay acción para
     cambiar a ese estado? ¿Está restringida por roles?
5. **Revisa la checklist de convenciones**:
   - ¿Hay nueva API? → sumarla a `apiRoutes.js`.
   - ¿Hay un color custom? → variante `dark:` y, si la clase es
     dinámica, entrada en `tailwind.config.js → safelist`.
   - ¿Hay un nuevo tipo de modal? → entrada en `modalStyles.js` y
     ¿header oculto? (los tipos `calendar`, `select`, `menu`,
     `editStatus` no renderizan header en `Modal.jsx`).
6. **Identifica los riesgos**:
   - ¿Refetch mientras hay mutaciones en vuelo? (React Query).
   - ¿Cache de `currentUser` se invalida tras cambios de perfil?
   - ¿Algún modal anidado que dependa de un trigger que pueda cambiar?

Cuando el plan esté escrito, **puedes usar la skill `prs`** para
escribirlo en el formato del PR (`## Description` + `## Changes` con
bullets agrupados por `### Area`). Eso te sirve de checklist
autoaplicable.

---

## 3. Implement

Objetivo: ejecutar el plan de la fase 2, respetando las convenciones.

Reglas duras durante la implementación:

- **Lee primero, escribe después.** Antes de crear un archivo, abre
  el archivo análogo existente (otro módulo, otro `use<Entity>s`) y
  copia su forma. Esto es lo que mantiene la consistencia del repo.
- **Sigue los nombres exactos** del skill `conventions`
  (`use<Entity>s`, `useCreate<Entity>`, `create<Entity>Service`, …).
  Los hooks agregan el verbo de la acción, los services el verbo HTTP.
- **No inventes globales.** Si dudas, ponlo en el módulo. Lo
  promoverás a `globals/` solo cuando un segundo módulo lo reuse.
- **Usa `apiRoutes.js`** y `fetchWithAuth` (skill `routing`). No
  hardcodees URLs ni llames `fetch` directo.
- **Validación**: usa `useFormValidation` con reglas
  (`{ email: v => /…/.test(v) || "Email inválido" }`) y propaga el
  error con `fieldError(name)` al input correspondiente.
- **Mutaciones**: tras éxito, invalida la query (`["entity"]`) y abre
  `openInnerModal("success", triggerButton)`. Tras error, abre
  `openInnerModal("error", triggerButton)`. Ver skill `architecture`.
- **No metas comentarios en el código** (regla del repo, ver skill
  `conventions`). Si necesitas documentar una decisión, hazlo en
  `AGENTS.md` o en la skill correspondiente.
- **Tema dual**: cada color que añadas debe tener su variante `dark:`.
  Si la clase se concatena en runtime (`bg-${color}`), añádela al
  `safelist` de `tailwind.config.js`. Ver skill `assets`.
- **Roles**: cualquier ruta nueva / item de menú / card de home /
  card de reports / estado nuevo se propaga a **todos** los sitios
  donde ese rol aplica. Ver skill `conventions`.

### Validación al terminar

Antes de cerrar la fase de implement (o antes de pedir al usuario
review), corre:

```bash
pnpm lint      # ESLint (no debe haber errores)
pnpm build     # build de producción (no debe haber errores de import)
```

Si la UI cambió, abre `pnpm dev` y verifica manualmente:

- Click en cada flujo nuevo.
- Cambio de tema (claro / oscuro / sistema).
- Cambio de tamaño de ventana (mobile / tablet / desktop).
- Logout + login (para verificar que `queryClient.clear()` no
  rompe nada).
- Caso de error de la API (forzar un 4xx y ver `ErrorModal`).

### Commit y PR

- Un commit por cambio lógico, con mensaje
  `type(scope): summary` (ver skill `prs`).
- Una PR por concern, con `feat/<scope>` como head y `main` como base.
- Cuerpo en el formato del template (ver skill `prs`).

---

## Anti-patrones

- ❌ Empezar a escribir código antes de tener el design.
- ❌ Copiar y pegar de otro módulo sin entender la diferencia.
- ❌ Añadir un hook "útil" a `globals/` que solo usa un módulo.
- ❌ "Arreglar" un modal con un `onClose={() => closeModal}` (sin
  invocarlo) — pasa la función referencia y se pierde el `onClose`
  real. Usa `() => closeModal()`.
- ❌ Olvidar `invalidateQueries` tras una mutación y luego
  "arreglarlo" con un `setTimeout` que refresca manualmente.
- ❌ Hardcodear colores en el JSX sin su `dark:`. Si el color no
  existe, créalo en `tailwind.config.js` o en `globals/styles/*`.
- ❌ Meter un commit gigante con cambios de varios módulos en una sola
  PR. Divide.

## Skills relacionadas

- `architecture` — la regla `Page → Hook → Service → API`.
- `conventions` — naming, propagación de roles, reglas duras.
- `modules` — qué hay en cada módulo (para saber dónde poner algo).
- `prs` — formato de commit y PR.
- `modals`, `routing`, `assets`, `ui`, `stack`, `docker`, `commands` —
  detalle de las áreas que vas a tocar.
