import Icon from "../../../../globals/components/ui/Icon";

export default function ReturnButton({ onClick }) {
  return (
    <button
      className="flex items-center gap-1 px-3.5 py-1.5 border rounded-xl shadow-[0px_0px_5px_0.1px_#e5e7eb] transition-all duration-300
      hover:bg-gray-200
      dark:text-white dark:border-[#1e1e209f] dark:hover:bg-[#2c2c2e] dark:shadow-[0px_0px_1px_2px_#ffffff20]"
      onClick={onClick}
    >
      <Icon name={"arrow_back"} size={20} />

      <span className="hidden text-sm md:block">Volver</span>
    </button>
  );
}
