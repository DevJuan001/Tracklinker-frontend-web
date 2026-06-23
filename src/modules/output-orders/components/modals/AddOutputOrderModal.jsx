// Hooks
import { useActiveClients } from "../../hooks/useActiveClients";
import { useCreateOutputOrder } from "../../hooks/useCreateOutputOrder";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import TagInput from "../../../../globals/components/ui/TagInput";
import DateField from "../../../../globals/components/ui/DateField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import CreateClientModal from "./CreateClientModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddOutputOrderModal({ serial, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  const { clients } = useActiveClients();

  const { form, loading, error, fieldError, handleSubmit, handleChange } =
    useCreateOutputOrder(serial);

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
        className={fieldError("client_id")}
        addIconFunction={(e) => openInnerModal("createUser", e)}
      />

      <DateField
        id={"output_product_garanty"}
        name="output_product_garanty"
        spanText={"Tiempo de garantia"}
        onChange={handleChange}
        value={form.output_product_garanty || "yyyy-mm-dd"}
        className={fieldError("output_product_garanty")}
      />

      <TagInput
        id={"product_serials"}
        name={"product_serials"}
        labelText={"Seriales"}
        placeholder={"QTYC123**"}
        value={form.product_serials}
        onChange={handleChange}
        className={fieldError("product_serials")}
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelText="Cancelar"
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle="¡Orden de salida registrada con éxito!"
          confirmText="La orden de salida se ha creado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="Error al registrar la orden de salida"
          errorText={error}
          confirmButtonText="Volver"
          onClose={() => closeInnerModal()}
        />
      )}

      {innerType === "createUser" && (
        <CreateClientModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
        />
      )}
    </form>
  );
}
