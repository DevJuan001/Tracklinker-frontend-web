import Loader from "../../../../globals/components/ui/Loader";
import { useEnableOutputOrder } from "../../hooks/useEnableOutputOrder";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function EnableOutputOrdersModal({
  selectedOutputOrder,
  onClose,
}) {
  const { handleSubmit, loading } = useEnableOutputOrder(
    selectedOutputOrder.output_order_id,
  );

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <p>
        ¿Estás seguro de que deseas habilitar la orden de salida N°{" "}
        <span className="font-medium">
          {selectedOutputOrder.output_order_id}
        </span>
        ?
      </p>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, onClose)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
