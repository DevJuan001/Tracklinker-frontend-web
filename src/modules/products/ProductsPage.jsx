// Hooks
import { useState } from "react";
import { useCatalog } from "./hooks/useCatalog";
import { useModal } from "../../globals/hooks/useModal";
import { useSearch } from "../../globals/hooks/useSearch";
// Constantes
import { modalTitles } from "./constants/modalTitles";
// Componentes
import ProductsKpis from "./components/ui/ProductsKpis";
import ProductsTable from "./components/ui/ProductsTable";
import Layout from "../../globals/components/Layout/Layout";
import SearchBar from "../../globals/components/ui/SearchBar";
import TopSection from "../../globals/components/ui/TopSection";
//Modales
import Modal from "../../globals/components/modals/Modal";
import HelpModal from "../../globals/components/modals/HelpModal";
import AddProductModal from "./components/modals/AddProductModal";
import EditProductModal from "./components/modals/EditProductModal";
import ProductsFilterModal from "./components/modals/ProductsFilterModal";
import EditProductStatusModal from "./components/modals/EditProductStatusModal";
import ProfileModal from "../../globals/components/modals/profileModal/ProfileModal";

export default function ProductsPage() {
  const { modalType, modalData, isOpen, triggerRef, openModal, closeModal } =
    useModal();
  const {
    products,
    loading,
    filters,
    setFilters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCatalog();
  const [search, setSearch] = useState("");
  const filteredProducts = useSearch(products ?? [], search);

  return (
    <Layout
      avatarOnClick={(e) => {
        openModal(null, "user", null, e.currentTarget);
      }}
      helpOnClick={(e) => {
        openModal(null, "help", null, e.currentTarget);
      }}
    >
      <TopSection
        sectionName={"Productos"}
        addButtonIcon={"box_add"}
        addButtonText={"Agregar Producto"}
        createOnClick={(e) => {
          openModal(null, "add", null, e.currentTarget);
        }}
        filterOnClick={(e) => {
          openModal(null, "filter", null, e.currentTarget);
        }}
      >
        <SearchBar value={search} onChange={setSearch} />
      </TopSection>

      {/* Kpis */}
      <ProductsKpis />

      {/* Contenedor de la tabla */}
      <ProductsTable
        products={filteredProducts}
        search={search}
        loading={loading}
        openModal={openModal}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {/* Modales */}
      {isOpen && (
        <Modal
          title={modalTitles[modalType]}
          type={modalType}
          isOpen={isOpen}
          triggerRef={triggerRef}
          location={
            modalType === "filter" || modalType === "editStatus"
              ? "anchored"
              : "center"
          }
          growDirection={"bottom"}
          onClose={() => closeModal()}
        >
          {modalType === "user" && <ProfileModal />}

          {modalType === "filter" && (
            <ProductsFilterModal filters={filters} setFilters={setFilters} />
          )}

          {modalType === "help" && <HelpModal onClose={() => closeModal()} />}

          {modalType === "add" && (
            <AddProductModal
              selectedProduct={modalData}
              openModal={openModal}
            />
          )}

          {/* Modal para editar el producto */}
          {modalType === "edit" && (
            <EditProductModal selectedProduct={modalData} />
          )}

          {modalType === "editStatus" && (
            <EditProductStatusModal
              product={modalData}
              onClose={() => closeModal()}
            />
          )}
        </Modal>
      )}
    </Layout>
  );
}
