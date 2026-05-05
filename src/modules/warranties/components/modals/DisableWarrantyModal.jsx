// Hooks
import { useDisableWarranty } from "../../hooks/useDisableWarranty";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableWarrantyModal({ selectedWarranty, onClose }) {
  const { handleSubmit, loading } = useDisableWarranty(selectedWarranty);

  return (
    <div className="flex flex-col items-center">
      <p className="text-center">
        ¿Estás seguro de que deseas deshabilitar al garantía del producto con el
        serial {""}
        <span className="font-medium">{selectedWarranty?.product_serial}</span>?
      </p>

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, onClose)}
        confirmBgColor="red-600"
        cancelButtonOnClick={onClose}
        confirmText={loading ? <Loader /> : "Deshabilitar"}
      />
    </div>
  );
}
