# Convenciones y naming

## Nombres de archivos y carpetas

| Elemento            | Convención                                    | Ejemplo                          |
| ------------------- | --------------------------------------------- | -------------------------------- |
| Componentes React   | `PascalCase.jsx`                              | `ProductsPage.jsx`, `Modal.jsx`  |
| Hooks               | `camelCase` con prefijo `use`                 | `useCreateProduct.js`            |
| Servicios           | `camelCase` con verbo + entidad              | `createProductService.js`        |
| Constantes          | `camelCase.js`                                | `productStatusConfig.js`         |
| Estilos CSS         | `kebab-case.css`                              | `global.css`, `loader.css`       |
| Carpetas de módulo  | `kebab-case`                                  | `products/`, `output-orders/`    |

> Pequeñas inconsistencias que respetar:
> - `src/modules/subcategories/services/createSubcategorySevice.js` está
>   mal escrito (con `S` mayúscula y falta la `r`). Mantén el nombre
>   actual; si lo renombras, actualiza todos los imports.

## Patrones de hook

| Patrón                     | Uso                          | Ejemplo                                    |
| -------------------------- | ---------------------------- | ------------------------------------------ |
| `use<Entity>s`             | Listado + fetching de datos  | `useWarranties`, `useProducts`             |
| `useCreate<Entity>`        | Creación de un recurso       | `useCreateProduct`, `useCreateWarranty`    |
| `useEdit<Entity>`          | Edición de un recurso        | `useEditProduct`, `useEditWarranty`        |
| `use<DoSomething><Entity>` | Misc                         | `useUpdateProductStatus`, `useDisableCategory`, `useEditWarrantyStatus` |
| `useFilter<Entity>s`       | Estado de filtros del listado| `useFilterProducts`, `useFilterWarranties` |
| `use<HookDeSoporte>`       | Hooks sin entidad            | `useCatalog` (agregador), `useRoles`, `useActiveCategories` |

## Patrones de service

| Patrón              | Verbo HTTP                 | Endpoint típico              |
| ------------------- | -------------------------- | --------------------------- |
| `get<Entity>s`      | `GET`                      | `${entity}/` o `${entity}`  |
| `create<Entity>`    | `POST`                     | `${entity}/create`          |
| `edit<Entity>`      | `PUT`                      | `${entity}/update`          |
| `update<Entity>`    | `PUT` / `PATCH`            | `${entity}/update…`         |
| `disable<Entity>`   | `PATCH` (cambio de estado) | `${entity}/disable`         |
| `enable<Entity>`    | `PATCH`                    | `${entity}/enable`          |

## Tipos de modal

Estos strings se usan en `useModal` y en el `type` de `<Modal>`:

- `"add"` — crear.
- `"edit"` — editar.
- `"info"` — más información (suele abrirse en `center`).
- `"filter"` — filtros.
- `"enable"` / `"disable"` — cambio de estado.
- `"editStatus"` — cambio de status con layout compacto (ver
  `modalStyles.js`).
- `"user"` — perfil (layout grande `650×550`).
- `"help"` — sugerencia / ayuda.
- `"menu"` — modal compacto del menú móvil.
- `"innerModal"` — modal anidado (`AddInnerModal`).
- `"calendar"`, `"select"` — modales de UI internos.

## Roles

Constantes en strings: `"Admin"`, `"Almacén"`, `"Técnico"`. Esos strings
se replican en:

1. `src/router/constants/routesConfig.js` (rutas).
2. `src/globals/constants/asideMenuItems.js` (aside, mobile menu).
3. `src/modules/home/constants/homeSections.js` (cards de home).
4. `src/modules/reports/constants/reportSections.js` (cards de
   reports).
5. `src/modules/<m>/constants/<m>StatusConfig.js` (al menos, las
   acciones sobre cada estado, ver `productStatusConfig.js`).

**Si añades un rol nuevo**, busca en el repo todos los `roles: […]` y
actualízalos.

## Reglas de ESLint

- `no-unused-vars` con `varsIgnorePattern: "^[A-Z_]"` → no se quejará
  por props que empiezan por mayúscula (`Children`, `Component`, etc.).
- React Hooks y React Refresh están activos.
- `dist/` está ignorado.

## Lo que **NO** debes hacer

- ❌ Crear archivos en `src/globals/` que solo use un módulo.
- ❌ Usar `useState` para fetching: usa **React Query**
  (`useQuery`/`useMutation`). Excepción: los charts del dashboard
  usan `useState` + `useEffect` por consistencia con su patrón
  histórico.
- ❌ Llamar a `fetch` directo desde un componente: usa
  **`fetchWithAuth`** (maneja refresh). Excepción: `loginService.js`,
  que va sin token.
- ❌ Hardcodear endpoints: usar **`apiRoutes`** (`src/config/apiRoutes.js`).
- ❌ Importar SVGs uno por uno en componentes: agrúpalos en
  `src/assets/icons/<area>Icons.js` y reexpórtalos como objeto.
- ❌ Olvidar la variante `dark:` en una clase de color nueva.
- ❌ Añadir comentarios al código (regla del repo). Si necesitas
  documentar una decisión, hazlo en el `AGENTS.md` o en el split
  correspondiente de este skill.
- ❌ `git commit` sin que el usuario lo pida explícitamente.

## Cómo añadir un módulo nuevo (checklist)

1. Crea `src/modules/<nombre>/` con la estructura
   `<Modulo>Page.jsx` + `components/{ui,modals}/` + `hooks/` +
   `services/` + `constants/`.
2. Añade la ruta a `src/router/constants/routesConfig.js` con sus
   `roles`.
3. Añade el item al menú lateral en
   `src/globals/constants/asideMenuItems.js` (`firstSectionItems` y
   `mobileItems`).
4. Si la home debe mostrar una card, añade el item en
   `src/modules/home/constants/homeSections.js`.
5. Si tiene reportes, añade el item en
   `src/modules/reports/constants/reportSections.js` y crea los
   componentes/servicios/hooks en `src/modules/reports/{hooks,services,
   components/ui/reports}/<nombre>/`.
6. Si tiene estado, define `<modulo>StatusConfig.js` en
   `src/modules/<nombre>/constants/`.
7. Añade los endpoints nuevos (si los hay) en
   `src/config/apiRoutes.js`.
