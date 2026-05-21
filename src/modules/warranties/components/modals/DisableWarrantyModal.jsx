// Hooks
import { useDisableWarranty } from "../../hooks/useDisableWarranty";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableWarrantyModal({ selectedWarranty, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleSubmit } = useDisableWarranty(selectedWarranty);

  return (
    <div className="flex flex-col items-center">
      <p className="text-center">
        ¿Estás seguro de que deseas deshabilitar al garantía del producto con el
        serial {""}
        <span className="font-medium">{selectedWarranty?.product_serial}</span>?
      </p>

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        confirmBgColor="red-600"
        cancelButtonOnClick={onClose}
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        disabled={loading}
      />

      {innerType === "error" && (
        <ErrorModal
          trigger={innerTrigger}
          isOpen={true}
          location="anchored"
          growDirection={"center"}
          onClose={() => openInnerModal(null)}
          errorTitle={"¡No se pudo deshabilitar la garantía!"}
          errorText={error}
        />
      )}
    </div>
  );
}
