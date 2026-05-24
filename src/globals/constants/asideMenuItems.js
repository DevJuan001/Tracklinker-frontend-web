import { asideIcons } from "../../assets/icons/asideIcons";

export const avatarItem = {
  name: "avatar",
  icon: asideIcons.avatarIcon,
  alt: "Avatar Icon",
};

export const firstSectionItems = [
  {
    name: "Inicio",
    path: "/home",
    icon: "home",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "Panel",
    secondName: "De Control",
    path: "/dashboard",
    icon: "space_dashboard",
    roles: ["Admin"],
  },
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
    name: "Ordenes de salida",
    path: "/output-orders",
    icon: "shuffle",
    roles: ["Admin", "Almacén", "Técnico"],
  },
];

export const secondSectionItems = [
  {
    name: "Ayuda",
    icon: "feedback",
  },
  {
    name: "Cerrar Sesión",
    path: "/",
    icon: "logout",
  },
];

export const mobileRelevantItems = [
  {
    name: "Inicio",
    path: "/home",
    icon: "home",
    roles: ["Admin", "Almacén", "Técnico"],
  },
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
    name: "Informes",
    path: "/reports",
    icon: "finance_mode",
    roles: ["Admin", "Almacén", "Técnico"],
  },
];

export const mobileItems = [
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
    name: "Ordenes",
    path: "/output-orders",
    icon: "shuffle",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "Ayuda",
    icon: "feedback",
    roles: ["Admin", "Almacén", "Técnico"],
  },
  {
    name: "Salir",
    path: "/",
    icon: "logout",
    roles: ["Admin", "Almacén", "Técnico"],
  },
];
