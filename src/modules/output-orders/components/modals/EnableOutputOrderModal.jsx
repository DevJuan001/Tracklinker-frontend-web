// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useEnableOutputOrder } from "../../hooks/useEnableOutputOrder";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function EnableOutputOrdersModal({
  selectedOutputOrder,
  onClose,
}) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleSubmit } = useEnableOutputOrder(
    selectedOutputOrder.output_order_id,
  );

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <span>
        ¿Estás seguro de que deseas habilitar la orden de salida N°{" "}
        <span className="font-medium">
          {selectedOutputOrder.output_order_id}
        </span>
        ?
      </span>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
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
          errorTitle={"¡No se pudo habilitar la orden de salida!"}
          errorText={error}
          onClose={onClose}
        />
      )}
    </section>
  );
}
