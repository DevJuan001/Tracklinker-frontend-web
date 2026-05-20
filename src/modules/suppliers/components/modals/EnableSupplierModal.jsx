// Hooks
import { useEnableSupplier } from "../../hooks/useEnableSupplier";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function EnableSupplierModal({ supplier, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleSubmit } = useEnableSupplier(supplier.id);

  return (
    <div className="flex flex-col justify-center items-center dark:text-white">
      <span>
        ¿Seguro que deseas habilitar a<strong> {supplier.name}</strong>?
      </span>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          location="anchored"
          growDirection={"center-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo habilitar el proveedor!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </div>
  );
}
