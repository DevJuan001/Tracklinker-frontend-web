// Hooks
import { useState } from "react";
import { useWarranties } from "./hooks/useWarranties";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import WarrantiesTable from "./components/ui/WarrantiesTable";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import MoreWarrantyInfo from "./components/modals/MoreWarrantyInfo";
import AddWarrantyModal from "./components/modals/AddWarrantyModal";
import EditWarrantyModal from "./components/modals/EditWarrantyModal";
import DeleteWarrantyModal from "./components/modals/DeleteWarrantyModal";
import FilterWarrantyModal from "./components/modals/FilterWarrantyModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function WarrantiesPage() {
  const { isOpen, modalData, modalType, triggerRef, openModal, closeModal } =
    useModal();
  const { warranties, setFilters } = useWarranties();
  const [search, setSearch] = useState("");
  const filteredWarranties = useSearch(warranties, search);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Garantías"}
        addButtonText={"Agregar Garantía"}
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      <WarrantiesTable warranties={filteredWarranties} openModal={openModal} />

      {/* Modales */}
      {modalType && (
        <Modal
          title={
            modalType === "user"
              ? "Configuración"
              : modalType === "filter"
                ? "Filtrar"
                : modalType === "add"
                  ? "Agregar Garantía"
                  : modalType === "info"
                    ? ""
                    : modalType === "edit"
                      ? "Editar Garantía"
                      : modalType === "delete"
                        ? "Eliminar Garantía"
                        : "Ayuda"
          }
          type={modalType}
          isOpen={isOpen}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={
            modalType === "info" || modalType === "edit" ? "center" : "anchored"
          }
        >
          {modalType === "user" && <ProfileModal />}
          {modalType === "filter" && (
            <FilterWarrantyModal setFilters={setFilters} onClose={closeModal} />
          )}
          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}
          {modalType === "add" && (
            <AddWarrantyModal onCloseModal={closeModal} />
          )}
          {/* Contenido del Modal de Más Información */}
          {modalType === "info" && (
            <MoreWarrantyInfo modalData={modalData} onClose={closeModal} />
          )}
          {/* Modal para editar una garantía */}
          {modalType === "edit" && (
            <EditWarrantyModal
              selectedWarranty={modalData}
              onClose={closeModal}
            />
          )}
          {/* Modal para eliminar una garantía */}
          {modalType === "delete" && (
            <DeleteWarrantyModal
              selectedWarranty={modalData}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
