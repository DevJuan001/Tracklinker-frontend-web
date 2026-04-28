// Aqui se almacenan constantes que su contenido son listas fijas y cosas que casi nunca cambian
import { asideIcons } from "../assets/icons/asideIcons";
import { logout } from "../modules/login/services/authService";

export const avatarItem = {
  name: "avatar",
  path: "",
  icon: asideIcons.avatarIcon,
  alt: "Avatar Icon",
};

export const firstSectionItems = [
  {
    name: "Inicio",
    path: "/home",
    icon: "home",
  },
  {
    name: "Panel",
    nameTwo: "De Control",
    path: "/dashboard",
    icon: "space_dashboard",
  },
  {
    name: "Usuarios",
    path: "/users",
    icon: "groups",
  },
  {
    name: "Productos",
    path: "/products",
    icon: "shopping_cart",
  },
  {
    name: "Categorias",
    path: "/categories",
    icon: "folder_open",
  },
  {
    name: "Subcategorias",
    path: "/subcategories",
    icon: "folder_copy",
  },
  {
    name: "Informes",
    path: "/reports",
    icon: "finance_mode",
  },
  {
    name: "Garantías",
    path: "/warranties",
    icon: "service_toolbox",
  },
  {
    name: "Proveedores",
    path: "/suppliers",
    icon: "group",
  },
  {
    name: "Ordenes de salida",
    path: "/transformations",
    icon: "shuffle",
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
    onClick: logout || null,
  },
];

export const mobileRelevantItems = [
  {
    name: "Inicio",
    path: "/home",
    icon: "home",
  },
  {
    name: "Usuarios",
    path: "/users",
    icon: "person",
  },
  {
    name: "Productos",
    path: "/products",
    icon: "shopping_cart",
  },
  {
    name: "Informes",
    path: "/reports",
    icon: "finance_mode",
  },
];

export const mobileItems = [
  {
    name: "Categorias",
    path: "/categories",
    icon: "folder_open",
  },
  {
    name: "Subcategorias",
    path: "/subcategories",
    icon: "folder_copy",
  },
  {
    name: "Informes",
    path: "/reports",
    icon: "finance_mode",
  },
  {
    name: "Garantías",
    path: "/warranties",
    icon: "service_toolbox",
  },
  {
    name: "Proveedores",
    path: "/suppliers",
    icon: "group",
  },
  {
    name: "Ordenes",
    path: "/transformations",
    icon: "shuffle",
  },
  {
    name: "Salir",
    path: "/",
    icon: "logout",
    onClick: logout,
  },
];
