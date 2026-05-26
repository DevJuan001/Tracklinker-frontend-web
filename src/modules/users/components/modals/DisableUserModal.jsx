// Hooks
import { useDisableUser } from "../../hooks/useDisableUser";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function DisableUserModal({ user, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleSubmit } = useDisableUser(user.id);

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <span>
        ¿Estás segur@ que deseas deshabilitar a{" "}
        <span className="font-medium">
          {user.name} {user.first_surname}
        </span>
        ?
      </span>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Deshabilitar"}
        confirmBgColor="red-600"
        confirmDarkBgColor=""
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal, onClose)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "error" && (
        <ErrorModal
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo deshabilitar el usuario!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
