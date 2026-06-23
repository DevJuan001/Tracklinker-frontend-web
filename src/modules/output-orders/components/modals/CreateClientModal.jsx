// Hooks
import { useCities } from "../../../../globals/hooks/useCities";
import { useCreateClient } from "../../hooks/useCreateClient";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function CreateClientModal({ triggerRef, isOpen, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { cities } = useCities();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useCreateClient();

  return (
    <AddInnerModal
      triggerRef={triggerRef}
      isOpen={isOpen}
      onClose={onClose}
      title={"Crear Cliente"}
    >
      <form
        action={(e) => handleSubmit(e, openInnerModal)}
        className="w-full flex flex-col items-center gap-2.5"
      >
        <FormField
          id={"name"}
          name={"name"}
          value={form.name}
          labelText={"Nombre"}
          placeholder={"Felipe"}
          onChange={handleChange}
          autoComplete="given-name"
          className={fieldError("name")}
        />

        <FormField
          id={"first_surname"}
          name={"first_surname"}
          value={form.first_surname}
          labelText={"Primer Apellido"}
          placeholder={"Contreras"}
          onChange={handleChange}
          autoComplete="family-name"
          className={fieldError("first_surname")}
        />

        <FormField
          id={"second_surname"}
          name={"second_surname"}
          value={form.second_surname}
          labelText={"Segundo Apellido"}
          placeholder={"Aguilar"}
          onChange={handleChange}
          autoComplete="name"
          className={fieldError("second_surname")}
        />

        <FormField
          id={"address"}
          name={"address"}
          value={form.address}
          labelText={"Dirección"}
          placeholder={"KR 124 # 12-124"}
          onChange={handleChange}
          autoComplete="street-address"
          className={fieldError("address")}
        />

        <SelectMenu
          searchable
          id={"cities-menu"}
          name={"city"}
          spanText={"Ciudad"}
          value={form.city}
          onChange={handleChange}
          options={cities.map((city) => ({ value: city.id, label: city.name }))}
          className={fieldError("city")}
        />

        <FormField
          id={"email"}
          name={"email"}
          value={form.email}
          labelText={"Email"}
          placeholder={"pepito@gmail.com"}
          onChange={handleChange}
          autoComplete="email"
          className={fieldError("email")}
        />

        <FormField
          id={"phone"}
          name={"phone"}
          value={form.phone}
          labelText={"Número"}
          placeholder={"300012124"}
          onChange={handleChange}
          autoComplete="tel"
          type="number"
          className={fieldError("phone")}
        />

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Crear"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          cancelButtonOnClick={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      </form>

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
          confirmTitle={"Cliente creado con éxito!"}
          confirmText={
            "El cliente ha sido creado correctamente, ya puedes volver y seleccionarlo."
          }
          confirmButtonText={"Volver"}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => openInnerModal(null)}
          errorTitle={"No se pudo completar el registro!"}
          errorText={error}
          confirmButtonText={"Volver a intentarlo"}
        />
      )}
    </AddInnerModal>
  );
}
