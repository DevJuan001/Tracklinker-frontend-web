// Hooks
import { useEnableUser } from "../../hooks/useEnableUser";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function EnableUserModal({ user, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { loading, error, handleSubmit } = useEnableUser(user.id);

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <span>
        ¿Seguro/a que deseas habilitar a{" "}
        <span className="font-medium">
          {user.name} {user.first_surname}
        </span>
        ?
      </span>

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Habilitar"}
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
          errorTitle="¡No se pudo habilitar el usuario!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
