---
name: modules
description: Use when working inside src/modules/<x>/ (login, home, dashboard, products, categories, subcategories, suppliers, users, warranties, output-orders, reports). Lists per-module pages, hooks, services, modals and the unique quirks of each one. Triggered by module names: "ProductsPage", "CategoriesPage", "SubcategoriesPage", "WarrantiesPage", "OutputOrdersPage", "useCatalog", "useExportFile", "ReportsPage", "DashboardPage", "LoginForm".
---

# Modules

Cada módulo vive en `src/modules/<nombre>/` y tiene la misma forma:

```
<Modulo>/
├── <Modulo>Page.jsx
├── components/
│   ├── ui/        # tablas, listas, cards
│   └── modals/    # Add, Edit, Enable, Disable, Filter, Info, …
├── hooks/         # use<Entity>s, useCreate<Entity>, useEdit<Entity>, …
├── services/      # create<Entity>Service, get<Entity>Service, …
└── constants/     # statusConfig (cuando aplica)
```

Esta es la "regla de oro" aplicada a cada dominio. Antes de añadir un
hook global, considera si el hook es reusable: si no, déjalo en el
módulo.

---

## `login/`

- **Page**: `Login.jsx`. Layout propio (no usa `<Layout />`): fondo
  `#FBF9FC` claro / negro oscuro con el `LoginForm` centrado.
- **`components/ui/`**: `LoginForm.jsx`, `FormButtons.jsx`.
- **`components/modals/`**: `ErrorModal.jsx`, `RecoverPasswordModal.jsx`,
  `EmailSentModal.jsx`.
- **`hooks/`**:
  - `useLogin.js` — form + validación, llama a `useLogout().logout()`
    antes de reintentar y luego a `loginService(form)`. Si OK, va a
    `/home`; si no, abre modal de error con `openModal`.
  - `useRecoverPassword.js` — dispara `recoverPasswordService` y luego
    `setInnerModal("sentEmail")`.
- **`services/`**: `loginService.js` (POST `/auth/login` con `fetch`
  directo, **no** `fetchWithAuth`), `recoverPasswordService.js`.
- Particularidades:
  - `useLogin` reusa hooks globales (`useLogout`, `useFormValidation`,
    `useModal` recibido por prop).
  - `LoginForm` usa `FormField` para email y password (con toggle de
    visibilidad), y `Loader` en el botón de submit.

---

## `home/`

Landing post-login con cards de acceso a cada módulo.

- **Page**: `HomePage.jsx`. Saluda con `useCurrentUser().user.name` y
  renderiza `<SectionsContainer />` dentro de `<Layout />`. También
  monta los modales globales (`user` y `help`) usando `useModal()`.
- **`components/ui/`**: `SectionsContainer.jsx` (grid responsive según
  `itemsPerRole.length > 6`) y `ActionCard.jsx`.
- **`constants/homeSections.js`**: array `items` con `name`, `path`,
  `icon`, `roles`. **Filtra con `hasRole(item.roles)` en render**.
- Sin hooks ni services propios: depende de `useCurrentUser`.

---

## `dashboard/`

- **Page**: `DashboardPage.jsx`. `TopSection` con un `CreateButton`
  cuyo icono es `cloud_upload` y texto "Descargar" (abre
  `DownloadToast` con `setShowDownloadToast(true)`). No tiene
  `FilterButton`. `ChartsContainer` debajo.
- **`components/ui/`**: `ChartsContainer.jsx`, `ChartCard.jsx`,
  `TopChartsCard.jsx`, `SeeReportButton.jsx`, `charts/` (10 gráficos
  Recharts).
- **`components/modals/`**: `DownloadToast.jsx` — toast verde autocierra
  a los 3.5s.
- **`hooks/`**: 9 hooks `use<X>Chart.js` con `useState` + `useEffect`
  (no usan React Query; cada uno llama a su `services/<x>ChartData.js`).
- **`services/`**: 10 archivos `<x>ChartData.js` que hacen `fetchWithAuth`
  a `${dashboard}/<endpoint>` y devuelven `data.data`.
- Particularidades:
  - Cada `use<X>Chart` sigue el mismo patrón (no está centralizado con
    React Query). Respeta ese patrón al añadir un gráfico nuevo.
  - `ChartCard` y `TopChartsCard` son reutilizables para cards de
    dashboard.
  - Fondos SVG en `globals/styles/background-charts-icons.css`:
    `users-background`, `products-background`, `output-orders-background`,
    `categories-background`, `growth-background`.

---

## `products/`

El módulo más completo. Maneja catálogo de productos, **marcas**,
**modelos** y **órdenes de entrada** (input orders).

- **Page**: `ProductsPage.jsx`. `TopSection` con `SearchBar`,
  `addButtonIcon="box_add"`, `addButtonText="Agregar Producto"`. Tabla
  con `ProductsTable`.
- **`components/ui/`**: `ProductsTable.jsx`.
- **`components/modals/`**: `AddProductModal`, `EditProductModal`,
  `AddInputOrderModal`, `AddProductBrandModal`, `AddProductModelModal`,
  `DisableProductModal`, `EnableProductModal`, `EditProductStatusModal`,
  `ProductsFilterModal`.
- **`hooks/`**:
  - `useCatalog.js` — hook **agregador**. Devuelve
    `{ products, categories, subcategories, brands, models,
    inputOrders, productStatus, loading, error, filters, setFilters }`
    ejecutando 7 `useQuery` en paralelo.
  - `useCreateProduct.js`, `useEditProduct.js` (usa `getChanges`),
    `useUpdateProductStatus.js`, `useFilterProducts.js`,
    `useCreateInputOrder.js`, `useCreateProductBrand.js`,
    `useCreateProductModel.js`.
- **`services/`**:
  - `getProductsService.js` (GET `${products}/` con `buildQueryParams`).
  - `getInputOrdersService.js`, `getProductBrandsService.js`,
    `getProductModelsService.js`, `getProductStatusService.js`,
    `getSuppliersService.js` (reusado de suppliers).
  - `createProductService.js`, `editProductService.js`,
    `updateProductStatusService.js`, `createInputOrderService.js`,
    `createProductBrandService.js`, `createProductModelService.js`.
- **`constants/productStatusConfig.js`**: `1` deshabilitado, `2` activo,
  `3` vendido, `4` en garantía. Define `text`, `modalType`, `optionText`,
  `optionStyles`, `visibilityIcon`, `icon`, `fill`, `styles` y `roles`
  (los `roles` indican qué usuarios pueden cambiar a ese estado).
- Particularidades:
  - `useCreateProduct` recibe `openInnerModal` por argumento del
    `handleSubmit(e, openInnerModal)`. Ver patrón en skill
    `architecture`.
  - `useEditProduct` valida que `Object.keys(changes).length > 1` antes
    de enviar (porque incluye `id` y `product_details_id`).
  - `EditProductStatusModal` abre con `type="editStatus"` (ver
    `modalStyles.js`).

---

## `categories/`

- **Page**: `CategoriesPage.jsx`. CRUD de categorías, `location="center"`
  para `info`/`add`/`edit`, `"anchored"` para el resto.
- **`components/ui/`**: `CategoriesList.jsx` (cards en grid).
- **`components/modals/`**: `AddCategoryModal`, `EditCategoryInfoModal`,
  `EnableCategoryModal`, `DisableCategoryModal`, `MoreInfoModal`,
  `FilterCategoryModal`.
- **`hooks/`**: `useCategories.js`, `useCreateCategory.js`,
  `useEditCategory.js`, `useEnableCategory.js`, `useDisableCategory.js`,
  `useFilterCategories.js`.
- **`services/`**: `getCategoriesService.js`, `createCategoryService.js`,
  `editCategoryService.js`, `enableCategoryService.js`,
  `disableCategoryService.js`.
- **`constants/categoryStatusConfig.js`**: `1` deshabilitada, `2` activa.

---

## `subcategories/`

- **Page**: `SubcategoriesPage.jsx`. Mismo patrón que `categories`.
- **`components/ui/`**: `SubcategoriesList.jsx`.
- **`components/modals/`**: `AddSubcategoryModal`, `EditSubcategoryModal`,
  `EnableSubcategoryModal`, `DisableSubcategoryModal`,
  `MoreSubcategoryInfoModal`, `FilterSubcategoriesModal`.
- **`hooks/`**: `useSubcategories.js`, `useActiveCategories.js` (para
  el select del formulario), `useCreateSubcategory.js`,
  `useEditSubcategory.js`, `useEnableSubcategory.js`,
  `useDisableSubcategory.js`, `useFilterSubcategories.js`.
- **`services/`**: `getSubcategoriesService.js`,
  `getActiveCategoriesService.js`, `createSubcategorySevice.js` (ojo,
  está escrito con `S` mayúscula, **es el nombre real** del archivo),
  `editSubcategoryService.js`, `enableSubcategoryService.js`,
  `disableSubcategoryService.js`.

---

## `suppliers/`

- **Page**: `SuppliersPage.jsx`. CRUD de proveedores.
- **`components/ui/`**: `SuppliersList.jsx`.
- **`components/modals/`**: `AddSupplierModal`, `EditSupplierInfoModal`,
  `EnableSupplierModal`, `DisableSupplierModal`, `MoreInfoSupplierModal`,
  `FilterSuppliersModal`.
- **`hooks/`**: `useSuppliers.js`, `useCreateSupplier.js`,
  `useEditSupplier.js`, `useEnableSupplier.js`, `useDisableSupplier.js`,
  `useFilterSuppliers.js`.
- **`services/`**: `getSuppliersService.js`, `createSupplierService.js`,
  `editSupplierService.js`, `enableSupplierService.js`,
  `disableSupplierService.js`.

---

## `users/`

- **Page**: `UsersPage.jsx`. CRUD de usuarios del sistema.
- **`components/ui/`**: `UsersList.jsx`.
- **`components/modals/`**: `AddUserModal`, `EditUserInfoModal`,
  `EnableUserModal`, `DisableUserModal`, `MoreInfoUser`,
  `FilterUserModal`.
- **`hooks/`**: `useUsers.js`, `useCreateUser.js`, `useEditUser.js`,
  `useEnableUser.js`, `useDisableUser.js`, `useFilterUsers.js`,
  `useRoles.js` (para el `<SelectMenu>` de roles al crear/editar).
- **`services/`**: `getUsersService.js`, `createUserService.js`,
  `editUserService.js`, `enableUserService.js`, `disableUserService.js`,
  `getRolesService.js`.
- **`constants/userStatus.js`**: `1` deshabilitado, `2` activo.
  (Reusado por el exportador de informes.)

---

## `warranties/`

- **Page**: `WarrantiesPage.jsx`. `addButtonText="Crear garantía"`.
  Ubicación `center` para `info`/`edit`/`add`, `anchored` para el resto.
- **`components/ui/`**: `WarrantiesTable.jsx`.
- **`components/modals/`**: `AddWarrantyModal`, `EditWarrantyModal`,
  `EditWarrantyStatusModal`, `MoreWarrantyInfo`, `FilterWarrantyModal`.
- **`hooks/`**: `useWarranties.js`, `useCreateWarranty.js`,
  `useEditWarranty.js`, `useEditWarrantyStatus.js` (cambia `status`),
  `useDisableWarranty.js`, `useFilterWarranties.js`.
- **`services/`**: `getWarrantiesService.js` (GET `${warranties}`),
  `createWarrantyService.js` (POST `${warranties}/create`),
  `updateWarrantyService.js` (PUT `${warranties}/update`),
  `disableWarrantyService.js` (PATCH `${warranties}/disable`).
  > Endpoint en `apiRoutes.js`: `warranties: "/warranty_incidents"`.
- **`constants/warrantyStatus.js` (`warrantyStatusConfig`)**: `1`
  deshabilitada, `2` pendiente, `3` en proceso, `4` completada. Define
  `optionText`, `optionStyles`, `styles` para cada estado.
- Notas:
  - La página declara el handler `onClose={() => closeModal}` (no
    `() => closeModal()`) en varios sitios. Es un bug latente: ignora
    el `onClose` real y pasa la función referencia. Respeta la
    convención existente al añadir modales, pero si vas a tocar uno
    que ya está en la página, considera arreglarlo a `() => closeModal()`.

---

## `output-orders/`

- **Page**: `OutputOrdersPage.jsx`. `sectionName="Ordenes de salida"`.
- **`components/ui/`**: `OutputOrdersTable.jsx`.
- **`components/modals/`**: `AddOutputOrderModal`, `EditOutputOrderModal`,
  `EnableOutputOrderModal`, `DisableOutputOrderModal`,
  `FilterOutputOrdersModal`. (El `MoreInfo` no aparece declarado en
  el page; revisa antes de añadir uno.)
- **`hooks/`**: `useOutputOrders.js`, `useCreateOutputOrder.js`,
  `useEditOutputOrder.js`, `useEnableOutputOrder.js`,
  `useDisableOutputOrder.js`, `useFilterOutputOrders.js`.
- **`services/`**: `getOutputOrdersService.js`, `createOutputOrderService.js`,
  `updateOutputOrderService.js`, `enableOutputOrderService.js`,
  `disableOutputOrderService.js`. Endpoint en `apiRoutes.js`:
  `outputOrders: "/output_orders"`.

---

## `reports/`

El módulo más particular: contiene **8 sub-reportes** (uno por dominio
de negocio) y un sistema de exportación a **PDF** y **Excel**.

- **Page**: `ReportsPage.jsx`. Maneja un `report` local (string) y un
  `topSectionVisiblity`. Cuando `report === "home"` muestra
  `SectionsContainer` con las 8 secciones; cuando es `"users"`,
  `"products"`, etc., muestra el sub-reporte correspondiente. Sin
  `FilterButton` ni `CreateButton`.
- **`components/ui/`**:
  - `SectionsContainer.jsx`, `ReportSectionCard.jsx` (cards de la
    home), `ReportsContainer.jsx`, `ReportsTopSection.jsx`,
    `KpisContainer.jsx`, `KpiCard.jsx`, `TableCard.jsx`,
    `ExportButton.jsx`, `ReturnButton.jsx`.
  - `reports/<dominio>/<Dominio>Report.jsx` y sus charts/table.
- **`components/modals/`**: `ExportReportModal.jsx` (modal de
  exportación que abre con `type="editStatus"`).
- **`hooks/`**:
  - `useExportFile.js` — **el corazón del export**. `exportToExcel`
    genera 2 hojas (Resumen con KPIs, Detalles) usando `xlsx` (XLSX).
    `exportToPDF` genera un PDF con `jspdf` + `jspdf-autotable`:
    cabecera azul (`#092679`), KPIs y tabla detallada. Lee los textos
    de estado desde `userStatus`, `warrantyStatusConfig`,
    `productStatusConfig`. Nombres de archivo:
    `reporte_<type>_<period>_<timestamp>.{xlsx|pdf}`.
  - `useXxxData.js` por sub-reporte (4 cada uno: area, data, pie, table).
- **`services/`**:
  - `<dominio>/getXxxAreaChartService.js`, `getXxxDataService.js`,
    `getXxxPieDataService.js`, `getXxxTableDataService.js`.
- **`constants/reportSections.js`**: array `sections` con `name`,
  `cardName`, `icon` y `roles`. Tiene 8 secciones: `users`,
  `products`, `categories`, `subcategories`, `warranties`, `suppliers`,
  `outputs`, `transformations`. (El sub-reporte `transformations`
  existe solo en `reportSections.js` y como componente, pero su
  página no está montada en el router — pendiente de integración.)
- Notas:
  - `useExportFile` está en `modules/reports/hooks/` pero se nutre de
    `constants` de `users`, `warranties` y `products`. Esto cruza
    límites de módulo pero está aceptado por el patrón existente; si
    vas a refactorizar, tenlo en cuenta.

## Skills relacionadas

- `architecture` — patrón `Page → Hook → Service → API` aplicado aquí.
- `modals` — todos los modales que usan los módulos (incluido el
  `ExportReportModal` que abre con `type="editStatus"`).
- `routing` — qué roles ven cada ruta/módulo.
- `conventions` — naming, no-comment, checklist para añadir un módulo.
