import FilterButton from "./FilterButton";
import CreateButton from "./CreateButton";

export default function TopSection({
  sectionVisible = true,
  sectionName,
  addButtonIcon,
  addButtonText,
  children,
  filterOnClick,
  filterButton = true,
  createOnClick,
  createButtonVisibility,
}) {
  return (
    <section
      className={`h-[8%] w-full flex items-center justify-between pb-2 ${sectionVisible ? "block" : "hidden"}
      lg:h-[6%]`}
    >
      <span className="text-sm md:text-xl font-medium dark:text-white">
        {sectionName}
      </span>
      <section
        className="w-full flex justify-end gap-2
        lg:gap-3"
      >
        {children}
        <FilterButton
          onClick={filterOnClick}
          filterButtonVisibility={filterButton}
        />
        <CreateButton
          icon={addButtonIcon}
          text={addButtonText}
          onClick={createOnClick}
          createButtonVisibility={createButtonVisibility}
        />
      </section>
    </section>
  );
}
