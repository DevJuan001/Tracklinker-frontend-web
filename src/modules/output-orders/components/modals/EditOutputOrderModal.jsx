// Hooks
import { useEditOutputOrder } from "../../hooks/useEditOutputOrder";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useActiveClients } from "../../../../globals/hooks/useActiveClients";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import TagInput from "../../../../globals/components/ui/TagInput";
import DateField from "../../../../globals/components/ui/DateField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditOutputOrderModal({ selectedOutputOrder, onClose }) {
  const { clients } = useActiveClients();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { form, error, loading, handleChange, handleSubmit } =
    useEditOutputOrder(selectedOutputOrder);

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center gap-2"
    >
      <SelectMenu
        searchable
        seeAddButton
        id={"clients-menu"}
        name={"client_id"}
        spanText={"Cliente"}
        value={form.client_id}
        onChange={handleChange}
        options={clients.map((client) => ({
          value: client.id,
          label:
            `${client.name} ${client.first_surname ?? ""} ${client.second_surname ?? ""}`.trim(),
        }))}
      />

      <DateField
        id={"output-product-garanty"}
        name="output_product_garanty"
        onChange={handleChange}
        value={form.output_product_garanty}
        spanText="Fecha de finalización de la garantía"
      />

      <TagInput
        id={"product-serials"}
        name="product_serials"
        labelText="Seriales"
        placeholder="ABC123"
        value={form.product_serials}
        onChange={handleChange}
      />

      <SelectMenu
        id={"status-menu"}
        spanText={"Estado"}
        value={form.output_order_status}
        name={"output_order_status"}
        onChange={handleChange}
        options={[
          { value: 1, label: "Deshabilitada" },
          { value: 2, label: "Activa" },
        ]}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Actualizar"}
        cancelText="Cancelar"
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          isOpen={true}
          triggerRef={innerTrigger}
          confirmTitle="¡Orden de salida actualizada!"
          confirmText="La orden de salida se ha modificado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle="No se pudo actualizar la orden de salida"
          errorText={error}
          confirmButtonText="Volver"
          onClose={() => closeInnerModal()}
        />
      )}
    </form>
  );
}
