// Hooks
import { useState } from "react";
import { useWarranties } from "./hooks/useWarranties";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Constantes
import { modalTitles } from "./constants/modalTitles";
// Componentes
import WarrantiesKpis from "./components/ui/WarrantiesKpis";
import Layout from "../../globals/components/Layout/Layout";
import WarrantiesTable from "./components/ui/WarrantiesTable";
import SearchBar from "../../globals/components/ui/SearchBar";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddWarrantyModal from "./components/modals/AddWarrantyModal";
import EditWarrantyModal from "./components/modals/EditWarrantyModal";
import FilterWarrantyModal from "./components/modals/FilterWarrantyModal";
import EditWarrantyStatusModal from "./components/modals/EditWarrantyStatusModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function WarrantiesPage() {
  const { isOpen, modalData, modalType, triggerRef, openModal, closeModal } =
    useModal();
  const { warranties, loading, filters, setFilters } = useWarranties();
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
        addButtonText={"Crear garantía"}
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      <WarrantiesKpis />

      <WarrantiesTable
        warranties={filteredWarranties}
        loading={loading}
        search={search}
        openModal={openModal}
      />

      {/* Modales */}
      {modalType && (
        <Modal
          title={modalTitles[modalType]}
          type={modalType}
          isOpen={isOpen}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={
            modalType === "info" || modalType === "edit" || modalType === "add"
              ? "center"
              : "anchored"
          }
        >
          {modalType === "user" && <ProfileModal />}

          {modalType === "filter" && (
            <FilterWarrantyModal
              filters={filters}
              setFilters={setFilters}
              onClose={closeModal}
            />
          )}

          {modalType === "help" && <HelpModal onClose={closeModal} />}

          {modalType === "add" && <AddWarrantyModal onClose={closeModal} />}

          {/* Modal para editar una garantía */}
          {modalType === "edit" && (
            <EditWarrantyModal
              selectedWarranty={modalData}
              onClose={closeModal}
            />
          )}

          {/* Modal para editar el estado la garantía */}
          {modalType === "editStatus" && (
            <EditWarrantyStatusModal
              warranty={modalData}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
