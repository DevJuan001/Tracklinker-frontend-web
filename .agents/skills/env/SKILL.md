---
name: env
description: Use when troubleshooting missing VITE_API_URL or other VITE_* env vars in production, when configuring environment variables for Render/Vercel/Netlify/Docker, when adding a new env var to the app, or when interpreting the "VITE_API_URL is not defined" runtime error. Triggers on keywords "VITE_API_URL undefined", "env not found", "VITE_", "import.meta.env", "build env", "Render env", "Vercel env", "production API URL", "vite env not loaded".
---

# Environment variables

## Vite basics

- Vite expone env vars al cliente **solo** si están prefijadas con
  `VITE_`. Cualquier otra variable (`API_KEY`, `SECRET`, etc.) queda
  inaccesible desde el bundle — esto es por seguridad, no un bug.
- Las `VITE_*` se inyectan en el bundle en **build time**, no en
  runtime. `pnpm build` reemplaza `import.meta.env.VITE_FOO` por el
  valor literal de la variable en el momento de la build.
- En dev (`pnpm dev`), Vite las lee de `.env`, `.env.local`,
  `.env.development`, etc.
- En producción, vienen del entorno del build runner
  (Render / Vercel / Netlify / Docker / GH Actions).

> **Consecuencia práctica:** si `VITE_API_URL` no está definida
> cuando se ejecuta `pnpm build`, el bundle se compila con
> `apiUrl: undefined` y todos los fetches fallan en runtime.

## Vars requeridas

- `VITE_API_URL` — URL base del backend (sin slash final).
  Ejemplos: `http://localhost:8000` (dev), `https://api.example.com`
  (prod).

## Dev local (`.env`)

```bash
VITE_API_URL=http://localhost:8000
```

`.env` está en `.gitignore` y `.dockerignore` (nunca commitear).
`.env.example` sí se commitea y documenta las claves que el proyecto
espera — si añades una var nueva, súbela al `.env.example`.

## Plataformas de deploy

Cada plataforma necesita `VITE_API_URL` disponible **durante el
build** (no en runtime). El error típico es fijarla solo en
"Environment" pensando que es runtime y descubrir que el build ya
quedó quemado sin la var.

### Render

1. Service → **Environment**.
2. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://api.example.com` (o lo que corresponda).
3. **Save Changes**. Render re-despliega automáticamente.
4. Si la build previa ya estaba mal, **fuerza un rebuild limpio**:
   **Manual Deploy** → **Clear build cache & deploy**.

> Si Render te sigue sirviendo el bundle viejo después del redeploy,
> abre la consola del browser, mira `import.meta.env.VITE_API_URL`
> y confirma que el valor es el nuevo. Si no, repite el paso 4.

### Vercel

1. Project → **Settings** → **Environment Variables**.
2. Add `VITE_API_URL` para el entorno `Production` (y `Preview` si
   también aplica).
3. **Deployments** → sobre el último deploy → **⋯** → **Redeploy**.

### Netlify

1. Site settings → **Environment variables** → **Add a variable**.
2. Key `VITE_API_URL`, value el de producción.
3. **Deploys** → **Trigger deploy** → **Clear cache and deploy**.

### Docker

Pásala como `--build-arg` o variable de entorno del runner:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t tracklinker-web .
```

En CI (GitHub Actions, GitLab CI, etc.):

```yaml
- name: Build
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
  run: pnpm build
```

`VITE_API_URL` también debe estar en el **build-time** del Dockerfile
(no en runtime). El `Dockerfile` actual no lee args: la build usa
`npm run build` directo. Si quieres inyectar la var, cambia la línea
por `ARG VITE_API_URL` + `ENV VITE_API_URL=$VITE_API_URL` antes de
`npm run build`, o pásala al `RUN npm run build` con `VITE_API_URL=…`.

> Ver la skill `docker` para más detalle.

## Guard en `apiRoutes.js`

`src/config/apiRoutes.js` tiene un guard al cargar el módulo que
lanza un error claro si `VITE_API_URL` está vacía:

```
[Tracklinker] VITE_API_URL is not defined. Vite injects VITE_* env
vars at BUILD TIME, so it must be set in your build environment
(Render Dashboard > Environment, Vercel project settings, .env file,
or Docker --build-arg) BEFORE running `pnpm build`. The current
bundle was built without it and every API call would fail; re-deploy
after setting the variable. See the `env` skill for details.
```

Si lo ves, **no intentes arreglar el código** — el código está
bien. Re-deploy con la var en el entorno de build.

## Añadir una nueva env var

1. Decide el prefijo: si es para el cliente, **`VITE_`** obligatorio.
2. Añade la clave a `.env.example` con un valor de ejemplo
   (placeholder).
3. Léela en el código con `import.meta.env.VITE_<NAME>`.
4. Si es **requerida** para que la app arranque, añade un guard en
   `apiRoutes.js` (o en el módulo que la use) que tire un `throw` con
   un mensaje accionable.
5. Documenta la var en este skill.
6. Si va a cambiar entre entornos, recuerda que el build se hace
   una vez por deploy — no se puede cambiar en runtime.

## Anti-patrones

- ❌ Fijar `VITE_API_URL` solo en "runtime env" del host pensando que
  es runtime. **Es build time.**
- ❌ Cambiar el valor en el dashboard y no re-desplegar.
- ❌ `process.env.VITE_API_URL` (Node-only). En Vite, usa
  `import.meta.env.VITE_API_URL`.
- ❌ Asumir que `.env` se copia al contenedor Docker (no, está en
  `.dockerignore` y se inyecta en build time).
- ❌ Comitear `.env` con credenciales.

## Cómo verificar que la var está bien inyectada

Después de un deploy, en la consola del browser:

```js
console.log(import.meta.env.VITE_API_URL);
```

Si muestra `undefined` o un valor vacío:

1. Confirma que la var está en el dashboard de tu host.
2. Confirma que está marcada como **build** env (no solo runtime).
3. Re-deploy con **clear cache**.
4. Limpia el caché del browser (hard reload).

Si todo eso falla, abre un issue con la salida de
`pnpm build` (con la var exportada) y la consola del browser.

## Skills relacionadas

- `docker` — cómo se inyecta `VITE_API_URL` en el build de Docker.
- `stack` — `package.json`, Vite, `index.html`, `pnpm-workspace.yaml`.
- `routing` — `fetchWithAuth` consume `apiRoutes.apiUrl`.
- `spa-routing` — si también te da 404 en refresh, problema aparte.
