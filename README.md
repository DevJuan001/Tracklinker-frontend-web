# Tracklinker Web

Aplicación web del sistema de gestión de inventario **Tracklinker**, construida con **React**, **Vite**, **TailwindCSS** y **React Query**.

---

## Tabla de Contenidos

- [Tech Stack](#tech-stack)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Convenciones de Código](#convenciones-de-código)
- [Contribuciones](#contribuciones)

---

## Tech Stack

| Tecnología | Versión | Descripción |
| ---------- | ------- | ----------- |
| [Node.js](https://nodejs.org/) | `>= 20` | Entorno de ejecución para las herramientas de desarrollo |
| [React](https://react.dev/) | `^19.2.0` | Librería principal para construcción de interfaces |
| [Vite](https://vitejs.dev/) | `^7.2.4` | Bundler y servidor de desarrollo |
| [React Router DOM](https://reactrouter.com/) | `^7.13.0` | Enrutamiento del lado del cliente (SPA) |
| [TanStack Query](https://tanstack.com/query) | `^5.99.2` | Fetching, caché y sincronización de datos del servidor |
| [GSAP](https://gsap.com/) | `^3.15.0` | Animaciones de alta performance (modales, transiciones) |
| [Recharts](https://recharts.org/) | `^3.7.0` | Gráficos y visualización de datos en el dashboard |
| [TailwindCSS](https://tailwindcss.com/) | `^3.4.19` | Framework de utilidades CSS |
| [Docker](https://www.docker.com/) | `latest` | Contenedorización y despliegue con Nginx |

---

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) `>= 20`
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [Docker](https://www.docker.com/) *(opcional, solo para contenedorización)*

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/DevJuan001/Tracklinker-frontend-web.git
cd Tracklinker-frontend-web

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores correspondientes
```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

| Variable | Tipo | Descripción |
| -------- | ---- | ----------- |
| `VITE_API_URL` | `string` | URL base de la API REST del backend (ej: `http://localhost:8000`) |

> **Nota:** Todas las variables del frontend deben comenzar con el prefijo `VITE_` para ser accesibles en el código del cliente.

---

## Ejecución

```bash
# Servidor de desarrollo (con hot reload)
npm run dev

# Lint del código
npm run lint

# Build de producción
npm run build

# Preview del build de producción
npm run preview
```

### Con Docker

```bash
# Construir la imagen
docker build -t tracklinker-web .

# Ejecutar el contenedor (accesible en http://localhost:80)
docker run -p 80:80 tracklinker-web
```

---

## Estructura del Proyecto

```
Tracklinker-frontend-web/
│
├── public/                         # Archivos estáticos servidos directamente
│
├── src/
│   ├── App.jsx                     # Componente raíz: inicializa el tema y monta el router
│   ├── main.jsx                    # Punto de entrada: monta React con QueryClientProvider
│   │
│   ├── assets/                     # Imágenes, SVGs y recursos estáticos de la app
│   │
│   ├── config/
│   │   └── apiRoutes.js            # Mapa centralizado de todos los endpoints de la API
│   │
│   ├── constants/
│   │   ├── asideMenuItems.js       # Configuración del menú lateral (ícono, label, ruta, roles)
│   │   └── dateConstants.js        # Constantes de formato de fecha usadas en la app
│   │
│   ├── router/
│   │   ├── AppRouter.jsx           # Definición principal de rutas: login y rutas protegidas
│   │   ├── ProtectedRoutes.jsx     # HOC que valida autenticación y roles antes de renderizar
│   │   └── constants/
│   │       └── routesConfig.js     # Array de configuración de rutas (path, componente, roles)
│   │
│   ├── utils/
│   │   ├── buildQueryParams.js     # Construye query strings para filtros de la API
│   │   ├── colors.js               # Paleta de colores compartida (ej: para gráficos)
│   │   ├── fetchWithAuth.js        # Wrapper de fetch que adjunta el token JWT automáticamente
│   │   ├── formatLabel.js          # Formatea texto para labels (ej: snake_case → Title Case)
│   │   ├── getDateRange.js         # Calcula rangos de fechas para los filtros de reportes
│   │   ├── getModalTrigger.js      # Obtiene el elemento DOM que disparó la apertura del modal
│   │   └── months.js               # Array de meses del año en español
│   │
│   ├── globals/                    # Todo lo que es compartido entre módulos
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Layout.jsx      # Wrapper de página: combina el Aside con el contenido
│   │   │   │   └── Aside.jsx       # Barra lateral de navegación con menú y perfil de usuario
│   │   │   │
│   │   │   ├── modals/
│   │   │   │   ├── Modal.jsx           # Modal base con animación GSAP (flip desde el trigger)
│   │   │   │   ├── AddInnerModal.jsx   # Modal secundario anidado dentro de otro modal
│   │   │   │   ├── ConfirmCancelButtons.jsx # Botones de confirmar/cancelar para formularios
│   │   │   │   ├── ErrorModal.jsx      # Modal de notificación de error
│   │   │   │   ├── SuccessModal.jsx    # Modal de notificación de éxito
│   │   │   │   ├── FilterModal.jsx     # Modal de filtros con campos de búsqueda
│   │   │   │   ├── HelpModal.jsx       # Modal de ayuda con información contextual
│   │   │   │   ├── SelectMenu.jsx      # Menú desplegable con búsqueda para seleccionar items
│   │   │   │   └── profileModal/
│   │   │   │       ├── ProfileModal.jsx        # Modal principal del perfil con tabs
│   │   │   │       ├── GeneralContent.jsx      # Tab de información general del usuario
│   │   │   │       ├── AppearanceContent.jsx   # Tab de preferencias de apariencia (tema)
│   │   │   │       ├── CreditsContent.jsx      # Tab de créditos y versión de la app
│   │   │   │       ├── EditInfoModal.jsx        # Sub-modal para editar datos del usuario
│   │   │   │       └── ChangePasswordModal.jsx # Sub-modal para cambiar contraseña
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── ActionButtons.jsx       # Botones de acción de tabla (editar, ver, etc.)
│   │   │       ├── Avatar.jsx              # Avatar circular del usuario con iniciales
│   │   │       ├── Calendar.jsx            # Componente de calendario para selección de fechas
│   │   │       ├── CreateButton.jsx        # Botón primario para abrir el modal de creación
│   │   │       ├── DateField.jsx           # Campo de formulario con selector de fecha
│   │   │       ├── DateInput.jsx           # Input de fecha nativo para formularios
│   │   │       ├── DisabledFormField.jsx   # Campo de formulario de solo lectura
│   │   │       ├── FilterButton.jsx        # Botón que abre el modal de filtros
│   │   │       ├── FormField.jsx           # Campo de formulario genérico con label y validación
│   │   │       ├── Icon.jsx                # Wrapper para iconos de Material Symbols
│   │   │       ├── InputWithDataList.jsx   # Input con sugerencias dinámicas (datalist)
│   │   │       ├── Loader.jsx              # Indicador de carga (spinner)
│   │   │       ├── SearchBar.jsx           # Barra de búsqueda con debounce
│   │   │       ├── TextArea.jsx            # Campo de texto multilínea para formularios
│   │   │       └── TopSection.jsx          # Encabezado de página con título y acciones
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAvatar.js                # Genera iniciales y color de fondo para el avatar
│   │   │   ├── useCalendar.js              # Lógica del calendario (navegación, selección)
│   │   │   ├── useCities.js                # Fetching de ciudades para el formulario de perfil
│   │   │   ├── useFlipModal.js             # Animación GSAP de apertura/cierre del modal
│   │   │   ├── useFormValidation.js        # Validación de campos de formulario
│   │   │   ├── useInnerModal.js            # Control del estado del modal secundario anidado
│   │   │   ├── useModal.js                 # Control del estado de apertura/cierre del modal
│   │   │   ├── useSearch.js                # Manejo del estado de búsqueda con debounce
│   │   │   ├── useSelectMenu.js            # Lógica del menú desplegable con búsqueda
│   │   │   ├── useSendSuggestion.js        # Envío de sugerencias desde el modal de ayuda
│   │   │   ├── useTheme.js                 # Aplicación y persistencia del tema (claro/oscuro)
│   │   │   ├── useUpdateCurrentUserInfo.js # Edición de información del usuario autenticado
│   │   │   ├── useUpdateCurrentUserPassword.js # Cambio de contraseña del usuario autenticado
│   │   │   └── useUser.js                  # Lectura del usuario autenticado desde el contexto
│   │   │
│   │   ├── services/
│   │   │   ├── getCitiesService.js                 # GET ciudades disponibles
│   │   │   ├── getCurrentUserService.js            # GET datos del usuario autenticado
│   │   │   ├── sendSuggestionService.js            # POST sugerencia de mejora
│   │   │   ├── updateCurrentUserInfoService.js     # PUT información del usuario
│   │   │   └── updateCurrentUserPasswordService.js # PUT contraseña del usuario
│   │   │
│   │   └── styles/
│   │       ├── main.css                    # Importa todos los estilos globales
│   │       ├── global.css                  # Variables CSS, reset y estilos base
│   │       ├── autofill.css                # Estilos para el autofill del navegador
│   │       ├── background-charts-icons.css # Iconos SVG de fondo para el dashboard
│   │       ├── input.css                   # Estilos base de inputs
│   │       ├── loader.css                  # Animación del spinner de carga
│   │       ├── scrollbar.css               # Estilos de la scrollbar personalizada
│   │       ├── select.css                  # Estilos del elemento select nativo
│   │       └── tables.css                  # Estilos base de tablas
│   │
│   └── modules/                    # Funcionalidades por dominio de negocio
│       ├── login/
│       │   ├── Login.jsx           # Página de inicio de sesión
│       │   ├── components/         # Formulario y campos del login
│       │   ├── hooks/              # useLogin: lógica de autenticación y guardado del token
│       │   └── services/           # loginService: POST de credenciales a la API
│       │
│       ├── home/
│       │   ├── HomePage.jsx        # Página principal post-login con resumen general
│       │   ├── components/         # Componentes del resumen (cards, indicadores)
│       │   └── constants/          # Constantes específicas de la vista Home
│       │
│       ├── dashboard/
│       │   ├── DashboardPage.jsx   # Página de dashboard con gráficos de inventario
│       │   ├── components/         # Gráficos y widgets del dashboard (Recharts)
│       │   ├── hooks/              # Hooks para fetching de datos de los gráficos
│       │   └── services/           # Servicios de consulta de estadísticas
│       │
│       ├── products/
│       │   ├── ProductsPage.jsx    # Página de gestión de productos
│       │   ├── components/         # Tabla, modales de creación y edición de productos
│       │   ├── constants/          # Constantes del módulo (columnas de tabla, etc.)
│       │   ├── hooks/              # useCatalog, useCreateProduct, useEditProduct, etc.
│       │   └── services/           # CRUD de productos, marcas, modelos y órdenes de entrada
│       │
│       ├── categories/
│       │   ├── CategoriesPage.jsx  # Página de gestión de categorías
│       │   ├── components/         # Tabla y modales de categorías
│       │   ├── constants/          # Constantes del módulo
│       │   ├── hooks/              # Hooks de creación, edición y listado de categorías
│       │   └── services/           # CRUD de categorías
│       │
│       ├── subcategories/
│       │   ├── SubcategoriesPage.jsx # Página de gestión de subcategorías
│       │   ├── components/           # Tabla y modales de subcategorías
│       │   ├── constants/            # Constantes del módulo
│       │   ├── hooks/                # Hooks de CRUD de subcategorías
│       │   └── services/             # Servicios de subcategorías
│       │
│       ├── suppliers/
│       │   ├── SuppliersPage.jsx   # Página de gestión de proveedores
│       │   ├── components/         # Tabla y modales de proveedores
│       │   ├── constants/          # Constantes del módulo
│       │   ├── hooks/              # Hooks de CRUD de proveedores
│       │   └── services/           # Servicios de proveedores
│       │
│       ├── users/
│       │   ├── UsersPage.jsx       # Página de gestión de usuarios del sistema
│       │   ├── components/         # Tabla y modales de usuarios
│       │   ├── constants/          # Constantes del módulo
│       │   ├── hooks/              # Hooks de CRUD de usuarios
│       │   └── services/           # Servicios de usuarios
│       │
│       ├── warranties/
│       │   ├── WarrantiesPage.jsx  # Página de gestión de garantías
│       │   ├── components/         # Tabla y modales de garantías (crear, editar, deshabilitar)
│       │   ├── constants/          # Constantes del módulo
│       │   ├── hooks/              # useWarranties, useCreateWarranty, useEditWarranty, etc.
│       │   └── services/           # CRUD de garantías (crear, obtener, editar, deshabilitar)
│       │
│       ├── transformations/
│       │   ├── TransformationsPage.jsx # Página de gestión de transformaciones de inventario
│       │   ├── components/             # Tabla y modales de transformaciones
│       │   ├── constants/              # Constantes del módulo
│       │   ├── hooks/                  # Hooks de CRUD de transformaciones
│       │   └── services/               # Servicios de transformaciones
│       │
│       └── reports/
│           ├── ReportsPage.jsx     # Página de generación y descarga de reportes
│           ├── components/         # Filtros, selector de rango de fechas y botón de descarga
│           ├── constants/          # Tipos de reporte disponibles y opciones de filtro
│           ├── hooks/              # Hooks para la generación de reportes
│           └── services/           # Servicios de generación de reportes (PDF/Excel)
│
├── .env.example                    # Plantilla de variables de entorno requeridas
├── .gitignore                      # Archivos y carpetas excluidos del control de versiones
├── .dockerignore                   # Archivos excluidos al construir la imagen Docker
├── Dockerfile                      # Build multi-stage: Node (build) + Nginx (serve)
├── eslint.config.js                # Configuración de ESLint y reglas de linting
├── index.html                      # HTML raíz del SPA (punto de entrada de Vite)
├── package.json                    # Dependencias y scripts del proyecto
├── postcss.config.js               # Configuración de PostCSS (requerido por TailwindCSS)
├── tailwind.config.js              # Configuración y personalización de TailwindCSS
└── vite.config.js                  # Configuración de Vite y plugins
```

---

## Arquitectura

El proyecto sigue una **arquitectura modular por dominio de negocio**, donde cada módulo es autónomo y contiene todo lo necesario para funcionar:

```
Página (Page) → Hook → Servicio (Service) → API
```

| Capa | Responsabilidad |
| ---- | --------------- |
| **Page** | Componente de ruta raíz que orquesta los hooks y renderiza la UI |
| **Components** | Componentes de presentación (tablas, modales, formularios) |
| **Hooks** | Lógica de negocio del cliente: estado, mutaciones y efecto secundarios |
| **Services** | Funciones de comunicación con la API REST |
| **globals/** | Componentes, hooks y servicios reutilizables entre todos los módulos |

### Flujo de una mutación (crear/editar)

```
Usuario → Componente (formulario) → Hook (useMutation de React Query)
    → Service (fetchWithAuth) → API REST → invalidación de caché → UI actualizada
```

---

## Convenciones de Código

### Nombres de archivos y carpetas

| Elemento | Convención | Ejemplo |
| -------- | ---------- | ------- |
| Componentes React | `PascalCase` | `ProductsPage.jsx`, `Modal.jsx` |
| Hooks | `camelCase` con prefijo `use` | `useCreateProduct.js` |
| Servicios | `camelCase` con verbo + entidad | `createProductService.js` |
| Constantes | `camelCase` | `routesConfig.js`, `asideMenuItems.js` |
| Estilos CSS | `kebab-case` | `global.css`, `loader.css` |
| Carpetas de módulos | `kebab-case` | `products/`, `output-orders/` |

### Nomenclatura de Hooks

Los hooks siguen el patrón `use` + acción + entidad según su responsabilidad:

| Patrón | Uso | Ejemplo |
| ------- | --- | ------- |
| `use<Entidad>s` | Listado y fetching de datos | `useWarranties`, `useProducts` |
| `useCreate<Entidad>` | Creación de un recurso | `useCreateProduct`, `useCreateWarranty` |
| `useEdit<Entidad>` | Edición de un recurso | `useEditProduct`, `useEditWarranty` |
| `useFilter<Entidad>s` | Manejo del estado de filtros | `useFilterProducts`, `useFilterWarranties` |
| `useUpdate<Entidad>Status` | Cambio de estado/estatus | `useUpdateProductStatus` |

### Nomenclatura de Servicios

Los servicios siguen el patrón verbo HTTP + entidad:

| Patrón | Verbo HTTP | Ejemplo |
| ------- | ---------- | ------- |
| `get<Entidad>s` | `GET` | `getProducts.js`, `getWarranties.js` |
| `create<Entidad>` | `POST` | `createProductService.js` |
| `update<Entidad>` | `PUT` / `PATCH` | `updateWarranty.js` |
| `disable<Entidad>` | `PATCH` (cambio de estado) | `disableWarranty.js` |

---

## Contribuciones

Toda contribución es bienvenida. Para contribuir al proyecto:

1. Crea un fork del repositorio
2. Crea una rama con el nombre de la funcionalidad o corrección:
   ```bash
   git checkout -b feat/nombre-de-la-funcionalidad
   ```
3. Realiza tus cambios y haz commit siguiendo las convenciones del proyecto
4. Sube tu rama:
   ```bash
   git push origin feat/nombre-de-la-funcionalidad
   ```
5. Abre un Pull Request hacia la rama `main` con una descripción clara de los cambios realizados

> Asegúrate de seguir las convenciones de código descritas en este README antes de abrir un PR.