export const items = [
  {
    name: "Usuarios",
    path: "/users",
    icon: "groups",
    roles: ["Admin"],
  },
  {
    name: "Productos",
    path: "/products",
    icon: "shopping_cart",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "Categorias",
    path: "/categories",
    icon: "folder_open",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "Subcategorias",
    path: "/subcategories",
    icon: "folder_copy",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "Informes",
    path: "/reports",
    icon: "finance_mode",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "Garantías",
    path: "/warranties",
    icon: "service_toolbox",
    roles: ["Admin", "Técnico"],
  },
  {
    name: "Proveedores",
    path: "/suppliers",
    icon: "group",
    roles: ["Admin", "Almacén"],
  },
  {
    name: "Salidas",
    path: "/output-orders",
    icon: "shuffle",
    roles: ["Admin", "Almacén"],
  },
  {
    name: "Transformaciones",
    path: "/transformations",
    icon: "swap_horiz",
    roles: ["Admin", "Técnico"],
  },
];
