import FilterModal from "../../../../globals/components/modals/FilterModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import { useCities } from "../../../users/hooks/useCities";
import { useFilterSuppliers } from "../../hooks/useFilterSuppliers";

export default function FilterSuppliersModal({ setFilters, onClose }) {
  const { form, handleChange } = useFilterSuppliers();
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
    >
      <div className="flex flex-col gap-2">
        <SelectMenu
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
