// Hooks
import { useEditSupplier } from "../../hooks/useEditSupplier";
import { useCities } from "../../../../globals/hooks/useCities";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditSupplierInfoModal({ supplier, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, loading, handleChange, handleSubmit } =
    useEditSupplier(supplier);
  const { cities } = useCities();

  return (
    <section className="flex flex-col items-center">
      <form action="" className="w-full flex flex-col gap-2">
        <FormField
          onChange={handleChange}
          name={"name"}
          value={form.name}
          labelText={"Nombre"}
          id={"name"}
        />

        <FormField
          onChange={handleChange}
          name={"email"}
          value={form.email}
          labelText={"Correo Electrónico"}
          id={"email"}
          autoComplete="email"
        />

        <SelectMenu
          searchable
          onChange={handleChange}
          name={"city"}
          value={form.city}
          spanText={"Ciudad"}
          id={"city"}
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
        />

        <FormField
          onChange={handleChange}
          value={form.phone}
          labelText={"Número"}
          id={"phone"}
          name={"phone"}
          autoComplete="tel"
        />

        <FormField
          onChange={handleChange}
          name={"address"}
          value={form.address}
          labelText={"Dirección"}
          id={"address"}
        />

        <SelectMenu
          spanText={"Estado"}
          name={"status"}
          value={form.status}
          onChange={handleChange}
          options={[
            { value: 1, label: "Deshabilitado" },
            { value: 2, label: "Activo" },
          ]}
        />
      </form>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Editar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />
      {/* Modales internas */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Proveedor editado con éxito!"}
          confirmText={
            "Se ha editado correctamente la informacion del proveedor, toca el botón de volver a la pagina para verlo"
          }
          confirmButtonText={"Volver a la pagina"}
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
          errorTitle="¡No se pudo editar el proveedor!"
          errorText="Verfica que todos los campos esten completos"
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
