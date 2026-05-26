// Hooks
import { useRoles } from "../../hooks/useRoles";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useCities } from "../../../../globals/hooks/useCities";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function AddUserModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { roles } = useRoles();
  const { cities } = useCities();
  const { form, loading, error, fieldError, handleSubmit, handleChange } =
    useCreateUser();

  return (
    <section className="flex flex-col items-center gap-2">
      {/* Menú de roles */}
      <SelectMenu
        id={"roles_menu"}
        name={"role_id"}
        spanText={"Rol"}
        value={form.role_id}
        onChange={handleChange}
        options={roles.map((role) => ({
          value: role.id,
          label: role.name,
        }))}
        className={fieldError("role_id")}
      />

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

      <SelectMenu
        searchable
        id={"city"}
        name={"city"}
        spanText={"Ciudad"}
        value={form.city}
        onChange={handleChange}
        options={cities.map((city) => ({ value: city.id, label: city.name }))}
        className={fieldError("city")}
      />

      <FormField
        id={"phone"}
        name={"phone"}
        value={form.phone}
        labelText={"Número"}
        placeholder={"300012124"}
        onChange={handleChange}
        autoComplete="tel"
        className={fieldError("phone")}
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
        id={"address"}
        name={"address"}
        value={form.address}
        labelText={"Dirección"}
        placeholder={"KR 124 # 12-124"}
        onChange={handleChange}
        autoComplete="street-address"
        className={fieldError("address")}
      />

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerType === "success" && (
        <SuccessModal
          location="center"
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Usuario creado con éxito!"}
          confirmText={
            "Se ha creado correctamente el usuario, toca el botón de volver a la pagina para verlo."
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
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="No se pudo completar el registro!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
