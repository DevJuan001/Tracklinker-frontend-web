// Hooks
import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Constantes
import { modals } from "./constants/modals";
// Componentes
import UsersKpis from "./components/ui/UsersKpis";
import UsersTable from "./components/ui/UsersTable";
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import TopSection from "../../globals/components/ui/TopSection";
import EnableUserModal from "./components/modals/EnableUserModal";
// Modales
import Modal from "../../globals/components/modals/Modal";
import AddUserModal from "./components/modals/AddUserModal";
import HelpModal from "../../globals/components/modals/HelpModal";
import FilterUserModal from "./components/modals/FilterUserModal";
import DisableUserModal from "./components/modals/DisableUserModal";
import EditUserInfoModal from "./components/modals/EditUserInfoModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function UsersPage() {
  const { modalType, isOpen, modalData, triggerRef, openModal, closeModal } =
    useModal();
  const {
    users,
    loading,
    error,
    filters,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    setFilters,
  } = useUsers();
  const [search, setSearch] = useState("");
  const filteredUsers = useSearch(users, search);

  return (
    <Layout
      avatarOnClick={(e) => openModal(null, "user", null, e.currentTarget)}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Usuarios"}
        addButtonText={"Agregar Usuario"}
        createOnClick={(e) => openModal(null, "add", null, e.currentTarget)}
        filterOnClick={(e) => openModal(null, "filter", null, e.currentTarget)}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      <UsersKpis />

      {/* Tabla de usuarios */}
      <UsersTable
        users={filteredUsers}
        loading={loading}
        error={error}
        search={search}
        openModal={openModal}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />

      {/* Modales */}
      {modalType && (
        <Modal
          title={modals[modalType]?.title}
          location={modals[modalType]?.location}
          type={modalType}
          isOpen={isOpen}
          onClose={closeModal}
          triggerRef={triggerRef}
        >
          {modalType === "user" && <ProfileModal />}

          {modalType === "filter" && (
            <FilterUserModal
              filters={filters}
              setFilters={setFilters}
              onClose={closeModal}
            />
          )}

          {modalType === "help" && <HelpModal onClose={closeModal} />}

          {/* Modal para agregar un usuario */}
          {modalType === "add" && <AddUserModal onClose={closeModal} />}

          {/* Modal para editar el usuario */}
          {modalType === "edit" && (
            <EditUserInfoModal user={modalData} onClose={closeModal} />
          )}

          {/* Modal para deshabilitar el usuario */}
          {modalType === "disable" && (
            <DisableUserModal user={modalData} onClose={closeModal} />
          )}

          {/* Modal para habilitar el usuario */}
          {modalType === "enable" && (
            <EnableUserModal user={modalData} onClose={closeModal} />
          )}
        </Modal>
      )}
    </Layout>
  );
}
