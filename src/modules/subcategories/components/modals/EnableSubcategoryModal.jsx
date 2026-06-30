// Hooks
import { useEnableSubcategory } from "../../hooks/useEnableSubcategory";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function EnableSubcategoryModal({ subcategory, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { loading, error, handleSubmit } = useEnableSubcategory(
    subcategory.subcategory_id,
  );

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <span>
        ¿Seguro que deseas habilitar la subcategoria
        <span className="font-medium"> {subcategory.subcategory_name}</span>?
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
          location="anchored"
          growDirection={"center-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo deshabilitar la categoría!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </section>
  );
}
