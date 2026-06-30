// Hooks
import { useDisableSupplier } from "../../hooks/useDisableSupplier";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableSupplierModal({ supplier, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { loading, error, handleSubmit } = useDisableSupplier(supplier.id);

  return (
    <div className="flex flex-col justify-center items-center dark:text-white">
      <span>
        ¿Seguro que deseas deshabilitar a<strong> {supplier.name}</strong>?
      </span>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          location="anchored"
          growDirection={"center-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo deshabilitar el proveedor!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </div>
  );
}
