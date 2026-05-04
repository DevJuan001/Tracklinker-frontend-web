// Hooks
import { useCities } from "../../../../globals/hooks/useCities";
import { useEditWarranty } from "../../hooks/useEditWarranty";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import TextArea from "../../../../globals/components/ui/TextArea";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditWarrantyModal({ selectedWarranty, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, handleChange, handleSubmit, loading } =
    useEditWarranty(selectedWarranty);
  const { cities } = useCities();

  return (
    <section className="flex flex-col items-center gap-2">
      <FormField
        id={"product_serial"}
        name={"product_serial"}
        labelText={"Serial"}
        value={form.product_serial}
        onChange={handleChange}
        placeholder="QTYC99999"
      />

      <FormField
        id={"customer"}
        name={"customer"}
        labelText={"Nombre del Cliente"}
        value={form.customer}
        onChange={handleChange}
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
        spanText={"Ciudad"}
        name={"city"}
        value={form.city}
        onChange={handleChange}
        options={cities.map((city) => ({
          value: city.id,
          label: city.name,
        }))}
      />

      <TextArea
        labelText={"Descripción"}
        placeholder={
          "Descripción detallada del estado del producto y que se debería modificar del producto"
        }
        onChange={handleChange}
        value={form.description}
        id={"description"}
        name={"description"}
      />

      <FormField
        id={"link_attachments"}
        name={"link_attachments"}
        labelText={"Enlace de Adjuntos"}
        value={form.link_attachments}
        onChange={handleChange}
      />

      <SelectMenu
        spanText={"Estado"}
        name={"status"}
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
        confirmText={loading ? <Loader /> : "Editar"}
      />

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle="¡Garantía actualizada!"
          confirmText="La garantía se ha actualizado correctamente."
          confirmButtonText="Cerrar"
          onClose={() => {
            openInnerModal(null);
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
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
