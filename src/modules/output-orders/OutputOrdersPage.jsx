// Hooks
import { useState } from "react";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
import { useOutputOrders } from "./hooks/useOutputOrders";
// Constantes
import { modals } from "./constants/modals";
// Componentes
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import OutputOrdersKpis from "./components/ui/OutputOrdersKpis";
import TopSection from "../../globals/components/ui/TopSection";
import OutputOrdersTable from "./components/ui/OutputOrdersTable";
// Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddOutputOrderModal from "./components/modals/AddOutputOrderModal";
import EditOutputOrderModal from "./components/modals/EditOutputOrderModal";
import EnableOutputOrderModal from "./components/modals/EnableOutputOrderModal";
import FilterOutputOrderModal from "./components/modals/FilterOutputOrdersModal";
import DisableOutputOrderModal from "./components/modals/DisableOutputOrderModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function OutputOrdersPage() {
  const {
    outputOrders,
    loading,
    filters,
    setFilters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOutputOrders();
  const { modalType, isOpen, modalData, triggerRef, openModal, closeModal } =
    useModal();
  const [search, setSearch] = useState("");
  const filteredOutputs = useSearch(outputOrders, search);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName="Ordenes de salida"
        addButtonText="Crear orden"
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      <OutputOrdersKpis />

      <OutputOrdersTable
        outputOrders={filteredOutputs}
        loading={loading}
        search={search}
        openModal={openModal}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {modalType && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          type={modalType}
          title={modals[modalType]?.title}
          triggerRef={triggerRef}
          location={modals[modalType]?.location}
        >
          {modalType === "user" && <ProfileModal />}

          {modalType === "filter" && (
            <FilterOutputOrderModal
              filters={filters}
              setFilters={setFilters}
              onClose={closeModal}
            />
          )}

          {modalType === "help" && <HelpModal onClose={closeModal} />}

          {modalType === "add" && <AddOutputOrderModal onClose={closeModal} />}

          {modalType === "edit" && modalData && (
            <EditOutputOrderModal
              selectedOutputOrder={modalData}
              onClose={closeModal}
            />
          )}

          {modalType === "disable" && modalData && (
            <DisableOutputOrderModal
              selectedOutputOrder={modalData}
              onClose={closeModal}
            />
          )}

          {modalType === "enable" && modalData && (
            <EnableOutputOrderModal
              selectedOutputOrder={modalData}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
