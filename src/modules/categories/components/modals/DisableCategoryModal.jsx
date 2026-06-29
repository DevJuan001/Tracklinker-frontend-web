// Hooks
import { useDisableCategory } from "../../hooks/useDisableCategory";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import Loader from "../../../../globals/components/ui/Loader";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableCategoryModal({ category, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleDisable } = useDisableCategory(category.id);

  return (
    <section
      className="flex flex-col justify-center items-center 
      dark:text-white"
    >
      <span>
        ¿Seguro que deseas deshabilitar la categoría
        <span className="font-medium"> {category.name}</span>?
      </span>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleDisable(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          location="anchored"
          growDirection={"center-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo deshabilitar la categoría!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
