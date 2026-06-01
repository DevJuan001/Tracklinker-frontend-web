// Hooks
import { useEditOutputOrder } from "../../hooks/useEditOutputOrder";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import DateField from "../../../../globals/components/ui/DateField";
import TagInput from "../../../../globals/components/ui/TagInput";

export default function EditOutputOrderModal({ selectedOutputOrder, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, error, loading, handleChange, handleSubmit } =
    useEditOutputOrder(selectedOutputOrder);

  return (
    <section className="flex flex-col items-center gap-2">
      <DateField
        id={"output-product-garanty"}
        name="output_order_date"
        onChange={handleChange}
        value={form.output_order_date}
        spanText="Fecha de finalización de la garantía"
      />

      <TagInput
        id={"product-serials"}
        name="product_serials"
        labelText="Seriales"
        placeholder="ABC123"
        value={form.product_serials}
        onChange={handleChange}
      />

      <SelectMenu
        id={"status-menu"}
        spanText={"Estado"}
        value={form.output_order_status}
        name={"output_order_status"}
        onChange={handleChange}
        options={[
          { value: 1, label: "Deshabilitada" },
          { value: 2, label: "Activa" },
        ]}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Actualizar"}
        cancelText="Cancelar"
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          isOpen={true}
          triggerRef={innerTrigger}
          confirmTitle="¡Orden de salida actualizada!"
          confirmText="La orden de salida se ha modificado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle="No se pudo actualizar la orden de salida"
          errorText={error}
          confirmButtonText="Volver"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
