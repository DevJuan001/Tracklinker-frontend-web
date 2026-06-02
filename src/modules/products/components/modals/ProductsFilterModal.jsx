import { useCatalog } from "../../hooks/useCatalog";
import { useFilterProducts } from "../../hooks/useFilterProducts";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import FilterModal from "../../../../globals/components/modals/FilterModal";

export default function ProductsFilterModal({ filters, setFilters, onClose }) {
  const { categories, subcategories, inputOrders, models, brands } =
    useCatalog();
  const { form, handleChange } = useFilterProducts(filters);

  return (
    <FilterModal
      applyButtonOnClick={() => {
        onClose();
        setFilters({ ...form });
      }}
      fieldName="Ingreso"
      orderByStartDateOnChange={handleChange}
      orderByStartDateValue={form.start_date}
      orderByFinishDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      seeCleanFiltersButton={Object.keys(filters).length > 0}
      cleanFiltersOnClick={() => {
        setFilters({});
        onClose();
      }}
      onClose={onClose}
    >
      <div className="w-full flex flex-col gap-2">
        {/* Ordenar Por Orden de entrada*/}
        <SelectMenu
          showAllOption
          searchable
          id={"filter-input-order-menu"}
          name={"input_order"}
          spanText={"Orden de entrada"}
          value={form.input_order}
          onChange={handleChange}
          options={inputOrders.map((input_order) => ({
            value: input_order.id,
            label: input_order.bill,
          }))}
        />

        {/* Ordenar Por Categoría */}
        <SelectMenu
          showAllOption
          searchable
          id={"filter-category-menu"}
          name={"category_order"}
          spanText={"Categoria"}
          value={form.category_order}
          onChange={handleChange}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />

        {/* Ordenar Por Subcategoria */}
        <SelectMenu
          showAllOption
          searchable
          spanText={"Subcategoria"}
          value={form.subcategory_order}
          id={"filter-subcategory-menu"}
          onChange={handleChange}
          name={"subcategory_order"}
          options={subcategories
            .filter(
              (subcategory) =>
                !form.category_order ||
                subcategory.category_id === form.category_order,
            )
            .map((subcategory) => ({
              value: subcategory.subcategory_id,
              label: subcategory.subcategory_name,
            }))}
        />

        {/* Ordenar Por Marca */}
        <SelectMenu
          showAllOption
          searchable
          id={"filter-brand-menu"}
          name={"brand"}
          spanText={"Marca"}
          value={form.brand}
          onChange={handleChange}
          options={brands
            .filter(
              (brand) =>
                !form.subcategory_order ||
                (brand.subcategories ?? "")
                  .split(",")
                  .includes(String(form.subcategory_order)),
            )
            .map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))}
        />

        {/* Ordenar Por Modelo */}
        <SelectMenu
          showAllOption
          searchable
          id={"filter-model-menu"}
          name={"product_model"}
          spanText={"Modelo"}
          value={form.product_model}
          onChange={handleChange}
          options={models
            .filter((model) => !form.brand || model.brand === form.brand)
            .map((model) => ({
              value: model.id,
              label: model.model,
            }))}
        />

        {/* Ordenar por estado */}
        <SelectMenu
          showAllOption
          id={"filter-status-menu"}
          name={"product_status"}
          spanText={"Estado"}
          value={form.product_status}
          onChange={handleChange}
          options={[
            { value: 1, label: "Deshabilitado" },
            { value: 2, label: "Activo" },
            { value: 3, label: "Vendido" },
            { value: 4, label: "En Garantía" },
          ]}
        />

        {/* Ordenar por Tiempo de Garantía */}
        <SelectMenu
          showAllOption
          id={"order-by-warranty-menu"}
          spanText={"Tiempo de garantía restante"}
          name={"warranty_time"}
          value={form.warranty_time}
          onChange={handleChange}
          options={[
            { value: "3", label: "Menos de 3 Meses" },
            { value: "6", label: "Menos de 6 Meses" },
            { value: "12", label: "Menos de 12 Meses" },
            { value: "18", label: "Menos de 18 Meses" },
            { value: "24", label: "Menos de 24 Meses" },
          ]}
        />
      </div>
    </FilterModal>
  );
}
