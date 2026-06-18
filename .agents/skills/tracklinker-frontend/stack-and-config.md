# Stack y configuración

## Dependencias (`package.json`)

### Runtime

| Paquete | Versión | Uso |
| --- | --- | --- |
| `react`, `react-dom` | `^19.2.0` | UI |
| `react-router-dom` | `^7.13.0` | Routing (BrowserRouter, Routes, NavLink) |
| `@tanstack/react-query` | `^5.99.2` | Data fetching / caché |
| `gsap` | `^3.15.0` | Animaciones (modales via plugin `Flip`) |
| `recharts` | `^3.7.0` | Gráficos del dashboard |
| `jspdf` | `^4.2.1` | Exportar informes PDF |
| `jspdf-autotable` | `^5.0.8` | Tablas dentro de PDF |
| `xlsx` | `^0.18.5` | Exportar informes Excel |
| `material-symbols` | `^0.44.4` | Iconos (rounded) |
| `vite-plugin-svgr` | `^4.5.0` | Importar SVGs como componentes React (`?react`) |

### dev

| Paquete | Versión |
| --- | --- |
| `vite` | `^7.2.4` |
| `@vitejs/plugin-react` | `^5.1.1` |
| `tailwindcss` | `^3.4.19` |
| `postcss` | `^8.5.6` |
| `autoprefixer` | `^10.4.24` |
| `eslint` | `^9.39.1` |
| `eslint-plugin-react-hooks` | `^7.0.1` |
| `eslint-plugin-react-refresh` | `^0.4.24` |
| `@eslint/js` | `^9.39.1` |
| `globals` | `^16.5.0` |
| `@types/react`, `@types/react-dom` | `^19.x` |

`"type": "module"` → todo es ESM.

## Scripts (`package.json`)

```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

No hay script de tests: la validación es `pnpm lint` + `pnpm build`.

## `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
});
```

`svgr()` permite importar SVGs como componentes React con el sufijo
`?react` (lo verás en `src/assets/icons/asideIcons.js`).

## `tailwind.config.js`

- `darkMode: "class"` (lo activa `useTheme`).
- `content: ["./src/**/*.{js,jsx,ts,tsx}"]`.
- Fuentes extendidas: `dmsans`, `poppins`, `inter` (Poppins además se
  importa vía Google Fonts en `globals/styles/global.css`).
- `keyframes` y `animation` extendidos con: `rotation`, `modalFadeIn`,
  `modalFadeOut`, `fade`, `blurIn`, `blurOut`, `iconFill`,
  `clickEffect`, `blurUp`, `toastIn`, `shake`, `shimmer`.
- `safelist` (clases dinámicas que Tailwind no detecta en el código):
  - `row-span-(2..12)` y `col-span-(2..12)` con variantes `md/lg/xl`.
  - `z-(50|100|150)`.
  - Strings literales: `flex-col`, `self-end`, `bg-black`, `bg-red-600`,
    `w-64`, `hidden`, `z-50`, `z-100`, `z-150`,
    `animate-modalFadeOut`, `animate-modalFadeIn`, `animate-blurUp`,
    `users-background`, `bg-green-500`, `bg-[#FFFFFF]`, `bg-[#000000]`,
    `bg-[#F3EEF5]`, `bg-[#E2E5E7]`.

## `postcss.config.js`

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

## `eslint.config.js` (flat config)

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

Puntos relevantes:

- Ignora `dist/`.
- Permite variables no usadas que empiecen por mayúscula o `_` (útil
  para props que aún no se usan).
- Habilita las reglas de React Hooks + Fast Refresh.

## `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/Logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tracklinker</title>
  </head>
  <body>
    <div id="root"></div>
    <div id="modal-root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Hay dos nodos: `#root` y `#modal-root`. `App.jsx` también crea un
segundo `#modal-root` dentro del `<div>` principal — esto parece ser
un duplicado intencional para garantizar el portal incluso si se carga
la app antes de que el `<div>` de `index.html` esté disponible.

## `pnpm-workspace.yaml`

```yaml
allowBuilds:
  core-js: true
  esbuild: true
```

Permite que `core-js` y `esbuild` ejecuten scripts de build (necesario
para Vite en algunos entornos).

## Variables de entorno

`.env.example`:

```
VITE_API_URL =
```

`VITE_API_URL` es la única variable obligatoria y se lee con
`import.meta.env.VITE_API_URL` en `src/config/apiRoutes.js`. El resto de
constantes (rutas base) son strings simples en `apiRoutes.js`.

`.env` está en `.gitignore` y `.dockerignore` (nunca commitear credenciales).
