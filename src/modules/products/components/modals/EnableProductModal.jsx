// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useUpdateProductStatus } from "../../hooks/useUpdateProductStatus";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function EnableProductModal({ product, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleSubmit } = useUpdateProductStatus({
    product_id: product.product_id,
    product_serial: product.product_serial,
    status: 2,
  });

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p className="text-center">
        ¿Seguro/a que deseas habilitar el producto con serial{" "}
        <span className="font-medium">{product.product_serial}</span>?
      </p>

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
          triggerRef={innerTrigger}
          isOpen={true}
          location="anchored"
          growDirection={"center"}
          confirmButtonText={"Volver a intentarlo"}
          errorTitle={"¡No se pudo habilitar el producto!"}
          errorText={error}
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
