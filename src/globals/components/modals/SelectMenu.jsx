import Icon from "../ui/Icon";
import Modal from "./Modal";
import { useSelectMenu } from "../../hooks/useSelectMenu";

export default function SelectMenu({
  id,
  name,
  onChange,
  value,
  spanText,
  options = [],
  addIconFunction,
  addIconRef,
  addButtonInvisible = true,
  searchable = false,
  growDirection = "center",
  className,
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
      <div className="h-[66px] w-full flex items-center gap-1.5">
        <div
          id={id}
          ref={triggerRef}
          onClick={handleToggle}
          className={`relative w-full ${spanText ? "h-full pt-1.5" : "h-14"} pr-2 flex items-center bg-[#FBF9FC] border border-[#a1a1a131]
          rounded-2xl cursor-pointer text-sm
          dark:bg-black dark:border-[#1e1e20cb]
          ${className}`}
        >
          {spanText && (
            <div className="absolute top-2 left-3 px-1">
              <span className="text-xs bg-[#FBF9FC] text-[#7E777E] dark:bg-black dark:text-[#7E8088]">
                {spanText}
              </span>
            </div>
          )}

          <div
            className={`w-full h-full flex pl-4 ${spanText ? "pt-3" : "pt-0"} dark:text-[#E4E2E5]`}
          >
            <div className="w-full flex items-center text-base">
              {options.find((opt) => {
                if (opt.value !== "" && !isNaN(opt.value)) {
                  return Number(opt.value) === Number(value);
                }
                return String(opt.value) === String(value);
              })?.label ?? "Seleccionar"}
            </div>
          </div>

          <Icon name={"arrow_drop_down"} className={`dark:text-[#7e8088]`} />
        </div>
        <button
          ref={addIconRef}
          onClick={(e) => {
            e.stopPropagation();
            if (addIconFunction) addIconFunction(e);
          }}
          disabled={addButtonInvisible}
          type="button"
          className={`h-16 flex items-center justify-center px-5 border rounded-2xl transition-colors duration-200 bg-[#FBF9FC] shadow-sm
          ${addButtonInvisible ? "hidden" : "opacity-100"}
          hover:bg-gray-200
          dark:bg-black dark:border-[#1e1e20cb]`}
        >
          <Icon name={"add"} size={22} className="dark:text-[#7e8088]" />
        </button>
      </div>

      {open && (
        <Modal
          isOpen={open}
          onClose={handleClose}
          triggerRef={triggerRef}
          growDirection={growDirection}
          type="select"
          z_index="600"
        >
          <div
            className={`w-full max-h-96 flex flex-col gap-1 px-1 pt-1 overflow-y-auto rounded-3xl bg-[#fbf9fc]
            dark:bg-black dark:text-white  
            ${options.length > 6 ? "min-h-96" : "min-h-24"}
            `}
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
                className="w-full min-h-[50px] px-5 sticky top-0.5 text-sm rounded-full border border-[#a1a1a131] outline-none
                dark:border-[#28282ba1] dark:bg-black dark:text-white dark:placeholder:text-[#b4aab4]"
              />
            )}
            {filteredOptions.length === 0 ? (
              <div className="min-h-[50px] flex items-center justify-center text-[#7E777E] gap-2.5">
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
                    className={`min-h-[52px] flex items-center px-5 cursor-pointer text-sm rounded-full transition-colors
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
