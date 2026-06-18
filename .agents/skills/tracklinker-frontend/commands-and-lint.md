# Comandos, lint y validación

## Scripts (`package.json`)

```bash
pnpm install        # instala dependencias
pnpm dev            # Vite dev server (HMR)
pnpm build          # build de producción → ./dist
pnpm preview        # sirve el build localmente
pnpm lint           # ESLint sobre todo el repo
```

> **No hay script de tests** en este repo. La validación previa a
> commit se hace con `pnpm lint` y un build manual (`pnpm build`)
> para detectar errores de import / tipos.

## pnpm

- Versión mínima: `8` (ver `package.json` y el README).
- `pnpm-workspace.yaml`:

  ```yaml
  allowBuilds:
    core-js: true
    esbuild: true
  ```

  Permite que `core-js` y `esbuild` ejecuten scripts de postinstall.

## Lint (ESLint 9, flat config)

```bash
pnpm lint
```

- `eslint.config.js` ignora `dist/`.
- Reglas activas: `recommended` + `react-hooks` + `react-refresh`.
- `no-unused-vars` permite variables que empiezan por mayúscula o
  `_`. Útil cuando declaras props que aún no usas (o nombres de
  componentes que importas solo por su tipo).

Si quieres revisar solo un archivo:

```bash
pnpm exec eslint src/modules/products/ProductsPage.jsx
```

## Vite

- Dev server: `pnpm dev` (puerto default 5173).
- Habilita Fast Refresh vía `@vitejs/plugin-react`.
- Habilita SVGR (`vite-plugin-svgr`) para `?react`.
- La config está toda en `vite.config.js`:

  ```js
  export default defineConfig({ plugins: [react(), svgr()] });
  ```

## Validación típica antes de hacer commit

No hagas commit sin antes:

1. `pnpm lint` — debe pasar sin errores.
2. `pnpm build` — debe completar sin errores de import.
3. (Opcional) `pnpm preview` para revisar manualmente el build
   de producción.

## Docker (atajos)

```bash
docker build -t tracklinker-web .
docker run -p 80:80 tracklinker-web
```

Para producción:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t tracklinker-web:prod .
```

Ver `docker-and-deploy.md` para más detalles.

## Búsquedas rápidas en el repo

- Buscar todas las rutas y sus roles:
  ```bash
  grep -rn "roles:" src/router src/globals src/modules
  ```
- Buscar todos los `useQuery` para mapear la caché de React Query:
  ```bash
  grep -rn "useQuery" src
  ```
- Buscar todos los `useModal()`:
  ```bash
  grep -rn "useModal(" src
  ```
- Buscar todos los servicios:
  ```bash
  grep -rn "fetchWithAuth" src
  ```
- Buscar todas las animaciones custom usadas (por si vas a tocar
  `tailwind.config.js`):
  ```bash
  grep -rn "animate-" src
  ```

## Regla de oro del repo

> **No hacer `git commit` sin que el usuario lo pida explícitamente.**

Ver `conventions-and-naming.md` para el resto de reglas.
