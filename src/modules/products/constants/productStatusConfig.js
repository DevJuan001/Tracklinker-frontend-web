import { usersIcons } from "../../../assets/icons/usersIcons";
import { productsIcons } from "../../../assets/icons/productsIcons";

export const productStatusConfig = {
  1: {
    text: "Deshabilitado",
    modalType: "disable",
    optionText: "Deshabilitar",
    optionStyles:
      "hover:bg-red-100 text-red-600 dark:hover:bg-[#450a0a8a]",
    visibilityIcon: false,
    icon: usersIcons.inactiveCircle,
    styles:
      "w-32 bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400",
  },
  2: {
    text: "Activo",
    modalType: "enable",
    optionText: "Habilitar",
    optionStyles:
      "hover:bg-green-100 text-green-600 dark:hover:bg-[#082e05b2]",
    visibilityIcon: true,
    icon: usersIcons.activeCircle,
    styles:
      "w-20 bg-green-100 text-green-600 dark:bg-[#00ff151f] dark:text-[#00ff3779]",
  },
  3: {
    text: "Vendido",
    optionText: "Vender",
    optionStyles:
      "hover:bg-blue-100 text-blue-600 dark:hover:bg-[#1725548c]",
    visibilityIcon: true,
    icon: productsIcons.paymentCard,
    styles:
      "w-20 bg-blue-100 text-blue-600 dark:bg-[#1e3a5f] dark:text-[#60a5fa]",
  },
  4: {
    text: "En garantía",
    optionText: "Agregar garantía",
    optionStyles:
      "hover:bg-amber-100 text-amber-600 dark:text-amber-400 dark:hover:bg-[#4541036b]",
    modalType: "addWarranty",
    visibilityIcon: true,
    icon: productsIcons.clockIcon,
    styles:
      "w-28 bg-amber-100 text-amber-600 dark:bg-[#2d1f00] dark:text-[#fbbe24b6]",
  },
};
