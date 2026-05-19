import { useCatalog } from "../../hooks/useCatalog";
import { useFilterProducts } from "../../hooks/useFilterProducts";
import FilterModal from "../../../../globals/components/modals/FilterModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";

export default function ProductsFilterModal({
  filters,
  setFilters,
  onClose,
}) {
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
      onClose={onClose}
    >
      <div className="w-full flex flex-col gap-2">
        {/* Ordenar Por Orden de entrada*/}
        <SelectMenu
          searchable
          name={"input_order"}
          spanText={"Orden de entrada"}
          value={form.input_order}
          onChange={handleChange}
          options={inputOrders.map((input_order) => ({
            value: input_order.id,
            label: input_order.bill,
          }))}
          minHeight="384px"
        />

        {/* Ordenar Por Categoría */}
        <SelectMenu
          searchable
          id={"order-by-category-menu"}
          name={"category_order"}
          spanText={"Categoria"}
          value={form.category_order}
          onChange={handleChange}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          minHeight="384px"
        />

        {/* Ordenar Por Subcategoria */}
        <SelectMenu
          searchable
          width={"w-full"}
          spanText={"Subcategoria"}
          value={form.subcategory_order}
          id={"order-by-subcategory-menu"}
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
          minHeight="384px"
        />

        {/* Ordenar Por Marca */}
        <SelectMenu
          searchable
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
          minHeight="384px"
        />

        {/* Ordenar Por Modelo */}
        <SelectMenu
          searchable
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
          minHeight="384px"
        />

        {/* Ordenar por estado */}
        <SelectMenu
          spanText={"Estado"}
          name={"product_status"}
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
          spanText={"Tiempo de garantía restante"}
          id={"order-by-warranty-menu"}
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
