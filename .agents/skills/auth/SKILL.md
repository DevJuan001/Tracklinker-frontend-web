---
name: auth
description: Use when troubleshooting login, token refresh, or session problems (especially "no refresh token", 401 after login, or being logged out on mobile). Use when configuring cookie attributes on the backend, when implementing a new auth-related feature, when the user can't stay logged in across refreshes, or when the app fails to authenticate on iOS Safari / Android Chrome. Triggers on keywords "login", "logout", "token", "refresh", "401", "session", "cookie", "SameSite", "httpOnly", "credentials include", "auth", "stay logged in", "logged out", "phone", "mobile".
---

# Authentication

## Flow overview

El backend maneja la auth con **dos cookies httpOnly** (no las puede
leer JS, es XSS-safe). El frontend nunca toca el token directamente.

1. `POST /auth/login` (en
   `src/modules/login/services/loginService.js`) usa `fetch` directo
   con `credentials: "include"`. **No** usa `fetchWithAuth` porque
   todavía no hay access token. El backend valida las credenciales y
   responde con dos `Set-Cookie`:
   - **`access_token`** — bearer de vida corta.
   - **`refresh_token`** — vida larga, sirve para pedir nuevos
     access tokens.
2. Las llamadas siguientes pasan por `fetchWithAuth`
   (`src/utils/fetchWithAuth.js`, ver skill `routing`) que:
   - Adjunta las cookies con `credentials: "include"`.
   - Ante `401`, llama **una vez** a `POST /auth/refresh`. Si el
     navegador envía el `refresh_token`, el backend emite un nuevo
     `access_token` y la request original se reintenta.
   - Si el refresh falla, redirige a `/login` con
     `window.location.href` y limpia el caché de React Query
     (`queryClient.clear()` en logout).

Ambas cookies deben ser **`HttpOnly`** (para que JS no las lea) y el
access token debe llegar al backend o por cookie o por header
`Authorization` — JS no debe gestionarlo.

## `fetchWithAuth`

```js
export async function fetchWithAuth(url, options = {}) {
  let response = await fetch(url, { ...options, credentials: "include" });
  if (response.status === 401) {
    if (isRefreshing) await refreshPromise;
    else {
      isRefreshing = true;
      refreshPromise = fetch(`${apiRoutes.apiUrl}${apiRoutes.auth}/refresh`, {
        method: "POST",
        credentials: "include",
      }).then((res) => {
        isRefreshing = false;
        if (!res.ok) { refreshPromise = null; window.location.href = "/login"; throw new Error(...); }
        refreshPromise = null;
        return res;
      }).catch((err) => { isRefreshing = false; refreshPromise = null; throw err; });
      await refreshPromise;
    }
    response = await fetch(url, { ...options, credentials: "include" });
  }
  return response;
}
```

Puntos importantes:

- **`credentials: "include"`** en cada request. Sin esto, el
  navegador no envía cookies en requests cross-origin.
- **Coalescing del refresh**: si hay N fetches en vuelo y todos
  reciben `401`, solo uno ejecuta el refresh; los demás esperan
  a la misma promesa.
- **Un solo retry** de la request original tras un refresh
  exitoso.
- **Hard redirect** a `/login` si el refresh falla (un redirect
  in-app con `react-router` no garantiza que el navegador
  reenvíe correctamente las cookies cross-origin).

## El bug clásico: "no encuentra el refresh token" en el teléfono

Síntoma: en dev funciona, en desktop funciona, en el teléfono
(sobre todo iOS Safari) sale un error tipo *"refresh token not
found"*. **El bug está en los atributos de la cookie en el
backend, no en el frontend.**

### El fix es en el backend

La cookie de `refresh_token` debe salir con:

```
Set-Cookie: refresh_token=...;
  HttpOnly;
  Secure;
  SameSite=None;
  Path=/;
  Max-Age=...;
```

- **`SameSite=None`** es obligatorio para que el cookie se envíe
  en la request cross-origin `POST /auth/refresh` desde el
  frontend desplegado (que vive en un origen distinto al API).
- **`Secure`** lo exigen los navegadores cuando `SameSite=None`.
  Implica que el backend **debe** servirse por HTTPS en
  producción.
- **`HttpOnly`** mantiene el cookie fuera del alcance de JS (XSS
  no puede robarlo).
- **`Path=/`** es el default pero sé explícito.
- **`Domain`** déjala vacía o igual al host del API. Un cookie
  con `Domain=api.example.com` no se va a enviar a una request
  desde `app.example.com` si la config del `Domain` está mal.

Si el backend deja el default `SameSite=Lax` (o peor
`SameSite=Strict`), los navegadores móviles **silenciosamente**
descartan la cookie en la request cross-origin del refresh.

### Peculiaridades de navegadores

- **iOS Safari** bloquea third-party cookies por default
  (Settings → Safari → Prevent Cross-Site Tracking). Si el
  frontend y el backend comparten eTLD+1 (ej. `app.tracklinker.com`
  y `api.tracklinker.com` son el mismo eTLD+1, ok), no hay
  problema. Si no (ej. `tracklinker.com` y `auth.otherapp.com`),
  la cookie cuenta como third-party y se bloquea.
- **Android Chrome** es más permisivo pero aplica la misma
  lógica cuando falta `SameSite=None`.
- **Webviews nativas** (Capacitor, Cordova, etc.) bloquean
  cookies por default; hay que tocar el `CookieManager` del lado
  nativo.

### Cómo verificar

1. Abrí la app desplegada en Chrome desktop.
2. DevTools → Application → Cookies → el origen del API.
3. Buscá la cookie de refresh. Inspeccioná sus atributos:
   - `SameSite` debe decir `None`.
   - `Secure` tildado.
   - `HttpOnly` tildado.
4. Repetí en el teléfono (Chrome DevTools remote debugging o
   Safari Web Inspector). La cookie tiene que estar presente
   después del login con los mismos atributos.

Si la cookie no aparece o dice `Lax`, el problema es de
**backend**, no de frontend. El frontend no puede arreglar un
`Set-Cookie` que ya salió mal del servidor.

## Mejoras de UX que SÍ podemos hacer en frontend

### `ProtectedRoutes` con loader (en vez de `null` en blanco)

`src/router/ProtectedRoutes.jsx` retorna `null` mientras
`useCurrentUser` está cargando. En redes móviles lentas eso se ve
como un flash de pantalla en blanco antes del redirect. Reemplazar
`null` por un spinner theme-aware:

```jsx
if (loading) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#FBF9FC] dark:bg-black">
      <span className="w-8 h-8 rounded-full border-2 border-black border-b-transparent animate-rotation dark:border-white dark:border-b-transparent" />
    </div>
  );
}
```

Usa el mismo `animate-rotation` (definido en `tailwind.config.js`)
que el componente global `Loader`, pero con colores theme-aware
porque el `Loader` global está pensado para fondos oscuros/coloridos.

### Log diagnóstico en `fetchWithAuth`

Cuando el refresh falla, el catch debería loguear qué pasó
(`401`, `403`, `5xx`, error de red) y dar el hint accionable
para que el siguiente error sea diagnosticable desde la consola
del browser.

## Probando la auth localmente

```bash
pnpm dev
# Abrir http://localhost:5173/login, loguearse.
# DevTools → Application → Cookies → http://localhost:8000.
# Buscar refresh_token (httpOnly) y access_token.
# Hard-refresh la página: tenés que seguir logueado.
# Esperá lo que dure el access_token TTL: el silent refresh
# debería mantenerte en la página.
```

- Si hard-refresh te desloguea **en dev**, el problema está en
  `fetchWithAuth` o en la config de cookies del backend en dev.
- Si hard-refresh funciona en dev pero no en el teléfono, el
  problema son los atributos de la cookie (SameSite, Secure,
  Domain, third-party).

## Skills relacionadas

- `routing` — `useCurrentUser`, `hasRole`, `ProtectedRoutes`,
  `fetchWithAuth`, login/logout.
- `modals` — el `ProfileModal` consume `useUpdateCurrentUserInfo`
  (que invalida `["currentUser"]`).
- `env` — `VITE_API_URL` define la URL del backend para el refresh.
- `spa-routing` — si además ves 404 al refrescar, problema aparte.
