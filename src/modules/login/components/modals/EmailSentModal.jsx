import { modalIcons } from "../../../../assets/icons/modalIcons";
import Modal from "../../../../globals/components/modals/Modal";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";

export default function EmailSentModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} z_index="100" onClose={onClose}>
      <section className="flex flex-col items-center gap-1 animate-blurUp">
        <img
          src={modalIcons.emailSentIcon}
          alt=""
          className="w-20 dark:invert"
        />
        <section className="flex flex-col items-center text-center gap-2 dark:text-white">
          <span className="text-xl font-medium">
            ¡Correo electrónico enviado!
          </span>
          <span className="text-sm">
            Se ha enviado un enlace de confirmacion a tu correo. <br />
            Por favor, revisa tu bandeja de entrada o en el apartado de spam
          </span>
        </section>
        <ConfirmCancelButtons
          confirmText="Regresar"
          confirmButtonOnClick={onClose}
          cancelButtonOnClick={onClose}
        />
      </section>
    </Modal>
  );
}
