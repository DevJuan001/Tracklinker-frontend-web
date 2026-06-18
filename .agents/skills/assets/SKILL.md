---
name: assets
description: Use when touching src/assets/icons/* (asideIcons, loginIcons, modalIcons, productsIcons, usersIcons, warrantiesIcons, dashboardIcons, headerIcons, actionsIcons), src/assets/fonts/* (Poppins), globals/styles/*, or tailwind.config.js (animations + safelist). Also when adding a new color that needs a dark: variant and possibly a safelist entry, or when touching useTheme / AppearanceContent for the light/dark/system switch. Triggered by keywords "icons", "fonts", "Poppins", "Tailwind safelist", "dark mode", "useTheme", "tailwind.config.js", "animation", "background-charts-icons".
---

# Assets y estilos

## `src/assets/`

```
assets/
├── fonts/                 # Poppins (todas las variantes .ttf, 18 archivos)
└── icons/                 # SVGs + JS que reexportan
    ├── Logo.svg
    ├── tracklinker-logo-pdf.png
    ├── actionsIcons.js
    ├── asideIcons.js
    ├── dashboardIcons.js
    ├── headerIcons.js
    ├── loginIcons.js
    ├── modalIcons.js
    ├── productsIcons.js
    ├── usersIcons.js
    ├── warrantiesIcons.js
    ├── aside/             # SVGs del aside
    ├── header/            # SVGs del header
    ├── login/             # SVGs del login (logo + iconos)
    ├── main/              # SVGs agrupados por dominio
    │   ├── actions/
    │   ├── dashboard/
    │   ├── products/
    │   ├── users/
    │   └── warranties/
    └── modal/             # SVGs de modales + pdf-image.jpg
```

### Convención de los `*Icons.js`

Cada `*Icons.js` reexporta un objeto con los SVGs del área:

```js
// src/assets/icons/asideIcons.js
import homeIcon from "./aside/home-icon.svg?react";
// …

export const asideIcons = {
  homeIcon,
  // …
};
```

- Algunos SVGs se importan como `?react` (componente) gracias a
  `vite-plugin-svgr`; otros como string URL para usarlos con `<img>`.
- **No importes SVGs directamente** en componentes. Agrégalos al
  objeto correspondiente y reexpórtalos.

Resumen de los grupos:

| Archivo | Contenido | Uso típico |
| --- | --- | --- |
| `actionsIcons.js` | iconos de acciones (more-info, edit, delete, filter, upload, add, visibility, lock, arrow-back, export, send, calendar, arrow-back-calendar, arrow-forward-calendar) | tablas y botones globales |
| `asideIcons.js` | iconos del menú lateral (incluye `avatarIcon` y los `home/users/dashboard/categories/...` SVG) | `asideMenuItems.js` y `AvatarButton` |
| `dashboardIcons.js` | arrow-up, arrow-down, purple/light-purple/gray circles | cards del dashboard |
| `headerIcons.js` | bell, menubar, search | (potencial uso en header) |
| `loginIcons.js` | tracklinker, user, show/hide password, email | `LoginForm` |
| `modalIcons.js` | close, check, error, github, redirect, settings, men, white/black circle, language, email-sent, arrow-up | modales de profileModal |
| `productsIcons.js` | clock, payment-card, change-status, add-product, barcode, barcode-reader | módulo products |
| `usersIcons.js` | role, city, phone, address, add-user, active/inactive circle | módulo users |
| `warrantiesIcons.js` | edit, complete, inprocess, incomplete, add-warranty | módulo warranties |

### `Logo.svg`

Es el logo global. Se referencia en:

- `index.html` (`<link rel="icon" type="image/svg+xml" href="/Logo.svg" />`).
- `public/Logo.svg` (servido por Vite/Nginx desde la raíz).
- `src/assets/icons/Logo.svg` (copia local que se puede importar).

## `src/assets/fonts/`

- 18 variantes de Poppins (Black, Bold, ExtraBold, ExtraLight, Italic,
  Light, Medium, Regular, SemiBold, Thin) más sus cursivas.
- Las fuentes también se cargan vía Google Fonts en
  `globals/styles/global.css` (`@import url("...Poppins:ital,wght...")`).
- En `tailwind.config.js` se declaran `fontFamily.dmsans`, `poppins` e
  `inter`. La fuente por defecto del body es `Poppins` (definida en
  `globals.css`).

## `src/globals/styles/`

| Archivo | Contenido |
| --- | --- |
| `main.css` | solo `@tailwind base; @tailwind components; @tailwind utilities;` |
| `global.css` | importa `main.css` + Google Fonts + todos los partials + reset CSS (`* { box-sizing; padding: 0; }`, `html { scroll-behavior: smooth; }`, `body { margin: 0; font-family: "Poppins"; … }`) |
| `autofill.css` | fix para `-webkit-autofill` en light y dark |
| `background-charts-icons.css` | clases `users-background`, `products-background`, `output-orders-background`, `categories-background`, `growth-background` (cada una con su variante `.dark`) — fondos SVG para los cards del dashboard |
| `input.css` | estilos del file selector button (`input[type="file"]::file-selector-button`) |
| `loader.css` | define `.loader` y `@keyframes rotation` (también duplicado en `tailwind.config.js`) |
| `scrollbar.css` | `::-webkit-scrollbar { display: none; }` (scrollbar global oculta) |
| `select.css` | `select { border-radius: 5px; }` |
| `tables.css` | `table th { font-family: "DM Sans"; line-height: 20px; }` |

> Si añades un partial nuevo, no olvides importarlo en
> `globals/styles/global.css`.

## Animaciones definidas

Todas viven en `tailwind.config.js` (sección `keyframes` + `animation`):

| Animación | Uso |
| --- | --- |
| `animate-fade` | desvanecido genérico. |
| `animate-blurIn` | aparición con blur → nítido. |
| `animate-blurOut` | nítido → blur (algunos `data-flip-id`). |
| `animate-modalFadeIn` | usado en modales (apertura con translate + scale + blur). |
| `animate-modalFadeOut` | inversa (declarada en safelist por si la usas manualmente). |
| `animate-iconFill` | `fillOpacity` 0 → 1 (icono del nav activo). |
| `animate-clickEffect` | `scale(1) → 0.96 → 1` en NavItem activo. |
| `animate-blurUp` | `translateY + blur` hacia arriba (SuccessModal, GeneralContent, AppearanceContent, CreditsContent, EditInfoModal). |
| `animate-toastIn` | `translateY(-80px) scale(0.80) → 0 scale(1)` (DownloadToast). |
| `animate-shake` | `translateX` shake corto (errores de validación, duplicados en `TagInput`). |
| `animate-shimmer` | efecto skeleton (gradient de izquierda a derecha). |
| `animate-rotation` | spinner de `Loader`. |

## Tema claro/oscuro

- `useTheme()` lee/escribe `localStorage.theme` y aplica `class="dark"`
  a `<html>`.
- Tres valores: `"light"`, `"dark"`, `"system"` (este último respeta
  `prefers-color-scheme`).
- Tailwind está configurado con `darkMode: "class"`.
- Apariencia configurable por el usuario desde
  `globals/components/modals/profileModal/AppearanceContent.jsx`.

### Colores usados con frecuencia

- Fondos claros: `#FBF9FC`, `#F3EEF5`, `#F5F3F6`.
- Fondos oscuros: `#0f0f11`, `#000000`, `#202022`, `#101012`, `#181818`.
- Bordes claros: `#a1a1a131`, `#e5e7eb96`.
- Bordes oscuros: `#1e1e20cb`, `#28282bbd`, `#3a3d43`, `#ffffff10`.
- Textos muted: `#7E777E`, `#75777E`, `#7E8088`, `#b4aab4`.
- Verde activo: `#00ff3779` (texto) + `#00ff151f` (bg).
- Rojo error: `#dc2626` (icono), `#450a0a8a` (hover dark).

### Patrón de clase dual (light + dark)

```jsx
className="bg-[#FBF9FC] text-black border-[#a1a1a131]
  focus-within:shadow-[0_0_3px_2px_#e5e7eb]
  dark:bg-black dark:text-[#E4E2E5] dark:border-[#1e1e20cb]
  dark:focus-within:shadow-[0_0_3px_3px_#28282b]"
```

> Si añades un nuevo color custom, **asegúrate** de:
> 1. Darle su variante `dark:`.
> 2. Si la clase es **dinámica** (concatenada en runtime,
>    p. ej. `bg-${color}`), añadirla al `safelist` de
>    `tailwind.config.js`.

## Skills relacionadas

- `ui` — los primitivos que viven en `globals/components/ui/` consumen
  los `*Icons.js` y los estilos globales.
- `modals` — usa `animate-modalFadeIn`, `animate-blurUp`, etc.
- `stack` — qué hay en `tailwind.config.js` y por qué.
