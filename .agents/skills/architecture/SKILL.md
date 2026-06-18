---
name: architecture
description: Use when reasoning about Tracklinker Web's overall shape, the Page → Hook → Service → API flow, the split between src/globals/ (reusable) and src/modules/ (one per business domain), the React Query mutation pattern (validate → service → invalidate → innerModal), or when adding a new module/hook/service/constant. Triggered by keywords like "architecture", "module structure", "where to put X", "create a new module", "page hook service".
---

# Architecture

## Regla de oro

```
Page → Hook → Service → API
```

Cada página (`<Modulo>Page.jsx`) compone:

- Hooks de datos (`use<Entity>s`, `useCreate<Entity>`, etc.) que
  orquestan React Query.
- Hooks globales (`useModal`, `useCurrentUser`, `useTheme`,
  `useFlipModal`, `useFormValidation`, `useSearch`, …).
- Componentes globales (de `src/globals/components/`) y locales (de
  `src/modules/<m>/components/`).
- Modales (de `src/globals/components/modals/` y de
  `src/modules/<m>/components/modals/`).

Los hooks de mutación (`useCreateX`, `useEditX`, `useUpdateStatusX`,
`useDisableX`, `useEnableX`) son **el** sitio donde se hace:

1. `validate(form)` con `useFormValidation`.
2. `getChanges(original, form)` para detectar diferencias
   (solo en `useEdit`).
3. Llamada al service.
4. `queryClient.invalidateQueries({ queryKey: ["entity"] })` para que la
   tabla se refetchee automáticamente.
5. `openInnerModal("success" | "error", triggerButton)` para abrir el
   modal anidado de feedback (con `getModalTrigger(e)` para tomar el
   botón que disparó la acción).

## Organización `globals/` vs `modules/`

```
src/
├── globals/    # SOLO lo que se reutiliza entre módulos
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── constants/
│   └── styles/
└── modules/    # UN dominio de negocio por carpeta
    └── <m>/
        ├── <M>Page.jsx
        ├── components/{ui, modals}/
        ├── hooks/
        ├── services/
        └── constants/    # statusConfig y similares
```

**Test antes de tocar `globals/`:** ¿esto lo usa más de un módulo? Si la
respuesta es no, pertenece al módulo.

## Patrones transversales

### `useModal` (casi todas las páginas)

```jsx
const { modalType, isOpen, modalData, triggerRef, openModal, closeModal } =
  useModal();

openModal(product, "edit", null, e.currentTarget);
closeModal();
```

Tipos comunes: `add`, `edit`, `filter`, `info`, `enable`, `disable`,
`editStatus`, `user` (perfil), `help`, `menu` (mobile aside),
`innerModal` (modal anidado). El sistema de modales vive en
`globals/components/modals/`.

### Formularios

- Campos: `FormField`, `DisabledFormField`, `TextArea`, `TagInput`,
  `DateField`, `DateInput`, `InputWithDataList`, `SelectMenu`.
- Validación: `useFormValidation({ rules, optionalFields })` →
  `{ validate, fieldError, clearError, clearErrors, getChanges, errors }`.
- Botones: `<ConfirmCancelButtons />`.
- Resultado: `openInnerModal("success" | "error", triggerButton)` y
  `<SuccessModal />` / `<ErrorModal />`.

### Listados + búsqueda

- `use<Entity>s` devuelve `{ <entity>s, loading, error, filters,
  setFilters }` (React Query + `staleTime`/`refetchInterval`).
- `useSearch(data, search)` aplica filtro client-side por substring
  sobre todos los valores del objeto.
- Filtros server-side: `useFilter<Entity>s` + `FilterModal` que
  actualiza el `setFilters` del hook principal (los filtros se mandan
  como query string con `buildQueryParams`).

### Iconos

- Iconografía UI: `<Icon name="add" />` con Material Symbols Rounded
  (ver skill `ui`).
- Iconografía decorativa/asset: `src/assets/icons/<area>Icons.js`
  reexporta SVGs como objeto (`asideIcons`, `loginIcons`, …).

### Tema

- `useTheme()` en `App.jsx` aplica `class="dark"` a `<html>` leyendo
  `localStorage.theme` (`"light" | "dark" | "system"`).
- Tailwind ya está configurado con `darkMode: "class"`.
- Todas las clases de color deben tener su variante `dark:`.

## Cómo se monta todo

`src/main.jsx`:

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./globals/styles/global.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

`src/App.jsx`:

```jsx
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useTheme } from "./globals/hooks/useTheme";

function App() {
  useTheme();
  return (
    <div className="w-screen h-screen dark:bg-[#0a0a0a]">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <div id="modal-root"></div>
    </div>
  );
}
```

Hay **dos** nodos en el HTML: `#root` (la app) y `#modal-root` (portal
para los modales). El contenedor `#modal-root` se declara tanto en
`index.html` como dentro de `App.jsx` (este último es el que usa
`Modal.jsx`).

## Flujo típico de una mutación (crear/editar)

```
Usuario → <Page>.jsx → useCreate<Product>.js
   → create<Product>Service.js
   → fetchWithAuth (utils/) → apiRoutes
   → backend REST
   → React Query invalida ["products"] → refetch automático
```

Y en pseudo-código:

```js
// useCreateProduct.js
async function handleSubmit(e, openInnerModal) {
  e.preventDefault();
  const triggerButton = getModalTrigger(e);
  if (!validate(form)) return;
  try {
    const response = await createProductService(form);
    if (response.success) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      openInnerModal("success", triggerButton);
    } else {
      openInnerModal("error", triggerButton);
    }
  } catch {
    openInnerModal("error", triggerButton);
  }
}
```

## Skills relacionadas

- `modules` — qué hay en cada `src/modules/<x>/`.
- `routing` — cómo se enrutan y protegen las
  páginas.
- `modals` — sistema de modales y `useFlipModal`.
- `conventions` — naming y reglas duras.
