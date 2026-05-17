// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useDisableOutputOrder } from "../../hooks/useDisableOutputOrder";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableOutputOrderModal({
  selectedOutputOrder,
  onClose,
}) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleSubmit } = useDisableOutputOrder(
    selectedOutputOrder.output_order_id,
  );

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Estás seguro de que deseas deshabilitar la orden de salida N°{" "}
        <span className="font-medium">
          {selectedOutputOrder.output_order_id}
        </span>
        ?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          errorTitle={"¡No se pudo deshabilitar la orden de salida!"}
          errorText={error}
          onClose={onClose}
        />
      )}
    </section>
  );
}
