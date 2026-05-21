import { useCities } from "../../../../globals/hooks/useCities";
import { useFilterWarranties } from "../../hooks/useFilterWarranties";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import FilterModal from "../../../../globals/components/modals/FilterModal";

export default function FilterWarrantyModal({ filters, setFilters, onClose }) {
  const { form, handleChange } = useFilterWarranties(filters);
  const { cities } = useCities();

  return (
    <FilterModal
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      onClose={onClose}
      applyButtonOnClick={() => {
        setFilters({ ...form });
        onClose();
      }}
      seeCleanFiltersButton={Object.keys(filters).length > 0}
      cleanFiltersOnClick={() => {
        setFilters({});
        onClose();
      }}
    >
      <div className="flex flex-col gap-2">
        <SelectMenu
          searchable
          name={"city"}
          spanText={"Ciudad"}
          value={form.city}
          onChange={handleChange}
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
        />

        <SelectMenu
          name={"status"}
          value={form.status}
          onChange={handleChange}
          spanText={"Estado"}
          options={[
            { value: 1, label: "Deshabilitada" },
            { value: 2, label: "Pendiente" },
            { value: 3, label: "En Proceso" },
            { value: 4, label: "Completada" },
          ]}
        />
      </div>
    </FilterModal>
  );
}
