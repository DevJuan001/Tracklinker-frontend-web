export const userStatus = {
  1: {
    text: "Deshabilitado",
    modalType: "enable",
    fill: false,
    visibilityIcon: false,
    icon: "block",
    styles: `w-32 flex items-center pl-1.5 gap-1 py-0.5 rounded-2xl bg-gray-50 text-gray-400 border-gray-200 
      dark:border-gray-800 dark:bg-[#75777e80]`,
  },

  2: {
    text: "Activo",
    modalType: "disable",
    fill: true,
    visibilityIcon: true,
    icon: "circle",
    styles: `w-20 flex items-center pl-1.5 gap-1 py-0.5 rounded-2xl bg-green-200 text-green-600 border-green-200 
      dark:border-green-950 dark:text-[#00ff3779] dark:bg-[#00ff151f]`,
  },
};
