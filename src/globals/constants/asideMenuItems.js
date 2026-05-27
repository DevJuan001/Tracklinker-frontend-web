import { asideIcons } from "../../assets/icons/asideIcons";

export const avatarItem = {
  name: "avatar",
  icon: asideIcons.avatarIcon,
  alt: "Avatar Icon",
};

export const firstSectionItems = [
  {
    itemId: "home",
    name: "Inicio",
    path: "/home",
    icon: "home",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "dashboard",
    name: "Panel",
    secondName: "De Control",
    path: "/dashboard",
    icon: "space_dashboard",
    roles: ["Admin"],
  },
  {
    itemId: "users",
    name: "Usuarios",
    path: "/users",
    icon: "groups",
    roles: ["Admin"],
  },
  {
    itemId: "products",
    name: "Productos",
    path: "/products",
    icon: "shopping_cart",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "categories",
    name: "Categorias",
    path: "/categories",
    icon: "folder_open",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "subcategories",
    name: "Subcategorias",
    path: "/subcategories",
    icon: "folder_copy",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "reports",
    name: "Informes",
    path: "/reports",
    icon: "finance_mode",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "warranties",
    name: "Garantías",
    path: "/warranties",
    icon: "service_toolbox",
    roles: ["Admin", "Técnico"],
  },
  {
    itemId: "suppliers",
    name: "Proveedores",
    path: "/suppliers",
    icon: "group",
    roles: ["Admin", "Almacén"],
  },
  {
    itemId: "outputs",
    name: "Ordenes",
    secondName: "de salida",
    path: "/output-orders",
    icon: "shuffle",
    roles: ["Admin", "Almacén", "Técnico"],
  },
];

export const secondSectionItems = [
  {
    itemId: "help",
    name: "Ayuda",
    icon: "feedback",
  },
  {
    itemId: "logout",
    name: "Cerrar Sesión",
    path: "/",
    icon: "logout",
  },
];

export const mobileRelevantItems = [
  {
    itemId: "home",
    name: "Inicio",
    path: "/home",
    icon: "home",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "users",
    name: "Usuarios",
    path: "/users",
    icon: "groups",
    roles: ["Admin"],
  },
  {
    itemId: "products",
    name: "Productos",
    path: "/products",
    icon: "shopping_cart",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "reports",
    name: "Informes",
    path: "/reports",
    icon: "finance_mode",
    roles: ["Admin", "Almacén", "Técnico"],
  },
];

export const mobileItems = [
  {
    itemId: "categories",
    name: "Categorias",
    path: "/categories",
    icon: "folder_open",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "subcategories",
    name: "Subcategorias",
    path: "/subcategories",
    icon: "folder_copy",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "warranties",
    name: "Garantías",
    path: "/warranties",
    icon: "service_toolbox",
    roles: ["Admin", "Técnico"],
  },
  {
    itemId: "suppliers",
    name: "Proveedores",
    path: "/suppliers",
    icon: "group",
    roles: ["Admin", "Almacén"],
  },
  {
    itemId: "outputs",
    name: "Ordenes",
    path: "/output-orders",
    icon: "shuffle",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "help",
    name: "Ayuda",
    icon: "feedback",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    itemId: "logout",
    name: "Salir",
    path: "/",
    icon: "logout",
    roles: ["Admin", "Almacén", "Técnico"],
  },
];
