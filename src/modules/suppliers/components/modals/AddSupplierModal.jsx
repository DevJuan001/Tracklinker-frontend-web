// Hooks
import { useCities } from "../../../../globals/hooks/useCities";
import { useCreateSupplier } from "../../hooks/useCreateSupplier";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddSupplierModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, loading, handleChange, handleSubmit } = useCreateSupplier();
  const { cities } = useCities();

  return (
    <section className="flex flex-col items-center gap-2">
      <FormField
        onChange={handleChange}
        name={"name"}
        value={form.name}
        labelText={"Nombre"}
        placeholder={"Lenovo"}
        id={"name"}
        autoComplete="given-name"
      />

      <FormField
        onChange={handleChange}
        value={form.email}
        name={"email"}
        labelText={"Correo Electrónico"}
        placeholder={"asus@asus.com"}
        id={"email"}
        autoComplete="email"
      />

      <FormField
        onChange={handleChange}
        value={form.phone}
        name={"phone"}
        labelText={"Número"}
        placeholder={"300012124"}
        id={"phone"}
        autoComplete="tel"
      />

      <SelectMenu
        searchable
        onChange={handleChange}
        name={"city"}
        value={form.city}
        spanText={"Ciudad"}
        options={cities.map((city) => ({
          value: city.id,
          label: city.name,
        }))}
      />

      <FormField
        onChange={handleChange}
        name={"address"}
        value={form.address}
        labelText={"Dirección"}
        placeholder={"KR 124 # 12-124"}
        id={"address"}
        autoComplete="street-address"
      />

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales internas */}
      {innerType === "success" && (
        <SuccessModal
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Proveedor creado con éxito!"}
          confirmText={
            "Se ha creado correctamente el proveedor, toca el botón de volver a la pagina para verlo"
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
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se puedo crear el proveedor!"
          errorText="Verfica que todos los campos esten completos o que no exista un proveedor con ese correo"
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
