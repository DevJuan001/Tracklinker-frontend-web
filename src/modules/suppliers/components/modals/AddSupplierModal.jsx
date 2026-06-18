// Hooks
import { useCities } from "../../../../globals/hooks/useCities";
import { useCreateSupplier } from "../../hooks/useCreateSupplier";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddSupplierModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useCreateSupplier();
  const { cities } = useCities();

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center gap-2"
    >
      <FormField
        onChange={handleChange}
        name={"name"}
        value={form.name}
        labelText={"Nombre"}
        placeholder={"Lenovo"}
        id={"name"}
        autoComplete="given-name"
        className={fieldError("name")}
      />

      <FormField
        onChange={handleChange}
        value={form.email}
        name={"email"}
        labelText={"Correo Electrónico"}
        placeholder={"asus@asus.com"}
        id={"email"}
        autoComplete="email"
        className={fieldError("email")}
      />

      <FormField
        onChange={handleChange}
        value={form.phone}
        type="number"
        name={"phone"}
        labelText={"Número"}
        placeholder={"300012124"}
        id={"phone"}
        autoComplete="tel"
        className={fieldError("phone")}
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
        className={fieldError("city")}
      />

      <FormField
        onChange={handleChange}
        name={"address"}
        value={form.address}
        labelText={"Dirección"}
        placeholder={"KR 124 # 12-124"}
        id={"address"}
        autoComplete="street-address"
        className={fieldError("address")}
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
          location="center"
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
          location="center"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se puedo crear el proveedor!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </form>
  );
}
