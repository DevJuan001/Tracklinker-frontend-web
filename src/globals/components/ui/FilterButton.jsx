import Icon from "./Icon";

export default function FilterButton({ onClick, filterButtonVisibility }) {
  return (
    <button
      className={`flex items-center px-5 py-2.5 gap-2 rounded-3xl bg-[#efedf0] transition duration-200 border border-gray-200 hover:bg-gray-300
        dark:bg-[#202022] dark:hover:bg-[#38383b] dark:shadow-none dark:border-none
        ${filterButtonVisibility ? "block" : "hidden"}`}
      onClick={onClick}
    >
      <Icon name={"page_info"} size={24} className="dark:text-[#C5C6CE]" />
      <span className="hidden font-medium dark:text-[#C5C6CE] lg:block">
        Filtrar
      </span>
    </button>
  );
}
