// Hooks
import { useEditWarranty } from "../../hooks/useEditWarranty";
import { useCities } from "../../../../globals/hooks/useCities";
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

export default function EditWarrantyModal({ selectedWarranty, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { form, handleChange, handleSubmit, loading } =
    useEditWarranty(selectedWarranty);
  const { cities } = useCities();
  const { clients } = useActiveClients();

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center gap-2"
    >
      <FormField
        id={"product_serial"}
        name={"product_serial"}
        labelText={"Serial"}
        value={form.product_serial}
        onChange={handleChange}
        placeholder="QTYC99999"
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
        labelText={"Teléfono"}
        value={form.phone}
        onChange={handleChange}
      />

      <FormField
        id={"address"}
        name={"address"}
        labelText={"Dirección"}
        value={form.address}
        onChange={handleChange}
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
      />

      <TextArea
        id={"description"}
        name={"description"}
        labelText={"Descripción"}
        placeholder={
          "Descripción detallada del estado del producto y que se debería modificar del producto"
        }
        onChange={handleChange}
        value={form.description}
      />

      <FormField
        id={"link_attachments"}
        name={"link_attachments"}
        labelText={"Enlace de Adjuntos"}
        value={form.link_attachments}
        onChange={handleChange}
      />

      <SelectMenu
        id={"warranty-status-menu"}
        name={"status"}
        spanText={"Estado"}
        value={form.status}
        onChange={handleChange}
        options={[
          { value: 1, label: "Deshabilitada" },
          { value: 2, label: "Pendiente" },
          { value: 3, label: "En Proceso" },
          { value: 4, label: "Completada" },
        ]}
      />

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
        disabled={loading}
        confirmText={loading ? <Loader /> : "Editar"}
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
          isOpen={true}
          confirmTitle="¡Garantía actualizada!"
          confirmText="La garantía se ha actualizado correctamente."
          confirmButtonText="Cerrar"
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
          errorTitle="No se pudo actualizar la garantía"
          errorText="Revisa que hayas cambiado algún campo o no este vacio e intentalo nuevamente."
          confirmButtonText="Cerrar"
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
