import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import { useState } from "react";
import { useCreateOutputOrder } from "../../hooks/useCreateOutputOrder";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import DateField from "../../../../globals/components/ui/DateField";

export default function AddOutputOrderModal({ onClose }) {
  const [innerModal, setInnerModal] = useState(null);

  const { form, loading, handleSubmit, handleChange } = useCreateOutputOrder();

  return (
    <section className="flex flex-col items-center">
      <form className="w-full flex flex-col gap-2">
        <FormField
          value={form.out_order_id}
          labelText="Orden de salida"
          placeholder="XXX123"
          name="out_order_id"
          onChange={handleChange}
        />

        <DateField
          onChange={handleChange}
          id={"out_product_garant"}
          name="out_product_garanty"
          spanText={"Tiempo de garantia"}
          value={form.out_product_garanty || "yyyy-mm-dd"}
        />

        <FormField
          value={form.product_transformation}
          labelText="Transformación"
          placeholder="Cambio de pieza X"
          name="product_transformation"
          onChange={handleChange}
        />

        <FormField
          value={form.product_serial}
          labelText="Serial del producto"
          placeholder="ABC123"
          name="product_serial"
          onChange={handleChange}
        />
      </form>

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelText="Cancelar"
        confirmButtonOnClick={(e) => handleSubmit(e, setInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerModal === "success" && (
        <SuccessModal
          isOpen
          confirmTitle="¡Transformación registrada con éxito!"
          confirmText="La transformación se ha guardado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            setInnerModal(null);
          }}
        />
      )}

      {innerModal === "error" && (
        <ErrorModal
          isOpen
          errorTitle="Error al registrar la transformación"
          errorText="Verifica los datos e inténtalo nuevamente."
          confirmButtonText="Volver"
          onClose={() => setInnerModal(null)}
        />
      )}
    </section>
  );
}
