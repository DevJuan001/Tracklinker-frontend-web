import { actionsIcons } from "../../../../assets/icons/actionsIcons";

export default function ExportButton() {
  return (
    <button
      className="flex items-center px-4 py-2 gap-2 border rounded-xl shadow-[0px_0px_5px_0.1px_#e5e7eb] text-sm transition-all duration-300
      hover:bg-gray-200
      dark:text-white dark:border-none dark:shadow-[0px_0px_1px_2px_#ffffff20] dark:hover:bg-[#2c2c2e]"
    >
      <img
        src={actionsIcons.uploadIcon}
        alt=""
        className="w-5 h-5 dark:invert"
      />
      <span className="hidden sm:block">Exportar</span>
    </button>
  );
}
