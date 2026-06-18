# AGENTS.md

> Guía de entrada rápida para agentes y desarrolladores que tocan este
> repositorio. Resume el stack, la arquitectura, las convenciones y los
> comandos esenciales de **Tracklinker Web**.

---

## 1. ¿Qué es este proyecto?

**Tracklinker Web** es el frontend del sistema de gestión de inventario
**Tracklinker**. Es una SPA en React con un panel de control, gestión de
productos, categorías, subcategorías, proveedores, usuarios, garantías,
órdenes de salida, informes exportables (PDF/Excel) y un dashboard con
gráficos de Recharts.

- **Roles de usuario:** `Admin`, `Almacén`, `Técnico` (controlan acceso a
  rutas y acciones).
- **Backend:** API REST externa (no incluida en este repo). El frontend
  habla con ella mediante `fetch` envuelto en `fetchWithAuth` (refresh
  automático de access token con cookies httpOnly).

---

## 2. Tech stack

| Capa            | Herramienta                                            |
| --------------- | ------------------------------------------------------ |
| Build / Dev     | **Vite 7** + `@vitejs/plugin-react` + `vite-plugin-svgr` |
| Lenguaje        | **JavaScript** (ESM, `type: "module"`, JSX)            |
| UI              | **React 19**                                           |
| Routing         | **react-router-dom 7**                                 |
| Datos           | **@tanstack/react-query 5**                            |
| Estilos         | **TailwindCSS 3** + `postcss` + `autoprefixer`         |
| Iconos          | **material-symbols** (`Icon` global)                   |
| Animaciones     | **GSAP 3** + plugin `Flip` (modales)                   |
| Gráficos        | **Recharts 3**                                         |
| Reportes        | **jsPDF** + **jspdf-autotable** + **xlsx**             |
| Lint            | **ESLint 9** (flat config) + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` |
| Package manager | **pnpm 8+** (con `pnpm-workspace.yaml`)                |
| Despliegue      | **Docker** multi-stage → Nginx                         |

---

## 3. Comandos esenciales

```bash
pnpm install        # instalar dependencias
pnpm dev            # servidor de desarrollo (Vite, HMR)
pnpm build          # build de producción → ./dist
pnpm preview        # servir el build localmente
pnpm lint           # ESLint sobre todo el repo
docker build -t tracklinker-web .
docker run -p 80:80 tracklinker-web
```

Variable de entorno obligatoria: `VITE_API_URL` en `.env`
(véase `.env.example`).

---

## 4. Mapa rápido del repo

```
src/
├── App.jsx                    # BrowserRouter + AppRouter + useTheme
├── main.jsx                   # createRoot + QueryClientProvider
│
├── config/
│   └── apiRoutes.js           # endpoints de la API
│
├── router/
│   ├── AppRouter.jsx          # <Routes> raíz
│   ├── ProtectedRoutes.jsx    # guard de auth + roles
│   └── constants/routesConfig.js
│
├── utils/                     # helpers puros (sin React)
│   ├── fetchWithAuth.js       # fetch + refresh automático del token
│   ├── buildQueryParams.js
│   ├── formatLabel.js
│   ├── getDateRange.js
│   ├── getModalTrigger.js
│   ├── months.js              # meses en español (corto/largo)
│   └── colors.js              # paleta para gráficos
│
├── globals/                   # código compartido entre módulos
│   ├── components/
│   │   ├── Layout/{Layout.jsx, aside/}
│   │   ├── modals/{Modal, AddInnerModal, ConfirmCancelButtons,
│   │   │          ErrorModal, SuccessModal, FilterModal,
│   │   │          HelpModal, SelectMenu, profileModal/}
│   │   └── ui/{ActionButtons, Avatar, Calendar, CreateButton,
│   │           DateField, DateInput, DisabledFormField, FilterButton,
│   │           FormField, Icon, InputWithDataList, Loader, SearchBar,
│   │           Skeleton, TagInput, TextArea, TopSection}
│   ├── hooks/                 # useModal, useTheme, useFormValidation,
│   │                          # useCurrentUser, useFlipModal, useSearch,
│   │                          # useCities, useLogout, etc.
│   ├── services/              # servicios de auth, perfil y global
│   ├── constants/             # asideMenuItems, modalStyles, dateConstants
│   └── styles/                # main.css + global.css + partials
│
├── modules/                   # un dominio de negocio por carpeta
│   ├── login/
│   ├── home/                  # landing post-login con cards de acceso
│   ├── dashboard/             # gráficos (Recharts)
│   ├── products/              # catálogo + marcas + modelos + input orders
│   ├── categories/
│   ├── subcategories/
│   ├── suppliers/
│   ├── users/
│   ├── warranties/            # gestión de garantías
│   ├── output-orders/         # órdenes de salida
│   └── reports/               # exportables PDF/Excel
│
└── assets/
    ├── fonts/                 # Poppins (todas las variantes .ttf)
    └── icons/                 # SVGs + JS que re-exportan (asideIcons, …)
```

> **Nota:** existe `src/constants/` solo dentro de `src/globals/`
> (`asideMenuItems.js`, `dateConstants.js`, `modalStyles.js`). No hay
> `src/constants/` global. Las constantes de cada módulo viven en
> `src/modules/<modulo>/constants/`.

---

## 5. Arquitectura (regla de oro)

```
Page → Hook → Service → API
```

Cada módulo es **autocontenido** y tiene la misma forma:

```
modules/<nombre>/
├── <Nombre>Page.jsx          # componente de ruta
├── components/
│   ├── ui/                   # tablas, cards, listas
│   └── modals/               # Add/Edit/Enable/Disable/Filter/Info
├── hooks/                    # use<Entity>s, useCreate<Entity>,
│                             # useEdit<Entity>, useFilter<Entity>s, …
├── services/                 # createXService, getXService, …
└── constants/                # statusConfig y similares
```

`src/globals/` contiene **únicamente** lo que se reutiliza entre módulos.
Si estás a punto de tocar un archivo de `globals/`, pregúntate primero:
"¿esto lo usa más de un módulo?" Si la respuesta es no, pertenece al
módulo.

### Flujo típico de una mutación

```
Usuario → <Page>.jsx → useCreate<Product>.js
   → create<Product>Service.js
   → fetchWithAuth (utils/) → apiRoutes
   → backend REST
   → React Query invalida ["products"] → refetch automático
```

---

## 6. Patrones que se repiten

### 6.1 `useModal` (casi todas las páginas)

```jsx
const { modalType, isOpen, modalData, triggerRef, openModal, closeModal } =
  useModal();

// abrir con datos:
openModal(product, "edit", null, e.currentTarget);

// cerrar invalida las queries registradas al abrir:
closeModal();
```

Tipos de modal comunes: `add`, `edit`, `filter`, `info`, `enable`,
`disable`, `editStatus`, `user` (perfil), `help`, `menu` (mobile aside).

### 6.2 Formularios

- Campos: `FormField`, `DisabledFormField`, `TextArea`, `TagInput`,
  `DateField`, `DateInput`, `InputWithDataList`, `SelectMenu`.
- Validación: hook `useFormValidation({ rules })` → devuelve
  `{ validate, fieldError, clearError, getChanges }`.
- Acciones: `<ConfirmCancelButtons />`.
- Resultado: `openInnerModal("success" | "error", triggerButton)` y
  `<SuccessModal />` / `<ErrorModal />`.

### 6.3 Listados + búsqueda

- `use<Entity>s` devuelve `{ <entity>s, loading, error, filters, setFilters }`.
- `useSearch(data, search)` aplica filtro client-side por substring.
- Filtros server-side: `useFilter<Entity>s` + `FilterModal` que actualiza
  el `setFilters` del hook principal.

### 6.4 Iconos

```jsx
import Icon from ".../globals/components/ui/Icon";

<Icon name="add" size={24} fill weight={600} color="#fff" />
```

Usa **Material Symbols Rounded** (`material-symbols/rounded.css`). No
importes SVGs directamente a menos que sea un asset decorativo.

### 6.5 Tema claro/oscuro

- `useTheme()` en `App.jsx` aplica `class="dark"` a `<html>` leyendo
  `localStorage.theme` (`"light" | "dark" | "system"`).
- Tailwind ya está configurado con `darkMode: "class"`.
- Todas las clases de color deben tener su variante `dark:`.

---

## 7. Convenciones de nombres

| Elemento            | Convención                                    |
| ------------------- | --------------------------------------------- |
| Componentes         | `PascalCase.jsx` (`ProductsPage.jsx`)         |
| Hooks               | `camelCase` con prefijo `use`                 |
| Servicios           | `camelCase` con verbo + entidad               |
| Constantes          | `camelCase.js`                                |
| Estilos             | `kebab-case.css`                              |
| Carpetas de módulo  | `kebab-case` (`output-orders/`)               |

Patrones de hook:

| Patrón                     | Uso                          |
| -------------------------- | ---------------------------- |
| `use<Entity>s`             | Listado                      |
| `useCreate<Entity>`        | Creación                     |
| `useEdit<Entity>`          | Edición                      |
| `useFilter<Entity>s`       | Estado de filtros            |
| `use<DoSomething><Entity>` | Misc (useUpdateProductStatus, useDisableCategory, …) |

Patrones de service:

| Patrón              | Verbo HTTP |
| ------------------- | ---------- |
| `get<Entity>s`      | `GET`      |
| `create<Entity>`    | `POST`     |
| `update<Entity>` / `edit<Entity>` | `PUT`/`PATCH` |
| `disable<Entity>`   | `PATCH` (cambio de estado) |
| `enable<Entity>`    | `PATCH`    |

---

## 8. Rutas y roles

Definidas en `src/router/constants/routesConfig.js`. Cada ruta declara
`roles: ["Admin", …]`. `ProtectedRoutes` valida con `useCurrentUser()`.

| Ruta              | Roles                             |
| ----------------- | --------------------------------- |
| `/login`          | público                           |
| `/home`           | Admin, Almacén, Técnico           |
| `/dashboard`      | Admin                             |
| `/users`          | Admin                             |
| `/products`       | Admin, Almacén, Técnico           |
| `/categories`     | Admin, Almacén, Técnico           |
| `/subcategories`  | Admin, Almacén, Técnico           |
| `/reports`        | Admin, Almacén, Técnico           |
| `/warranties`     | Admin, Técnico                    |
| `/suppliers`      | Admin, Almacén                    |
| `/output-orders`  | Admin, Almacén, Técnico           |

El menú lateral (`src/globals/constants/asideMenuItems.js`) filtra los
items con `hasRole(item.roles)`, así que cualquier cambio de permisos
debe replicarse en **rutas + menú lateral + hooks** según corresponda.

---

## 9. Estilos y animaciones

- **`tailwind.config.js`** define fuentes (`dmsans`, `poppins`, `inter`),
  paleta de animaciones (`fade`, `blurIn`, `modalFadeIn`, `shimmer`,
  `shake`, `toastIn`, `clickEffect`, …) y `safelist` para clases
  dinámicas (`row-span-N`, `col-span-N`, `z-50/100/150`,
  `animate-modalFadeIn/Out`).
- **Animaciones de modal** (ver `useFlipModal.js`): usan GSAP `Flip`
  para hacer la transición desde el botón que abrió el modal hasta el
  modal expandido, y de vuelta. Si añades un nuevo tipo de modal, suma
  su `z_index` y `growDirection` correctos.
- **Scrollbar global** está oculta (`globals/styles/scrollbar.css`).

---

## 10. Docker y despliegue

- `Dockerfile` multi-stage: `node:20-alpine` (build) → `nginx:alpine`
  (serve). Sirve `/usr/share/nginx/html` en puerto 80.
- `.dockerignore` excluye `node_modules`, `.git`, `.env*`, `dist`, `*.md`.
- Para producción, asegúrate de inyectar `VITE_API_URL` en el build
  (por ejemplo, con `--build-arg` o variable de entorno del runner).

---

## 11. Lo que NO debes hacer

- ❌ Crear archivos en `src/globals/` que solo use un módulo.
- ❌ Usar `useState` para fetching: usa **React Query**.
- ❌ Llamar a `fetch` directo: usa **`fetchWithAuth`** (maneja refresh).
- ❌ Hardcodear endpoints: usar **`apiRoutes`** (`src/config/apiRoutes.js`).
- ❌ Importar SVGs uno por uno en componentes: agrúpalos en
  `src/assets/icons/<area>Icons.js` y reexpórtalos como objeto.
- ❌ Olvidar la variante `dark:` en una clase de color nueva.
- ❌ Añadir comentarios al código (regla del repo).
- ❌ `git commit` sin que el usuario lo pida explícitamente.

---

## 12. Recursos adicionales en este repo

- `README.md` → versión extensa de esta guía (orientada a humanos).
- `.agents/skills/` → cada skill vive en su propia carpeta con su
  propio `SKILL.md`. Empieza por `index` (mapa de skills) y entra en
  la que toque: `architecture`, `stack`, `routing`, `ui`, `modals`,
  `modules`, `conventions`, `assets`, `docker`, `commands`, `prs`.
