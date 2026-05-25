import Icon from "../../../../globals/components/ui/Icon";

export default function ExportButton({ openModal, exportData }) {
  return (
    <button
      onClick={(e) => openModal(exportData, "editStatus", null, e.currentTarget)}
      className="flex items-center px-4 py-2 gap-2 border rounded-xl shadow-[0px_0px_5px_0.1px_#e5e7eb] text-sm transition-all duration-300
      hover:bg-gray-200
      dark:text-white dark:border-none dark:shadow-[0px_0px_1px_2px_#ffffff20] dark:hover:bg-[#2c2c2e]"
    >
      <Icon name={"download"} size={21} />

      <span className="hidden sm:block">Exportar</span>
    </button>
  );
}
