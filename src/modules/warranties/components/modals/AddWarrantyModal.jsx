// Hooks
import { useCities } from "../../../../globals/hooks/useCities";
import { useCreateWarranty } from "../../hooks/useCreateWarranty";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useActiveClients } from "../../../../globals/hooks/useActiveClients";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import TextArea from "../../../../globals/components/ui/TextArea";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import CreateClientModal from "../../../../globals/components/modals/CreateClientModal";

export default function AddWarrantyModal({ product, onClose }) {
  const { clients } = useActiveClients();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useCreateWarranty(product);
  const { cities } = useCities();

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center gap-2"
    >
      <FormField
        id={"serial"}
        placeholder={"QTYC99999"}
        name={"product_serial"}
        labelText={"Serial"}
        value={form.product_serial}
        onChange={handleChange}
        className={fieldError("product_serial")}
      />

      <SelectMenu
        searchable
        seeAddButton
        id={"customer"}
        name={"customer"}
        spanText={"Cliente"}
        value={form.customer}
        onChange={handleChange}
        placeholder="Miguel Arnulfo Pérez"
        className={fieldError("customer")}
        addIconFunction={(e) => openInnerModal("createClient", e)}
        options={clients.map((client) => ({
          value: client.id,
          label:
            `${client.name} ${client.first_surname ?? ""} ${client.second_surname ?? ""}`.trim(),
        }))}
      />

      <FormField
        id={"phone"}
        name={"phone"}
        type="number"
        labelText={"Teléfono"}
        value={form.phone}
        onChange={handleChange}
        placeholder="+57 300 123 XXXX"
        className={fieldError("phone")}
      />

      <FormField
        id={"address"}
        name={"address"}
        labelText={"Dirección"}
        value={form.address}
        onChange={handleChange}
        placeholder="kr 45 # 67-XX"
        className={fieldError("address")}
      />

      <SelectMenu
        searchable
        id={"cities-menu"}
        name={"city"}
        spanText={"Ciudad"}
        value={form.city}
        onChange={handleChange}
        options={cities.map((city) => ({
          value: city.id,
          label: city.name,
        }))}
        placeholder="Bogotá"
        className={fieldError("city")}
      />

      <TextArea
        id={"description"}
        name={"description"}
        value={form.description}
        onChange={handleChange}
        labelText={"Descripción"}
        placeholder="Escribe detalladamente el problema que presenta el producto, esto ayudará a que el proceso de garantía sea más ágil."
        className={fieldError("description")}
      />

      <FormField
        id={"link_attachments"}
        name={"link_attachments"}
        labelText={"Link de adjuntos"}
        value={form.link_attachments}
        onChange={handleChange}
        placeholder="https://drive.google.com/ejemplo"
        className={fieldError("link_attachments")}
      />

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
        disabled={loading}
        confirmText={loading ? <Loader /> : "Crear"}
      />

      {innerType === "createClient" && (
        <CreateClientModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={closeInnerModal}
        />
      )}

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          growDirection={"top-right"}
          isOpen={true}
          confirmTitle="¡Garantía registrada con éxito!"
          confirmText="La garantía se ha guardado correctamente."
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
          growDirection={"top-center"}
          isOpen={true}
          errorTitle="No se pudo registrar la garantía"
          errorText={error}
          confirmButtonText="Volver"
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
