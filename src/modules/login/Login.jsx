// Hooks
import { useModal } from "../../globals/hooks/useModal";
// Constantes
import { modals } from "./constants/modals";
// Componentes
import LoginForm from "./components/ui/LoginForm";
// Modales
import Modal from "../../globals/components/modals/Modal";
import ErrorModal from "./components/modals/ErrorModal";
import RecoverPasswordModal from "./components/modals/RecoverPasswordModal";

export default function Login() {
  const { modalType, isOpen, triggerRef, openModal, closeModal } = useModal();

  return (
    <section
      className="w-screen h-screen flex items-center justify-center bg-[#FBF9FC]
      dark:bg-black"
    >
      {/* Formulario */}
      <LoginForm openModal={openModal} />

      {modalType && (
        <Modal
          title={modals[modalType]?.title}
          type={modalType}
          isOpen={isOpen}
          location="center"
          triggerRef={triggerRef}
          onClose={closeModal}
        >
          {modalType === "error" && <ErrorModal onClose={closeModal} />}

          {modalType === "rememberPassword" && (
            <RecoverPasswordModal onClose={closeModal} />
          )}
        </Modal>
      )}
    </section>
  );
}
