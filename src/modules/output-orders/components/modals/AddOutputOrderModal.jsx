// Hooks
import { useCreateOutputOrder } from "../../hooks/useCreateOutputOrder";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import TagInput from "../../../../globals/components/ui/TagInput";
import FormField from "../../../../globals/components/ui/FormField";
import DateField from "../../../../globals/components/ui/DateField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddOutputOrderModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  const { form, loading, fieldError, handleSubmit, handleChange } =
    useCreateOutputOrder();

  return (
    <section className="flex flex-col items-center gap-2">
      <DateField
        onChange={handleChange}
        id={"output_product_garanty"}
        name="output_product_garanty"
        spanText={"Tiempo de garantia"}
        value={form.output_product_garanty || "yyyy-mm-dd"}
        className={fieldError("output_product_garanty")}
      />

      <TagInput
        id={"product_serials"}
        name={"product_serials"}
        labelText={"Seriales"}
        placeholder={"QTYC123**"}
        value={form.product_serials}
        onChange={handleChange}
        className={fieldError("product_serials")}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelText="Cancelar"
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle="¡Transformación registrada con éxito!"
          confirmText="La transformación se ha guardado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="Error al registrar la transformación"
          errorText="Verifica los datos e inténtalo nuevamente."
          confirmButtonText="Volver"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
