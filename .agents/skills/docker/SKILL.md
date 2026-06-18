---
name: docker
description: Use when editing the multi-stage Dockerfile, .dockerignore, Nginx config, build args, the VITE_API_URL injection at build time, or when configuring CORS for the access/refresh token cookies. Covers build-time vs runtime env vars, the SPA fallback that lets react-router take over, and the pnpm variant. Triggered by keywords "Dockerfile", "docker build", "docker run", "nginx", "VITE_API_URL build", "SPA fallback", "CORS cookies", "dockerignore".
---

# Docker y despliegue

## `Dockerfile`

Multi-stage: build con Node, serve con Nginx.

```dockerfile
# Stage 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Notas:

- Usa **`npm install`** (no `pnpm`). En el repo hay `pnpm-lock.yaml`
  y `pnpm-workspace.yaml`, pero el `Dockerfile` ignora el lockfile
  (`COPY package*.json` → `package.json` + `package-lock.json`).
- Copia `package.json` y `package-lock.json` con `package*.json`.
- La imagen final es `nginx:alpine` sirviendo `/usr/share/nginx/html`
  en puerto 80.
- No hay `nginx.conf` propio → usa el default de la imagen, que sirve
  cualquier archivo de `/usr/share/nginx/html` y hace fallback a
  `index.html` para SPA routing.

### Customización para pnpm

Si quieres usar el lockfile de pnpm, reemplaza el primer stage por:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
```

(Y mantén el segundo stage tal cual.)

## `.dockerignore`

```
node_modules
.env
.env.*
.git
.gitignore
.vscode
.idea
dist
*.md
```

Excluye dependencias, variables de entorno (no queremos filtrar
`VITE_API_URL` real en el contexto de build, aunque se inyecta en
build-time), outputs de build, y archivos de control de versiones / IDE.

## Variable `VITE_API_URL`

- Se define en `.env` (basado en `.env.example`).
- Vite la inyecta en **build-time** (no runtime). Si la cambias,
  tienes que rebuildear la imagen.
- En CI / producción, pásala como `--build-arg` o como variable de
  entorno del runner:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t tracklinker-web .
```

> Si quieres leer variables en runtime, necesitas un proxy reverso o
> un truco con `window.__API_URL__`; este repo **no** lo hace. Trata
> `VITE_API_URL` como fija al momento de build.

## Nginx

El default de `nginx:alpine` ya cubre:

- Servir estáticos.
- Fallback a `index.html` para cualquier ruta desconocida
  (`try_files $uri /index.html;` implícito en la config default
  para `location /`).

No hace falta config personalizada para el routing SPA estándar.
**Caveat:** si alguna vez sirves bajo un sub-path (`/app/`), tendrás
que añadir un `nginx.conf` con la config apropiada.

## Build y run

```bash
docker build -t tracklinker-web .
docker run -p 80:80 tracklinker-web
# abrir http://localhost
```

## Cookies httpOnly y CORS

El backend mete el access token (y el refresh token) en cookies
httpOnly. Esto significa:

- La API debe responder con `Access-Control-Allow-Credentials: true`
  y `Access-Control-Allow-Origin` exactamente igual al origin del
  frontend (no `*`).
- En `fetchWithAuth.js` se usa `credentials: "include"`. Si el
  backend no está en el mismo origen que el frontend, **asegúrate**
  de que la respuesta del backend lleva los headers CORS correctos.
- En Nginx no hace falta tocar nada: solo es proxy de estáticos.

## Tamaño / caches

- `nginx:alpine` ya es pequeña (~40MB).
- `node:20-alpine` se descarta tras el primer stage; la imagen final
  no la contiene.
- Si quieres cachear `node_modules` entre builds, cambia el orden
  para copiar primero `package.json` y `package-lock.json` antes que
  el resto (ya está así).

## Skills relacionadas

- `stack` — qué hay en `package.json` y por qué el `Dockerfile`
  copia `package*.json`.
- `routing` — `fetchWithAuth` y por qué el `credentials: "include"`
  es clave.
- `commands` — `pnpm build`, `docker build`, `docker run`.
