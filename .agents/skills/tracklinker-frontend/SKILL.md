---
name: tracklinker-frontend
description: Use when working on the Tracklinker Web frontend (React 19 + Vite 7 + React Router 7 + React Query 5 + Tailwind 3 + GSAP). Covers the project layout, the Page→Hook→Service→API architecture per business module, the GSAP Flip modal system in src/globals/components/modals, the useModal / useFormValidation / useFlipModal / useCurrentUser hooks, the role-based routing and menu filter, the icon and theme conventions, and the split into a single .agents skills folder. Trigger on edits or new files inside src/, AGENTS.md, .env, Vite/Tailwind/ESLint config, or the Dockerfile; do NOT use for unrelated repos.
---

# Tracklinker Web — frontend skill

Tracklinker Web es la SPA de gestión de inventario (productos, categorías,
subcategorías, proveedores, usuarios, garantías, órdenes de salida,
informes PDF/Excel, dashboard con Recharts). El backend es una API REST
externa; el frontend habla con él mediante `fetch` envuelto en
`fetchWithAuth` (refresh automático de access token con cookies httpOnly).

Roles: `Admin`, `Almacén`, `Técnico`. Definen acceso a rutas
(`src/router/constants/routesConfig.js`), a items del menú lateral
(`src/globals/constants/asideMenuItems.js`) y a acciones dentro de cada
módulo.

## Estructura de este skill

Este skill está dividido en varios archivos para mantenerlo manejable.
Léelos en el orden que necesites según el área que toques:

1. `architecture.md` — la regla de oro `Page → Hook → Service → API`,
   organización de `globals/` vs `modules/`, y patrones transversales
   (modales, formularios, listas, búsqueda).
2. `stack-and-config.md` — versiones exactas y archivos de
   configuración (`package.json`, `vite.config.js`,
   `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`,
   `index.html`, `pnpm-workspace.yaml`).
3. `routing-and-auth.md` — `AppRouter`, `ProtectedRoutes`,
   `routesConfig`, `useCurrentUser`, `hasRole`, refresh de token.
4. `globals-and-ui.md` — `Layout` + `Aside`, primitivos en
   `globals/components/ui/*`, hooks globales, constantes, estilos
   globales.
5. `modals-and-animations.md` — el sistema de modales (Modal +
   `useFlipModal` con GSAP Flip), tipos de modal, z-index, `AddInnerModal`,
   `SuccessModal`/`ErrorModal`/`FilterModal`/`HelpModal`/`SelectMenu`/
   `profileModal/`.
6. `modules.md` — desglose módulo por módulo (login, home, dashboard,
   products, categories, subcategories, suppliers, users, warranties,
   output-orders, reports): page, hooks, services, modales propios y
   particularidades.
7. `conventions-and-naming.md` — nomenclatura de archivos, hooks y
   services, reglas de ESLint, reglas "no hagas".
8. `assets-and-styling.md` — `src/assets/icons` (objetos de íconos
   importados por `Icon` de Material Symbols), `src/assets/fonts`
   (Poppins), `globals/styles/*`, `tailwind.config.js` (animaciones y
   safelist), tema claro/oscuro.
9. `docker-and-deploy.md` — `Dockerfile` multi-stage, `.dockerignore`,
   variables de entorno, Nginx, customización para pnpm.
10. `commands-and-lint.md` — `pnpm install/dev/build/preview/lint`,
    `docker build/run`, cómo se valida antes de commitear.

## Cómo cargar este skill

- Si vas a tocar un módulo específico (p. ej. "agrega un campo al
  formulario de crear producto"), empieza por `architecture.md` y luego
  abre el archivo de ese módulo en `modules.md`.
- Si vas a tocar el sistema de modales, ve directo a
  `modals-and-animations.md`.
- Si vas a tocar rutas, menús, login, refresh o roles, ve a
  `routing-and-auth.md`.
- Para detalles globales reutilizables (Layout, iconos, tema), abre
  `globals-and-ui.md` y `assets-and-styling.md`.

## Lo que esta skill **no** cubre

- El backend (no está en este repo). La forma de la API solo se conoce
  por `src/config/apiRoutes.js` y por las llamadas en `services/`.
- La suite de tests: este repo no incluye tests automatizados; valida
  con `pnpm lint` y un build manual.
- Internacionalización: la app está solo en español. `AppearanceContent`
  muestra un selector de idioma pero solo tiene `Español` e `Ingles`
  cableados.
