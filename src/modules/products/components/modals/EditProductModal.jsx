// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCatalog } from "../../hooks/useCatalog";
import { useEditProduct } from "../../hooks/useEditProduct";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import Calendar from "../../../../globals/components/ui/Calendar";
import FormField from "../../../../globals/components/ui/FormField";
import DateField from "../../../../globals/components/ui/DateField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import AddOutputOrderModal from "../../../output-orders/components/modals/AddOutputOrderModal";

export default function EditProductModal({ selectedProduct, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { subcategories, brands, models, inputOrders } = useCatalog();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useEditProduct(selectedProduct);

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="w-full flex flex-col items-center gap-2.5"
    >
      <SelectMenu
        searchable
        id={"input-orders-menu"}
        name={"input_order_id"}
        value={form.input_order_id}
        spanText={"Orden de entrada"}
        onChange={handleChange}
        options={inputOrders.map((input_order) => ({
          value: input_order.id,
          label: input_order.bill,
        }))}
        className={fieldError("input_order_id")}
      />

      <SelectMenu
        searchable
        id={"subcategories-menu"}
        name={"subcategory_id"}
        value={form.subcategory_id}
        spanText={"Subcategoria"}
        onChange={handleChange}
        options={subcategories.map((subcategory) => ({
          value: subcategory.subcategory_id,
          label: subcategory.subcategory_name,
        }))}
        className={fieldError("subcategory_id")}
      />

      <SelectMenu
        searchable
        id={"brands-menu"}
        name={"brand_id"}
        value={form.brand_id}
        spanText={"Marca"}
        onChange={handleChange}
        options={brands
          .filter(
            (brand) =>
              !form.subcategory_id ||
              (brand.subcategories ?? "")
                .split(",")
                .includes(String(form.subcategory_id)),
          )
          .map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
        className={fieldError("brand_id")}
      />

      <SelectMenu
        searchable
        id={"models-menu"}
        name={"model_id"}
        value={form.model_id}
        spanText={"Modelo"}
        onChange={handleChange}
        options={models
          .filter((model) => !form.brand_id || model.brand === form.brand_id)
          .map((model) => ({
            value: model.id,
            label: model.model,
          }))}
        className={fieldError("model_id")}
      />

      <FormField
        id={"product_serial"}
        name={"product_serial"}
        labelText={"Serial"}
        value={form.product_serial}
        onChange={handleChange}
        className={fieldError("product_serial")}
      />

      <DateField
        id={"edit-warranty-time"}
        name={"warranty_time"}
        value={form.warranty_time}
        spanText={"Tiempo de garantía"}
        onChange={handleChange}
        className={fieldError("warranty_time")}
      />

      <SelectMenu
        id={"status-menu"}
        name={"status"}
        spanText={"Estado"}
        value={form.status}
        onChange={handleChange}
        options={[
          { value: 1, label: "Deshabilitado" },
          { value: 2, label: "Activo" },
          { value: 3, label: "Vendido" },
          { value: 4, label: "En garantía" },
        ]}
        className={fieldError("status")}
      />

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Editar"}
        cancelButtonOnClick={onClose}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
      />

      {/* Modales internos */}
      {innerType === "calendar" && (
        <Calendar onClose={closeInnerModal} triggerRef={innerTrigger} />
      )}

      {innerType === "sell" && (
        <AddInnerModal
          isOpen={true}
          title={"Vender Producto"}
          location={"center"}
          triggerRef={innerTrigger}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        >
          <AddOutputOrderModal
            serial={form?.product_serial}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </AddInnerModal>
      )}

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
          confirmTitle={"Producto Editado Correctamente"}
          confirmText={
            "El producto ha sido editado correctamente, ya puedes volver y verlo en la lista de productos."
          }
          confirmButtonText={"Volver a la página"}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={closeInnerModal}
          errorTitle={"Error al editar el producto"}
          errorText={error}
          confirmButtonText={"Volver a intentarlo"}
        />
      )}
    </form>
  );
}
