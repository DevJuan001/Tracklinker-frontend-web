---
name: routing
description: Use when editing AppRouter, ProtectedRoutes, routesConfig, useCurrentUser, fetchWithAuth, loginService, useLogout, or anything tied to the access-token refresh flow, role-based route guards, or hasRole checks. Also when changing the role set of a route, adding/removing a route, or propagating roles across the route table, aside menu, home cards and report cards. Triggered by keywords "router", "route", "login", "logout", "refresh token", "401", "hasRole", "guard", "protected".
---

# Routing y autenticación

## Archivos clave

```
src/router/
├── AppRouter.jsx
├── ProtectedRoutes.jsx
└── constants/
    └── routesConfig.js

src/utils/
└── fetchWithAuth.js
```

## `routesConfig.js`

Define la ruta, el componente y los roles permitidos. El router lo
consume tal cual para generar `<Route>` automáticamente.

```js
import HomePage from "../../modules/home/HomePage";
import DashBoardPage from "../../modules/dashboard/DashboardPage";
// ...etc

export const routesConfig = [
  { path: "/home",          component: HomePage,           roles: ["Admin", "Almacén", "Técnico"] },
  { path: "/dashboard",     component: DashBoardPage,      roles: ["Admin"] },
  { path: "/users",         component: UsersPage,          roles: ["Admin"] },
  { path: "/products",      component: ProductsPage,       roles: ["Admin", "Almacén", "Técnico"] },
  { path: "/categories",    component: CategoriesPage,     roles: ["Admin", "Almacén", "Técnico"] },
  { path: "/subcategories", component: SubcategoriesPage,  roles: ["Admin", "Almacén", "Técnico"] },
  { path: "/reports",       component: ReportsPage,        roles: ["Admin", "Almacén", "Técnico"] },
  { path: "/warranties",    component: WarrantiesPage,     roles: ["Admin", "Técnico"] },
  { path: "/suppliers",     component: SuppliersPage,      roles: ["Admin", "Almacén"] },
  { path: "/output-orders", component: OutputOrdersPage,   roles: ["Admin", "Almacén", "Técnico"] },
];
```

> **Importante:** si añades una ruta, replica sus roles en
> `globals/constants/asideMenuItems.js` (`firstSectionItems`,
> `mobileItems`) y en `modules/home/constants/homeSections.js`.

## `AppRouter.jsx`

```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../modules/login/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import { routesConfig } from "./constants/routesConfig";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {routesConfig.map(({ path, component: Component, roles }) => (
        <Route key={path} element={<ProtectedRoutes roles={roles} />}>
          <Route path={path} element={<Component />} />
        </Route>
      ))}
    </Routes>
  );
}
```

`path="*"` redirige todo lo no matcheado a `/login`. La home
`/home` está protegida igual que el resto.

## `ProtectedRoutes.jsx`

```jsx
import { useCurrentUser } from "../globals/hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ roles }) {
  const { hasRole, loading, error } = useCurrentUser();
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#FBF9FC] dark:bg-black">
        <span className="w-8 h-8 rounded-full border-2 border-black border-b-transparent animate-rotation dark:border-white dark:border-b-transparent" />
      </div>
    );
  }
  if (error || !hasRole(roles)) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}
```

Reglas:

- Mientras carga el usuario actual muestra un spinner theme-aware
  (no un flash de pantalla en blanco, que en redes móviles lentas
  se nota).
- Si falla la carga o el rol del usuario no está en la lista, manda a
  `/login` con `replace`.
- Si pasa, renderiza `<Outlet />` con la ruta hija.
- Si `useCurrentUser` falla porque no hay sesión (cookie de refresh
  no se envió, ver skill `auth`), redirige a `/login` — es el camino
  feliz cuando el usuario abre la app por primera vez en un dispositivo
  nuevo.

## `useCurrentUser` (`globals/hooks/useCurrentUser.js`)

```js
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserService } from "../services/getCurrentUserService";

export function useCurrentUser() {
  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserService,
    staleTime: 1000 * 60 * 60,
  });
  const userData = currentUser.data?.data?.[0] || null;
  function hasRole(roles) {
    if (!userData?.role) return false;
    const allowed = Array.isArray(roles) ? roles : [roles];
    return allowed.includes(userData.role);
  }
  return { user: userData, hasRole, loading: currentUser.isLoading, error: currentUser.error };
}
```

- `queryKey: ["currentUser"]` se invalida en `useUpdateCurrentUserInfo`
  tras un `PUT` exitoso.
- `staleTime: 1h` evita pedir el usuario en cada navegación.
- `hasRole` es la **única** forma de consultar roles. Cualquier filtro
  de UI (aside, home, modales) lo usa.

## `fetchWithAuth.js` (utils/)

```js
let isRefreshing = false;
let refreshPromise = null;

export async function fetchWithAuth(url, options = {}) {
  let response = await fetch(url, { ...options, credentials: "include" });

  if (response.status === 401) {
    if (isRefreshing) {
      try { await refreshPromise; }
      catch { window.location.href = "/login"; return; }
    } else {
      isRefreshing = true;
      refreshPromise = fetch(
        `${apiRoutes.apiUrl}${apiRoutes.auth}/refresh`,
        { method: "POST", credentials: "include" },
      ).then((res) => {
        isRefreshing = false;
        if (!res.ok) { refreshPromise = null; window.location.href = "/login"; throw new Error("Refresh token expirado"); }
        refreshPromise = null;
        return res;
      }).catch((err) => { isRefreshing = false; refreshPromise = null; throw err; });
      try { await refreshPromise; }
      catch { return; }
    }
    response = await fetch(url, { ...options, credentials: "include" });
  }
  return response;
}
```

Detalles importantes:

- `credentials: "include"` en cada fetch (el backend mete el access
  token en cookies httpOnly).
- Si el `401` llega, intenta un único `POST /auth/refresh`.
- **Coalescing de refreshes concurrentes**: si hay 5 fetches en vuelo
  y todos reciben `401`, solo uno hace refresh; los demás esperan a la
  misma promesa.
- Si el refresh falla, redirige a `/login` con `window.location.href`.
- Después del refresh, **reintenta la request original** una sola vez.

> **Excepción — login:** `loginService.js` usa `fetch` directo (no
> `fetchWithAuth`) porque no hay sesión previa. Usa
> `credentials: "include"` igualmente para que el backend setee las
> cookies.

## Logout (`globals/hooks/useLogout.js`)

```js
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // ...
  async function logout() {
    setLoading(true);
    try {
      const response = await logoutService();
      queryClient.clear();    // limpia TODA la caché de React Query
      if (response.success === true) navigate("/login");
    } catch (error) { setError(error); }
    finally { setLoading(false); }
  }
  return { loading, error, logout };
}
```

`queryClient.clear()` es clave: evita que datos sensibles de un usuario
anterior se filtren a la siguiente sesión.

## Login (`modules/login/`)

- `Login.jsx` (página).
- `components/ui/LoginForm.jsx` y `FormButtons.jsx`.
- `components/modals/ErrorModal.jsx`, `RecoverPasswordModal.jsx`,
  `EmailSentModal.jsx`.
- `hooks/useLogin.js`: maneja el form, llama a `loginService(form)` y
  a `useLogout().logout()` (para garantizar un estado limpio antes de
  reintentar), y abre el modal de error si falla.
- `hooks/useRecoverPassword.js`: dispara `recoverPasswordService` y
  abre `EmailSentModal` con `setInnerModal("sentEmail")`.
- `services/loginService.js`: `POST /auth/login` con `fetch` directo.
- `services/recoverPasswordService.js`.

`useLogin` está dentro del módulo, pero reutiliza hooks globales
(`useLogout`, `useFormValidation`).

## Skills relacionadas

- `auth` — el flujo de cookies, el refresh coalescing, el bug típico
  de "no encuentra el refresh token" en mobile, y los atributos que
  el backend tiene que poner en `Set-Cookie`.
- `architecture` — flujo general Page → Hook → Service → API.
- `modals` — el `HelpModal` y `ProfileModal` que aparecen desde el
  Layout usan el mismo sistema.
- `conventions` — cómo propagar roles al añadir una ruta.
