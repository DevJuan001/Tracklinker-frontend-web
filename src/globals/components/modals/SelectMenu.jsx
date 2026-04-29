import Icon from "../ui/Icon";
import Modal from "./Modal";
import { useSelectMenu } from "../../hooks/useSelectMenu";

export default function SelectMenu({
  name,
  onChange,
  value,
  spanText,
  options = [],
  addIconFunction,
  addIconRef,
  addButtonInvisible = true,
  searchable = false,
}) {
  const {
    open,
    search,
    setSearch,
    triggerRef,
    handleSelect,
    handleClose,
    handleToggle,
  } = useSelectMenu();

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  return (
    <section className="relative w-full flex flex-col gap-1">
      <div className="w-full flex items-center gap-1.5">
        <div
          ref={triggerRef}
          tabIndex={0}
          onClick={handleToggle}
          className="relative w-full h-16 pr-2 pt-2 flex items-center border border-[#a1a1a131] 
          rounded-2xl cursor-pointer text-sm transition-all duration-300 focus-within:shadow-[0_0_3px_2px_#e5e7eb]
          dark:border-[#28282b] dark:text-[#E4E2E5] dark:focus:focus:shadow-[0_0_4px_2px_#ffffff33]"
        >
          <div className="absolute top-2 left-3 px-1">
            <span className="text-xs bg-white text-[#7E777E] dark:bg-black dark:text-[#b4aab4]">
              {spanText}
            </span>
          </div>

          <div className="w-full h-full flex pl-4 pt-3">
            <div className="w-full flex items-center text-base">
              {options.find((opt) => {
                if (opt.value !== "" && !isNaN(opt.value)) {
                  return Number(opt.value) === Number(value);
                }
                return String(opt.value) === String(value);
              })?.label ?? "Seleccionar"}
            </div>
          </div>

          <Icon
            name={"arrow_drop_down"}
            className={`-translate-y-1 dark:invert`}
          />
        </div>
        <button
          ref={addIconRef}
          onClick={(e) => {
            e.stopPropagation();
            if (addIconFunction) addIconFunction(e);
          }}
          disabled={addButtonInvisible}
          type="button"
          className={`h-16 flex items-center justify-center px-5 border rounded-2xl bg-[#e5e5e527]
          ${addButtonInvisible ? "hidden" : "opacity-100"} 
          dark:bg-black dark:border-[#28282b]`}
        >
          <Icon name={"add"} size={22} className="dark:invert" />
        </button>
      </div>

      {open && (
        <Modal
          isOpen={open}
          onClose={handleClose}
          triggerRef={triggerRef}
          growDirection="center"
          type="select"
          z_index="600"
        >
          <div
            className="w-full max-h-96 flex flex-col gap-1.5 overflow-y-auto rounded-3xl bg-white 
            dark:bg-black dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {searchable && (
              <input
                id="search-menu-bar"
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="w-full min-h-14 px-5 sticky top-0.5 text-sm rounded-full border border-[#a1a1a131] 
                  outline-none dark:border-[#28282b]
                  dark:text-white dark:placeholder:text-[#b4aab4]"
              />
            )}
            {filteredOptions.length === 0 ? (
              <div className="min-h-14 flex items-center justify-center text-[#7E777E] gap-2.5">
                <Icon name={"search_off"} />
                <span className="text-center text-sm py-6">
                  No encontraron resultados
                </span>
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected =
                  option.value !== "" && !isNaN(option.value)
                    ? Number(option.value) === Number(value)
                    : String(option.value) === String(value);

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option, name, onChange)}
                    className={`min-h-14 flex items-center px-5 cursor-pointer text-sm rounded-full transition-colors
                  hover:bg-[#efedf0] hover:font-medium  
                  dark:hover:bg-[#ffffff15]
                  ${isSelected ? "bg-[#efedf0] font-medium dark:bg-[#ffffff15]" : ""}`}
                  >
                    <span>{option.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
