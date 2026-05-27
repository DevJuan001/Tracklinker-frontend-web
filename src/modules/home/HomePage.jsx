// Hooks
import { useCurrentUser } from "../../globals/hooks/useCurrentUser";
import { useModal } from "../../globals/hooks/useModal";
// Components
import Layout from "../../globals/components/Layout/Layout";
import SectionsContainer from "./components/ui/SectionsContainer";
// Modals
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function HomePage() {
  const { modalType, isOpen, triggerRef, openModal, closeModal } = useModal();
  const { user } = useCurrentUser();

  return (  
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <h1
        id="welcome-message"
        className="h-[10%] p-5 text-3xl font-medium dark:text-white
        md:text-4xl
        xl:text-5xl
      "
      >
        Bienvenido, {user.name}
      </h1>
      
      {/* Contenedor de las cards de los modúlos */}
      <SectionsContainer />

      {modalType && (
        <Modal
          triggerRef={triggerRef}
          title={modalType === "user" ? "Configuración" : "Ayuda"}
          type={modalType}
          isOpen={isOpen}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
        </Modal>
      )}
    </Layout>
  );
}
