# Modales y animaciones

El sistema de modales es **una de las partes más opinadas** del código.
Lee este archivo antes de tocar un modal existente o crear uno nuevo.

## Archivos

```
src/globals/components/modals/
├── Modal.jsx                 # base con GSAP Flip
├── AddInnerModal.jsx         # wrapper para modales anidados
├── ConfirmCancelButtons.jsx  # botones de acción de formularios
├── ErrorModal.jsx            # notificación de error
├── SuccessModal.jsx          # notificación de éxito
├── FilterModal.jsx           # filtros (fechas + children)
├── HelpModal.jsx             # envío de sugerencia
├── SelectMenu.jsx            # dropdown con búsqueda
└── profileModal/
    ├── ProfileModal.jsx
    ├── GeneralContent.jsx
    ├── AppearanceContent.jsx
    ├── CreditsContent.jsx
    ├── EditInfoModal.jsx
    └── ChangePasswordModal.jsx

src/globals/hooks/
└── useFlipModal.js           # animación GSAP Flip
```

## `Modal.jsx`

Props:

```ts
type ModalProps = {
  isOpen: boolean,
  type: string,                  // "default" | "user" | "help" | "filter" | "select" | "calendar" | "menu" | "editStatus" | "innerModal" | ...
  triggerRef: { element, rect } | React.RefObject<HTMLElement>,
  z_index?: string,              // "50" (default) | "150" | "250" | "300" | "600"
  location?: "anchored" | "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right",
  growDirection?: "bottom-right" | "bottom" | "bottom-center" | "bottom-left" | "top" | "center" | ...,
  title?: string,
  children: ReactNode,
  onClose: () => void,
  disableClose?: boolean,
};
```

Comportamiento:

1. Se monta en portal contra `#modal-root`.
2. Llama a `useFlipModal(...)` que devuelve un `closeModal` estable.
3. **Clona los hijos** y les inyecta `onClose` (a menos que ya traigan
   `isOpen`, en cuyo caso se respeta, p. ej. un `Modal` hijo).
4. Si el `type` está en `["calendar","select","menu","editStatus"]`,
   **no** renderiza el header (título + botón close) — esos tipos son
   dropdowns/calendarios donde el header estorba.
5. `type="user"` o `"help"` fuerzan `location="center"`.
6. `type="filter"` fuerza `growDirection="bottom-center"`.

> **Regla práctica:** al añadir un tipo nuevo, añade su estilo a
> `modalStyles.js` y, si debe ir centrado, controla `location` desde
> `Modal.jsx` o pásalo explícitamente.

## `useFlipModal` (animación)

Implementa la transición estilo Apple con GSAP `Flip`. Highlights:

- Captura el `rect` del trigger (botón que abre el modal) con
  `Flip.getState`.
- Coloca el modal como `position: fixed` en `top/left` calculados con
  `growDirection` y `location`, haciendo clamp a los bordes.
- Anima con `Flip.from(state, { duration: 0.38, ease: "expo.out", … })`
  sobre el modal y los "shared elements" internos (cualquier nodo con
  `data-flip-id` tanto en el trigger como en el modal).
- Al cerrar, invierte: mide el estado expandido, lo lleva al tamaño del
  trigger y luego llama a `onClose` cuando termina el timeline.
- Limpia `min-height`/`min-width` que anula con `!important` durante
  la animación.
- `dataset.closing = "true"` previene re-entradas.

`data-flip-id` se usa en algunos componentes para que un texto (p. ej.
"Agregar Producto" en `CreateButton` → título del modal) viaje
visualmente del botón al modal. Ejemplos:

- `CreateButton.jsx` → `<span data-flip-id="modal-title">…</span>`.
- `Modal.jsx` → `<span data-flip-id="modal-title">…</span>` en el
  header.

## `AddInnerModal.jsx`

Wrapper de `Modal` con `z_index="150"`, `type="innerModal"` y
`location="center"`. Útil para modales anidados (p. ej. un modal de
"agregar marca" dentro del modal de "agregar producto").

## `ConfirmCancelButtons.jsx`

```jsx
<ConfirmCancelButtons
  disabled={false}
  itemsPosition="center"
  flexDirection
  confirmImage="send"
  confirmImageDisplay={true}
  confirmText="Confirmar"
  confirmBgColor="black"
  confirmButtonOnClick={fn}
  cancelText="Cancelar"
  cancelButtonOnClick={fn}
  cancelButtonWidth
  confirmBtnRef
/>
```

Pinta dos botones. `confirmBgColor` es **dinámico** y se concatena a
`bg-${confirmBgColor}` — por eso `tailwind.config.js` tiene
`bg-black`, `bg-red-600`, `bg-green-500`, `bg-[#FFFFFF]`, `bg-[#000000]`,
`bg-[#F3EEF5]`, `bg-[#E2E5E7]` en el `safelist`.

## `ErrorModal.jsx` y `SuccessModal.jsx`

Modales centrados con icono y texto, un único botón "Volver" (los dos
botones Cerrar/Volver del `<ConfirmCancelButtons>` apuntan a
`onClose`). `z_index="300"` para que vivan por encima de casi todo.

## `FilterModal.jsx`

```jsx
<FilterModal
  applyButtonOnClick={fn}
  orderByStartDateOnChange={fn}
  orderByStartDateValue={…}
  orderByFinishDateOnChange={fn}
  orderByFinishDateValue={…}
  onClose={fn}
  fieldName="Creación"   // default
  seeCleanFiltersButton  // muestra "Limpiar filtros"
  cleanFiltersOnClick={fn}
>
  {/* campos extra del módulo (e.g. status, category, brand) */}
</FilterModal>
```

Renderiza dos `DateField` ("Desde" / "Hasta"), los `children` que el
módulo inyecte, y los botones. Acepta `fieldName` para que la etiqueta
diga "Fecha de Creación", "Fecha de Entrada", etc.

## `HelpModal.jsx`

Form simple con `TextArea`, llama a `useSendSuggestion`. `confirmText`
cambia a `<Loader />` durante el envío.

## `SelectMenu.jsx`

Botón con label + flecha que abre un `Modal` tipo `"select"` con lista
filtrable. Props:

```jsx
<SelectMenu
  id, name, onChange, value
  spanText              // label flotante (como FormField)
  options={[{ value, label }, ...]}
  addIconFunction, addIconRef   // botón "+" al lado (opcional)
  seeAddButton={false}
  searchable={true}
  growDirection="center"
  className
  showAllOption={false} // añade la opción "Todos" arriba
/>
```

- `value` puede ser string o number; la comparación es robusta:
  `Number(value) === Number(option.value)` si ambos son numéricos.
- `handleSelect(option, name, onChange)` dispara el `onChange` con
  `{ target: { name, value: parsedValue } }`.

## `profileModal/`

Modal grande (650×550 en md) con tres tabs:

- `GeneralContent.jsx` — datos del usuario, botones "Editar" (abre
  `EditInfoModal` con `useInnerModal("editInfo")`) y "Cambiar" (abre
  `ChangePasswordModal` con `useInnerModal("changePassword")`), y
  botón "Cerrar Sesión" que llama a `useLogout()`.
- `AppearanceContent.jsx` — tres botones (Sistema / Claro / Oscuro)
  que escriben en `useTheme().setTheme`. Y un `SelectMenu` con
  idiomas (Español/Ingles, ambos cableados a la misma acción).
- `CreditsContent.jsx` — botón que abre el repo de GitHub en nueva
  pestaña.

`EditInfoModal` y `ChangePasswordModal` viven **dentro** de
`profileModal/` pero son modales completos (usan `Modal` con
`type="innerModal"` y `z_index="300"`). Reusan `useUpdateCurrentUserInfo`
y `useUpdateCurrentUserPassword` respectivamente, y abren
`SuccessModal` / `ErrorModal` con `useInnerModal`.

## Patrón recomendado para un modal nuevo

1. Decide el `type` (string único) y, si tiene un layout especial,
   añade su entrada en `globals/constants/modalStyles.js`.
2. Decide el `z_index`:
   - `"50"` (default) → modal principal de página.
   - `"150"` → modal anidado (`AddInnerModal`).
   - `"250"` → calendar.
   - `"300"` → success/error o modales dentro de profileModal.
   - `"600"` → `SelectMenu`.
3. Pasa `triggerRef={e.currentTarget}` (o el resultado de
   `getModalTrigger(e)` en el `handleSubmit`).
4. Decide `location` y `growDirection` (los `type` ya mapeados
   imponen valores por defecto en `Modal.jsx`).
5. Si necesitas un loader o feedback, usa `useInnerModal` para abrir
   `SuccessModal`/`ErrorModal` desde el handler.
6. Si necesitas estado independiente del modal padre, usa otro
   `useModal()` en el componente (p. ej. `Login.jsx` tiene su propio
   `useModal` y `ProfileModal` tiene su propio `useInnerModal`).
