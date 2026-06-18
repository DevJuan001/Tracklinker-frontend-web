# Globals y primitivos de UI

Todo lo que está aquí es **compartido entre módulos**. Antes de añadir
algo a `src/globals/`, confirma que lo vas a usar en más de un módulo.

## Layout

`src/globals/components/Layout/`

### `Layout.jsx`

Wrapper raíz de cada página. Une `Aside` + `<main>` con grid responsive:

- Móvil: una columna, `<aside>` abajo, `<main>` arriba.
- `md`: grid 2 cols (`110px 1fr`).
- `xl`: grid 2 cols (`260px 1fr`).

```jsx
<Layout avatarOnClick={…} helpOnClick={…}>
  {children}
</Layout>
```

### `aside/Aside.jsx`

Renderiza `DesktopNav` + `MobileNav`. Lee `useCurrentUser()` para tener
`user` y `hasRole`.

### `aside/DesktopNav.jsx`

- Renderiza `AvatarButton` con el nombre del usuario.
- Lista `firstSectionItems` filtrado por `hasRole(item.roles)`.
- Renderiza `secondSectionItems` (Ayuda, Cerrar Sesión) abajo.

### `aside/MobileNav.jsx`

- Lista `mobileRelevantItems` (los más importantes) en una barra
  inferior flotante.
- Botón "more" que abre `MobileMenuModal` con `useInnerModal("menu")`.

### `aside/MobileMenuModal.jsx`

Modal con el resto de items (`mobileItems`).

### `aside/NavItem.jsx`

`NavLink` con `({ isActive }) => …`. Cuando está activo aplica estilos
negros/blancos según el tema, animación `animate-clickEffect` y
`fill` al icono.

### `aside/AvatarButton.jsx`

Botón que abre el modal de perfil (modal type `"user"`).

## Primitivos de UI (`globals/components/ui/`)

| Componente | Props clave | Notas |
| --- | --- | --- |
| `Icon` | `name, fill, weight, size, color, className` | Renderiza `<span class="material-symbols-rounded">`. El peso y el fill se controlan por `fontVariationSettings`. |
| `Avatar` | `user, size` | Iniciales del usuario con `useAvatar(user)`. |
| `Calendar` | `value, onChange, onClose, triggerRef, growDirection` | Modal de calendario; usa `useCalendar`. |
| `CreateButton` | `icon, text, onClick, createButtonVisibility` | Botón primario usado en `TopSection`. |
| `DateField` | `spanText, value, onChange, name, growDirection, className` | Botón que abre un `Calendar` con `useInnerModal("calendar")`. |
| `DateInput` | `spanText, id, name, onChange` | `<input type="date">` simple, sin modal. |
| `DisabledFormField` | `labelText, value, inputIcon, ...` | Input con `disabled` + icono decorativo. |
| `FilterButton` | `onClick, filterButtonVisibility` | Botón secundario que abre `FilterModal`. |
| `FormField` | `value, labelText, onChange, name, type, placeholder, id, children, className` | Input con label flotante. Acepta `children` para iconos/botones a la derecha. |
| `InputWithDataList` | `spanText, id, name, onChange, options` | Input con `<datalist>` para autocompletar. |
| `Loader` | `invert` | Spinner basado en `animate-rotation` (de `tailwind.config.js`). |
| `SearchBar` | `value, onChange` | Input con icono de búsqueda. |
| `Skeleton` | `count, height, width, backgroundColor, darkModeBackgroundColor, shineColor, darkModeShineColor, borderRadius, marginBottom` | Placeholder shimmer. |
| `TagInput` | `value, labelText, name, onChange, maxTags, allowDuplicates, ...` | Input de tags con coma/Enter/paste y `shake` al duplicado/exceder. |
| `TextArea` | `value, labelText, name, onChange, id, children, className` | Mismo estilo que `FormField` pero multilínea. |
| `TopSection` | `sectionName, addButtonText, addButtonIcon, createOnClick, filterOnClick, filterButton, createButtonVisibility, children` | Encabezado de página (título + `FilterButton` + `CreateButton` + children). |
| `ActionButtons` | `editButtonOnClick, deleteButtonOnClick, moreInfoButtonOnClick, ...` | Conjunto de botones (more-info, edit, visibility) usado en tablas/listas. |

> **Convención:** `Icon` **no** es para SVGs. SVGs decorativos
> importados como `asideIcons`, `loginIcons`, etc. se renderizan con
> `<img src={asideIcons.x} />`.

## Hooks globales (`globals/hooks/`)

| Hook | Propósito |
| --- | --- |
| `useAvatar(user)` | Genera iniciales a partir de `user.name`/`user.first_surname` o de un string. |
| `useCalendar(value, onChange, onClose)` | Lógica de navegación de mes y selección de día. |
| `useCities()` | `useQuery(["cities"], getCitiesService)` con `staleTime: 5min`. |
| `useCurrentUser()` | `useQuery(["currentUser"], getCurrentUserService)` + `hasRole`. |
| `useFlipModal({…})` | Animación GSAP Flip de apertura/cierre del modal. **Usado por `Modal.jsx`.** |
| `useFormValidation({ rules, optionalFields })` | `{ validate, getChanges, clearError, clearErrors, fieldError, errors }`. |
| `useInnerModal()` | Estado de modal anidado (`{ type, trigger }`). Una sola instancia por componente (p. ej. `ProfileModal` o `Login`). |
| `useLogout()` | `logoutService` + `queryClient.clear()` + `navigate("/login")`. |
| `useModal()` | Estado de modal principal por página (ver `architecture.md`). |
| `useSearch(data, search)` | Filtro client-side por substring sobre `Object.values(item)`. |
| `useSelectMenu()` | Estado de `SelectMenu` (open, search, triggerRef, handleSelect, …). |
| `useSendSuggestion()` | Form + submit para `sendSuggestionService`. Devuelve `{ form, loading, handleChange, handleSubmit }`. |
| `useTagInput({ name, value, onChange, allowDuplicates, maxTags })` | Lógica de tags: `tags`, `input`, `addTag`, `removeTag`, `handleKeyDown`, `handlePaste`, `handleBlur`, `focusInput`, `shake`. |
| `useTheme()` | Lee/escribe `localStorage.theme` y aplica `class="dark"` a `<html>`. |
| `useUpdateCurrentUserInfo(user)` | Form + `updateCurrentUserInfoService` + `invalidate(["currentUser"])` + `openInnerModal(success/error)`. |
| `useUpdateCurrentUserPassword()` | Form de cambio de contraseña con toggle de visibilidad y comparación `passwordsMatch`. |

## Servicios globales (`globals/services/`)

| Servicio | Método | Endpoint |
| --- | --- | --- |
| `getCitiesService` | GET | `${users}/cities` |
| `getCurrentUserService` | GET | `${users}/me` |
| `logoutService` | POST | `${auth}/logout` |
| `sendSuggestionService` | POST | `/suggestions/send` |
| `updateCurrentUserInfoService` | PUT | `${users}/update/me` |
| `updateCurrentUserPasswordService` | PUT | `${users}/update-password` |

Todos usan `fetchWithAuth` y `apiRoutes`.

## Constantes globales (`globals/constants/`)

- `asideMenuItems.js` → `avatarItem`, `firstSectionItems`,
  `secondSectionItems`, `mobileRelevantItems`, `mobileItems`. Cada
  item tiene `itemId`, `name`, `path?`, `icon` (string de Material
  Symbols o SVG), `roles?`.
- `dateConstants.js` → `monthNames` (corto en español).
- `modalStyles.js` → `modal_styles` con clases Tailwind por `type` de
  modal:

```js
export const modal_styles = {
  user:       "p-7 w-full h-screen md:w-[650px] md:h-[550px]",
  help:       "h-max p-7 w-[380px] md:w-[600px]",
  filter:     "p-7 w-[365px] sm:w-[400px]",
  select:     "p-1 w-[350px] md:w-[400px]",
  calendar:   "w-[365px] md:w-[400px]",
  menu:       "p-1 w-24",
  editStatus: "p-1.5 w-72 sm:w-80",
  default:    "p-7 w-[400px] md:w-[500px]",
};
```

## Estilos globales (`globals/styles/`)

```
main.css                 # @tailwind base/components/utilities
global.css               # importa main + Google Fonts + partials
autofill.css             # fix de -webkit-autofill (light + dark)
background-charts-icons.css  # fondos SVG de los cards del dashboard
input.css                # file selector button
loader.css               # animación rotation (también en tailwind.config.js)
scrollbar.css            # ::-webkit-scrollbar { display: none }
select.css               # select { border-radius: 5px }
tables.css               # table th usa DM Sans
```

`global.css` es el entry point. Importa explícitamente los partials y
Google Fonts (Poppins, DM Sans, Inter). En `main.jsx` solo se importa
`global.css`.

## Cómo agregar un primitivo nuevo

1. Si es un campo de formulario: probablemente **no** va en `globals/`.
   Pónlo en el módulo y, si después lo usan otros, lo promueves.
2. Si es reutilizable, créalo en `globals/components/ui/`.
3. Si necesita estado compartido, crea el hook en `globals/hooks/`.
4. Si necesitas una clase de estilo nueva con variantes
   `dark:`, recuerda añadir las clases de safelist en
   `tailwind.config.js` si son dinámicas.
