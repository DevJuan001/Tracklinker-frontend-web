// Hooks
import { useModal } from "../../globals/hooks/useModal";
import { useState } from "react";
// Constantes
import { modals } from "./constants/modals";
// Componentes
import Toast from "../../globals/components/ui/Toast";
import Layout from "../../globals/components/Layout/Layout";
import ChartsContainer from "./components/ui/ChartsContainer";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import FilterModal from "../../globals/components/modals/FilterModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function DashBoardPage() {
  const { modalType, isOpen, triggerRef, openModal, closeModal } = useModal();
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Panel De Control"}
        addButtonIcon={"cloud_upload"}
        addButtonText={"Descargar"}
        createOnClick={() => setShowDownloadToast(true)}
        filterButton={false}
      />
      {/* Container de los gráficos */}
      <ChartsContainer />

      {/* Modales */}
      {modalType && (
        <Modal
          title={modals[modalType]?.title}
          triggerRef={triggerRef}
          type={modalType}
          isOpen={isOpen}
          onClose={closeModal}
        >
          {modalType === "user" && <ProfileModal />}

          {modalType === "filter" && <FilterModal onClose={closeModal} />}

          {modalType === "help" && <HelpModal onClose={closeModal} />}
        </Modal>
      )}

      {showDownloadToast && (
        <Toast
          isOpen={showDownloadToast}
          icon={"check"}
          iconLightColor={"text-green-500"}
          iconDarkColor="dark:text-green-600"
          iconLightBackgroundColor="bg-green-900/70"
          iconDarkBackgroundColor="dark:bg-green-200"
          text={"Descarga exitosa"}
          textLightColor="text-green-500"
          textDarkColor="dark:text-green-600"
          description={`Se ha descargado con exito la información. Puedes ver el archivo en el apartado
          de descargas`}
          onClose={() => setShowDownloadToast(false)}
        />
      )}
    </Layout>
  );
}
