export const warrantyStatusConfig = {
  1: {
    text: "Deshabilitada",
    optionText: "Deshabilitar",
    icon: "block",
    fill: false,
    optionStyles:
      "hover:bg-red-100 text-red-600 dark:text-[#ff00008e] dark:bg-[#ff00002f]",
    styles: "bg-gray-50 text-gray-400 dark:text-gray-300 dark:bg-[#ff00002f]",
  },
  2: {
    text: "Pendiente",
    optionText: "Activar",
    fill: true,
    icon: "circle",
    optionStyles:
      "hover:bg-gray-200 text-gray-600 dark:text-[#ff00008e] dark:bg-[#ff00002f]",
    styles: "bg-red-50 text-red-600 dark:text-[#ff00008e] dark:bg-[#ff00002f]",
  },
  3: {
    text: "En Proceso",
    optionText: "Empezar",
    icon: "circle",
    fill: true,
    optionStyles:
      "hover:bg-yellow-100 text-yellow-500 dark:text-[#eeff009d] dark:bg-[#fbff001f]",
    styles:
      "bg-yellow-50 text-yellow-500 dark:text-[#eeff009d] dark:bg-[#fbff001f]",
  },
  4: {
    text: "Completada",
    optionText: "Marcar como completada",
    icon: "check_circle",
    fill: true,
    optionStyles:
      "hover:bg-green-100 text-green-600 dark:text-[#00ff3779] dark:bg-[#00ff151f]",
    styles:
      "bg-green-50 text-green-600 dark:text-[#00ff3779] dark:bg-[#00ff151f]",
  },
};
