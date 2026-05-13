import FilterModal from "../../../../globals/components/modals/FilterModal";
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
      <div></div>
    </FilterModal>
  );
}
