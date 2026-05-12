// Hooks
import { useEditOutputOrder } from "../../hooks/useEditOutputOrder";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import DateField from "../../../../globals/components/ui/DateField";
import TagInput from "../../../../globals/components/ui/TagInput";

export default function EditOutputOrderModal({ selectedOutputOrder, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, loading, handleChange, handleSubmit } =
    useEditOutputOrder(selectedOutputOrder);

  return (
    <section className="flex flex-col items-center gap-2">
      <TagInput
        value={form.product_serial}
        labelText="Serial del producto"
        placeholder="ABC123"
        name="product_serial"
        onChange={handleChange}
      />

      <DateField
        id={"output_product_garanty"}
        value={form.output_product_garanty}
        spanText="Fecha de finalización de la garantía"
        name="out_product_garanty"
        onChange={handleChange}
      />

      <SelectMenu
        spanText={"Estado"}
        value={form.output_order_status}
        name={"out_order_status"}
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
          onClose={() => openInnerModal(null)}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle="Error al actualizar la orden de salida"
          errorText="Verifica los datos e inténtalo nuevamente."
          confirmButtonText="Volver"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
