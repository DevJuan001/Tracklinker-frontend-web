// Hooks
import { useState } from "react";
import { useSuppliers } from "./hooks/useSuppliers";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Constantes
import { modals } from "./constants/modals";
// Componentes
import SupliersKpis from "./components/ui/SuppliersKpis";
import SuppliersTable from "./components/ui/SuppliersTable";
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import TopSection from "../../globals/components/ui/TopSection";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddSupplierModal from "./components/modals/AddSupplierModal";
import EnableSupplierModal from "./components/modals/EnableSupplierModal";
import DisableSupplierModal from "./components/modals/DisableSupplierModal";
import FilterSuppliersModal from "./components/modals/FilterSuppliersModal";
import EditSupplierInfoModal from "./components/modals/EditSupplierInfoModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function SuppliersPage() {
  const { modalType, triggerRef, isOpen, modalData, openModal, closeModal } =
    useModal();
  const {
    suppliers,
    loading,
    error,
    filters,
    setFilters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuppliers();
  const [search, setSearch] = useState("");
  const filteredSuppliers = useSearch(suppliers, search);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Proveedores"}
        addButtonText={"Crear Proveedor"}
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      {/* Kpis de proveedores */}
      <SupliersKpis />

      {/* Tabla de proveedores */}
      <SuppliersTable
        suppliers={filteredSuppliers}
        search={search}
        loading={loading}
        error={error}
        openModal={openModal}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {/* Modales */}
      {modalType && (
        <Modal
          title={modals[modalType]?.title}
          type={modalType}
          isOpen={isOpen}
          onClose={closeModal}
          triggerRef={triggerRef}
          location={modals[modalType]?.location}
        >
          {modalType === "user" && <ProfileModal />}

          {modalType === "filter" && (
            <FilterSuppliersModal
              filters={filters}
              setFilters={setFilters}
              onClose={closeModal}
            />
          )}

          {modalType === "help" && <HelpModal onClose={closeModal} />}

          {modalType === "add" && <AddSupplierModal onClose={closeModal} />}

          {/* Modal para editar el Proveedor */}
          {modalType === "edit" && (
            <EditSupplierInfoModal supplier={modalData} onClose={closeModal} />
          )}

          {/* Modal para eliminar el Proveedor */}
          {modalType === "disable" && (
            <DisableSupplierModal supplier={modalData} onClose={closeModal} />
          )}

          {/* Modal para eliminar el Proveedor */}
          {modalType === "enable" && (
            <EnableSupplierModal supplier={modalData} onClose={closeModal} />
          )}
        </Modal>
      )}
    </Layout>
  );
}
