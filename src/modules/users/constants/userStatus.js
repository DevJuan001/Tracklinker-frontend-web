import Icon from "../../../globals/components/ui/Icon";

export const userStatus = {
  1: {
    text: "Deshabilitado",
    modalType: "enable",
    fill: false,
    visibilityIcon: false,
    icon: "block",
    styles:
      "w-32 bg-gray-50 text-gray-400 border-gray-300 dark:border-gray-700 dark:bg-[#75777e80]",
  },
  2: {
    text: "Activo",
    modalType: "disable",
    fill: true,
    visibilityIcon: true,
    icon: "circle",
    styles:
      "w-20 bg-green-200 text-green-600 border-green-300 dark:border-green-900 dark:text-[#00ff3779] dark:bg-[#00ff151f]",
  },
};
