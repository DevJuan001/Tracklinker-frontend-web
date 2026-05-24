// Hooks
import { useRoles } from "../../hooks/useRoles";
import { useCities } from "../../../../globals/hooks/useCities";
import { useEditUser } from "../../hooks/useEditUser";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditUserInfoModal({ user, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { roles } = useRoles();
  const { cities } = useCities();
  const { handleChange, handleSubmit, loading, form, error, fieldError } =
    useEditUser(user);

  return (
    <section className="flex flex-col items-center">
      <form action="" className="w-full flex flex-col gap-2.5">
        <SelectMenu
          name={"role_id"}
          value={form.role_id}
          id={"role_menu"}
          spanText={"Rol"}
          onChange={handleChange}
          options={roles.map((role) => ({
            value: role.id,
            label: role.name,
          }))}
          className={fieldError("role_id")}
        />

        <FormField
          name={"name"}
          value={form.name}
          labelText={"Nombre"}
          onChange={handleChange}
          id={"name"}
          autoComplete="given-name"
          className={fieldError("name")}
        />

        <FormField
          name={"first_surname"}
          value={form.first_surname}
          labelText={"Primer Apellido"}
          id={"first_surname"}
          onChange={handleChange}
          autoComplete="family-name"
          className={fieldError("first_surname")}
        />

        <FormField
          name={"second_surname"}
          value={form.second_surname}
          labelText={"Segundo Apellido"}
          id={"second_surname"}
          onChange={handleChange}
          autoComplete="family-name"
          className={fieldError("second_surname")}
        />

        <SelectMenu
          searchable
          value={form.city}
          name={"city"}
          spanText={"Ciudad"}
          onChange={handleChange}
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
          className={fieldError("city")}
        />

        <FormField
          name={"phone"}
          value={form.phone}
          labelText={"Número"}
          id={"phone"}
          onChange={handleChange}
          autoComplete="tel"
          className={fieldError("phone")}
        />

        <FormField
          name={"email"}
          isRequired={true}
          value={form.email}
          labelText={"Correo Electrónico"}
          id={"email"}
          onChange={handleChange}
          autoComplete="email"
          className={fieldError("email")}
        />

        <FormField
          name={"address"}
          value={form.address}
          labelText={"Dirección"}
          id={"address"}
          onChange={handleChange}
          autoComplete="street-address"
          className={fieldError("address")}
        />

        <SelectMenu
          name={"status"}
          value={form.status}
          spanText={"Estado"}
          onChange={handleChange}
          options={[
            { value: 1, label: "Deshabilitado" },
            { value: 2, label: "Activo" },
          ]}
          className={fieldError("status")}
        />
      </form>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Confirmar"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerType === "success" && (
        <SuccessModal
          isOpen={true}
          location="center"
          triggerRef={innerTrigger}
          confirmTitle={"Información editada con éxito!"}
          confirmText={
            "Se ha editado correctamente el usuario, toca el botón de volver a la pagina para verlo"
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
          isOpen={true}
          location="center"
          triggerRef={innerTrigger}
          errorTitle="¡No se pudo actualizar el usuario!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
