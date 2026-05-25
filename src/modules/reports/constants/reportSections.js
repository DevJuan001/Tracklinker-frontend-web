export const sections = [
  {
    name: "users",
    cardName: "Reporte de usuarios",
    icon: "groups",
    roles: ["Admin"],
  },
  {
    name: "products",
    cardName: "Reporte de productos",
    icon: "shopping_cart",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "categories",
    cardName: "Reporte de categorias",
    icon: "folder_open",
    roles: ["Admin", "Almacén"],
  },
  {
    name: "subcategories",
    cardName: "Reporte de subcategorias",
    icon: "folder_copy",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "warranties",
    cardName: "Reporte de garantías",
    icon: "service_toolbox",
    roles: ["Admin", "Técnico"],
  },
  {
    name: "suppliers",
    cardName: "Reporte de proveedores",
    icon: "group",
    roles: ["Admin", "Almacén"],
  },
  {
    name: "outputs",
    cardName: "Reporte de salidas",
    icon: "shuffle",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "tranformations",
    cardName: "Reporte de transformaciones",
    icon: "swap_horiz",
    roles: ["Admin", "Almacén", "Técnico"],
  },
];
