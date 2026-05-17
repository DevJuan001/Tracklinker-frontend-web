import FilterModal from "../../../../globals/components/modals/FilterModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import { useFilterOutputOrders } from "../../hooks/useFilterOutputOrders";

export default function FilterOutputOrderModal({ setFilters, onClose }) {
  const { form, handleChange } = useFilterOutputOrders();

  return (
    <FilterModal
      onClose={onClose}
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      applyButtonOnClick={() => {
        setFilters({ ...form });
        onClose();
      }}
    >
      <SelectMenu
        id={"status"}
        name={"status"}
        spanText={"Estado"}
        value={form.status}
        onChange={handleChange}
        options={[
          { value: 1, label: "Deshabilitada" },
          { value: 2, label: "Activa" },
        ]}
      />
    </FilterModal>
  );
}
