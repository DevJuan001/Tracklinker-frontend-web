// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useUpdateProductStatus } from "../../hooks/useUpdateProductStatus";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableProductModal({ product, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { handleSubmit, loading, error } = useUpdateProductStatus({
    product_id: product.product_id,
    product_serial: product.product_serial,
    status: 1,
  });

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <span className="text-start">
        ¿Estás seguro/a que deseas deshabilitar el producto con serial{" "}
        <span className="font-medium">{product.product_serial}</span>?
      </span>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        itemsPosition="end"
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
          errorTitle={"¡No se pudo deshabilitar el producto!"}
          errorText={error}
          onClose={closeInnerModal}
        />
      )}
    </section>
  );
}
