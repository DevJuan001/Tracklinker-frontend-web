---
name: index
description: Use FIRST when working on the Tracklinker Web frontend (React 19 + Vite 7 + React Router 7 + React Query 5 + Tailwind 3 + GSAP). Acts as the index that maps every task to a more specific skill (architecture, stack, routing, ui, modals, modules, conventions, assets, docker, commands, prs). Trigger on AGENTS.md, .agents/, src/, the Dockerfile, Vite/Tailwind/ESLint config or any change inside the repo; do NOT use for unrelated repos.
---

# Tracklinker Web — frontend skill (index)

Tracklinker Web es la SPA de gestión de inventario (productos, categorías,
subcategorías, proveedores, usuarios, garantías, órdenes de salida,
informes PDF/Excel, dashboard con Recharts). El backend es una API REST
externa; el frontend habla con él mediante `fetch` envuelto en
`fetchWithAuth` (refresh automático de access token con cookies httpOnly).

Roles: `Admin`, `Almacén`, `Técnico`. Definen acceso a rutas
(`src/router/constants/routesConfig.js`), a items del menú lateral
(`src/globals/constants/asideMenuItems.js`) y a acciones dentro de cada
módulo.

## Mapa de skills específicas

Carga la skill que toque el área exacta. **No** mezcles skills: cada una
cubre un área y se activa por sus keywords.

| Skill | Cuándo cargarla |
| --- | --- |
| `architecture` | Razonar sobre la forma general del proyecto, `Page → Hook → Service → API`, `globals/` vs `modules/`, flujo de mutación. |
| `stack` | Tocar `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `index.html`, `pnpm-workspace.yaml` o la variable `VITE_API_URL`. |
| `routing` | Tocar `AppRouter`, `ProtectedRoutes`, `routesConfig`, `useCurrentUser`, `fetchWithAuth`, `loginService`, `useLogout`, refresh del token, guards de rol, `hasRole`. |
| `ui` | Tocar `Layout`, `Aside`, primitivos de `globals/components/ui/*` (FormField, Icon, Calendar, SearchBar, Skeleton, etc.) o decidir si algo va en `globals/` o en un módulo. |
| `modals` | Tocar `Modal.jsx`, `useFlipModal`, `AddInnerModal`, `ConfirmCancelButtons`, `ErrorModal`, `SuccessModal`, `FilterModal`, `HelpModal`, `SelectMenu`, `profileModal/*` o añadir un tipo de modal nuevo (`modalStyles.js` + `z_index` + `growDirection`). |
| `modules` | Trabajar dentro de `src/modules/<x>/` (login, home, dashboard, products, categories, subcategories, suppliers, users, warranties, output-orders, reports). |
| `conventions` | Nombrar archivos / hooks / services / tipos de modal, propagar roles en rutas/menú/home/reports/statusConfig, ESLint, regla "no comments", checklist de módulo nuevo. |
| `assets` | Tocar `src/assets/icons/*`, `src/assets/fonts/*`, `globals/styles/*`, `tailwind.config.js` (animaciones + safelist), `useTheme`, o añadir un color con su variante `dark:`. |
| `docker` | Tocar el `Dockerfile` multi-stage, `.dockerignore`, Nginx, build args, CORS para las cookies del token, build-time vs runtime. |
| `commands` | Ejecutar scripts de `pnpm` (install/dev/build/preview/lint), validar antes de commitear, o hacer greps rápidos (rutas, roles, `useQuery`, `useModal`, `fetchWithAuth`). |
| `prs` | Abrir un pull request: nombre de rama (`feat/<scope>`), Conventional Commits, estilo del título/cuerpo, workflow de `gh`, errores comunes. |

## Cómo cargar este skill

- Si acabas de entrar al repo, lee **primero** `AGENTS.md` (en la raíz)
  para una vista de un solo archivo.
- Si vas a tocar un módulo específico (p. ej. "agrega un campo al
  formulario de crear producto"), empieza por
  `architecture` y luego abre la sección del
  módulo en `modules`.
- Si vas a tocar el sistema de modales, ve directo a
  `modals`.
- Si vas a tocar rutas, menús, login, refresh o roles, ve a
  `routing`.
- Para detalles globales reutilizables (Layout, iconos, tema), abre
  `ui` y `assets`.
- Si vas a crear o revisar una PR, ve a `prs`.

## Lo que estas skills **no** cubren

- El backend (no está en este repo). La forma de la API solo se conoce
  por `src/config/apiRoutes.js` y por las llamadas en `services/`.
- La suite de tests: este repo no incluye tests automatizados; valida
  con `pnpm lint` y un build manual.
- Internacionalización: la app está solo en español.
