import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import { useFilterOutputOrders } from "../../hooks/useFilterOutputOrders";
import FilterModal from "../../../../globals/components/modals/FilterModal";
import { useActiveClients } from "../../../../globals/hooks/useActiveClients";

export default function FilterOutputOrderModal({
  filters,
  setFilters,
  onClose,
}) {
  const { form, handleChange } = useFilterOutputOrders(filters);
  const { clients } = useActiveClients();

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
      seeCleanFiltersButton={Object.keys(filters).length > 0}
      cleanFiltersOnClick={() => {
        setFilters({});
        onClose();
      }}
    >
      <form
        action={() => setFilters({ ...form })}
        className="flex flex-col gap-2"
      >
        <SelectMenu
          showAllOption
          id={"status-menu"}
          name={"status"}
          spanText={"Estado"}
          value={form.status}
          onChange={handleChange}
          options={[
            { value: 1, label: "Deshabilitada" },
            { value: 2, label: "Activa" },
          ]}
        />

        <SelectMenu
          searchable
          showAllOption
          id={"clients-menu"}
          name={"client_id"}
          spanText={"Cliente"}
          value={form.status}
          onChange={handleChange}
          options={clients.map((client) => ({
            value: client.id,
            label: `${client.name} ${client.first_surname} ${client.second_surname}`,
          }))}
        />
      </form>
    </FilterModal>
  );
}
