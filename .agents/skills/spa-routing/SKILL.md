---
name: spa-routing
description: Use when troubleshooting 404 errors on page refresh or direct URL access in production (Docker + Nginx, Render static, Netlify, S3 + CloudFront, etc.), when configuring the SPA fallback for react-router in any static-served SPA, or when writing the nginx.conf / equivalent that ships with the Docker image. Triggers on keywords "404 on refresh", "404 Not Found", "SPA fallback", "try_files", "nginx.conf", "direct URL access", "page refresh 404", "history API fallback", "react-router production".
---

# SPA routing in production

El síntoma clásico: **en dev funciona, en producción sale 404 al
refrescar la página** (o al abrir una URL como `/login`
directamente). La raíz: el servidor estático que sirve el bundle
no sabe qué hacer con rutas que no son archivos físicos.

## Por qué pasa

- **Vite dev server** intercepta todas las rutas y siempre sirve
  `index.html`. Por eso `/login` carga React y el router toma el
  control.
- **Nginx (default de `nginx:alpine`)** NO hace eso. Su config
  default en `/etc/nginx/conf.d/default.conf` es:

  ```nginx
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
  }
  ```

  Sin `try_files`. Cuando llega un request a `/login`, Nginx busca
  el archivo físico `/usr/share/nginx/html/login`, no lo encuentra
  y devuelve 404. La home `/` sí carga (encuentra `index.html`),
  pero cualquier otra ruta falla.

- Lo mismo aplica a S3 sin error document configurado, Netlify sin
  `_redirects`, GitHub Pages con el flag incorrecto, etc. **El bug
  nunca es del frontend.**

## El fix: `nginx.conf` con SPA fallback

`./nginx.conf` (en la raíz del repo) sobreescribe la config default
de Nginx dentro del Dockerfile:

```nginx
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  # SPA fallback: cualquier ruta que no sea un archivo físico
  # se sirve como index.html para que react-router tome el control.
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache largo + immutable para assets con hash en el nombre
  # (Vite emite `assets/index-abc123.js` etc.).
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|webp|avif)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }

  # index.html NUNCA se cachea: cada deploy puede cambiar su
  # contenido y queremos que el browser lo pida siempre.
  location = /index.html {
    add_header Cache-Control "no-store";
  }

  # Compresión gzip para reducir el peso de los assets
  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_types
    text/plain text/css text/xml text/javascript
    application/javascript application/x-javascript
    application/json application/xml application/xml+rss
    image/svg+xml;

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```

### El `Dockerfile` lo copia sobre el default

```dockerfile
# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`COPY nginx.conf /etc/nginx/conf.d/default.conf` sobreescribe
`/etc/nginx/conf.d/default.conf` (la config default de la imagen)
**antes** de copiar el dist. Orden importante: si copias el dist
primero y luego la config, Nginx podría cachear el árbol.

## Verificación local

```bash
pnpm build
docker build -t tracklinker-web:test --build-arg VITE_API_URL=http://localhost:8000 .
docker run --rm -d -p 8080:80 --name tracklinker-test tracklinker-web:test

# Esperar ~2s a que Nginx arranque
sleep 2

# Debe devolver 200 con el HTML de Vite (no 404)
curl -i http://localhost:8080/login
curl -i http://localhost:8080/dashboard
curl -i http://localhost:8080/users/123

# Cleanup
docker stop tracklinker-test
```

Las tres URLs anteriores deben devolver `HTTP/1.1 200 OK` y el
cuerpo de `index.html` (no un 404).

## Equivalentes en otros hosts

Si despliegas en otra plataforma, el principio es el mismo:
**"cualquier ruta desconocida → `index.html`"**.

- **Netlify**: crear `public/_redirects` con `/* /index.html 200`.
- **Vercel**: en `vercel.json`:

  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

- **S3 + CloudFront**: configurar el error document a `index.html` y
  el response code a `200` (no `404`).
- **GitHub Pages**: requiere usar HashRouter en lugar de
  BrowserRouter (limitación de Pages); no aplica aquí.

## Headers de cache — el otro bug fácil

Aún con el SPA fallback arreglado, un bundle mal cacheado puede
servir HTML viejo después de un deploy. La regla:

- **`index.html`** → `Cache-Control: no-store`. El browser lo pide
  en cada navegación. Si el HTML cambió (ruta nueva, script tag
  nuevo), el browser lo ve inmediatamente.
- **Assets con hash** (`assets/index-abc123.js`,
  `assets/index-def456.css`) → `Cache-Control: public, immutable`
  por 1 año. Como el nombre cambia en cada build, el browser pide
  el nuevo y descarta el viejo automáticamente.
- **Sin hash** (ej. `Logo.svg` en `/public`) → ten cuidado. Se
  sirve cacheado por 1 año y un cambio en el logo no se ve sin
  hacer un deploy que cambie el nombre del archivo o agregue un
  query string.

El `nginx.conf` de este repo implementa exactamente esa estrategia.

## Por qué dev nunca muestra este bug

`pnpm dev` arranca un Vite dev server que internamente hace
`historyApiFallback: true` (equivalente a `try_files ... /index.html`).
En `pnpm preview` (que sirve el `dist` estáticamente) **sí** podrías
ver el bug si abres `http://localhost:4173/login` y no le das el
flag `--host` correcto o el server no tiene fallback. **Pruebalo
con `pnpm preview` antes de culpar a Docker.**

## Checklist cuando vuelves a ver "404 on refresh"

1. ¿`nginx.conf` está en la raíz del repo y se copia en el
   Dockerfile? (`COPY nginx.conf /etc/nginx/conf.d/default.conf`).
2. ¿La build incluye el último `nginx.conf`? (borrar caché de la
   imagen si dudas: `docker build --no-cache ...`).
3. ¿El host frente a Nginx (Cloudflare, ALB, etc.) está pasando
   el `Host` header y el path completo? Si hace rewrite, podría
   romper el `try_files`.
4. ¿El build es nuevo? `docker run --rm <image> cat /etc/nginx/conf.d/default.conf`
   y verificá que la config es la que esperás.
5. ¿El `index.html` está realmente en `/usr/share/nginx/html`?
   `docker run --rm <image> ls /usr/share/nginx/html`.

## Skills relacionadas

- `docker` — `Dockerfile` multi-stage, `.dockerignore`, `VITE_API_URL`
  en build-time, Nginx.
- `env` — si la app además tira "VITE_API_URL is not defined", problema
  aparte.
- `routing` — `BrowserRouter`, `Routes`, `Navigate`, y por qué
  `/login` no es un archivo físico.
