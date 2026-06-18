// Hooks
import { useCities } from "../../../../globals/hooks/useCities";
import { useFilterSuppliers } from "../../hooks/useFilterSuppliers";
// Componentes
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
// Modales
import FilterModal from "../../../../globals/components/modals/FilterModal";

export default function FilterSuppliersModal({ filters, setFilters, onClose }) {
  const { form, handleChange } = useFilterSuppliers(filters);
  const { cities } = useCities();

  return (
    <FilterModal
      applyButtonOnClick={() => {
        setFilters({ ...form });
        onClose();
      }}
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      onClose={onClose}
      seeCleanFiltersButton={Object.keys(filters).length > 0}
      cleanFiltersOnClick={() => {
        setFilters({});
        onClose();
      }}
    >
      <div className="flex flex-col gap-2">
        <SelectMenu
          showAllOption
          spanText={"Nombres"}
          name={"name_order"}
          onChange={handleChange}
          value={form.name_order}
          options={[
            { value: "asc", label: "a - Z" },
            { value: "desc", label: "Z - a" },
          ]}
        />

        <SelectMenu
          searchable
          showAllOption
          spanText={"Ciudad"}
          name={"city"}
          onChange={handleChange}
          value={form.city}
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
        />

        <SelectMenu
          showAllOption
          spanText={"Estado"}
          name={"status"}
          onChange={handleChange}
          value={form.status}
          options={[
            { value: 1, label: "Deshabilitado" },
            { value: 2, label: "Activo" },
          ]}
        />
      </div>
    </FilterModal>
  );
}
